import React from 'react'
import Carousol from '../Clientcomponents/Carousol'
import Video from '../Clientcomponents/Video'
import ProductsGrid from '../Clientcomponents/ProductsGrid'
import Blog from '../Clientcomponents/LatestBlog'
import WhyChooseUs from '../Clientcomponents/WhyChooseUs'
import IndustrySection from '../Clientcomponents/component/carousel'
function HomePage() {
  return (
    <>
     
      <Carousol />
      <Video />
      <IndustrySection />
      <WhyChooseUs />
      <ProductsGrid />
      <Blog />


    </>
  )
}

export default HomePage
