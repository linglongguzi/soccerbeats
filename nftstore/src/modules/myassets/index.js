import React from 'react';
import clothImg from '../../assets/model4.png';
import girlImg from '../../assets/model3.png';
import AssetCard from '../../components/AssetCard';
import { GetAddress } from "../../components/Web3";

import './index.css';

class MyAssets extends React.Component {
  renderWalletNotConnected = () => (
    <div>Connect wallet to see your assets</div>
  );

  renderWalletConnected = ()=> (
      <div className="container py-5">
          <div class="grid grid-cols-4 gap-6 bg-white">
            <AssetCard img={girlImg} isAvatar={true}></AssetCard>
            <AssetCard img={clothImg}></AssetCard>
          </div>
      </div>
  );

  render(){
    return(
      <div>
        { GetAddress === "" ? (this.renderWalletNotConnected()) : (this.renderWalletConnected())}
      </div>
    )}
}
export default MyAssets;