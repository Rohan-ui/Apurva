import './App.css';
import './quill.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './AdminComponents/Sidebar';
import News from "./AdminComponents/Pages/News";
import CreateNews from "./AdminComponents/Pages/CreateNews";
import EditNews from './AdminComponents/Pages/EditNews';
import NewsCategory from "./AdminComponents/Pages/NewsCategory";
import CreateNewsCategory from "./AdminComponents/Pages/CreateNewsCategory";
import EditNewsCategory from "./AdminComponents/Pages/EditNewsCategory";
import OurStaff from "./AdminComponents/Pages/Staff";
import CreateStaff from "./AdminComponents/Pages/CreateStaff";
import EditStaff from './AdminComponents/Pages/EditStaff';
import Banner from "./AdminComponents/Pages/Banner";
import CreateBanner from "./AdminComponents/Pages/CreateBanner";
import EditBanner from "./AdminComponents/Pages/EditBanner";
import Partners from "./AdminComponents/Pages/Partners"
import CreatePartners from "./AdminComponents/Pages/CreatePartners"
import EditPartners from "./AdminComponents/Pages/EditPartners"
import ProductCategory from "./AdminComponents/Pages/ProductCategory";
import CreateProductCategory from "./AdminComponents/Pages/CreateCategory";
import EditCategory from "./AdminComponents/Pages/EditCategory";
import Product from "./AdminComponents/Pages/Product";
import CreateProduct from "./AdminComponents/Pages/CreateProduct";
import EditProduct from "./AdminComponents/Pages/EditProduct";
import Dashboard from "./AdminComponents/Pages/Dashboard";
import Signup from "./AdminComponents/Adminsignup";
import Login from "./AdminComponents/Adminlogin";
import VerifyOTP from "./AdminComponents/VerifyOTP";
import ResetPassword from "./AdminComponents/ResetPassword";
import EditAboutus from './AdminComponents/Pages/EditAboutus';
import ForgetPassword from './AdminComponents/ForgotPassword';
import DatabaseManagement from './AdminComponents/Pages/DatabaseManagement';
import ManagePassword from "./AdminComponents/Pages/ManagePassword";
import Logo from "./AdminComponents/Pages/Logo";
import Cookies from "js-cookie";

import Inquiry from "./AdminComponents/Pages/Inquiry"
import Footer from "./AdminComponents/Pages/Footer"
import Header from "./AdminComponents/Pages/Header"
import GoogleSettings from "./AdminComponents/Pages/GoogleSettings"
import Menulisting from "./AdminComponents/Pages/Menulisting"
import CreateMenulisting from "./AdminComponents/Pages/CreateMenulisting"
import EditMenulisting from "./AdminComponents/Pages/EditMenulisting"
import Sitemap from "./AdminComponents/Pages/Sitemap"
import CreateSitemap from "./AdminComponents/Pages/CreateSitemap"
import EditSitemap from "./AdminComponents/Pages/EditSitemap"
import Metadetails from "./AdminComponents/Pages/Metadetails"
import EditMetadetails from "./AdminComponents/Pages/EditMetadetails"
import ManageProfile from "./AdminComponents/Pages/ManageProfile"
import MissionAndVision from './AdminComponents/Pages/MissionAndVision';
import ManageColor from "./AdminComponents/Pages/ManageColor"
import CreateProductDetail from "./AdminComponents/Pages/CreateProductDetail"
import EditProductDetail from "./AdminComponents/Pages/EditProductDetail"
import ProductInquiry from "./AdminComponents/Pages/Productinquiry"
import WhyChooseUS from './AdminComponents/Pages/WhyChooseUs';
import CreateWhyChooseUS from './AdminComponents/Pages/CreateWhyChooseUs';
import EditWhyChooseUs from './AdminComponents/Pages/EditWhyChooseUs';
import PackagingDetail from "./AdminComponents/Pages/PackagingDetail"
import PackagingType from './AdminComponents/Pages/PackagingType';
import CreatePackagingType  from './AdminComponents/Pages/CreatePackagingType';
import EditPackagingType from './AdminComponents/Pages/EditPackagingType';

import DynamicMetaTags from './Clientcomponents/DynamicMeta';
import HomePage from './Clientpages/HomePage';
import AboutPage from './Clientpages/AboutPage';
import ProductPage from './Clientpages/ProductPage';
import BlogPage from './Clientpages/BlogPage';
import ContactusPage from './Clientpages/ContactusPage';
import Layout from './Clientpages/Layout';
import TeamPage from './Clientpages/TeamPage';
import ThankYouPage from './Clientcomponents/Thankyou';
import OurPeople from './AdminComponents/Pages/OurPeople';
import SlugPage from './Clientpages/SlugPage';

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      setIsLoggedIn(true);
      console.log(token)
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
    }
  }, []);

  const checkAuth = async () => {
    try {
        const response = await axios.get('/api/auth/check', { withCredentials: true });
        setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
        // Handle unauthenticated state quietly
        setIsAuthenticated(false);
    }
  };

  return (
    <BrowserRouter>
      <DynamicMetaTags />
      <Routes>
        {/* Define the main layout route */}
        {!isLoggedIn ? (
          <>
            <Route path="/thankyou" element={<ThankYouPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/about-us" element={<AboutPage />} />
              {/* <Route path="/:slugs" element={<SingleBlogPage />} /> */}
              <Route path="/:slug" element={<SlugPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact-us" element={<ContactusPage />} />
               <Route path="/blogs" element={<BlogPage />} />
              {/* <Route path="/product/:slugs" element={<ProductDetailPage />} />
              <Route path="/productcategories/:slugs" element={<ProductCategoryGrid />} /> */}
              {/* <Route path="/:categorySlug/:subCategorySlug" element={<SubCategoryProductGrid />} /> */}

            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/verifyOTP" element={<VerifyOTP />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
          </>
        ) : (
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/createNews" element={<CreateNews />} />
            <Route path="/news/editNews/:slugs" element={<EditNews />} />
            <Route path="/NewsCategory" element={<NewsCategory />} />
            <Route path="/NewsCategory/CreateNewsCategory" element={<CreateNewsCategory />} />
            <Route path="/NewsCategory/editNewsCategory/:categoryId/:subCategoryId?/:subSubCategoryId?" element={<EditNewsCategory />} />
            <Route path="/ourTeam" element={<OurStaff />} />
            <Route path="/ourTeam/createTeam" element={<CreateStaff />} />
            <Route path="/ourTeam/editTeam/:id" element={<EditStaff />} />
            <Route path="/whyChooseUs" element={<WhyChooseUS />} />
            <Route path="/whyChooseUs/createwhychooseus" element={<CreateWhyChooseUS />} />
            <Route path="/whyChooseUs/editwhychooseus/:id" element={<EditWhyChooseUs />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/banner/createBanner" element={<CreateBanner />} />
            <Route path="/banner/editBanner/:id" element={<EditBanner />} />
            <Route path="/ProductCategory" element={<ProductCategory />} />
            <Route path="/ProductCategory/CreateProductCategory" element={<CreateProductCategory />} />
            <Route path="/ProductCategory/editProductCategory/:categoryId/:subCategoryId?" element={<EditCategory />} />
            <Route path="/aboutus" element={<EditAboutus />} />
            <Route path="/product/createproductdetail" element={<CreateProductDetail />} />
            <Route path="/product/editproductdetail/:id" element={<EditProductDetail />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/createProduct" element={<CreateProduct />} />
            <Route path="/product/editProduct/:slugs" element={<EditProduct />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/partners/createPartners" element={<CreatePartners />} />
            <Route path="/product/editPartners/:id" element={<EditPartners />} />
            <Route path="/productinquiry" element={<ProductInquiry />} />
            <Route path="/manageLogo" element={<Logo />} />
            <Route path="/DatabaseManagement" element={<DatabaseManagement />} />
            <Route path="/managePassword" element={<ManagePassword />} />
            <Route path="/manageProfile" element={<ManageProfile />} />
            <Route path="/packagingtype" element={<PackagingType />} />
            <Route path="/packagingType/editPackagingType/:id" element={<EditPackagingType />} />
            <Route path="/packagingType/createPackagingType" element={<CreatePackagingType />} />
            <Route path="/Inquiry" element={<Inquiry />} />
            <Route path="/missionandvision" element={<MissionAndVision />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/header" element={<Header />} />
            <Route path="/googleSettings" element={<GoogleSettings />} />
            <Route path="/menulisting" element={<Menulisting />} />
            <Route path="/menulisting/createMenulisting" element={<CreateMenulisting />} />
            <Route path="/menulisting/editMenulisting/:id" element={<EditMenulisting />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/sitemap/createSitemap" element={<CreateSitemap />} />
            <Route path="/sitemap/editSitemap/:id/:type" element={<EditSitemap />} />
            <Route path="/metadetails" element={<Metadetails />} />
            <Route path="/metadetails/editmetaDetails/:id/:type" element={<EditMetadetails />} />
            <Route path="/manageTheme" element={<ManageColor />} />
            
            <Route path="/ourpeople" element={<OurPeople />} />
            <Route path="/packagingdetail" element={<PackagingDetail />} />

          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
