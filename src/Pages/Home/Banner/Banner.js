import React from 'react';
import { Link } from 'react-router-dom';
import car from '../../../images/Banner/car.png'
import road from '../../../images/Banner/road.jpg'
const bannerBg = {
  background: `url(${road})`,
  height: '500px',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
 


}
const Banner = () => {
 
    return (
          <div style={bannerBg} className="mb-5">
            <div  className="grid md:grid-cols-2 gap-4">
      <div>
        <img src={car} alt=""/>
      </div>
      <div className='my-auto'>
        <h1 className='mb-2 font-bold text-xl'> Find The Best Car You Want</h1>
        <Link to="/explore">
        <button className='btn bg-blue-800'>Buy Car</button>
        </Link>
      </div>
    </div>
          </div>
    );
};

export default Banner;