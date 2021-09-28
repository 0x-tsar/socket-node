// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Donations {
    address public owner = msg.sender;
    IERC20 token;

    event newDonation(address, uint256, uint256);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function donate(uint256 _donationAmount) external {
        //first approve this contract on script
        token.transferFrom(msg.sender, address(this), _donationAmount);
        emit newDonation(msg.sender, _donationAmount, block.timestamp);
    }
}
