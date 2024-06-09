// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

error UnauthorizedAccess(address _address); // Customer Error message for gas optimization.
error UnExecutable();

contract ModifierContract{

    address private immutable owner;


    constructor(){
        owner = msg.sender;
    }


    modifier onlyAdmin{
        _onlyAdmin();
        _;
    }


    function _onlyAdmin() internal view{
        if(msg.sender != owner){ // if statement instead of require for better gas optimization
            revert UnauthorizedAccess(msg.sender);
        }
    }

    function _checkForTrue(bool condition) internal pure{
        if(condition!=true){
            revert UnExecutable();
        }
    }

    function _transactions(address _addresses, uint _amount) internal {
        (bool callmsg, ) = payable(_addresses).call{value: (_amount==0? address(this).balance: _amount)}("");
        _checkForTrue(callmsg);
    }


    function withdraw(uint _amount) external onlyAdmin{
        _transactions(owner, _amount);
    }

    function TransferPayment(address _recipient, uint _value) external onlyAdmin{
        _transactions(_recipient, _value);
    }
}