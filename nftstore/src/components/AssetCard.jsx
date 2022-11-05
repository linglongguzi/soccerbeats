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
            <div class="text-pink">#231</div>
            <img src={img} alt="jersey" class="bg-transparent"></img>
            <div>Level {level}</div>
            {bottomSection}
        </div>
    );
}

const PlayOrCombo = () => {
  return (
    <div>
        <button class="bg-yellow-200 justify-left">Play now</button>
        <button class="bg-pink-200 justify-right">Combo</button>
    </div>
  );
}

export default AssetCard;