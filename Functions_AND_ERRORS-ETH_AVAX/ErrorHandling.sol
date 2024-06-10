// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


// In solidity there are three ways to handle errors.
// 1. require() - message is optional
// 2. revert ( an error ) - message is optional
// 3. assert. (should be used for internal errors) - message is optional

contract ErrorHandling{


    bytes32 public immutable password;

    constructor(string memory _password){
        password = keccak256(abi.encode(_password));
    }

    function testRequire(string memory _password) public view returns(bool){

        bytes32 userPassword = keccak256(abi.encode(_password));
        require(password == userPassword);
        return true;
    }

    function testRevert(string memory _password) public view returns(bool){
         bytes32 userPassword = keccak256(abi.encode(_password));
        if(password != userPassword){
            revert("Invalid Password");
        
        }
        return true;
    }
    function testAssert(string memory _password) public view returns(bool){
         bytes32 userPassword = keccak256(abi.encode(_password));
        assert(password == userPassword);
        return true;
    }


}