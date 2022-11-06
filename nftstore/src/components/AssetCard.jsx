import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// const MintParamsBuilder = require('../combo/src/params-builders');
// const { ABI, COMBO_PROXY_ADDRESS} = require('../combo/src/client');
import { MintParamsBuilder } from '../combo/src/params-builders';
import { ABI, COMBO_PROXY_ADDRESS } from '../combo/src/client';

const AssetCard = ({img, isAvatar=false, level=2, onCombo})=>{
    const [address, setAddress] = useState("");

    const comboHandler = async () => {
        console.log("comboHandler triggered")
        let mintParamsBuilder = new MintParamsBuilder();
    
        // Only 'buy' is required
        const addOnFashionContract = '0xa71a5270459ff9e18d130a9497b6211304375f3d';
        const avatarContract = '0x6ad03857DA61a9cb62DF8696ab66F82Df5F98B27';
        const comboContract = '0x25430eef190fa85876e31fdfea823b69e378ebad';
        const count = 1;
        const to = address;
        const setId = 10000000;
        const options = {value: ethers.utils.parseEther("0.00001")};
        mintParamsBuilder.buy(addOnFashionContract, 1, count,setId);
        mintParamsBuilder.use(avatarContract, 9, count, 0);
        
        let { ingredients, itemsToBuy } = mintParamsBuilder.build();
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner(address);
        const contract = new ethers.Contract(COMBO_PROXY_ADDRESS, ABI.IComboProxy, signer)
        const metaHash = "0x20f62ef0f577ee0c80be168beb60e3485bb9722874e5bf8718c9ae7eb27464f7";
        // {
        //   "code": {
        //     "code": 0,
        //     "message": "OK"
        //   },
        //   "data": {
        //     "name": "",
        //     "image": "https://media.1combo.io/soccerbeat/combo.jpg",
        //     "external_url": "",
        //     "description": "",
        //     "background_color": "",
        //     "animation_url": "",
        //     "youtube_url": "",
        //     "attributes": [
        //       {
        //         "trait_type": "SoccerBeat Add-ons",
        //         "value": "Red Coat"
        //       }
        //     ]
        //   },
        //   "info": {
        //     "hash": "0x20f62ef0f577ee0c80be168beb60e3485bb9722874e5bf8718c9ae7eb27464f7",  //metaHash
        //     "preview": "https://media.1combo.io/soccerbeat/combo.jpg"
        //   }
        // }
        
         const transactionScript = await contract.mint(
            comboContract,
            to,
            true,   // true - pay in ether, false - pay in WETH
            metaHash,
            ingredients,
            itemsToBuy
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

    const PlayOrCombo = ({onCombo}) => {
        return (
          <div class="flex justify-evenly">
              <button 
                  class="font-bold py-2 px-4 rounded-full play-btn"
                  onClick={() => PlayNowHandler()}>
                  Play now
              </button>
              <button 
                  class="font-bold py-2 px-4 rounded-full mint-btn"
                  onClick={() =>{ 
                      onCombo(true);
                      comboHandler();
                  }}>
                  Combo
              </button>
          </div>
        );
      }
      

    useEffect(() =>{
        getAddress();
    },[])

    let bottomSection;
    if(isAvatar){
        bottomSection = <PlayOrCombo onCombo={onCombo}></PlayOrCombo>
    } else {
        bottomSection=<div></div>
    }

    return(
        <div class="container mx-auto bg-white rounded-xl shadow border p-4 m-2">
            <div class="text-grey-200 text-center mb-8 bg-slate-300 rounded-full code">#231</div>
            <div class="img" style={{height: "300px", display: "table-cell", verticalAlign: "middle"}}><img src={img} alt="jersey" class="bg-transparent"></img></div>
            <div class="my-4 text-center desc">Level {level}</div>
            {bottomSection}
        </div>
    );
}

const PlayNowHandler = () => {
    console.log("PlayNowHandler running");
    const requestOptions = {
        method: 'GET',
    };
   
    const unityServer = "http://127.0.0.1:8888/avatar?avatar=1&cloth=1";
   
    fetch(unityServer, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((err) => {console.log(err.message);});
}

export default AssetCard;

