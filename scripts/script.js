const Donations = artifacts.require("Donations");
const Token = artifacts.require("Token");

module.exports = async () => {
  const [account] = await web3.eth.getAccounts();
  const donations = await Donations.deployed();
  const token = await Token.deployed();

  const mybalance = await token.balanceOf(account);
  console.log(`my balance: ${mybalance}`);

  const value = web3.utils.toWei("0.000001");
  await token.approve(donations.address, value);
  const sendDonation = await donations.donate(value);
};
