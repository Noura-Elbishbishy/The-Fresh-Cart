import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
// ---> al page elly estkhdmt grid mosh flex 3lshan hdwr 3lyky b3den :D


export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  function getCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log('Failed to fetch categories', error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  
  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
      setSelectedCategory({ id: categoryId, subcategories: response.data.data });
    } catch (error) {
      console.log('Failed to fetch subcategories', error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-10 md:mt-12">Shop by Categories</h2>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories?.map((category) => (
          <div
            key={category._id} // Use _id , law id bs mosh hygyb haga (al API keda)
            className="bg-white border rounded-lg shadow-md p-4 cursor-pointer hover:bg-emerald-50 transition"
            onClick={() => handleCategoryClick(category._id)} 
          >
            <img className="w-full h-40 object-cover rounded-md mb-4" src={category.image} alt={category.name} />
            <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Subcategories Section */}
      {selectedCategory && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-emerald-600 mb-5">Subcategories:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {selectedCategory.subcategories.length > 0 ? (
              selectedCategory.subcategories.map((subcategory) => (
                <div
                  key={subcategory._id} 
                  className="bg-emerald-600 text-white rounded-lg shadow-md p-4 text-center"
                >
                  <h4 className="text-lg font-semibold">{subcategory.name}</h4>
                </div>
              ))
            ) : (
              <p>No subcategories available for this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
