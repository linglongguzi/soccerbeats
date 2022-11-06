import * as React from 'react';
import { ABI, COMBO_PROXY_ADDRESS, COLLECTION_PROXY_ADDRESS } from '../combo/src/client';

const AssetCard = ({img, isAvatar=false, level=2, onCombo})=>{
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

const Combo = () => {
    console.log("comboing");
    

// Make mint params
let mintParamsBuilder = new sdk.ParamBuilders.MintParamsBuilder();
 
// Select 2 NFTs with ID 75 in the ERC-1155 collection
// Note: the 2 NFTs should be owned by the minter
mintParamsBuilder.use('0x727cB81C955e1D....dfDFe07281', 75, 2, 0);      
  
// Select the NFT with ID 103 in the ERC-721 collection
// Note: the NFT should be owned by the minter
mintParamsBuilder.use('0xF27B8D220249fb....A6a71914E2', 103, 1, 0);

// Purchase & Select 5 NFTs with ID 932 in the ERC-1155 collection in the set with ID 10000000
// Note: minter can purchase the missing required add-on NFTs while minting a combo NFT
mintParamsBuilder.buy('0x10c01D6B0396D9....F60b9cB1F6', 932, 5, 10000000);

let { ingredients, itemsToBuy } = mintParamsBuilder.build();
ComboProxy.mint(
    combo,
    to,
    true,   // true - pay in ether, false - pay in WETH
    ingredients,
    itemsToBuy
);
}

const PlayOrCombo = ({onCombo}) => {
  return (
    <div class="flex justify-evenly">
        <button 
            class="font-bold py-2 px-4 rounded-full play-btn"
            onClick={()=>PlayNowHandler()}>
            Play now
        </button>
        <button 
            class="font-bold py-2 px-4 rounded-full mint-btn"
            onClick={()=>onCombo(true)}>
            Combo
        </button>
    </div>
  );
}

export default AssetCard;

