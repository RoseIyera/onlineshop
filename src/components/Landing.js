import React, { Fragment } from 'react';
import Home from '../Assets/img/Cover.png'
import Navheader from '../Navheader';
import { Link } from 'react-router-dom';



const Landing = () => {
  return (
    <Fragment>
        <Navheader />
        <div className="landing-page">
      <img src={Home} alt="Delicious Cupcake" />
      <div className="content">
        <Link to="/product" className="explore-button">Explore Now</Link>
      </div>
    </div>
    </Fragment>
    
    
  );
}

export default Landing;
