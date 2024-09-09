import React from 'react';
import { useWishList } from '../../../Context/WishContext'; // Adjust the path as needed
import { useCart } from '../../../Context/CartContext'; // Adjust the path as needed
import toast, { Toaster } from 'react-hot-toast'; // Ensure this is installed

const WishList = () => {
  const { getWishListItems, removeFromWishList } = useWishList();
  const { addProductToCart } = useCart(); // Use the custom hook for CartContext
  const [wishListItems, setWishListItems] = React.useState(getWishListItems());

  React.useEffect(() => {
    setWishListItems(getWishListItems());
  }, [getWishListItems]);

  const handleRemove = (itemId) => {
    removeFromWishList(itemId);
    setWishListItems(getWishListItems()); // Update local state
  };

  const handleAddToCart = async (itemId) => {
    try {
      let response = await addProductToCart(itemId);
      if (response.data.status === 'success') {
        toast.success('Product added to cart!');
      } else {
        toast.error('Failed to add product to cart.');
      }
    } catch (error) {
      toast.error('An error occurred while adding to cart.');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-center">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6 text-emerald-600 md:mt-12">Your Wishlist</h1>
      {wishListItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishListItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <img 
                className="w-full h-48 object-cover" 
                src={item.imageCover} 
                alt={item.name} 
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                <p className="text-sm text-gray-500">Price: {item.price} EGP</p>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => handleAddToCart(item.id)}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => handleRemove(item.id)} 
                    className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
