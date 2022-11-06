import React from 'react';
import ItemCard from '../../components/ItemCard';
import './index.css';
import clothImg from '../../assets/model4.png';
import hatImg from '../../assets/hat.jpeg';
import sneakerImg from '../../assets/sneaker.png';

class Accessories extends React.Component {
  render() {
    return (
      <div className="container py-5">
          <div class="grid grid-cols-4 gap-6">
            <ItemCard img={clothImg}></ItemCard>
            <ItemCard img={sneakerImg}></ItemCard>
            <ItemCard img={hatImg}></ItemCard>
            <ItemCard img={clothImg}></ItemCard>
            <ItemCard img={sneakerImg}></ItemCard>
            <ItemCard img={hatImg}></ItemCard>
            <ItemCard img={clothImg}></ItemCard>
            <ItemCard img={sneakerImg}></ItemCard>
          </div>
      </div>
    )
  }
}

export default Accessories;
