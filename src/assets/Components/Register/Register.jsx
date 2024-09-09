import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';
import Login from '../Login/Login';


export default function Register() {
  let {setuserLogin} = useContext(UserContext)
   const [apiError, setApiError] = useState(null)
   const [loading, setLoading] = useState(false)
   let navigate = useNavigate();
 
   async function handleRegister(values) {
      try {
        setLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
        

        localStorage.setItem('userToken', data.token)
        console.log(data)
        setuserLogin(data.token) //llcontext law mosh null htb2 el navigate
        navigate('/login');
      } catch (error) {
        if (error.response && error.response.status === 409) {
          console.error(error.response.data.message);
          setApiError(error.response.data.message);

        } else {
          console.error('An error occurred:', error.message)
        }
      }
    }
    let validationSchema = Yup.object().shape({
      name : Yup.string().min(3, 'min len is 3').max(15 , 'max len is 15').required('name is required'),
      email : Yup.string().email('this mail is invalid').required('mail is required'),
      // in case i wanna build my own regex?i can use matches ---->
      password: Yup.string()
      .required('Password is required') .min(8, 'Password must be at least 8 characters long') 
     .max(20, 'Password cannot exceed 20 characters') // law ghyrt al rkam elly fe awl al ( ) , mnsash aghyr al message elly httl3 3lshan al fday7
     .matches(/^[A-Z]/, 'Password must start with an uppercase letter') .matches(/[a-z]/, 'Password must contain at least one lowercase letter') 
     .matches(/\d/, 'Password must contain at least one number') 
     .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character') 
     .matches(/^(?!.*\s).*$/, 'Password must not contain spaces'), // No spaces allowed
  
    // onof hyloop 3la ay array , fana hkhlyh yloop 3la al array of password al3ndy , fe hagat fe al pass mn al net mosh mn al vieos bt3t al framework , bs momkn ashof vds al JS kan feha al heta de
      rePassword: Yup.string().oneOf([Yup.ref('password')], "this passwoed doesn't match").required('rePassword is required'),    
      phone: Yup.string().matches(/^(002)?01[125][0-9]{8}$/ , 'This phone isnot an Egyptian phone number')
 
    })
       let formik = useFormik({ // al hagat elly httb3t llback,LAZEM AL PILING ALAIGNING WITH THE BACK
           initialValues:{
           name : '',
           email: '',
           password:'',
           rePassword:'',
           phone: ''
            },
            validationSchema : validationSchema,
            onSubmit:handleRegister //en lma yt3ml submit y3ml al function de , (bultin function from Formik)
         })
  return (<>
  <div className="formContainer p-23 mt-6">
         <h2 className='text-3xl py-6 text-center font-semibold text-emerald-700'>Register Now</h2>               
     <form onSubmit={formik.handleSubmit} className="md:max-w-5xl p-3 mx-auto">
           {apiError &&    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {apiError}
            </div>}
        
           <div className="relative z-0 w-full mb-5 group ">
             <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
             <label htmlFor="name" className="text-emerald-500 peer-focus:font-medium absolute text-sm  dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Name....</label>
           </div>
           {formik.errors.name && formik.touched.name && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {formik.errors.name}
            </div>}
             
              {/* condition 3lshan al error message tban lma yb2a fe haga fe array al errors */}
            <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email....</label>
           </div>
             {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                {formik.errors.email}
            </div>}
             
           <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Password....</label>
           </div>
           {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {formik.errors.password}
            </div>}
             
           <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
                <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your rePassword....</label>
           </div> 
            {formik.errors.password && formik.touched.rePassword && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                {formik.errors.password}
            </div>}
             
             <div className="relative z-0 w-full mb-5 group">
                <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
                <label htmlFor="phone" className=" peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone....</label>
           </div> 
            {formik.errors.phone && formik.touched.phone && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                {formik.errors.phone}
            </div>}

            {loading?   <button type="button" className="text-white p-1 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
           <i className='fas fa-spinner fa-spin-pulse'></i>
           </button> : <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>
       } 
            
    </form>
     <p className='font-thin text-center'>Already have an account?  <Link to='/login' className='font-semibold m-auto italic text-emerald-900'>Login now!</Link></p>
    </div>
    </>
  
  )
}

