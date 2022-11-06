import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import '../styles/ItemCard.css';
// const pramrasBuilder = require('../combo/src/params-builders');
// const client =require('../combo/src/client');
import { MintAddOnBuilder } from '../combo/src/params-builders';
import { COLLECTION_PROXY_ADDRESS, ABI } from '../combo/src/client';

const ItemCard = ({img})=>{
    const [address, setAddress] = useState("");

    const buyHandler = async () => {
        console.log("buyHandler triggered")
        let mintAddOnBuilder = new MintAddOnBuilder();
    
        // Only 'buy' is required
        const fashionContract = '0xa71a5270459ff9e18d130a9497b6211304375f3d';
        const nftId = '1';
        const count = 1;
        const to = address;
        const setId = 10000000;
        const options = {value: ethers.utils.parseEther("0.001")};
        mintAddOnBuilder.add(fashionContract, nftId, count);
        
        let itemsToBuy = mintAddOnBuilder.build();
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner(address);
        const contract = new ethers.Contract(COLLECTION_PROXY_ADDRESS, ABI.ICollectionProxy, signer)
        
         const transactionScript = await contract.mint(
            to,
            true,   // true - pay in ether, false - pay in WETH
            itemsToBuy,
            options
        );
    }

    const getAddress = async ()=>{
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            setAddress(accounts[0]);
            return accounts[0];
        } else {
            console.log("No authorized account found");
            return undefined;
        }
    }

    useEffect(() =>{
        getAddress();
    },[])

    const PriceCheckoutButton = () => {
        return(
            <div class="container bg-purple-100 rounded-full py-1 flex items-center justify-between">
                <div class="inline-block px-9"> 
                <span class="text-xl">0.01</span> ETH </div>
                <button 
                class="bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-full buy"
                    onClick = {() => {buyHandler()}}>
                    Buy
                    </button>
            </div>
        );
    }

    return(
        <div class="container mx-auto bg-white rounded-xl shadow border p-4 m-2">
            <div class="text-grey-200 mb-8 bg-gray-300 rounded-full code">
                #231
            </div>
            <img src={img} alt="jersey" class="bg-transparent"></img>
            <div class="my-4 text-center desc">lv2</div>
            <PriceCheckoutButton></PriceCheckoutButton>
        </div>
    );
}


export default ItemCard;