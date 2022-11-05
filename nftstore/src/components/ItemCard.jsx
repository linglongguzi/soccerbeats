import * as React from 'react';
import clothImg from '../assets/model4.png';

const ItemCard = ({img})=>{
    return(
        <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-4 m-2">
            <div class="text-pink">#231</div>
            <img src={img} alt="jersey" class="bg-transparent"></img>
            <div>lv2</div>
            <PriceCheckoutButton></PriceCheckoutButton>
        </div>
    );
}

const PriceCheckoutButton = () => {
    return(
        <div class="container bg-blue-200 rounded-full py-1">
            <span class="inline-block px-4"> 0.01ETH </span>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Buy</button>
        </div>
    );
}

export default ItemCard;