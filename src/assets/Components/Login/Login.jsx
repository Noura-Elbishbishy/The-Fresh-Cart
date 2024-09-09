import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';


export default function Login() {
   const [apiError, setApiError] = useState(null)
   const [loading, setLoading] = useState(false)
   const [forgotPasswordEmail, setForgotPasswordEmail] = useState(''); // Added state for forgot password email
   const [forgotPasswordError, setForgotPasswordError] = useState(''); // Added state for forgot password error/success messages
   const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false); // State to toggle visibility of forgot password form

   let {setuserLogin} = useContext(UserContext);
   let navigate = useNavigate();
   
    async function handleLogin(values) {
      try {
        setLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
     
        localStorage.setItem('userToken', data.token)
        console.log(data)
        
        setuserLogin(data.token)
        navigate('/');
        
      } catch (error){
        if (error.response && error.response.status === 401) {
           console.error('Unauthorized: Incorrect credentials'); // Log unauthorized error
           setApiError('Incorrect email or password. Please try again.'); // Set API error message for incorrect credentials
           setLoading(false)
          } else {
          
          console.error('An error occurred:', error.message); // Log other errors
           setApiError('An error occurred. Please try again later.'); // Set API error message for other errors
           setLoading(false)
        
          }
      }
      
    }
    let validationSchema = Yup.object().shape({
      email : Yup.string().email('this mail is invalid').required('mail is required'),
      password: Yup.string().matches(/^[A-Z]\w{5,10}$/ , 'password is invalid').required('passwoed is required'), 
 
    })
       let formik = useFormik({
           initialValues:{
             email: '',
             password:'',
            },
            validationSchema : validationSchema,
            onSubmit:handleLogin 
         })

         // mlhash vd fe al cycle m3 nfsy
         const handleForgotPasswordSubmit = async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email: forgotPasswordEmail });
            setForgotPasswordError('Password reset link has been sent to your email.');
            setForgotPasswordEmail(''); // Clear input field after successful submission
          } catch (error) {
            setForgotPasswordError('Failed to send password reset link.');
          }
        };
  return (<>
  <div className="formContainer p-23 mt-6">
         <h2 className='text-3xl py-6 text-center font-semibold text-emerald-700'>Login Now</h2>               
     <form onSubmit={formik.handleSubmit} className="md:max-w-5xl p-3 mx-auto">
           
           <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
                <label htmlFor="email" className="peer-focus:font-medium  absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email....</label>
           </div>
             {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                {formik.errors.email}
            </div>}
             
           <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Password....</label>
           </div>
           {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {formik.errors.password}
            </div>}
             
            {apiError &&    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {apiError}
            </div>}
          {loading?    <button type="button" className="text-white p-1 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
           <i className='fas fa-spinner fa-spin-pulse'></i>
           </button> : <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>
       } 
            
    </form>
    <div className="formContainer p-23 mt-6 justify-center">               
        <form onSubmit={formik.handleSubmit} className="md:max-w-5xl p-3 mx-auto text-left">
          {/*al p mlhash lzma bs 3lshan adyha text center mosh aktr*/}
          <p className='text-center'> 
          <Link to="/reset" className="text-emerald-600 hover:underline text-right ">
            Forgot Password?
          </Link>
          </p>
         
        </form>
      </div>
    </div>
    </>
  
  )
}

