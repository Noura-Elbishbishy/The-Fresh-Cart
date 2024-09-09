import React, { useEffect, useState } from 'react';
import axios from 'axios';

// nfs code al categories ,bs categories 3mltha al awl 

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);


  function getBrands() {
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then((response) => {
        setBrands(response.data.data); 
      })
      .catch((error) => {
        console.log('Failed to fetch brands', error);
      });
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container mx-auto py-10 px-5 md:mt-12">
      <h2 className="text-3xl font-bold text-center mb-10">Our Brands</h2>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands?.map((brand) => (
          <div
            key={brand._id} 
            className="bg-white border rounded-lg shadow-md p-4 cursor-pointer hover:bg-emerald-50 transition"
          >
            <img className="w-full h-40 object-cover rounded-md mb-4" src={brand.image} alt={brand.name} />
            <h3 className="text-lg font-semibold text-gray-800">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
