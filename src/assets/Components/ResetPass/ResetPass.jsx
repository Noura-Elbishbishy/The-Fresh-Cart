// ForgotPassword.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  return (<>
    <div className="formContainer p-24 mt-6 md:p-28">
      <h2 className='text-3xl py-6 text-center font-semibold text-emerald-700'>Reset Your Password</h2>
    
        <div className="relative z-0 w-full mb-5 group ">
          <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your email to reset password... </label>
        </div>
        <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
          Reset Password</button>
    </div>
    <p className='text-center'> Remembered your Pass? 
          <Link to="/" className="text-emerald-600 hover:underline text-right mx-1">
            Login Now!
          </Link>
          </p> </>
  );
};

export default ForgotPassword;
