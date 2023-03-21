// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract passportNFT {
    address public admin;

    constructor(address _admin) {
        admin = _admin;
    }
    function getAdmin() public view returns (address) {
        return admin;
        
    }
}
