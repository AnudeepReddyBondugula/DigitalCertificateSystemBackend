// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DigiCert is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    // For generating unique token ID
    Counters.Counter private _tokenIdCounter;

    // All Organization addresses and their details are stored here
    mapping(address => string) public minters;
    
    mapping(address => uint[]) public creators;

    mapping(address => uint[]) public users;
    
    constructor() ERC721("DigiCert", "AU") {}

    function addMinter(address _addr, string calldata _detailsURI) external onlyOwner {
        require(!compareStrings(_detailsURI, ""), "Require Details URI");
        require(compareStrings(minters[_addr], ""), "Minter added aldready");
        minters[_addr] = _detailsURI;
        emit MinterAdded(_addr, _detailsURI);
    }

    function safeMint(address _to, string calldata _uri) external isMinter(msg.sender)  {

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _uri);

        creators[msg.sender].push(tokenId);
        users[_to].push(tokenId);

        emit NFTMinted(msg.sender, _to, _uri);
    }

    function burn(uint256 _tokenID) external isMinter(msg.sender) {
        require(isCreatorOf(msg.sender, _tokenID), "Unauthorized! Error: Not the Creator/Issuer of NFT");
        _burn(_tokenID); // Need to check if burn twice or more
        
    }

    function updateDetails(address _addr, string calldata _detailsURI) external onlyOwner {
        minters[_addr] = _detailsURI;
        emit DetailsURIUpdated(_addr, _detailsURI);
    }


    function getUserNFTs(address _addr) external view returns (string[] memory) {
        string[] memory result = new string[](balanceOf(_addr)); // * balanceOf(addr) -> Represents the # of tokens owned by that address
        uint[] memory arr = users[_addr];
        for(uint i = 0; i < arr.length; i++){
            result[i] = tokenURI(arr[i]);
        }
        return result;
    }

    function getCreatorNFTs(address _addr) external view returns (string[] memory) {
        uint[] memory tokenIds_arr = creators[_addr];
        string[] memory result = new string[](tokenIds_arr.length);
        for(uint i = 0; i < tokenIds_arr.length; i++){
            result[i] = tokenURI(i);
        }
        return result;
    }

    function isCreatorOf(address _addr, uint _tokenID) public view returns (bool) {
        uint[] memory tokenIDs = creators[_addr];
        for(uint i = 0; i < tokenIDs.length; i++){
            if (tokenIDs[i] == _tokenID) return true;
        }
        return false;
    }



    //* The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }


    //* Modifiers

    modifier isMinter(address _addr) {
        require(!compareStrings(minters[_addr], ""), "Unauthorized!, Not a Minter");
        _;
    }

    // * Events

    event MinterAdded(address indexed minterAddress, string indexed detailsURI);
    event NFTMinted(address indexed from, address indexed to, string indexed metadata);
    event DetailsURIUpdated(address indexed minterAddress, string indexed detailsURI);



    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return interfaceId == bytes4(0x49064906) || super.supportsInterface(interfaceId);
    }
}