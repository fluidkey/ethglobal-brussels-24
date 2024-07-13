import {
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
  createUseReadContract,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// aavePool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const aavePoolAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [],
    name: 'admin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_logic', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

/**
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const aavePoolAddress = {
  42161: '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
} as const

/**
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const aavePoolConfig = {
  address: aavePoolAddress,
  abi: aavePoolAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// aaveUiPoolDataProvider
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x145dE30c929a065582da84Cf96F88460dB9745A7)
 */
export const aaveUiPoolDataProviderAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_networkBaseTokenPriceInUsdProxyAggregator',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
      {
        name: '_marketReferenceCurrencyPriceInUsdProxyAggregator',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ETH_CURRENCY_UNIT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MKR_ADDRESS',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_bytes32', internalType: 'bytes32', type: 'bytes32' }],
    name: 'bytes32ToString',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    name: 'getReservesData',
    outputs: [
      {
        name: '',
        internalType: 'struct IUiPoolDataProviderV3.AggregatedReserveData[]',
        type: 'tuple[]',
        components: [
          { name: 'underlyingAsset', internalType: 'address', type: 'address' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'decimals', internalType: 'uint256', type: 'uint256' },
          {
            name: 'baseLTVasCollateral',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reserveLiquidationThreshold',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reserveLiquidationBonus',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'reserveFactor', internalType: 'uint256', type: 'uint256' },
          {
            name: 'usageAsCollateralEnabled',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'borrowingEnabled', internalType: 'bool', type: 'bool' },
          {
            name: 'stableBorrowRateEnabled',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'isActive', internalType: 'bool', type: 'bool' },
          { name: 'isFrozen', internalType: 'bool', type: 'bool' },
          { name: 'liquidityIndex', internalType: 'uint128', type: 'uint128' },
          {
            name: 'variableBorrowIndex',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'liquidityRate', internalType: 'uint128', type: 'uint128' },
          {
            name: 'variableBorrowRate',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'stableBorrowRate',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'lastUpdateTimestamp',
            internalType: 'uint40',
            type: 'uint40',
          },
          { name: 'aTokenAddress', internalType: 'address', type: 'address' },
          {
            name: 'stableDebtTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'variableDebtTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'interestRateStrategyAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'availableLiquidity',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalPrincipalStableDebt',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'averageStableRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'stableDebtLastUpdateTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalScaledVariableDebt',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'priceInMarketReferenceCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'priceOracle', internalType: 'address', type: 'address' },
          {
            name: 'variableRateSlope1',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'variableRateSlope2',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'stableRateSlope1',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'stableRateSlope2',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'baseStableBorrowRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'baseVariableBorrowRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'optimalUsageRatio',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'isPaused', internalType: 'bool', type: 'bool' },
          { name: 'isSiloedBorrowing', internalType: 'bool', type: 'bool' },
          {
            name: 'accruedToTreasury',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'unbacked', internalType: 'uint128', type: 'uint128' },
          {
            name: 'isolationModeTotalDebt',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'flashLoanEnabled', internalType: 'bool', type: 'bool' },
          { name: 'debtCeiling', internalType: 'uint256', type: 'uint256' },
          {
            name: 'debtCeilingDecimals',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'eModeCategoryId', internalType: 'uint8', type: 'uint8' },
          { name: 'borrowCap', internalType: 'uint256', type: 'uint256' },
          { name: 'supplyCap', internalType: 'uint256', type: 'uint256' },
          { name: 'eModeLtv', internalType: 'uint16', type: 'uint16' },
          {
            name: 'eModeLiquidationThreshold',
            internalType: 'uint16',
            type: 'uint16',
          },
          {
            name: 'eModeLiquidationBonus',
            internalType: 'uint16',
            type: 'uint16',
          },
          {
            name: 'eModePriceSource',
            internalType: 'address',
            type: 'address',
          },
          { name: 'eModeLabel', internalType: 'string', type: 'string' },
          { name: 'borrowableInIsolation', internalType: 'bool', type: 'bool' },
        ],
      },
      {
        name: '',
        internalType: 'struct IUiPoolDataProviderV3.BaseCurrencyInfo',
        type: 'tuple',
        components: [
          {
            name: 'marketReferenceCurrencyUnit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'marketReferenceCurrencyPriceInUsd',
            internalType: 'int256',
            type: 'int256',
          },
          {
            name: 'networkBaseTokenPriceInUsd',
            internalType: 'int256',
            type: 'int256',
          },
          {
            name: 'networkBaseTokenPriceDecimals',
            internalType: 'uint8',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    name: 'getReservesList',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'getUserReservesData',
    outputs: [
      {
        name: '',
        internalType: 'struct IUiPoolDataProviderV3.UserReserveData[]',
        type: 'tuple[]',
        components: [
          { name: 'underlyingAsset', internalType: 'address', type: 'address' },
          {
            name: 'scaledATokenBalance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'usageAsCollateralEnabledOnUser',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'stableBorrowRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'scaledVariableDebt',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'principalStableDebt',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'stableBorrowLastUpdateTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      { name: '', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'marketReferenceCurrencyPriceInUsdProxyAggregator',
    outputs: [
      {
        name: '',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'networkBaseTokenPriceInUsdProxyAggregator',
    outputs: [
      {
        name: '',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x145dE30c929a065582da84Cf96F88460dB9745A7)
 */
export const aaveUiPoolDataProviderAddress = {
  42161: '0x145dE30c929a065582da84Cf96F88460dB9745A7',
} as const

/**
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x145dE30c929a065582da84Cf96F88460dB9745A7)
 */
export const aaveUiPoolDataProviderConfig = {
  address: aaveUiPoolDataProviderAddress,
  abi: aaveUiPoolDataProviderAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useWriteAavePool = /*#__PURE__*/ createUseWriteContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"admin"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useWriteAavePoolAdmin = /*#__PURE__*/ createUseWriteContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
  functionName: 'admin',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"implementation"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useWriteAavePoolImplementation =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'implementation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useWriteAavePoolInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useWriteAavePoolUpgradeTo = /*#__PURE__*/ createUseWriteContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
  functionName: 'upgradeTo',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useWriteAavePoolUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useSimulateAavePool = /*#__PURE__*/ createUseSimulateContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"admin"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useSimulateAavePoolAdmin = /*#__PURE__*/ createUseSimulateContract(
  { abi: aavePoolAbi, address: aavePoolAddress, functionName: 'admin' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"implementation"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useSimulateAavePoolImplementation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'implementation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useSimulateAavePoolInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useSimulateAavePoolUpgradeTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'upgradeTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useSimulateAavePoolUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aavePoolAbi}__
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useWatchAavePoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: aavePoolAbi,
  address: aavePoolAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aavePoolAbi}__ and `eventName` set to `"Upgraded"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x794a61358D6845594F94dc1DB02A252b5b4814aD)
 */
export const useWatchAavePoolUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x145dE30c929a065582da84Cf96F88460dB9745A7)
 */
export const useReadAaveUiPoolDataProvider =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"ETH_CURRENCY_UNIT"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x145dE30c929a065582da84Cf96F88460dB9745A7)
 */
export const useReadAaveUiPoolDataProviderEthCurrencyUnit =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'ETH_CURRENCY_UNIT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"MKR_ADDRESS"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x145dE30c929a065582da84Cf96F88460dB9745A7)
 */
export const useReadAaveUiPoolDataProviderMkrAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'MKR_ADDRESS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"bytes32ToString"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x145dE30c929a065582da84Cf96F88460dB9745A7)
 */
export const useReadAaveUiPoolDataProviderBytes32ToString =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'bytes32ToString',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"getReservesData"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x145dE30c929a065582da84Cf96F88460dB9745A7)
 */
export const useReadAaveUiPoolDataProviderGetReservesData =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'getReservesData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"getReservesList"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x145dE30c929a065582da84Cf96F88460dB9745A7)
 */
export const useReadAaveUiPoolDataProviderGetReservesList =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'getReservesList',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"getUserReservesData"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x145dE30c929a065582da84Cf96F88460dB9745A7)
 */
export const useReadAaveUiPoolDataProviderGetUserReservesData =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'getUserReservesData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"marketReferenceCurrencyPriceInUsdProxyAggregator"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x145dE30c929a065582da84Cf96F88460dB9745A7)
 */
export const useReadAaveUiPoolDataProviderMarketReferenceCurrencyPriceInUsdProxyAggregator =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'marketReferenceCurrencyPriceInUsdProxyAggregator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"networkBaseTokenPriceInUsdProxyAggregator"`
 *
 * [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x145dE30c929a065582da84Cf96F88460dB9745A7)
 */
export const useReadAaveUiPoolDataProviderNetworkBaseTokenPriceInUsdProxyAggregator =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'networkBaseTokenPriceInUsdProxyAggregator',
  })
