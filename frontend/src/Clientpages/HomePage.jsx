import React from 'react'
import Carousol from '../Clientcomponents/Carousol'
import Video from '../Clientcomponents/Video'
import Newsletter from '../Clientcomponents/Newsletter'
import ProductsGrid from '../Clientcomponents/ProductsGrid'
import Blog from '../Clientcomponents/LatestBlog'
import Counter from '../Clientcomponents/Counter'
import WhyChooseUs from '../Clientcomponents/WhyChooseUs'
import IndustrySection from '../Clientcomponents/component/carousel'
// import ProductCategory from '../Clientcomponents/ProductCategory'
function HomePage() {
  return (
    <>

      <Carousol />
      <Video />
      <IndustrySection />
      {/* <ProductCategory/> */}
      <WhyChooseUs />
      <ProductsGrid />
      {/* <Counter /> */}
      <Blog />
      {/* <Newsletter /> */}

    </>
  )
}

export default HomePage
