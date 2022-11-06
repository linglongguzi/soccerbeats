
alchemySdk= require('alchemy-sdk');
require('dotenv').config()

async function main(){

    const settings = {
        apiKey: process.env.ETH_GOERLI,
        network: alchemySdk.Network.ETH_GOERLI,
    };

    const alchemy = new Alchemy(settings);  
    // Get all the NFTs owned by an address
    const nfts = alchemy.nft.getNftsForOwner("0x83b4300c2fA096Cd91419132a69166F4875ea7fa");
    console.log("im running")
    console.log(nfts);
}