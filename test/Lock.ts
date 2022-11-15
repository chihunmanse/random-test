/** @format */

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { ethers, expect, network } from "hardhat";

describe("Uniswap", () => {
  let account1: SignerWithAddress,
    account2: SignerWithAddress,
    account3: SignerWithAddress;

  let commitReveal: Contract;

  before(async () => {
    [account1, account2, account3] = await ethers.getSigners();
    console.log("Deploying contracts with the account: " + account2.address);

    const CommitReveal = await ethers.getContractFactory("CommitReveal");
    commitReveal = await CommitReveal.deploy();
    await commitReveal.deployed();
  });

  describe("Random", () => {
    it("Random", async () => {
      const setMaxTx = await commitReveal.setMax(1000);
      await setMaxTx.wait();

      console.log(await commitReveal.max());

      const random = await commitReveal.getNumber("hi");
      console.log(random);

      const random2 = await commitReveal.getNumber("hi2");
      console.log(random2);

      const random3 = await commitReveal.getNumber("hi");
      console.log(random3);
    });
  });
});
