import React, { useContext, useState } from 'react'
import logo from '../../images/logo.svg'
import {Navigate, NavLink, useNavigate} from 'react-router-dom'
import { UserContext } from '../../../Context/UserContext';


export default function Navbar() {
  const toggleMenu = () => setIsOpen(!isOpen); // Function to toggle menu
  const [isOpen, setIsOpen] = useState(false); // State to handle menu toggle
  let {userLogin ,setuserLogin} = useContext(UserContext)
  let Navigate = useNavigate();

   function logOut(){
     localStorage.removeItem('userToken');
     setuserLogin(null);
     Navigate ('/login')
   }
 
 return <>
       <nav className="bg-gray-200 p-3  text-center inset-x-0 top-0 md:fixed ">
         <div className="container flex flex-col md:flex-row justify-between items-center text-gray-500">
          <div className="flex flex-col md:flex-row space-x-3">
          <img src={logo} width={120} alt="" />
         
        {userLogin !== null ?  <div>
    {/* Toggle Button */}
    <button className='text-white md:hidden flex items-center right-2 absolute m-2' onClick={toggleMenu}>
      <i className="fa-solid fa-bars text-2xl"></i>
    </button>
    <div className={`md:flex md:items-center w-full md:w-auto transition-transform duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
  <ul className='flex-col md:flex-row flex gap-2'>
  <li><NavLink to="products" className='text-black hover:text-emerald-600 transition-colors duration-200'>Products</NavLink></li>
    <li><NavLink to="cart" className='text-black hover:text-emerald-600 transition-colors duration-200'>Cart</NavLink></li>
    <li><NavLink to="categories" className='text-black hover:text-emerald-600 transition-colors duration-200'>Categories</NavLink></li>
    <li><NavLink to="brands" className='text-black hover:text-emerald-600 transition-colors duration-200'>Brands</NavLink></li>
    <li><NavLink to="wishList" className='text-black hover:text-emerald-600 transition-colors duration-200'>Wishlist</NavLink></li> {/* Add Wishlist link */}
  </ul>
</div>
    </div>
         : null } 
         
          
          
          </div>
          <div className='flex-col flex gap-4 md:flex-row'>
          <ul className='flex flex-col md:flex-row space-x-2'>
            <li className='space-x-2 text-black'>
              <i className='fab fa-facebook-f hover:text-emerald-600 transition-colors duration-200'></i>
              <i className='fab fa-linkedin-in hover:text-emerald-600 transition-colors duration-200'></i>
              <i className='fab fa-youtube hover:text-emerald-600 transition-colors duration-200'></i>
              <i className='fab fa-twitter hover:text-emerald-600 transition-colors duration-200'></i>
              <i className='fab fa-instagram hover:text-emerald-600 transition-colors duration-200'></i>
            </li>
          </ul>
           {userLogin === null? <ul className='flex sm:gap-3'>
            <li><NavLink to="login">Login</NavLink></li>
            <li><NavLink to="register">Register</NavLink></li> </ul>
            : 
            <ul>
              <li onClick={logOut}><span className='cursor-pointer'>logout</span></li>
            </ul>}
           
        </div>

         </div>

       </nav>
 </>
}
