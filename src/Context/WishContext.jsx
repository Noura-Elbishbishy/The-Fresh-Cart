import React, { createContext, useState, useContext, useEffect } from 'react';


const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishListItems, setWishListItems] = useState(() => {
 
    const storedItems = localStorage.getItem('wishlist');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishListItems)); // Save to local storage 
  }, [wishListItems]);

  const addToWishList = (item) => {
    setWishListItems((prevItems) => [...prevItems, item]);
  };

  const removeFromWishList = (itemId) => {
    setWishListItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Function to get the wishlist items
  const getWishListItems = () => wishListItems;

  return (
    <WishListContext.Provider value={{ addToWishList, removeFromWishList, getWishListItems }}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error('useWishList must be used within a WishListProvider');
  }
  return context;
};
