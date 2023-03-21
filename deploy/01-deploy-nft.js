const { network } = require("hardhat");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  args = [];
  const passportNFT = await deploy("passportNFT", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: 1,
  });
  log("passportNFT deployed!");
  log("--------------------------------------");
};
module.exports.tags = ["all", "passportNFT"];
