import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Make sure Yup is imported
import { CartContext } from '../../../Context/CartContext';

export default function Checkout() {
  const { checkout } = useContext(CartContext);
  const [loading, setLoading] = useState(false); // Initialize the loading state

  // Define the validation schema
  const validationSchema = Yup.object({
    details: Yup.string().required('Details are required'),
    city: Yup.string().required('City is required'),
    phone: Yup.string()
      .required('Phone is required')
      .matches(/^[0-9]+$/, 'Phone number is not valid')
      .min(10, 'Phone number must be at least 10 digits'),
  });

  let formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true); 
      try {
        await checkout(values); // Call checkout function mn CartContext
        console.log('Checkout successful');
      } catch (error) {
        console.error('Checkout failed:', error);
      } 
    },
  });

  return (
    <>
      <div className="formContainer p-23 mt-6">
        <h2 className="text-3xl py-6 text-center font-semibold text-emerald-700">
          Checkout Now
        </h2>
        <form onSubmit={formik.handleSubmit} className="md:max-w-5xl p-3 mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="details"
              id="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            {formik.touched.details && formik.errors.details ? (
              <div className="text-red-600">{formik.errors.details}</div>
            ) : null}
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your details....
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="city"
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-600">{formik.errors.city}</div>
            ) : null}
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your city....
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-600">{formik.errors.phone}</div>
            ) : null}
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your phone....
            </label>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Checkout'}
          </button>
        </form>
      </div>
    </>
  );
}
