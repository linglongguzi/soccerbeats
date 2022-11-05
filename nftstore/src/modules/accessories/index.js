import React from 'react';
import ItemCard from '../../components/ItemCard';
import './index.css';
import clothImg from '../../assets/model4.png';

class Accessories extends React.Component {
  render() {
    return (
      <div className="container py-5">
          <div class="grid grid-cols-4 gap-6 bg-white">
            <ItemCard img={clothImg}></ItemCard>
            <ItemCard img={clothImg}></ItemCard>
            <ItemCard img={clothImg}></ItemCard>
            <ItemCard img={clothImg}></ItemCard>
          </div>
      </div>
    )
  }
}

export default Accessories;
