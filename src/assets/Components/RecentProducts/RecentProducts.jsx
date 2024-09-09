import { useQuery } from '@tanstack/react-query';
import { data } from 'autoprefixer';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners'
import { useContext } from 'react';
import { CartContext } from '../../../Context/CartContext';
import { toast , Toaster } from 'react-hot-toast';
import { useWishList } from '../../../Context/WishContext';


export default function RecentProducts() {
  function getRecent() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let { addProductToCart } = useContext(CartContext);
  const [Loading, setLoading] = useState(false); 
  const [currentProductId, setCurrentProductId] = useState(0); 
  //wish list step2 b2a
  const { addToWishList, getWishListItems } = useWishList(); // Access wishlist functions
  const [wishList, setWishList] = useState(getWishListItems()); // Get wishlist items

  const handleWishList = (product) => {
    addToWishList(product); //  wishlist step3
    toast.success(`${product.title} added to Wishlist!`); 
    setWishList(getWishListItems()); 
  };

  async function addProduct(ProductId) {
    setCurrentProductId(ProductId); 
    setLoading(true);
    let response = await addProductToCart(ProductId);

    if (response.data.status === 'success') {
      toast.success(response.data.message); 
      setLoading(false); 
    } else {
      toast.error(response.data.message); 
      setLoading(false);
    }
    console.log("Add Product Response:", response);
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ['recent-products'],
    queryFn: getRecent,
    refetchInterval: 3000, //kol w2t ad eh hat al request dah tany         
    staleTime: 0,
  });

  if (isLoading) { // If the query is loading, show a loader
    return (
      <div className='py-8 mx-24 align-middle justify-center'>
        <ClimbingBoxLoader color='green' />
      </div>
    );
  }
  if (isError) { 
    return (
      <div className='py-8'>
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <>
      <Toaster /> {/* Toast notifications */}
      <div className="row flex flex-wrap">
        {data?.data.data.map((product) => ( // loop 3la al array w htly object object  smyhom product
          <div className="contain w-full md:w-1/3 lg:w-1/5 p-4" key={product.id}>
            <Link className="" to={`/productdetails/${product.id}/${product.category.name}`}> {/* step one 3lshan al product details */}
              <div>
                <div className="product py-4">
                  <img className='w-full' src={product.imageCover} alt={product.title} />
                  <span className='block font-light text-green-600 text-sm'>category:{product.category.name}</span>
                  <h3 className='text-lg mb-4'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                  {/* h7wel al title mn sting larray b3den split 3lshan akhod awl kelmtyn , b3den arg3o string tany */}
                  <div className="flex justify-between">
                    <span>{product.price} EGP</span>
                    <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400 m-1'></i> </span>
                  </div>
                </div>
              </div>
            </Link>

            <button onClick={() => handleWishList(product)} className="button heartBtn bg-white border-emerald-800">
              {wishList.some((item) => item.id === product.id) ? (
                <i className="fas fa-heart text-red-500"></i> 
              ) : (<i className="far fa-heart text-gray-500"></i>
              )}
            </button>
            <button onClick={() => addProduct(product.id)} className="btn addBtn">
              {Loading && currentProductId === product.id ? (
                <i className='fas fa-spinner fa-spin'></i> 
              ) : (
                'Add to Cart' 
              )}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}