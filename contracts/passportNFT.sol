// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract passportNFT is ERC721, Ownable {
    // event minted
    event passportNFTMinted(address indexed user, uint256 tokenId);
    using Counters for Counters.Counter;
    struct MetaData {
        Type select;
        string imageUri;
    }
    // tokenId map metaData
    mapping(uint256 => MetaData) tokenMetaData;
    enum Type {
        COMMON,
        UNCOMMON,
        RATE,
        EPIC,
        LEGENDARY
    }
    Counters.Counter private _tokenIds;

    constructor(
    ) ERC721("passportNFT", "soccerWinner") Ownable() {
        // start from one
        _tokenIds.increment();
    }

    function adminMint(
        string memory imageUri,
        Type select
    ) public onlyOwner returns (uint256 tokenId) {
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        tokenMetaData[newItemId] = MetaData(select, imageUri);
        _tokenIds.increment();
        tokenId = newItemId;
        emit passportNFTMinted(msg.sender, newItemId);
    }

    function getAdmin() public view returns (address) {
        return owner();
    }
}
