import React from 'react'
import Navbar from '../Clientcomponents/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from "../Clientcomponents/Footer"

function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Layout
