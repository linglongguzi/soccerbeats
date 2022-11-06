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
            <div class="img" style={{height: "300px", display: "table-cell", verticalAlign: "middle"}}><img src={img} alt="jersey" class="bg-transparent"></img></div>
            <div class="my-4 text-center">Level {level}</div>
            {bottomSection}
        </div>
    );
}

const PlayNowHandler = () => {
    console.log("PlayNowHandler running")
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wearJersey: true })
    };
   
    const unityServer = "http://localhost:8000";
   
    fetch(unityServer, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((err) => {console.log(err.message);});
}

const PlayOrCombo = () => {
  return (
    <div class="flex justify-evenly">
        <button 
            class="bg-yellow-200 hover:bg-yellow-400 font-bold py-2 px-4 rounded-full"
            onClick={()=>PlayNowHandler()}>
            Play now
        </button>
        <button 
            class="bg-pink-200 hover:bg-pink-400 font-bold py-2 px-4 rounded-full"
            onClick={()=>alert("combo finished, starting")}>
            Combo
        </button>
    </div>
  );
}

export default AssetCard;

