import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../Context/CartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Cart() {
  let { getLoggedUserCart, updateCartItemCount, deleteCartItem } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null); // state  t-track deleting 

  async function getCartItems() {
    try {
      let response = await getLoggedUserCart();
      console.log('Cart Response:', response);

      if (response.data && response.data.status === 'success') {
        setCartDetails(response.data.data);
      } else {
        setError('Failed to fetch cart items.');
      }
    } catch (error) {
      console.log('Failed to fetch cart items', error);
      setError('Failed to fetch cart items.');
    } finally {
      setLoading(false);
    }
  }

  async function updateCartCount(productId, count) {
    try {
      let response = await updateCartItemCount(productId, count);
      console.log('update cart Response:', response.data.data);

      if (response.data && response.data.status === 'success') {
        setCartDetails(response.data.data);
      } else {
        setError('Failed to update cart items.');
      }
    } catch (error) {
      console.log('Failed to fetch cart items', error);
      setError('Failed to fetch cart items.');
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(productId) {
    setDeletingProductId(productId); // Set deleting product id 
    try {
      let response = await deleteCartItem(productId);
      console.log('deleting:', response.data.data);

      if (response.data && response.data.status === 'success') {
        setCartDetails(response.data.data); 
      } else {
        setError('Failed to delete cart item.');
      }
    } catch (error) {
      console.log('Failed to delete cart item', error);
      setError('Failed to delete cart item.');
    } finally {
      setDeletingProductId(null); 
    }
  }
  useEffect(() => {
    getCartItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }


  // Function to calculate total price
const calculateTotalPrice = () => {
  if (!cartDetails?.products) return 0;
  return cartDetails.products.reduce((total, product) => total + (product.count * product.price), 0);
};

  return (
    <>
      <div className="mt-20 mb-10 relative overflow-x-auto shadow-md sm:rou]nded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-emerald-600 text-white">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.products.length > 0 ? (
              cartDetails.products.map((product) => (
                <tr
                  key={product.product.id}
                  className="bg-white border-b hover:bg-emerald-50"
                >
                  <td className="p-4">
                    <img src={product.product.imageCover}  className="w-16 md:w-32 max-w-full max-h-full"  alt={product.product.title}/>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {/* minus button */}
                      <button
                        onClick={() => updateCartCount(product.product.id, product.count - 1)}
                        className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-200"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2" >
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <div className="ms-3">
                        <input type="number" id={`product_${product.product.id}`} className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block px-2.5 py-1" placeholder="1" required />
                      </div>
                      <button
                        onClick={() => updateCartCount(product.product.id, product.count + 1)}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-200"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span className="mx-3">{product.count}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4">
                    {deletingProductId === product.product.id ? (
                      <span className="text-emerald-600">Deleting...</span> // Show "Deleting" text
                    ) : (
                      <span
                        onClick={() => deleteItem(product.product.id)}
                        className="font-medium cursor-pointer text-red-600 hover:underline"
                      >
                        Remove
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No products in the cart.</td>
              </tr>
            )}
            <tr className='text-xl px-5 text-emerald-950 my-2 font-semibold'>
               <td colSpan={3}>Total Cart Price</td>
                 <td>${calculateTotalPrice().toFixed(2)}</td> {/* Format to 2 decimal places */ } 
           </tr>
            <tr className="text-center p-1">
              <td className='py-10'>
                <Link to={'/checkout'} className="  btn ">
                  Check out
                </Link>
              </td>
            </tr>

          </tbody>
          
        </table>
      </div>
    </>
  );
}
