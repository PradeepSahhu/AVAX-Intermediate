// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;


error Unsuccessfull(bytes32);
error UnAuthorizedAccess(address);

contract FuncAndErrorChallenge2{

    modifier onlyOwner{
        _onlyAdmin();
        _;
    }


    address private immutable owner;

    constructor(){
        owner = msg.sender;
    }

    function _onlyAdmin() internal view{
        if(msg.sender != owner){
            revert UnAuthorizedAccess(msg.sender);
        }
    }


    function _trueCheck(bool _condition) internal pure{
        if(!_condition){
            revert Unsuccessfull("Can't Complete Evaluation");
        }
    }

    function _transaction(address _address, uint _amount) internal {
        (bool callMsg, ) = payable(_address).call{value:_amount}("");
        _trueCheck(callMsg);
    }

    function transfer(address _recipient, uint _amount) external onlyOwner{
        _transaction(_recipient, _amount);
    }
    
}