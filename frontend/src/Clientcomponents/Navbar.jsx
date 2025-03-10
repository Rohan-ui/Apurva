// File: Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from "gsap";
import axios from 'axios';

// Import components
import MobileMenu from './navbar/MobileMenu';
import DesktopMenu from './navbar/DesktopMenu';
import ContactUsInquiryForm from './ContactUsInquiry';
import ScrollToTopButton from './navbar/ScrollToTopButton';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [menuListings, setMenuListings] = useState([]);
    const [productcategories, setProductCategories] = useState([]);
    const [blogcategories, setBlogCategories] = useState([]);
    const [colorlogo, setColorLogo] = useState([]);
    
    // Header/Footer state
    const [phoneNo, setPhoneNo] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [address, setAddress] = useState("");
    const [addresslink, setAddresslink] = useState("");
    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [facebooklink, setFacebooklink] = useState("");
    const [twitterlink, setTwitterlink] = useState("");
    const [youtubelink, setYoutubelink] = useState("");
    const [linkedinlink, setLinkedinlink] = useState("");

    // Scroll to top functionality
    const [showUpIcon, setShowUpIcon] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const upIconRef = useRef(null);

    // Fetch data on component mount
    useEffect(() => {
        fetchHeader();
        fetchFooterData();
        fetchMenuListings();
        fetchBlogCategories();
        fetchProductCategories();
        fetchHeaderColorLogo();
        
        // Scroll to top when pathname changes
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Handle inquiry form modal scroll behavior
    useEffect(() => {
        if (showInquiryForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [showInquiryForm]);

    // Handle mobile menu scroll behavior
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    // Scroll to top button setup
    useEffect(() => {
        setIsInitialized(true);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            setIsInitialized(false);
        };
    }, []);

    useEffect(() => {
        if (upIconRef.current) {
            gsap.set(upIconRef.current, { y: -200, opacity: 0 });
        }
    }, []);

    // Data fetching functions
    const fetchHeader = async () => {
        try {
            const response = await axios.get('/api/header/getHeader', { withCredentials: true });
            const header = response.data;
            setOpeningHours(header.openingHours || "");
            setPhoneNo(header.phoneNo || '');
            setFacebooklink(header.facebooklink || "");
            setTwitterlink(header.twitterlink || "");
            setYoutubelink(header.youtubelink || "");
            setLinkedinlink(header.linkedinlink || "");
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFooterData = async () => {
        try {
            const response = await axios.get('/api/footer/getFooter', { withCredentials: true });
            const footer = response.data;
            setAddress(footer.address || "");
            setAddresslink(footer.addresslink || '');
            setEmail(footer.email || "");
            setEmail2(footer.email2 || "");
        } catch (error) {
            console.error(error);
        }
    };

    const fetchHeaderColorLogo = async () => {
        try {
            const response = await axios.get('/api/logo/headercolor');
            setColorLogo(response.data);
        } catch (err) {
            console.error(err.response ? err.response.data.message : err.message);
        }
    };

    const fetchBlogCategories = async () => {
        try {
            const response = await axios.get('/api/news/getCategoryAndPhoto');
            setBlogCategories(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchProductCategories = async () => {
        try {
            const response = await axios.get('/api/product/getCategoryAndPhoto');
            setProductCategories(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMenuListings = async () => {
        try {
            const baseURL = import.meta.env.VITE_API_URL || '';
            const response = await axios.get(`${baseURL}/api/menulisting/getMenulisting`, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && typeof response.data === 'object') {
                setMenuListings(response.data.menuListings || []);
            } else {
                console.warn('Invalid menu listings data format');
                setMenuListings([]);
            }
        } catch (error) {
            if (error.response?.status === 404) {
                console.warn('Menu listings endpoint not found');
            } else {
                console.error('Error fetching menu listings:', error);
            }
            setMenuListings([]);
        }
    };

    // Helper functions
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const handleScroll = () => {
        if (!upIconRef.current || !isInitialized) return;

        if (window.scrollY > 0) {
            setShowUpIcon(true);
            gsap.to(upIconRef.current, {
                opacity: 1,
                duration: 0.5,
                y: 0,
                onStart: () => {
                    upIconRef.current.style.display = 'flex';
                }
            });
        } else {
            gsap.to(upIconRef.current, {
                opacity: 0,
                duration: 0.5,
                y: -200,
                onComplete: () => {
                    setShowUpIcon(false);
                }
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Process menu items
    const menuPaths = {
        about: "/about-us",
        contact: "/contact-us",
        blog: "/blogs"
    };

    const menuItems = (menuListings || []).map((item) => {
        if (!item || !item.pagename) return null;

        const pagenameLower = item.pagename.toLowerCase();
        let path = item.path || '';

        // Check the page name and set the path accordingly
        if (pagenameLower.includes('about')) {
            path = menuPaths.about;
        } else if (pagenameLower.includes('blog')) {
            path = menuPaths.blog;
        } else if (pagenameLower.includes('products')) {
            path = menuPaths.product;
        } else if (pagenameLower.includes('contact')) {
            path = menuPaths.contact;
        }

        // Add subItems for 'Product' if categories and subcategories are available
        if ((item.pagename === 'Product' || item.pagename === 'Products') && productcategories.length > 0) {
            return {
                ...item,
                path,
                subItems: productcategories.map(category => ({
                    title: category.category || '',
                    path: `/${category.slug || ''}`,
                }))
            };
        }

        return {
            ...item,
            path
        };
    }).filter(Boolean);

    return (
        <>
            <div className='sticky top-0 z-50 bg-white w-full border-b-2'>
                {showInquiryForm && (
                    <ContactUsInquiryForm onClose={() => setShowInquiryForm(false)} />
                )}
                
                {/* Mobile Menu */}
                <MobileMenu 
                    isMenuOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    menuItems={menuItems}
                    handleMenuItemClick={handleMenuItemClick}
                    colorlogo={colorlogo}
                    phoneNo={phoneNo}
                    address={address}
                    addresslink={addresslink}
                    email={email}
                    email2={email2}
                    facebooklink={facebooklink}
                    twitterlink={twitterlink}
                    linkedinlink={linkedinlink}
                    youtubelink={youtubelink}
                />

                {/* Desktop Menu */}
                <DesktopMenu 
                    menuItems={menuItems}
                    handleMenuItemClick={handleMenuItemClick}
                    colorlogo={colorlogo}
                    phoneNo={phoneNo}
                    setShowInquiryForm={setShowInquiryForm}
                />
            </div>

            {/* Scroll-to-top icon */}
            {showUpIcon && (
                <ScrollToTopButton ref={upIconRef} onClick={scrollToTop} />
            )}
        </>
    );
}

export default Navbar;