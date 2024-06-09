// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

error Unsuccessfull();


contract EventAndTriggers{


    event Message(address indexed recipient, string message);
    event transaction(address indexed recipent, uint amount);


    function send(address _sendingTo, uint amount)external payable{
        (bool callMsg, ) = payable(_sendingTo).call{value: amount}("");
        if(!callMsg){
            revert Unsuccessfull();
        }
        emit transaction(_sendingTo, amount);
    }

    function mes(address _recipient, string memory _message) external{
        (bool callMsg, ) = _recipient.call(bytes(_message));
          if(!callMsg){
            revert Unsuccessfull();
        }
        emit Message(_recipient, _message);

    }

}