// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address public owner = msg.sender;
    IERC20 token;

    constructor() ERC20("Token 1", "TK1") {
        _mint(msg.sender, 10 * 10**18);
    }
}
