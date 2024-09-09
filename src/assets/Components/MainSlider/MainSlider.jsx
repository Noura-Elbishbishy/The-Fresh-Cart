import React, { useEffect, useState } from 'react'
import axios from 'axios';
import mainimg1 from '../../images/slider-image-3.jpeg';
import mainimg2 from '../../images/grocery-banner-2.jpeg';
import mainimg3 from '../../images/grocery-banner.png';

import slide1 from '../../images/slider-image-2.jpeg';
import slide2 from '../../images/slider-image-1.jpeg';

// slickSlider Step1
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 
export default function MainSlider() {

    
 // slickSlider Step2
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
     //3dd al slides al 3ayz azherha
    slidesToScroll: 1, //3dd al hagat al byhslha scroll flmara
    autoplay : true 
  };
  useEffect(() => {
    
  
  }, [])
  
    return (<>
       <div className="row mt-8 p-6">
        <div className="w-3/4 "> 
        <Slider {...settings} className="">
      <div>
        <img src={mainimg1} alt="Slide 1" className='w-full h-[450px]' />
      </div>
      <div>
        <img src={mainimg2} alt="Slide 2" className='w-full h-[450px]' />
      </div>
      <div>
        <img src={mainimg3} alt="Slide 3" className='w-full h-[450px]' />
      </div>
    </Slider>
          
        </div>
        <div className="w-1/4">
        <img src={slide1} alt="" className='w-full h-[225px]' />
        <img src={slide2} alt="" className='w-full h-[225px]' />

        </div>
       </div>


    </>
  )
}
