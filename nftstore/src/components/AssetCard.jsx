import * as React from 'react';
import clothImg from '../assets/model4.png';

const AssetCard = ({img, isAvatar=false, level=2})=>{
    let bottomSection;
    if(isAvatar){
        bottomSection = <PlayOrCombo></PlayOrCombo>
        
    } else {
        bottomSection=<div></div>
    }

    return(
        <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-4 m-2">
            <div class="text-grey-200 text-center mb-8 bg-slate-300 rounded-full">#231</div>
            <img src={img} alt="jersey" class="bg-transparent"></img>
            <div class="my-4 text-center">Level {level}</div>
            {bottomSection}
        </div>
    );
}

const PlayOrCombo = () => {
  return (
    <div class="flex justify-evenly">
        <button class="bg-yellow-200 hover:bg-yellow-400 font-bold py-2 px-4 rounded-full">Play now</button>
        <button class="bg-pink-200 hover:bg-pink-400 font-bold py-2 px-4 rounded-full">Combo</button>
    </div>
  );
}

export default AssetCard;

