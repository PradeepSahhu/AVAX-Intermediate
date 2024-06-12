"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import socialABI from "../artifacts/contracts/SocialMedia.sol/SocialMedia.json";
import { ethers } from "ethers";
import SocialContractConnection from "@/Connections/mainConnection";

export default function Home() {
  const [ethWindow, setEthWindow] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [addFriend, setAddFriend] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [listofFriends, setListofFriends] = useState([]);
  const [newAddress, setNewAddress] = useState();
  const [countFriends, setCountFriends] = useState();
  const [ownerAddress, setOwnerAddress] = useState();
  const [removedFriends, setRemovedFriends] = useState();
  const [removeIndex, setRemoveIndex] = useState();

  const contractAddress = "0xdbE34587178C409B253c500F5379694fA896f681";

  const initialize = async () => {
    if (window.ethereum) {
      console.log("Metamask is installed");
      setEthWindow(window.ethereum);
    }

    if (ethWindow) {
      const accountsArray = await ethWindow.request({ method: "eth_accounts" });
      setAccounts(accountsArray);
    }
    ConnectToMetamask();
  };

  const ConnectToMetamask = async () => {
    if (ethWindow) {
      const accounts = ethWindow.request({ method: "eth_requestAccounts" });
      setAccounts(accounts);
    }
    // setAddFriend(true);
    ConnectToContract();
  };

  const ConnectToContract = () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const socialContract = new ethers.Contract(
        contractAddress,
        socialABI.abi,
        signer
      );
      console.log(socialContract);
      setContractInstance(socialContract);
      console.log(contractInstance);
    } catch (error) {
      console.log("can't connect with the contract");
    }
  };

  const handleFriendEvent = () => {
    friendsCount();
    getFriends();
    setShowFriends(true);
  };

  const friendsCount = async () => {
    try {
      const noOfFriends = await contractInstance.showSocialScore();
      const noofRemoveFriends = await contractInstance.noOfRemovedFriend();
      setCountFriends(parseInt(noOfFriends));
      setRemovedFriends(parseInt(noofRemoveFriends));
    } catch (error) {
      console.log(error);
    }
  };

  const getFriends = async () => {
    try {
      if (!contractInstance) {
        console.log("error in contractInstance");
      }
      const friends = await contractInstance.showFriendList();
      setListofFriends(friends);
    } catch (error) {
      console.log();
    }
  };

  const getOwnerAddress = async () => {
    try {
      if (!contractInstance) {
        console.log("Not working getOwnerAddress");
      }
      const contractOwner = await contractInstance.getOwner();
      setOwnerAddress(contractOwner);
    } catch (error) {
      console.log("Their is somethig wrong in getOwnerAddress");
      console.log(error);
    }
  };
  const addFriends = async () => {
    try {
      if (!contractInstance) {
        console.log("error in contractInstance");
      }
      const newFriend = await contractInstance.addFriends(newAddress);
    } catch (error) {
      console.log("error in contract instance in add friends");
      console.log(error);
    }
  };

  const removeFriend = async (removeIndex) => {
    try {
      if (!contractInstance) {
        console.log("error in contractInstance");
      }
      console.log(removeIndex);
      // const newFriend = await contractInstance.removeFriendsFromList(
      //   removeIndex
      // );
    } catch (error) {
      console.log("error in contract instance in remove friends");
      console.log(error);
    }
  };

  if (ownerAddress == undefined) {
    getOwnerAddress();
  }

  useEffect(() => {
    ConnectToContract();
    initialize();
  }, []);

  return (
    <div className=" bg-black h-full">
      <div className="grid justify-center items-center m-10 text-2xl ">
        <p className="bg-gradient-to-br from-red-600 via-amber-500 to-green-600 bg-clip-text text-transparent">
          Welcome to Social Media Application
        </p>
      </div>

      <div className="text-white">
        <p className="text-2xl bg-gradient-to-br from-blue-700 to-purple-600  bg-clip-text text-transparent m-4">
          Account is {ownerAddress}
        </p>
      </div>
      {}
      <div className="grid items-center justify-center">
        <button
          onClick={ConnectToMetamask}
          className="px-10 py-4 bg-gradient-to-r from-red-600 via-amber-500 to-green-600 text-lg rounded-xl"
        >
          connect to MetaMask
        </button>
      </div>

      {addFriend && (
        <div className=" bg-black text-white grid grid-cols-2 m-10">
          <form className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
            <label className="grid col-start-1 col-end-1 ">
              Enter the Address
            </label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
              required
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </form>

          <div className="flex justify-center col-span-2 items-center py-5">
            <button
              onClick={addFriends}
              className="bg-blue-900 p-5 rounded-xl hover:bg-rose-900"
            >
              Add as Friend
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center m-10">
        {!addFriend && (
          <button
            onClick={() => setAddFriend(true)}
            className="px-10 py-4 bg-gradient-to-r from-red-600 to-blue-700 text-lg rounded-xl mx-10"
          >
            Add Friend
          </button>
        )}
        <button
          onClick={() => handleFriendEvent()}
          className="px-10 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-lg rounded-xl"
        >
          Show List of Friends
        </button>
      </div>
      {showFriends && (
        <div>
          <div className="text-white bg-black grid col-span-2 p-10">
            <p className="grid col-start-1 col-end-1 justify-center align-middle">
              Owner Address
            </p>
            <p className="grid col-start-2 col-end-2 justify-center align-middle">
              Smart Contract Wallet Address
            </p>
          </div>
          <div className="grid grid-col-2">
            <div className="grid col-start-1 col-end-1">
              <p className="mx-10">Total Friends: {countFriends}</p>
            </div>
            <div className="grid col-start-2 col-end-2 justify-end">
              <p className="mx-10">Total Removed: {removedFriends}</p>
            </div>
          </div>
        </div>
      )}

      {listofFriends.map((eachFriend, index) => (
        <table
          key={index}
          className=" bg-slate-900 text-white w-full text-center rounded-xl my-5"
        >
          <tbody>
            <tr>
              <td className=" w-1/3 ">{eachFriend}</td>

              <td className="item-center w-1/3">
                <button
                  className="bg-gradient-to-r from-red-600 to-blue-700 px-10 py-5 rounded-md"
                  onClick={() => {
                    removeFriend(index);
                  }}
                >
                  Remove from Friend
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}
