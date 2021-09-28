const Token = artifacts.require("Token");
const Donations = artifacts.require("Donations");

module.exports = async (deployer, network, account) => {
  deployer.then(async () => {
    const token = await deployer.deploy(Token);
    const donations = await deployer.deploy(Donations, token.address);
    console.log("all contracts deployed");
  });
};
