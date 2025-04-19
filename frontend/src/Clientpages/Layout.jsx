import React from 'react';
import Navbar from '../Clientcomponents/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Clientcomponents/Footer';

function Layout() {
  const location = useLocation();

  // Check if the current path is "/login"
  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      {!isLoginPage && <Navbar />} {/* Show Navbar only if not on /login */}
      <Outlet />
      {!isLoginPage && <Footer />} {/* Show Footer only if not on /login */}
    </div>
  );
}

export default Layout;