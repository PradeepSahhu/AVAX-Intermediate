import socialABI from "../artifacts/contracts/SocialMedia.sol/SocialMedia.json";

const contractAddress = "0xdbE34587178C409B253c500F5379694fA896f681";

export default function SocialContractConnection() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const socialContract = new ethers.Contract(
    contractAddress,
    socialABI.abi,
    signer
  );
  console.log(socialContract);
  return socialContract;
}
