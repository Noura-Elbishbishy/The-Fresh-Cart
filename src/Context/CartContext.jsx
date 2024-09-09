import axios from 'axios';
import { createContext, useContext } from 'react';


export let CartContext = createContext();


export default function CartContextProvider(props) {
  const token = localStorage.getItem('userToken');
  const headers = token ? { token } : {};

  function getLoggedUserCart() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers })
      .then((response) => response)
      .catch((error) => {
        console.error('Failed to fetch cart:', error);
        throw new Error('Failed to fetch cart');
      });
  }

  function addProductToCart(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', 
      { productId }, 
      { headers }
    )
    .then((response) => response)
    .catch((error) => {
      console.error('Failed to add product to cart:', error);
      throw new Error('Failed to add product to cart');
    });
  }

  async function checkout(shippingAddress) {
    try {
      const cartResponse = await getLoggedUserCart();
      const cart = cartResponse.data?.data; 
      
      if (!cart || !cart._id) {
        throw new Error('Cart not found');
      }
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart._id}?url=http://localhost:3000`,
        { shippingAddress },
        { headers }
      );
      console.log(data);
      window.location.href = data.session.url
    } catch (error) {
      console.error('Failed to checkout:', error);
      throw new Error('Failed to checkout');
    }
  }
  
  

  function updateCartItemCount(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
      { count }, 
      { headers }
    )
    .then((response) => response)
    .catch((error) => {
      console.error('Failed to update cart item count:', error);
      throw new Error('Failed to update cart item count');
    });
  }

  function deleteCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
      .then((response) => response)
      .catch((error) => {
        console.error('Failed to delete cart item:', error);
        throw new Error('Failed to delete cart item');
      });
  }
  

 
   

  return (
    <CartContext.Provider value={{checkout, getLoggedUserCart, addProductToCart, updateCartItemCount, deleteCartItem }}>
      {props.children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};
