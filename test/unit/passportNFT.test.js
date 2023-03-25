const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { randomString } = require("./utils");
const ENUM_TYPE = Array(0, 1, 2, 3, 4);
describe("passportNFT Unit Tests", () => {
  let passportNFT, deployer, initTokenId;
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    await deployments.fixture(["passportNFT"]);
    passportNFT = await ethers.getContract("passportNFT");
    initTokenId = await passportNFT.getCurrentTokenId();
  });
  describe("constructor", () => {
    it("sets constructor data", async () => {
      const admin = await passportNFT.getAdmin();
      assert.equal(admin.toString(), deployer.address);
    });
    it("tokenId is start is one", async () => {
      assert.equal(initTokenId.toNumber(), 1);
    });
  });
  describe("admin mint passportNFT", () => {
    let imageUri, selectType, adminMintAfterTokenId, user;
    beforeEach(async () => {
      selectType = ENUM_TYPE[Math.floor(Math.random() * ENUM_TYPE.length)];
      imageUri = randomString(5);
      let trxResp = await passportNFT.adminMint(imageUri, selectType);
      let { events } = await trxResp.wait();
      user = events[1].args.user;
      adminMintAfterTokenId = events[1].args.tokenId;
    });
    it("admin has a NFT", async () => {
      expect(await passportNFT.ownerOf(adminMintAfterTokenId)).to.equal(
        deployer.address
      );
    });
    it("NFT has meta data", async () => {
      let metaData = await passportNFT.getTokenMetaData(adminMintAfterTokenId);
      assert.equal(metaData.select, selectType);
      assert.equal(metaData.imageUri, imageUri);
    });
    it("tokenId is increment", async () => {
      let trx = await passportNFT.adminMint(imageUri, selectType);
      let { events } = await trx.wait();
      assert(events[1].args.tokenId.toNumber() > initTokenId.toNumber());
    });
  });
});
