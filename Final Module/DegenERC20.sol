// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DegenERC20 is ERC20{


    modifier onlyOwner{
        require(owner == msg.sender);
        _;
    }

    address private immutable owner;
    uint private immutable tokenValueInWei;



    constructor(uint _amount, uint _tokenToMint) ERC20("Degen","DGN"){
        owner = msg.sender;
        tokenValueInWei = _amount;
        _mint(msg.sender, _tokenToMint); // very small amount because it takes high gas fees 
    }   


    ///@notice to reward a certain user by _amount amount only callable by the owner.

    function mintTokenReward(address _address,uint _amount) external onlyOwner{
        _mint(_address,_amount);
    }


    ///@notice for checking the balance of token of caller account.


    function checkingBalance() external view returns(uint){
        return balanceOf(msg.sender);
    }


    ///@notice to transfer token to other account(friend)

    function tranferTokens(address _recepient, uint _amount) external{
        require(balanceOf(msg.sender) >= _amount);
       transfer(_recepient, _amount);
       
    }


    ///@notice redeeming the tokens for some items of the game (in this game for wei)

    function redeemTokens(uint _tokenAmount) external payable{
        require(balanceOf(msg.sender) >= _tokenAmount);
        _transfer(msg.sender, owner, _tokenAmount);
       uint valueWei = _tokenAmount * tokenValueInWei;
        (bool callMsg,) = payable(msg.sender).call{value: valueWei}("");
        require(callMsg);
    }

    ///@notice burn the _tokenAmount amount of token

    function burnToken(uint _tokenAmount) external {
        require( balanceOf(msg.sender)>=_tokenAmount);
        _burn(msg.sender, _tokenAmount);
    }

    ///@notice to receive wei/ethers from external sources like other account

    receive() external payable { }
}