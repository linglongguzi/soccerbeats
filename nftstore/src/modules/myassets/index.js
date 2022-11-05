import React from 'react';
import { Link } from "react-router-dom";
import ItemCard from '../../components/ItemCard';
import clothImg from '../../assets/model4.png';
import girlImg from '../../assets/model3.png';

import './index.css';
import AssetCard from '../../components/AssetCard';

class MyAssets extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container py-5">
          <div class="grid grid-cols-4 gap-6 bg-white">
            <AssetCard img={girlImg} isAvatar={true}></AssetCard>
            <AssetCard img={clothImg}></AssetCard>
          </div>
      </div>
    )
  }

}

export default MyAssets; 
