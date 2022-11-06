import * as React from 'react';
//import comboSdk from '@1combo/1combo-ethereum-sdk';
import { GetAddress } from './Web3';
import { useState } from 'react';
import { useEffect } from 'react';


import styles from '../styles/ItemCard.css';

const ItemCard = ({img})=>{
    const [address, setAddress] = useState("");

    // const buyHandler = () => {
    //     console.log("buyHandler triggered")
    //     let mintParamsBuilder = new comboSdk.ParamBuilders.MintParamsBuilder();
    
    //     // Only 'buy' is required
    //     const fashionContract = '0xa71A5270459FF9e18D130a9497b6211304375F3D';
    //     const nftId = '1';
    //     const count = 1;
    //     const to = address;
    //     mintParamsBuilder.buy(fashionContract, nftId, count, 0);
        
    //     let { ingredients, itemsToBuy } = mintParamsBuilder.build();
    //     comboSdk.ComboProxy.mint(
    //         to,
    //         true,   // true - pay in ether, false - pay in WETH
    //         itemsToBuy
    //     );
    // }

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



const PriceCheckoutButton = () => {
    return(
        <div class="container bg-purple-100 rounded-full py-1 flex items-center justify-between">
            <div class="inline-block px-9"> 
            <span class="text-xl">0.01</span> ETH </div>
            <button class="bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-full buy">Buy</button>
        </div>
    );
}

export default ItemCard;