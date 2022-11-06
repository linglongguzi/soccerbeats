import * as React from 'react';

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
    console.log("PlayNowHandler running")
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wearJersey: true })
    };
   
    const unityServer = "http://localhost:8888/avatar?avatar=5&cloth=0";
   
    fetch(unityServer, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((err) => {console.log(err.message);});
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

