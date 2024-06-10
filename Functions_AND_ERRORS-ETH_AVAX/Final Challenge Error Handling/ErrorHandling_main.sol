// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// In solidity there are three ways to handle errors.
// 1. require() - message is optional
// 2. revert ( an error ) - message is optional
// 3. assert. (should be used for internal errors) - message is optional

error InvalidPassword(string message);
error UnsuccessfulTransaction(string message);

contract ErrorHandling {
    event ReceiveEther(address indexed sender, uint256 indexed amount);

    bytes32 public immutable password;

    constructor(string memory _password) {
        password = keccak256(abi.encode(_password));
    }

    // Using Require.

    function RequireTransferWei(
        string memory _password,
        address _transferTo,
        uint256 _amount
    ) external payable {
        bytes32 userPassword = keccak256(abi.encode(_password));
        require(password == userPassword);

        // upon validating password transfering the wei.
        (bool callMsg, ) = payable(_transferTo).call{value: _amount}("");
        require(callMsg);
    }

    // Using Revert

    function RevertTransferWei(
        string memory _password,
        address _transferTo,
        uint256 _amount
    ) external payable {
        bytes32 userPassword = keccak256(abi.encode(_password));
        if (password != userPassword) {
            revert InvalidPassword("Password doesn't match, try again!!!");
        }
        (bool callMsg, ) = payable(_transferTo).call{value: _amount}("");
        if (callMsg != true) {
            revert UnsuccessfulTransaction("Transaction can't be processed");
        }
    }

    // Using Assert
    function AssertTransferWei(
        string memory _password,
        address _transferTo,
        uint256 _amount
    ) external payable {
        bytes32 userPassword = keccak256(abi.encode(_password));
        assert(password == userPassword);

        (bool callMsg, ) = payable(_transferTo).call{value: _amount}("");
        assert(callMsg == true);
    }

    // Emiting/Triggering event upon receiving ether(wei)
    receive() external payable {
        emit ReceiveEther(msg.sender, msg.value);
    }
}
