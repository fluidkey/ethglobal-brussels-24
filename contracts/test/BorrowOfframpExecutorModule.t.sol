// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import { Test } from "forge-std/Test.sol";
import {
    RhinestoneModuleKit,
    ModuleKitHelpers,
    ModuleKitUserOp,
    AccountInstance
} from "modulekit/ModuleKit.sol";
import { MODULE_TYPE_EXECUTOR } from "modulekit/external/ERC7579.sol";
import { ExecutionLib } from "erc7579/lib/ExecutionLib.sol";
import {BorrowOfframpExecutorModule} from "src/BorrowOfframpExecutorModule.sol";
import "forge-std/console.sol";

contract BorrowOfframpExecutorModuleTest is RhinestoneModuleKit, Test {
    using ModuleKitHelpers for *;
    using ModuleKitUserOp for *;

    // account and modules
    AccountInstance internal instance;
    BorrowOfframpExecutorModule internal executor;

    function setUp() public {
        init();

        // Create the executor
        executor = new BorrowOfframpExecutorModule();
        vm.label(address(executor), "BorrowOfframpExecutorModule");

        // Create the account and install the executor
        instance = makeAccountInstance("BorrowOfframpExecutorModule");
        vm.deal(address(instance.account), 10 ether);
        instance.installModule({
            moduleTypeId: MODULE_TYPE_EXECUTOR,
            module: address(executor),
            data: abi.encode(address(0x56aEd5EB340D661993d1aa4907f5E7A293eA1082))
        });
    }

    function testExec() public {
        // Create a target address and send some ether to it
        address target = makeAddr("target");
        uint256 value = 1 ether;

        executor.borrow(address(instance.account));

//        // Get the current balance of the target
//        uint256 prevBalance = target.balance;
//
//        // Encode the execution data sent to the account
//        bytes memory callData = ExecutionLib.encodeSingle(target, value, "");
//
//        // Execute the call
//        // EntryPoint -> Account -> Executor -> Account -> Target
//        instance.exec({
//            target: address(executor),
//            value: 0,
//            callData: abi.encodeWithSelector(BorrowOfframpExecutorModule.execute.selector, callData)
//        });
//
//        // Check if the balance of the target has increased
//        assertEq(target.balance, prevBalance + value);
    }
}
