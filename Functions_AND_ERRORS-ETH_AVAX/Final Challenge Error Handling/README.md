# Error Handling and Custom Error

In solidity, there are three methods to handle the error.

1. require

Syntax

```Solidity
require(condition, <message> (optional));
```

2. revert

Syntax

```Solidity
revert(<message>) or revert CustomError();
```

3. assert

Syntax

```Solidity
assert(condition);
```

Here, i used a common functionality i.e. to send ether to any address and checking if the transaction is successful or not using above three
functions for any potential Error.

Before moving forward, i used a `password state variable (immutable)` and setting it upon contract deployment.

Here is the code for it.

```Solidity
 bytes32 public immutable password;

constructor(string memory _password){
 password = keccak256(abi.encode(_password));
}
```

Now before sending any transaction, sender needs to enter the password and that password should be verified and if it is not verified then using the require, assert, and revert
transaction will be discarded. (this step is crucial for user authentication)

upon using the call lower level function , i am again checking if the transaction is successfull or not using require, assert, and revert error handling methods.
( this step is crucial for transaction validation)

## Require

```Solidity
 // Using Require.

    function RequireTransferWei(string memory _password, address _transferTo, uint256 _amount) external payable {

        bytes32 userPassword = keccak256(abi.encode(_password));
        require(password == userPassword);

        // upon validating password transfering the wei.
        (bool callMsg, ) = payable(_transferTo).call{value:_amount}("");
        require(callMsg);
    }
```

## Revert

```Solidity
    // Using Revert

    function RevertTransferWei(string memory _password, address _transferTo, uint256 _amount) external payable {
         bytes32 userPassword = keccak256(abi.encode(_password));
        if(password != userPassword){
            revert InvalidPassword("Password doesn't match, try again!!!");

        }
        (bool callMsg, ) = payable(_transferTo).call{value:_amount}("");
        if(callMsg != true){
            revert UnsuccessfulTransaction("Transaction can't be processed");
        }
    }
```

## Assert

```Solidity
 // Using Asswert
    function AssertTransferWei(string memory _password, address _transferTo, uint256 _amount) external payable {
         bytes32 userPassword = keccak256(abi.encode(_password));
        assert(password == userPassword);

        (bool callMsg, ) = payable(_transferTo).call{value:_amount}("");
        assert(callMsg == true);

    }
```

## Vs-code

<img width="1020" alt="image" src="https://github.com/PradeepSahhu/AVAX-Intermediate/assets/94203408/1cecf60d-44fa-4a5d-8a3d-0354cbbe7efe">
