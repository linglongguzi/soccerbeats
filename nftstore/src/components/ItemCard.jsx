import * as React from 'react';
import clothImg from '../assets/model4.png';

const ItemCard = ({img})=>{
    return(
        <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-4 m-2">
            <div class="text-grey-200 text-center mb-8 bg-slate-300 rounded-full">#231</div>
            <img src={img} alt="jersey" class="bg-transparent"></img>
            <div class="my-4 text-center">lv2</div>
            <PriceCheckoutButton></PriceCheckoutButton>
        </div>
    );
}

const PriceCheckoutButton = () => {
    return(
        <div class="container bg-blue-200 rounded-full py-1">
            <div class="inline-block px-9"> 0.01 ETH </div>
            <button class="bg-blue-500 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded-full">Buy</button>
        </div>
    );
}

export default ItemCard;