import * as React from 'react';
import clothImg from '../assets/model4.png';

import styles from '../styles/ItemCard.css';

const ItemCard = ({img})=>{
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