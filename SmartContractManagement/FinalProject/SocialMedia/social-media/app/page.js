"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import socialABI from "../artifacts/contracts/SocialMedia.sol/SocialMedia.json";
import { ethers } from "ethers";

export default function Home() {
  const [ethWindow, setEthWindow] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [addFriend, setAddFriend] = useState(false);

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
  };

  const ConnectToMetamask = async () => {
    if (ethWindow) {
      const accounts = ethWindow.request({ method: "eth_requestAccounts" });
      setAccounts(accounts);
    }
    setAddFriend(true);
    ConnectToContract();
  };

  const ConnectToContract = () => {
    if (!ethWindow) {
      console.log("no metamask instaleed");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(ethWindow);
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

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className=" bg-black h-full">
      <div className="grid justify-center items-center m-10 text-2xl ">
        <p className="bg-gradient-to-br from-red-600 via-amber-500 to-green-600 bg-clip-text text-transparent">
          Welcome to Social Media Application
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

      <div className="grid items-center justify-center">
        <button className="px-10 py-4 bg-gradient-to-r from-red-600 via-amber-500 to-green-600 text-lg rounded-xl">
          Show List of Friends
        </button>
      </div>

      {addFriend && (
        <div className=" bg-black text-white grid grid-cols-2 m-10">
          <form className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
            <label className="grid col-start-1 col-end-1 ">
              Enter the Address to Add as Friend
            </label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
              required
            />
            <div className="flex justify-center items-center py-5">
              <button className="bg-blue-900 p-5 rounded-xl hover:bg-rose-900 ">
                Add as Friend
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
