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
    mapping(address => string) private _minters;

    mapping(uint256 => address) public creators;

    

    constructor() ERC721("DigiCert", "SIH") {}

    function addMinter(address _addr, string memory _detailsURI) public onlyOwner {
        require(!compareStrings(_detailsURI, ""), "Require Details URI");
        _minters[_addr] = _detailsURI;
        emit MinterAdded(_addr, _detailsURI);
    }

    function safeMint(address to, string memory uri) public onlyMinter {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        creators[tokenId] = msg.sender;
    }

    function burn(uint256 _tokenID) public{
        address addr = ownerOf(_tokenID);
        require(addr == msg.sender || msg.sender == owner() , "Unauthorized!");
        _burn(_tokenID);
    }

    function getMinterDetails(address _addr) public view returns (string memory){
        return _minters[_addr];
    }

    function updateDetails(string memory _detailsURI) public onlyMinter{
        _minters[msg.sender] = _detailsURI;
        emit DetailsURIUpdated(msg.sender, _detailsURI);
    }

    function getNFTs(address addr) public view returns (string[] memory) {
        string[] memory result = new string[](balanceOf(addr));
        uint x = 0;
        uint256 tokenId = _tokenIdCounter.current();
        for(uint i = 0; i < tokenId; i++){
            if (addr == ownerOf(i)){
                result[x] = tokenURI(i);
                x = x + 1;
            }
        }
        return result;
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

    modifier onlyMinter() {
        require(!compareStrings(_minters[msg.sender], ""), "Not a Minter");
        _;
    }

    // * Events

    event MinterAdded(address indexed minterAddress, string indexed detailsURI);
    event DetailsURIUpdated(address indexed minterAddress, string indexed detailsURI);



    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return interfaceId == bytes4(0x49064906) || super.supportsInterface(interfaceId);
    }
}