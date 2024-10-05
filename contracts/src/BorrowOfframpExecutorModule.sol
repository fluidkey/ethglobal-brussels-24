// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ERC7579ExecutorBase} from "modulekit/Modules.sol";
import {IERC7579Account} from "modulekit/Accounts.sol";
import {ModeLib} from "erc7579/lib/ModeLib.sol";

interface Safe {
    /// @dev Allows a Module to execute a Safe transaction without any further confirmations.
    /// @param to Destination address of module transaction.
    /// @param value Ether value of module transaction.
    /// @param data Data payload of module transaction.
    /// @param operation Operation type of module transaction.
    function execTransactionFromModule(address to, uint256 value, bytes calldata data, uint8 operation) external returns (bool success);
    function getOwners() external view returns (address[] memory);
}

interface ERC20 {
    function approve(address spender, uint256 amount) external returns (bool);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function decimals() external view returns (uint8);
    function balanceOf(address account) external view returns (uint256);
}

interface AaveV3Pool {
    function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external; // supply
    function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode) external;

    function repay(address asset, uint256 amount, uint256 rateMode, address onBehalfOf) external;

    function repayWithATokens(address asset, uint256 amount, uint256 interestRateMode) external;
}

interface WETHGateway {
    function depositETH(address pool, address onBehalfOf, uint16 referralCode) external payable;
}

interface AaveOracle {
    function getAssetPrice(address asset) external view returns (uint256);
}


contract BorrowOfframpExecutorModule is ERC7579ExecutorBase {
    /*//////////////////////////////////////////////////////////////////////////
                            CONSTANTS & STORAGE
    //////////////////////////////////////////////////////////////////////////*/
    // AAVE pools
    AaveV3Pool public constant AAVE_V3_POOL = AaveV3Pool(0x794a61358D6845594F94dc1DB02A252b5b4814aD);
    WETHGateway public constant WETH_GATEWAY = WETHGateway(0xecD4bd3121F9FD604ffaC631bF6d41ec12f1fafb);
    AaveOracle public constant AAVE_ORACLE = AaveOracle(0xb56c2F0B653B2e0b10C9b928C8580Ac5Df02C7C7);

    // Safe -> offRampAddress
    mapping(address => address) public offRampAddress;

    mapping(address => bool) private _initialized;

    ERC20 public USDC = ERC20(0xaf88d065e77c8cC2239327C5EDb3A432268e5831); // USDC on ArbOne

    /*//////////////////////////////////////////////////////////////////////////
                                     CONFIG
    //////////////////////////////////////////////////////////////////////////*/

    /**
     * Initialize the module with the given data
     *
     * @param data The data to initialize the module with
     */
    function onInstall(bytes calldata data) external override {
        (address _offRampAddress) = abi.decode(data, (address));
        offRampAddress[msg.sender] = _offRampAddress;
        _initialized[msg.sender] = true;
    }

    /**
     * De-initialize the module with the given data
     *
     * @param data The data to de-initialize the module with
     */
    function onUninstall(bytes calldata data) external override {
        _initialized[msg.sender] = false;
    }

    /**
     * Check if the module is initialized
     * @param smartAccount The smart account to check
     *
     * @return true if the module is initialized, false otherwise
     */
    function isInitialized(address smartAccount) external view returns (bool) {
        return _initialized[smartAccount];
    }

    /*//////////////////////////////////////////////////////////////////////////
                                     MODULE LOGIC
    //////////////////////////////////////////////////////////////////////////*/

    /**
     * Supply and borrow within the same transaction, send the borrowed funds to an authorized withdrawal address.
     * @dev Check the current balance and executes a borrow operation from ETH to USDC
     * @dev This function is not part of the ERC-7579 standard
     *
     * @param safe The address of the safe where to exectute the module
     */
    function borrow(
        address safe
    ) external {
        // IERC7579Account(msg.sender).executeFromExecutor(ModeLib.encodeSimpleSingle(), data);

        // check that the module is installed and _initialized
        require(_initialized[safe], "Module not initialized");

        // check that the native token balance of safe address is > 0
        uint256 ethBalance = safe.balance;
        require(ethBalance > 0, "Safe balance is 0");

        // check that the withdrawal address is set
        address withdrawalAddress = offRampAddress[safe];
        require(withdrawalAddress != address(0), "Withdrawal address not set");

        bool success;

        Safe safeInstance = Safe(safe);

        // deposit ETH into the WETH gateway (Supply collateral)
        success = safeInstance.execTransactionFromModule(
            address(WETH_GATEWAY),
            ethBalance,
            abi.encodeWithSignature("depositETH(address,address,uint16)", address(AAVE_V3_POOL), safe, 0),
            0
        );
        require(success, "ETH deposit failed");

        uint safeBorrowAmountInUsdc = _evalSafeUsdcBorrowAmount(ethBalance);

        // Borrow the funds
        success = safeInstance.execTransactionFromModule(
            address(AAVE_V3_POOL),
            0,
            abi.encodeWithSignature("borrow(address,uint256,uint256,uint16,address)", address(USDC), safeBorrowAmountInUsdc, 2, 0, safe),
            0
        );
        require(success, "Borrow failed");

        // Send the borrowed funds to the withdrawal address
        success = safeInstance.execTransactionFromModule(
            address(USDC),
            0,
            abi.encodeWithSignature("transfer(address,uint256)", withdrawalAddress, safeBorrowAmountInUsdc),
            0
        );
        require(success, "Transfer failed");
    }

    /**
    * Execute a repay operation.
    * @dev Check the current balance and executes a repay operation from USDC to ETH
    * @dev This function is not part of the ERC-7579 standard
    *
    * @param safe The safe to repay
    */
    function repay(address safe) external {
//        IERC7579Account(msg.sender).executeFromExecutor(ModeLib.encodeSimpleSingle(), data);
        // check that the module is installed and _initialized
        require(_initialized[safe], "Module not initialized");

        Safe safeInstance = Safe(safe);

        uint256 usdcBalance = USDC.balanceOf(safe);
        require(usdcBalance > 0, "USDC balance is 0");

        // set allowance
        bool success = safeInstance.execTransactionFromModule(
            address(USDC),
            0,
            abi.encodeWithSignature("approve(address,uint256)", address(AAVE_V3_POOL), usdcBalance),
            0
        );

        // Repay the loan
        success = safeInstance.execTransactionFromModule(
            address(AAVE_V3_POOL),
            0,
            abi.encodeWithSignature("repay(address,uint256,uint256,address)", address(USDC), usdcBalance, 2, address(safe)),
            0
        );

        // move the wETH to the safe owner
        ERC20 aArbWETH = ERC20(0xe50fA9b3c56FfB159cB0FCA61F5c9D750e8128c8);
        ERC20 weth = ERC20(0x82aF49447D8a07e3bd95BD0d56f35241523fBab1);
        address[] memory owners = safeInstance.getOwners();
        address realOwner = owners[0];
        success = safeInstance.execTransactionFromModule(
            address(AAVE_V3_POOL),
            0,
            abi.encodeWithSignature("withdraw(address,uint256,address)", address(weth), aArbWETH.balanceOf(safe), realOwner),
            0
        );

        require(success, "Repay failed");
    }

    /*//////////////////////////////////////////////////////////////////////////
                                     INTERNAL
    //////////////////////////////////////////////////////////////////////////*/

    /**
    * Evaluate the safe borrow amount in USDC
    *
    * @param ethBalance The balance of the safe in ETH
    *
    * @return safeBorrowAmountInUsdc The safe borrow amount in USDC
    */
    function _evalSafeUsdcBorrowAmount(uint256 ethBalance) internal view returns (uint256) {
        // Get the current price of ETH and USDC
        uint256 ethPrice = AAVE_ORACLE.getAssetPrice(0x82aF49447D8a07e3bd95BD0d56f35241523fBab1); // ETH price in USD

        // Calculate the amount of ETH in USD
        uint256 ethAmountInUsd = (ethBalance * ethPrice) / 1e18;

        // Set USD decimals
        uint8 aaveUsdDecimals = 8;
        uint8 usdcDecimals = USDC.decimals();
        uint8 decimalsDiff = aaveUsdDecimals - usdcDecimals;
        require(decimalsDiff >= 0, "USDC decimals are higher than AAVE USD decimals");
        uint256 usdcAmountFromEth = ethAmountInUsd / (10 ** decimalsDiff);

        // Set the collateral factor (LTV) for ETH
        uint256 safeBorrowAmountInUsdc = usdcAmountFromEth * 5 / 10; // 50% LTV

        return safeBorrowAmountInUsdc;
    }

    /*//////////////////////////////////////////////////////////////////////////
                                     METADATA
    //////////////////////////////////////////////////////////////////////////*/

    /**
     * The name of the module
     *
     * @return name The name of the module
     */
    function name() external pure returns (string memory) {
        return "BorrowOfframp";
    }

    /**
     * The version of the module
     *
     * @return version The version of the module
     */
    function version() external pure returns (string memory) {
        return "0.0.1";
    }

    /**
     * Check if the module is of a certain type
     *
     * @param typeID The type ID to check
     *
     * @return true if the module is of the given type, false otherwise
     */
    function isModuleType(uint256 typeID) external pure override returns (bool) {
        return typeID == TYPE_EXECUTOR;
    }
}
