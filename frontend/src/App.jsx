import './App.css';
import './quill.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import useDocumentTitle from './AdminComponents/Pages/metaInfo/DynamicData';

// Eagerly load components needed for initial render and small components
import DynamicMetaTags from './Clientcomponents/DynamicMeta';
import Login from "./AdminComponents/Adminlogin";
import Signup from "./AdminComponents/Adminsignup";
import VerifyOTP from "./AdminComponents/VerifyOTP";
import ResetPassword from "./AdminComponents/ResetPassword";
import ForgetPassword from './AdminComponents/ForgotPassword';
import HomePage from "./Clientpages/HomePage"
// Lazy load admin components
const Sidebar = lazy(() => import('./AdminComponents/Sidebar'));
const Dashboard = lazy(() => import('./AdminComponents/Pages/Dashboard'));
const News = lazy(() => import('./AdminComponents/Pages/News'));
const CreateNews = lazy(() => import('./AdminComponents/Pages/CreateNews'));
const EditNews = lazy(() => import('./AdminComponents/Pages/EditNews'));
const NewsCategory = lazy(() => import('./AdminComponents/Pages/NewsCategory'));
const CreateNewsCategory = lazy(() => import('./AdminComponents/Pages/CreateNewsCategory'));
const EditNewsCategory = lazy(() => import('./AdminComponents/Pages/EditNewsCategory'));
const OurStaff = lazy(() => import('./AdminComponents/Pages/Staff'));
const CreateStaff = lazy(() => import('./AdminComponents/Pages/CreateStaff'));
const EditStaff = lazy(() => import('./AdminComponents/Pages/EditStaff'));
const Banner = lazy(() => import('./AdminComponents/Pages/Banner'));
const CreateBanner = lazy(() => import('./AdminComponents/Pages/CreateBanner'));
const EditBanner = lazy(() => import('./AdminComponents/Pages/EditBanner'));
const Partners = lazy(() => import('./AdminComponents/Pages/Partners'));
const CreatePartners = lazy(() => import('./AdminComponents/Pages/CreatePartners'));
const EditPartners = lazy(() => import('./AdminComponents/Pages/EditPartners'));
const ProductCategory = lazy(() => import('./AdminComponents/Pages/ProductCategory'));
const CreateProductCategory = lazy(() => import('./AdminComponents/Pages/CreateCategory'));
const EditCategory = lazy(() => import('./AdminComponents/Pages/EditCategory'));
const Product = lazy(() => import('./AdminComponents/Pages/Product'));
const CreateProduct = lazy(() => import('./AdminComponents/Pages/CreateProduct'));
const EditProduct = lazy(() => import('./AdminComponents/Pages/EditProduct'));
const EditAboutus = lazy(() => import('./AdminComponents/Pages/EditAboutus'));
const DatabaseManagement = lazy(() => import('./AdminComponents/Pages/DatabaseManagement'));
const ManagePassword = lazy(() => import('./AdminComponents/Pages/ManagePassword'));
const Logo = lazy(() => import('./AdminComponents/Pages/Logo'));
const Inquiry = lazy(() => import('./AdminComponents/Pages/Inquiry'));
const Footer = lazy(() => import('./AdminComponents/Pages/Footer'));
const Header = lazy(() => import('./AdminComponents/Pages/Header'));
const GoogleSettings = lazy(() => import('./AdminComponents/Pages/GoogleSettings'));
const Menulisting = lazy(() => import('./AdminComponents/Pages/Menulisting'));
const CreateMenulisting = lazy(() => import('./AdminComponents/Pages/CreateMenulisting'));
const EditMenulisting = lazy(() => import('./AdminComponents/Pages/EditMenulisting'));
const Sitemap = lazy(() => import('./AdminComponents/Pages/Sitemap'));
const CreateSitemap = lazy(() => import('./AdminComponents/Pages/CreateSitemap'));
const EditSitemap = lazy(() => import('./AdminComponents/Pages/EditSitemap'));
const Metadetails = lazy(() => import('./AdminComponents/Pages/Metadetails'));
const EditMetadetails = lazy(() => import('./AdminComponents/Pages/EditMetadetails'));
const ManageProfile = lazy(() => import('./AdminComponents/Pages/ManageProfile'));
const MissionAndVision = lazy(() => import('./AdminComponents/Pages/MissionAndVision'));
const ManageColor = lazy(() => import('./AdminComponents/Pages/ManageColor'));
const CreateProductDetail = lazy(() => import('./AdminComponents/Pages/CreateProductDetail'));
const EditProductDetail = lazy(() => import('./AdminComponents/Pages/EditProductDetail'));
const ProductInquiry = lazy(() => import('./AdminComponents/Pages/Productinquiry'));
const WhyChooseUS = lazy(() => import('./AdminComponents/Pages/WhyChooseUs'));
const CreateWhyChooseUS = lazy(() => import('./AdminComponents/Pages/CreateWhyChooseUs'));
const EditWhyChooseUs = lazy(() => import('./AdminComponents/Pages/EditWhyChooseUs'));
const PackagingDetail = lazy(() => import('./AdminComponents/Pages/PackagingDetail'));
const PackagingType = lazy(() => import('./AdminComponents/Pages/PackagingType'));
const CreatePackagingType = lazy(() => import('./AdminComponents/Pages/CreatePackagingType'));
const EditPackagingType = lazy(() => import('./AdminComponents/Pages/EditPackagingType'));
const OurPeople = lazy(() => import('./AdminComponents/Pages/OurPeople'));
const Industry = lazy(() => import('./AdminComponents/industry/IndustryTable'));
const CreateIndustry = lazy(() => import('./AdminComponents/industry/IndustryForm'));
const MetaList = lazy(() => import('./AdminComponents/Pages/metaInfo/MetaInfoTable'));
const StaticMetaForm = lazy(() => import('./AdminComponents/Pages/metaInfo/StaticMetaInfoForm'));

// Lazy load client components
const Layout = lazy(() => import('./Clientpages/Layout'));
const AboutPage = lazy(() => import('./Clientpages/AboutPage'));
const ProductPage = lazy(() => import('./Clientpages/ProductPage'));
const BlogPage = lazy(() => import('./Clientpages/BlogPage'));
const ContactusPage = lazy(() => import('./Clientpages/ContactusPage'));
const TeamPage = lazy(() => import('./Clientpages/TeamPage'));
const ThankYouPage = lazy(() => import('./Clientcomponents/Thankyou'));
const SlugPage = lazy(() => import('./Clientpages/SlugPage'));
const TermsAndConditions = lazy(() => import('./Clientpages/TermsAndCondition'));
const PrivacyPolicy = lazy(() => import('./Clientpages/PrivacyPolicy'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useDocumentTitle();

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      setIsLoggedIn(true);
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
    }
  }, []);

  // Dynamic Favicon Setup
  useEffect(() => {
    const fetchFavicon = async () => {
      try {
        const response = await axios.get('/api/logo');
        const data = response.data;

        // Filter to find the favicon
        const faviconData = data.find(item => item.type === 'favicon');

        if (faviconData && faviconData.photo) {
          const faviconURL = `/api/logo/download/${faviconData.photo}`;

          let favicon = document.querySelector("link[rel~='icon']");
          if (!favicon) {
            favicon = document.createElement('link');
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
          }
          favicon.href = faviconURL;
        } else {
          console.warn("Favicon not found in the API response.");
        }
      } catch (error) {
        console.error("Error fetching favicon:", error);
      }
    };

    fetchFavicon();
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
      {/* <Suspense > */}
        <Routes>
          {/* Define the main layout route */}
          {!isLoggedIn ? (
            <>
              <Route path="/thankyou" element={<ThankYouPage />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/:slug" element={<SlugPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/contact-us" element={<ContactusPage />} />
                <Route path="/blogs" element={<BlogPage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
              
              {/* Industry section */}
              <Route path="/industry" element={<Industry />} />
              <Route path="/industry-form" element={<CreateIndustry />} />
              <Route path="/industry-form/:id" element={<CreateIndustry />} />

              {/* Static meta path */}
              <Route path="/meta-info" element={<MetaList />} />
              <Route path="/meta-form" element={<StaticMetaForm />} />
              <Route path="/edit-meta-form/:id" element={<StaticMetaForm />} />
            </Route>
          )}
        </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  );
}

export default App;