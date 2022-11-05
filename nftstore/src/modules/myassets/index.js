import React from 'react';
import { Link } from "react-router-dom";

import './index.css';

class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container py-5">
        <div className="row">
        </div>
        <hr />
        <div className="row mb-2">
          <div className="col-md-12 text-center mb-4">
            <h3 className="h5">My Asset<i className="fas fa-list ms-2"></i></h3>
          </div>
        </div>
      </div>
    )
  }

}

export default Home; 
