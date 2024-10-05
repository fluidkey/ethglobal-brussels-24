// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import { IERC7484 } from "modulekit/Interfaces.sol";
import { RegistryDeployer } from "modulekit/deployment/RegistryDeployer.sol";

// Import modules here
import {BorrowOfframpExecutorModule} from "src/BorrowOfframpExecutorModule.sol";

/// @title DeployExecutorModuleScript
contract DeployExecutorModuleScript is Script {
    function run() public {
        // Setup module bytecode, deploy params, and data
        bytes memory bytecode = type(BorrowOfframpExecutorModule).creationCode;
        bytes memory deployParams = "";
        bytes memory data = "";
        IERC7484 registry = IERC7484(0x1D8c40F958Fb6998067e9B8B26850d2ae30b7c70); // mock registry

        // Get private key for deployment
        vm.startBroadcast(vm.envUint("PK"));

        new BorrowOfframpExecutorModule();

        // Stop broadcast and log module address
        vm.stopBroadcast();
    }
}

