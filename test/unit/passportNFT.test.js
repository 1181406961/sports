const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");

describe("passportNFT Unit Tests", () => {
  let passportNFT, deployer;
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    await deployments.fixture(["passportNFT"]);
    passportNFT = await ethers.getContract("passportNFT");
  });
  describe("constructor", () => {
    it("sets constructor data", async () => {
      const admin = await passportNFT.getAdmin();
      assert.equal(admin.toString(),deployer.address)
    });
  });
});
