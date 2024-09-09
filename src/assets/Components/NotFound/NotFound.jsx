import React from 'react'
import img from '../../images/error.svg'
export default function NotFound() {
  return ( <>
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <h3 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h3>
  <p className="text-lg text-gray-600 mb-6 sm:mx-3 text-center">
    The page you're looking for doesn't seem to exist. It might have been moved or deleted.
  </p>
  <img src={img} alt="404 Illustration" className="w-1/2 md:w-1/3 lg:w-1/4 mb-6" />
  <a href="/" className="px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition duration-300">
    Go Back Home
  </a>
</div>

    </>
  )
}
