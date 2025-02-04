import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd, IoIosRemove } from "react-icons/io";
import { FaRegClock, FaFacebookF, FaLinkedinIn, FaPinterestP, FaInstagram, FaYoutube, FaStar } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMenuSharp, IoClose } from "react-icons/io5";
import gsap from "gsap";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { IoKeypad } from "react-icons/io5";
import ContactUsInquiryForm from './ContactUsInquiry';
import { BiArrowFromRight } from 'react-icons/bi';
import { RiArrowDropDownLine } from 'react-icons/ri';


function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openSubDropdown, setOpenSubDropdown] = useState(null);
    const [showUpIcon, setShowUpIcon] = useState(false);
    const [menuListings, setMenuListings] = useState([]);
    const [productcategories, setProductCategories] = useState([]);
    const [blogcategories, setBlogCategories] = useState([]);
    const [phoneNo, setPhoneNo] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [colorlogo, setColorLogo] = useState([]);
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [address, setAddress] = useState("");
    const [addresslink, setAddresslink] = useState("");
    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [facebooklink, setFacebooklink] = useState("");
    const [twitterlink, setTwitterlink] = useState("");
    const [youtubelink, setYoutubelink] = useState("");
    const [linkedinlink, setLinkedinlink] = useState("");
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        fetchHeader();
    }, []);

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const response = await axios.get('/api/footer/getFooter', { withCredentials: true });
                const footer = response.data;
                setAddress(footer.address || "");
                setAddresslink(footer.addresslink || '')
                setEmail(footer.email || "");
                setEmail2(footer.email2 || "")

            } catch (error) {
                console.error(error);
            }
        };

        fetchFooter();
    }, []);

    useEffect(() => {
        if (showInquiryForm) {
            // Disable scrolling
            document.body.style.overflow = 'hidden';
        } else {
            // Enable scrolling
            document.body.style.overflow = '';
        }

        // Cleanup function to ensure scrolling is re-enabled if the component is unmounted
        return () => {
            document.body.style.overflow = '';
        };
    }, [showInquiryForm]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);


    useEffect(() => {
        const fetchHeaderColorLogo = async () => {
            try {
                const response = await axios.get('/api/logo/headercolor');
                setColorLogo(response.data);
                // console.log(colorlogo.photo)
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            }
        };

        fetchHeaderColorLogo();
    }, []);

    const fetchHeader = async () => {
        try {
            const response = await axios.get('/api/header/getHeader', { withCredentials: true });
            const header = response.data;
            setOpeningHours(header.openingHours || "");
            setPhoneNo(header.phoneNo || '')
            setFacebooklink(header.facebooklink || "");
            setTwitterlink(header.twitterlink || "");
            setYoutubelink(header.youtubelink || "");
            setLinkedinlink(header.linkedinlink || "");
        } catch (error) {
            console.error(error);
        }
    };

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const upIconRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setOpenDropdown(null);
        setOpenSubDropdown(null);
    };

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
        setOpenSubDropdown(null);
    };

    const toggleSubDropdown = (index) => {
        setOpenSubDropdown(openSubDropdown === index ? null : index);
    };




    const handleScroll = () => {
        // Only run animation if component is mounted and ref exists
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

    const menuPaths = {
        about: "/about-us",
        contact: "/contact-us",
        blog: "/blogs"
    };

    const handleMenuItemClick = (path) => {
        navigate(path);
        setIsMenuOpen(false);  // Close the menu on path change
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/news/getCategoryAndPhoto');
                setBlogCategories(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                const response = await axios.get('/api/product/getCategoryAndPhoto');
                setProductCategories(response.data);
                console.log(response.data)
            } catch (err) {
                console.error(err);
            }
        };
        fetchProductCategories();
    }, []);


    useEffect(() => {
        const fetchMenuListings = async () => {
            try {
                // Add base URL if needed
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
                setMenuListings([]); // Set empty array as fallback
            }
        };
        fetchMenuListings();
    }, []);

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



    useEffect(() => {
        setIsInitialized(true);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            setIsInitialized(false);
        };
    }, []);

    useEffect(() => {
        gsap.set(upIconRef.current, { y: -200, opacity: 0 });
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto'; // Clean up on unmount
        };
    }, [isMenuOpen]);

    return (
        <>

            <div className='sticky top-0 z-50 bg-white w-full border-b-2'>
                {showInquiryForm && (
                    <ContactUsInquiryForm
                        onClose={() => setShowInquiryForm(false)}
                    />
                )}
                {/* Mobile Menu */}
                <div className='flex items-center  justify-between px-4 py-1 lg:px-6 lg:py-4 w-full lg:hidden'>
                    <Link to="/" className='flex  items-center '>
                        <img src={`/api/logo/download/${colorlogo.photo}`} alt={colorlogo.alt} title={colorlogo.imgTitle} className='lg:w-1/2 w-[50%] lg:h-[70%] ' />
                    </Link>
                    <div className='flex gap-8 justify-center items-center'>
                        <div className=' hidden md:flex xl:hidden gap-2 justify-center items-center shadow-md py-4 px-6'>
                            <IoKeypad className='text-[#BE2D2D]' size={20} />
                            <p className='uppercase text-gray-500 font-bold'>
                                Help Desk :
                                <span className='font-bold text-black'>
                                    <a href={`tel:${phoneNo}`} className='text-black'>{phoneNo}</a>
                                </span>
                            </p>
                        </div>
                        <div onClick={toggleMenu}>
                            <IoMenuSharp size={32} className={`${isMenuOpen ? 'hidden' : 'block'}`} />
                        </div>
                    </div>
                    {/* Mobile Menu Content */}
                    {isMenuOpen && (
                        <div className='fixed top-0 right-0  h-full bg-gray-900 z-10 flex flex-col overflow-y-auto p-8 w-[90%]'>
                            <div className='flex justify-between h-[15%] mb-6'>
                                <Link to="/" className=''> <img src={`/api/logo/download/${colorlogo.photo}`} alt={colorlogo.alt} imgTitle={colorlogo.imgTitle} className='h-full' /></Link>
                                <IoClose size={32} className='text-white bg-black ' onClick={toggleMenu} />
                            </div>
                            <ul className='flex flex-col w-full'>
                                {menuItems.map((item, index) => (
                                    <li key={index} className={`flex flex-col items-center ${index !== menuItems.length - 1 ? 'border-b border-gray-700' : ''} w-full p-2`}>
                                        <div className='flex justify-between items-center text-white w-full uppercase' onClick={() => toggleDropdown(index)}>
                                            <div onClick={() => handleMenuItemClick(item.path)}>{item.pagename}</div>
                                            {item.subItems && (
                                                <div className=' border-gray-700'>
                                                    {openDropdown === index ?
                                                        <RiArrowDropDownLine  size={25} className='text-primary rotate-180 transition-all duration-800' /> :
                                                        <RiArrowDropDownLine  size={25} className='-rotate-50 transition-all duration-800' />
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        {item.subItems && openDropdown === index && (
                                            <ul className='flex flex-col text-white items-center space-y-2  w-full pl-4'>
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <li key={subIndex} className={`w-full  py-2 ${subIndex !== item.subItems.length - 1 ? 'border-b border-gray-700' : ''}`}>
                                                        <div className='flex justify-between items-center' onClick={() => toggleSubDropdown(subIndex)}>
                                                            <div onClick={() => handleMenuItemClick(subItem.path)}>{subItem.title}</div>
                                                            {subItem.subsubItems && (
                                                                <div className='border border-gray-700'>
                                                                    {openSubDropdown === subIndex ?
                                                                        <IoIosRemove size={20} className='text-primary' /> :
                                                                        <IoIosAdd size={20} />
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                        {subItem.subsubItems && openSubDropdown === subIndex && (
                                                            <ul className='flex flex-col text-white items-center space-y-2 w-full pl-4 mt-2'>
                                                                {subItem.subsubItems.map((subsubItem, subsubIndex) => (
                                                                    <li key={subsubIndex} className='w-full  py-2'>
                                                                        <div onClick={() => handleMenuItemClick(subsubItem.path)}>{subsubItem.title}</div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <div className='flex flex-col w-full space-y-5 lg:hidden'>
                                <div className='text-white space-y-3 pt-10'>
                                    <p className='text-xl  uppercase text-gray-400'>Contact Us</p>
                                    <div className='flex gap-2 items-center'>
                                        {/* <FaStar className='text-yellow-300 text-[14px] w-[10%]' /> */}
                                        <a href={addresslink} target='_blank' className='hover:text-blue-500 w-[90%]'>{address}</a>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        {/* <FaStar className='text-yellow-300 text-[14px] w-[10%]' /> */}
                                        <a href={`tel:${phoneNo}`} className='hover:text-blue-500 w-[90%]'>{phoneNo}</a>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        {/* <FaStar className='text-yellow-300 text-[14px] w-[10%]' /> */}
                                        <a href={`mailto:${email}`} className='hover:text-blue-500 w-[90%]'>{email}</a>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        {/* <FaStar className='text-yellow-300 text-[14px] w-[10%]' /> */}
                                        <a href={`mailto:${email2}`} className='hover:text-blue-500 w-[90%]'>{email2}</a>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center space-x-5'>
                                    <a href={facebooklink} target='_blank' className="text-gray-400 hover:text-blue-500"><FaFacebookF /></a>
                                    <a href={twitterlink} target='_blank' className="text-gray-400 hover:text-blue-500"><FaXTwitter /></a>
                                    <a href={linkedinlink} target='_blank' className="text-gray-400 hover:text-blue-500"><FaInstagram /></a>
                                    <a href={youtubelink} target='_blank' className="text-gray-400 hover:text-blue-500"><FaYoutube /></a>
                                </div>
                            </div>
                        </div>
                    )}


                </div>


                {/* Desktop Menu */}
                <div className='hidden lg:block'>
                    <div className='flex items-center w-full bg-white font-semibold'>
                        <Link to="/" className='w-[20%] h-24  flex justify-center items-center px-4'>
                            <img
                                src={`/api/logo/download/${colorlogo.photo}`}
                                alt={colorlogo.alt}
                                title={colorlogo.imgTitle}
                                className='w-auto h-[16vh] object-contain'
                            />
                        </Link>

                        <div className='w-[80%] flex  flex-col border-l '>
                            <div className='border-b'>
                                <div className='flex justify-end items-center gap-6 px-8 py-4'>
                                    <div className='flex gap-2 justify-center items-center'>
                                        <IoKeypad className='text-primary' size={20} />
                                        <p className='uppercase text-gray-500 font-bold'>Help Desk : <span className='font-bold text-black'>

                                            <a href={`tel:${phoneNo}`} className='text-gray-500 hover:text-blue-500'>{phoneNo}</a>

                                        </span>
                                        </p>
                                    </div>
                                    <div className='flex gap-2 justify-center items-center'>
                                        <FaRegClock className='text-primary' />
                                        <p className='uppercase font-bold text-[14px] text-gray-500 '>{openingHours}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Menu Items */}
                            <div className='lg:flex justify-between -mb-[2px] items-center hidden '>
                                <div className='hidden lg:flex items-center justify-center space-x-8 pl-8 uppercase font-bold'>
                                    {menuItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className='relative cursor-pointer flex items-center font-montserrat group hover:text-secondary py-4'
                                        >
                                            <div
                                                onClick={() => handleMenuItemClick(item.path)}
                                                className='inline-block '
                                            >
                                                {item.pagename}
                                            </div>
                                            {item.subItems && (
                                                <span className='ml-1'>
                                                    <IoIosArrowDown />
                                                </span>
                                            )}
                                            {item.subItems && (
                                                <ul className='absolute top-full  left-0  rounded w-48 z-20  hidden group-hover:block transition-opacity duration-300'>
                                                    {item.subItems.map((subItem, subIndex) => (
                                                        <li
                                                            key={subIndex}
                                                            className='px-4 py-2 shadow-md text-primary border-b-1 border-gray-400 bg-white hover:shadow-lg   relative group/subitem'
                                                        >
                                                            <div onClick={() => handleMenuItemClick(subItem.path)} className='flex justify-between items-center'>
                                                                {subItem.title}
                                                            </div>
                                                            {subItem.subsubItems && (
                                                                <ul className='bg-white border border-gray-500 w-[40rem] absolute left-full top-0 hidden group-hover/subitem:grid grid-cols-2'>
                                                                    {subItem.subsubItems.map((subsubItem, subsubIndex) => (
                                                                        <li
                                                                            key={subsubIndex}
                                                                            className='p-2 px-6 bg-white hover:text-white  text-black hover:bg-primary '
                                                                            onClick={() => handleMenuItemClick(subsubItem.path)}
                                                                        >
                                                                            {subsubItem.title}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className='flex items-center border-t-1 border-gray-400 -mt-[2px]  h-full'>
                                    <button
                                        onClick={() => setShowInquiryForm(true)}
                                        className='border border-gray-400 px-8  bg-primary text-white h-full py-4 uppercase hover:bg-secondary transition-colors duration-300'
                                    >
                                        Inquiry Now
                                    </button>
                                </div>
                            </div>

                        </div>


                        {/* Social Icons */}

                    </div>
                </div>
            </div>

            {/* Scroll-to-top icon */}
            {showUpIcon && (
                <div
                    ref={upIconRef}
                    className="fixed bottom-8 right-8 w-10 h-10 bg-primary text-white rounded-md flex items-center justify-center cursor-pointer z-40"
                    onClick={scrollToTop}
                >
                    <IoIosArrowUp size={24} />
                </div>
            )}
        </>
    );
}

export default Navbar;