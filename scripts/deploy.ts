// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import hre from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const [owner, randomPerson] = await ethers.getSigners();

  const Domains = await ethers.getContractFactory("Domains");
  const domains = await Domains.deploy("tek");

  await domains.deployed();

  console.log("Domains deployed to:", domains.address);

  console.log("Contract deployed to:", domains.address);
  console.log("Contract deployed by:", owner.address);

  const registerTx = await domains.register("Test", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await registerTx.wait();

  const domainOwner = await domains.getAddress("Test");
  console.log("Domain owner:", domainOwner);

  const balance = await hre.ethers.provider.getBalance(domains.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
