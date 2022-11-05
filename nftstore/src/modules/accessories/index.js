import React from 'react';
import ItemCard from '../../components/ItemCard';
import './index.css';

class Accessories extends React.Component {
  render() {
    return (
      <div className="container py-5">
          <div class="grid grid-cols-4 gap-6 bg-white">
            <ItemCard></ItemCard>
            <ItemCard></ItemCard>
            <ItemCard></ItemCard>
            <ItemCard></ItemCard>
          </div>
      </div>
    )
  }
}

export default Accessories;
