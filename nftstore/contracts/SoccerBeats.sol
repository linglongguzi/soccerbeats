// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoccerBeats is ERC721Enumerable, Ownable {
   using Strings for uint256;

    mapping(string => uint8) existingURIs;
    mapping(uint256 => address) public holderOf;

    uint256 public supply = 0;
    uint256 public totalTx = 0;
    uint256 public cost = 0.001 ether;
    unit256 public totalEarn = 0;

    event Sale(
        uint256 id,
        address indexed owner,
        uint256 cost,
        string metadataURI,
        uint256 timestamp
    );

    struct TransactionStruct {
        uint256 id;
        address owner;
        uint256 cost;
        string title;
        string description;
        string metadataURI;
        uint256 timestamp;
    }

    TransactionStruct[] transactions;
    TransactionStruct[] minted;

    constructor() ERC721("SoccerBeats", "SBT") {
        console.log("This is SoccerBeats NFT");
    }

    function payToBuy(address nftCollectionContract, uint256 nftId) external payable {
        require(msg.value >= minted[id - 1].cost, "Ether too low for purchase!");
        require(msg.sender != minted[id - 1].owner, "Operation Not Allowed!");

        payTo(minted[id - 1].owner, (msg.value - royality));

        totalTx++;

        transactions.push(
            TransactionStruct(
                totalTx,
                msg.sender,
                msg.value,
                minted[id - 1].title,
                minted[id - 1].description,
                minted[id - 1].metadataURI,
                block.timestamp
            )
        );

        emit Sale(
            totalTx,
            msg.sender,
            msg.value,
            minted[id - 1].metadataURI,
            block.timestamp
        );

        minted[id - 1].owner = msg.sender;
    }

    function changePrice(uint256 id, uint256 newPrice) external returns (bool) {
        require(newPrice > 0 ether, "Ether too low!");
        require(msg.sender == minted[id - 1].owner, "Operation Not Allowed!");

        minted[id - 1].cost = newPrice;
        return true;
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function getAllNFTs() external view returns (TransactionStruct[] memory) {
        return minted;
    }

    function getNFT(uint256 id) external view returns (TransactionStruct memory) {
        return minted[id - 1];
    }

    function getAllTransactions() external view returns (TransactionStruct[] memory) {
        return transactions;
    }
}