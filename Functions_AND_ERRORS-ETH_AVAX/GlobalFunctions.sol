// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


contract GlobalFunctions{
    // Global functions in Solidity there are four context,
    // address - balance, transfer(), send(), call(), staticcall(), delegatecall().
    // block - coinbase, difficulty, timestamp, gaslimit, number,
    // transaction - tx.gasprice, tx.origin
    // message. - msg.sender, msg.value, msg.gasleft.


    address public immutable owner;

    constructor(){
        owner = msg.sender;
    }



    function checkGasLeft() public view returns(uint){
        return gasleft();
    }

    function withdrawGasleft() public{
      (bool callMsg, )  = payable(owner).call{value: gasleft()}("");
      require(callMsg,"successfull");
    }
}