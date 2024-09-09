import React, { useEffect, useState } from 'react'
import axios from 'axios';

// slickSlider Step1
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 
export default function CategoriesSlider() {
 // slickSlider Step2
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 7,
     //3dd al slides al 3ayz azherha
    slidesToScroll: 4, //3dd al hagat al byhslha scroll flmara
    autoplay : true 
  };


    const [categories , setCategories] = useState([])
   
   function getCategories(){
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    .then((response)=>{ 
      setCategories(response.data.data);
 
     }).catch((error)=>{

    }) 
   }

  useEffect(() => {
    getCategories()
  }, [])
  
return (  <>
   <div className="py-5">
    <h2 className='text-xl '>Shop popular categories</h2>
       <Slider {...settings} className='font-light text-center w-11/12 m-auto p-2'>
                {categories?.map((category)=> 
                    <div>
                      <img className='categoryImg' src={category.image} alt={category.name} />
                      <h3>{category.name}</h3>
                    </div>)}
           </Slider>
   </div>
    
    </>
  )
}
