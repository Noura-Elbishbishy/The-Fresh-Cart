import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


    
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


export default function ProductDetails() {
 let {id , category} = useParams(); // 3mlt destruct llid , i can destract ay haga mn al parameters asln , bs hena m3ndysh ghyr al id bs
 const [productDetails, setProductDetails] = useState(null)
 const [relatedProducts, setRelatedProducts] = useState([])

 
  function getProductDetails(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>{
    setProductDetails(data.data)
    console.log(data.data)
    }).catch(()=>{

    })
  }  
  function getRelatedProducts(category){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
        console.log('all related products:' , data.data)
      let allProducts = data.data
      let related =  allProducts.filter((product)=>product.category.name == category)
      setRelatedProducts(related)       

    }) .catch((error) => {
        console.error('Error fetching related products:', error);
      });
} 


  // da al use effect elly ktbto wara al bshmohndes , bs mosh rady yshtghl , hwa mynf3sh ahot 2 useeffect m3 b3d?
useEffect(() => {
    getProductDetails(id)
    getRelatedProducts(category)
}, [id ,category]) // elly gwa [] dah elly law etghyr , yrg3 yshghl al useeffect tany blgwaha+ keda keda btshtghl awl ma bft7 

//da useeffect btry2a tanya , en kol 2 sperated bdl 2 in 1 de
// useEffect(() => {
//     getProductDetails(id);
//   }, [id]);
//  useEffect(() => {
//     if (productDetails) {
//       getRelatedProducts(productDetails.category.name);
//     }
//   }, [productDetails]);


 return <>
      <div className="row flex text-center p-5 align-middle md:mt-24 w-4/5 m-auto">
        
     {productDetails ? ( // Conditional rendering to handle loading state
          <>
            <div className="w-1/4">
            <Slider {...settings}>
                {productDetails?.images.map((src)=> 
                     <img src={src} alt={productDetails.title} />   
                    )}
           </Slider>


           </div>            <div className="w-3/4 p-6">
              <h1 className='text-lg font-normal text-gray-950'>{productDetails.title}</h1>
             <p className='text-gray-700 font-light'>{productDetails.description}</p>
             <div className="flex justify-between my-4 p-2 bg-slate-100">
              <span>{productDetails.price} EGP</span>
              <span>{productDetails.ratingsAverage} <i className='fas fa-star text-yellow-400 m-1'></i> </span>
            </div>
            </div>
          </>
        ) : (
          <p>Loading...</p> // Loading message while fetching data
        )}

      </div>
      <p>Related Products:</p>
      <div className="row">
        
      {relatedProducts.map((product)=> 

        <div className="w-1/4 p-3" key={product.id}>
         <Link className="w-3/4 m-auto md:w-1/6 " to={`/productdetails/${product.id}/${product.category.name}`}> 
        
          <div >
            <div className="product py-4">
              <img className='w-full' src={product.imageCover} alt={productDetails.title} />
              <span className='block font-light text-green-600 text-sm'>category:{productDetails.category.name}</span>
              <h3 className='text-lg mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3> 
               <div className="flex justify-between">
                 <span>{product.price} EGP</span>
                 <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400 m-1'></i> </span>
               </div>
               
               <button className="btn">Add Product</button>
   
             </div>   
          </div>
        </Link>
        </div>
        )}
      </div>
    </>
}
