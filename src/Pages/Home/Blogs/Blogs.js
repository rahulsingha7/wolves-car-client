import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ferrari from '../../../images/Blogs/ferrari.jpg'
import lamborghini from '../../../images/Blogs/lamborghini.jpg'
import audi from '../../../images/Blogs/audi.jpg'
import Volkswagen from '../../../images/Blogs/volkswagen.jpg'
import hyundai from '../../../images/Blogs/hyundai.jpg'
import useAuth from "../../Hooks/useAuth";
const Blogs = () => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    
    return (
         <div className="my-10">
      <h1 className="text-2xl font-bold mb-5">Latest Blogs</h1>
    <Carousel
swipeable={false}
draggable={false}
//   showDots={true}
responsive={responsive}
ssr={true} // means to render carousel on server-side.
infinite={true}
//   autoPlay={this.props.deviceType !== "mobile" ? true : false}
autoPlaySpeed={1000}
keyBoardControl={true}
customTransition="all .5"
transitionDuration={500}
containerclassName="carousel-container"
// removeArrowOnDeviceType={["tablet", "mobile"]}
//   deviceType={this.props.deviceType}
dotListclassName="custom-dot-list-style"
itemclassName="carousel-item-padding-40-px"
>
<div className="card w-96 bg-base-100 shadow-xl">
<figure className="px-8 pt-6">
<img src={ferrari} alt="" className="rounded-xl" />
</figure>
<div className="card-body items-center text-center">
<h2 className="card-title">Ferrari will add electric car production line</h2>
<p>The automaker has bought space near its Maranello plant for a third production line that will be dedicated to making hybrid and electric vehicles...<span className="text-blue-600">Read More</span></p>
</div>
</div>
<div className="card w-96 bg-base-100 shadow-xl">
<figure className="px-10 pt-12">
<img src={lamborghini} alt="" className="rounded-xl" />
</figure>
<div className="card-body items-center text-center">
<h2 className="card-title pt-5">Lamborghini electrified supercars will still look like "spaceships"</h2>
<p className="pt-3">Lamborghinis will continue to “look like spaceships” as the firm enters the electrification era, according to design boss Mitja Borkert...<span className="text-blue-600">Read More</span></p>
</div>
</div>
<div className="card w-96 bg-base-100 shadow-xl">
<figure className="px-14 pt-3">
<img src={audi} alt="" className="rounded-xl" />
</figure>
<div className="card-body items-center text-center">
<h2 className="card-title">Everything You Should Know About Audi's EV Lineup</h2>
<p>From sports cars to luxurious family haulers, Audi has set out to produce some of the best EVs on the market. 2022 Audi e-tron GT via Electrek...<span className="text-blue-600">Read More</span></p>
</div>
</div>
<div className="card w-96 bg-base-100 shadow-xl">
<figure className="px-12">
<img src={Volkswagen} alt="" className="rounded-xl" />
</figure>
<div className="card-body items-center text-center">
<h2 className="card-title">Volkswagen's global production network for electric vehicles</h2>
<p>Volkswagen has invested around one billion euros in converting the Emden plant with its 8,000 employees. Emden is thus the first high-tech site...<span className="text-blue-600">Read More</span></p>
</div>
</div>
<div className="card w-96 bg-base-100 shadow-xl">
<figure className="px-10 ">
<img src={hyundai} alt="" className="rounded-xl" />
</figure>
<div className="card-body items-center text-center">
<h2 className="card-title">Hyundai Will Ride the E-GMP Platform to 11 New EV Models by 2030</h2>
<p>It is not especially surprising to see as the 800-volt EV battery pack in the Porsche Taycan but Hyundai has a technological...<span className="text-blue-600">Read More</span></p>
</div>
</div>

</Carousel>
  </div>
    );
};

export default Blogs;