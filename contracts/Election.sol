// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyNFT {
    struct TokenData {
        string quote;
        string ownerName;
        string date;
        uint256 tokenId;

    }
    
    mapping (bytes32 => bool) private hashes;
    mapping (uint256 => TokenData) private tokens;
    mapping (bytes32 => uint256) private tokenIds;
    uint256 private tokenCounter = 0;
    
    function mint(string memory _quote, string memory _ownerName,string memory _date) public {
    bytes32 hash = keccak256(abi.encodePacked(_quote, _ownerName));
    require(!hashes[hash], "Token data already exists");
    hashes[hash] = true;
    tokens[tokenCounter] = TokenData(_quote, _ownerName, _date, tokenCounter);
    tokenIds[hash] = tokenCounter;
    tokenCounter++;
}
    // function mint(string memory _quote, string memory _ownerName, string memory _date) public {
    //     bytes32 hash = keccak256(abi.encodePacked(_quote, _ownerName, _date));
    //     require(!hashes[hash], "Token data already exists");
    //     hashes[hash] = true;
    //     uint256 tokenId = uint256(hash);
    //     tokenIds[hash] = tokenId;
    //     tokens[tokenCounter] = TokenData(_quote, _ownerName, _date, tokenId);
    //     tokenCounter++;
    // }
    
    
    function getTokenData(uint256 tokenId) public view returns (TokenData memory) {
    
        return tokens[tokenId];
    }
    
    function getAllTokenIds() public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](tokenCounter);
        for (uint256 i = 0; i < tokenCounter; i++) {
            result[i] = tokens[i].tokenId;
        }
        return result;
    }
    
    function tokenDataExists(string memory _quote, string memory _ownerName, string memory _date) public view returns (bool) {
        bytes32 hash = keccak256(abi.encodePacked(_quote, _ownerName, _date));
        return hashes[hash];
    }
}
