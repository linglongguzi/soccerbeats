/ SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SoccerBeats is ERC721URIStorage {

    constructor() ERC721 ("SoccerBeats, "SBT"){
        console.log("this is SoccerBeats contract.");
    }

}