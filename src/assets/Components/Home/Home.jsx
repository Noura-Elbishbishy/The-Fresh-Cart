import React from 'react'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
  return ( <>
        <MainSlider></MainSlider>
        <CategoriesSlider></CategoriesSlider>
        <RecentProducts></RecentProducts>

    </>
  )
}
