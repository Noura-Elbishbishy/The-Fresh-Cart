import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useProduct from '../../Hooks/useProduct'
import RecentProducts from '../RecentProducts/RecentProducts.jsx'

export default function Products(props) {
  let {data , isError , error , isLoading , isFetching }  = useProduct()
  
  return (
    <>
      <h1 className='md:mt-16'>products page</h1>
       <RecentProducts/>
       </>
  )
}6
