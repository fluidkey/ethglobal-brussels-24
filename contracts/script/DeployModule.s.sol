// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import { IERC7484 } from "modulekit/Interfaces.sol";

// Import modules here
import { ExecutorTemplate } from "src/ExecutorTemplate.sol";
import { ValidatorTemplate } from "src/ValidatorTemplate.sol";

/// @title DeployExecutorModuleScript
contract DeployExecutorModuleScript is Script {
    function run() public {
        // Setup module bytecode, deploy params, and data
        bytes memory bytecode = type(ExecutorTemplate).creationCode;
        bytes memory deployParams = "";
        bytes memory data = "";
        IERC7484 registry = IERC7484(0x1D8c40F958Fb6998067e9B8B26850d2ae30b7c70); // mock registry

        // Get private key for deployment
        vm.startBroadcast(vm.envUint("PK"));

        new ExecutorTemplate();

        // Stop broadcast and log module address
        vm.stopBroadcast();
    }
}

/// @title DeployValidatorModuleScript
contract DeployValidatorModuleScript is Script {
    function run() public {
        // Setup module bytecode, deploy params, and data
        bytes memory bytecode = type(ValidatorTemplate).creationCode;
        bytes memory deployParams = "";
        bytes memory data = "";
        IERC7484 registry = IERC7484(0x1D8c40F958Fb6998067e9B8B26850d2ae30b7c70); // mock registry

        // Get private key for deployment
        vm.startBroadcast(vm.envUint("PK"));

        new ValidatorTemplate();

        // Deploy module
//        address module = deployModule({
//            code: bytecode,
//            deployParams: deployParams,
//            salt: bytes32(0),
//            data: data
//        });

        // Stop broadcast and log module address
        vm.stopBroadcast();
//        console.log("Deploying module at: %s", module);
    }
}
