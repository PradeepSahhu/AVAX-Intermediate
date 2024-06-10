const hre = require("hardhat");

async function main() {
  const contractFactory = await hre.ethers.getContractFactory("EventHandling");

  const EventContract = await contractFactory.deploy();

  await EventContract.deployed();
  console.log(await EventContract.address);

  const transactionResponse = await EventContract.SettingFav(3);
  const transactionReceipt = await transactionResponse.wait();
  EventContract.on("SettingFavNumber", (oldNumber, favNumber, sender) => {
    console.log(
      `The account is : ${sender} changing number from ${oldNumber} to ${favNumber}`
    );
  });
  EventContract.on("GetPayment", (sender, amount) => {
    console.log(`The account  : ${sender} sends ${amount}`);
  });

  console.log(transactionReceipt.events[0].args.oldNumber.toString());
  console.log(transactionReceipt.events[0].args.favNumber.toString());
  console.log(transactionReceipt.events[0].args.sender.toString());
  console.log(transactionReceipt.events[0]);

  const transactionRespons = await EventContract.SettingFav(5);
  const transactionReceip = await transactionRespons.wait();
}

main().catch((error) => {
  console.log(`can't execute ${error}`);
  process.exit(1);
});

