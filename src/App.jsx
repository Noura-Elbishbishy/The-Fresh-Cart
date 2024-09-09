//addbtn from RecentProducts , got hover in css that is not working?
// delete cart item , a cart / cartcontext bs al cart context tmm y3ny
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './assets/Components/Home/Home.jsx';
import Products from './assets/Components/Products/Products.jsx';
import Cart from './assets/Components/Cart/Cart.jsx';
import Login from './assets/Components/Login/Login.jsx';
import ResetPass from './assets/Components/ResetPass/ResetPass.jsx';
import Layout from './assets/Components/Layout/Layout.jsx';
import Register from './assets/Components/Register/Register.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import Logout from './assets/Components/Logout/Logout.jsx';
import ProtectedRoute from './assets/Components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './assets/Components/ProductDetails/ProductDetails.jsx';
import CategoriesSlider from './assets/Components/CategoriesSlider/CategoriesSlider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './Context/CartContext.jsx';
import { WishListProvider } from './Context/WishContext.jsx';
import Categories from './assets/Components/Categories/Categories.jsx';
import NotFound from './assets/Components/NotFound/NotFound.jsx';
import {Toaster} from 'react-hot-toast'
import Brands from './assets/Components/Brands/Brands.jsx';
import WishList from './assets/Components/WishList/WishList.jsx';
import Checkout from './assets/Components/Checkout/Checkout.jsx';

let query = new QueryClient();


const router = createBrowserRouter([
  {path: '', element: <Layout/>, children: [
    { path: 'login', element:  <Login/>  },
    { index: true, path : 'register' , element: <Register/>},
    { path: 'reset', element:  <ResetPass/>  },
   

      { path: 'home' , path:'' , element:<ProtectedRoute> <Home/> </ProtectedRoute> },
      { path: 'cart', element:<ProtectedRoute>  <Cart/> </ProtectedRoute> },
      { path: 'products', element:<ProtectedRoute>  <Products/> </ProtectedRoute>},
      { path: 'categories', element:<ProtectedRoute>  <Categories/> </ProtectedRoute>},
      { path: 'brands', element:<ProtectedRoute>  <Brands/> </ProtectedRoute>},
      { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'productdetails/:id/:category', element:<ProtectedRoute>  <ProductDetails/> </ProtectedRoute>},
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
     
     
      { path: '*', element: <NotFound/> },
    ],
  },
]);

function App() {


  return (<>
     <QueryClientProvider client={query}>
       <UserContextProvider> {/*keda ay haga goa al app hywslha al UserContextProvider */}
         <CartContextProvider>
         <WishListProvider>
            <RouterProvider router={router} />
              <ReactQueryDevtools/>
              <Toaster/>
              </WishListProvider>
           </CartContextProvider>
        </UserContextProvider>
        
      </QueryClientProvider>
   
  </>
   
  );
}

export default App;

