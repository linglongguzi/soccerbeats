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
        <div>
            <div>0.01ETH</div>
            <button>Buy</button>
        </div>
    );
}

export default ItemCard;