// SPDX-License-Identifier:MIT
pragma solidity ^0.8.10;

contract EventHandling {
    uint256 private favNumber;
    event SendingTransaction(
        address indexed sender,
        address indexed receiver,
        uint value
    );

    event SettingFavNumber(
        uint indexed oldNumber,
        uint indexed favNumber,
        address sender
    );

    event GetPayment(address indexed sender, uint indexed amount);

    function SettingFav(uint _newFavNumber) public {
        emit SettingFavNumber(favNumber, _newFavNumber, msg.sender);
        favNumber = _newFavNumber;
    }

    function transfer(address recipient, uint amount) public {
        (bool callMsg, ) = payable(recipient).call{value: amount}("");
        require(callMsg, "Transaction is not successfull");
        emit SendingTransaction(msg.sender, recipient, amount);
    }

    receive() external payable {
        emit GetPayment(msg.sender, msg.value);
    }
}
