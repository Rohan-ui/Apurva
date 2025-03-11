// File: MobileMenu.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenuSharp, IoClose, IoKeypad } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiArrowDropDownLine } from 'react-icons/ri';

function MobileMenu({
    isMenuOpen,
    toggleMenu,
    menuItems,
    handleMenuItemClick,
    colorlogo,
    phoneNo,
    address,
    addresslink,
    email,
    email2,
    facebooklink,
    twitterlink,
    linkedinlink,
    youtubelink
}) {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openSubDropdown, setOpenSubDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
        setOpenSubDropdown(null);
    };

    const toggleSubDropdown = (index) => {
        setOpenSubDropdown(openSubDropdown === index ? null : index);
    };

    return (
        <div className='flex items-center justify-between px-4 py-1 lg:px-6 lg:py-4 w-full lg:hidden'>
            <Link to="/" className='flex items-center w-fit'>
                <img 
                    src={`/api/logo/download/${colorlogo.photo}`} 
                    alt={colorlogo.alt} 
                    title={colorlogo.imgTitle} 
                    className='lg:w-1/2  h-16 lg:h-[50%]'
                />
            </Link>
            
            <div className='flex gap-8 justify-center items-center'>
                <div className='hidden md:flex xl:hidden gap-2 justify-center items-center  py-4 px-6'>
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
                <div className='fixed top-0 right-0 h-full bg-gray-900 z-10 flex flex-col overflow-y-auto p-8 w-[90%]'>
                    <div className='flex justify-between h-[15%] mb-6'>
                        <Link to="/" className=''>
                            <img 
                                src={`/api/logo/download/${colorlogo.photo}`} 
                                alt={colorlogo.alt} 
                                title={colorlogo.imgTitle} 
                                className='h-full'
                            />
                        </Link>
                        <IoClose size={32} className='text-white bg-black' onClick={toggleMenu} />
                    </div>
                    
                    <ul className='flex flex-col w-full'>
                        {menuItems.map((item, index) => (
                            <li key={index} className={`flex flex-col items-center ${index !== menuItems.length - 1 ? 'border-b border-gray-700' : ''} w-full p-2`}>
                                <div className='flex justify-between items-center text-white w-full uppercase' onClick={() => toggleDropdown(index)}>
                                    <div onClick={() => handleMenuItemClick(item.path)}>{item.pagename}</div>
                                    {item.subItems && (
                                        <div className='border-gray-700'>
                                            {openDropdown === index ?
                                                <RiArrowDropDownLine size={25} className='text-primary rotate-180 transition-all duration-800' /> :
                                                <RiArrowDropDownLine size={25} className='-rotate-50 transition-all duration-800' />
                                            }
                                        </div>
                                    )}
                                </div>
                                
                                {item.subItems && openDropdown === index && (
                                    <ul className='flex flex-col text-white items-center space-y-2 w-full pl-4'>
                                        {item.subItems.map((subItem, subIndex) => (
                                            <li key={subIndex} className={`w-full py-2 ${subIndex !== item.subItems.length - 1 ? 'border-b border-gray-700' : ''}`}>
                                                <div className='flex justify-between items-center' onClick={() => toggleSubDropdown(subIndex)}>
                                                    <div onClick={() => handleMenuItemClick(subItem.path)}>
                                                        {subItem.title}
                                                    </div>
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
                                                            <li key={subsubIndex} className='w-full py-2'>
                                                                <div onClick={() => handleMenuItemClick(subsubItem.path)}>
                                                                    {subsubItem.title}
                                                                </div>
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
                            <p className='text-xl uppercase text-gray-400'>Contact Us</p>
                            <div className='flex gap-2 items-center'>
                                <a href={addresslink} target='_blank' className='hover:text-blue-500 w-[90%]'>{address}</a>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <a href={`tel:${phoneNo}`} className='hover:text-blue-500 w-[90%]'>{phoneNo}</a>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <a href={`mailto:${email}`} className='hover:text-blue-500 w-[90%]'>{email}</a>
                            </div>
                            <div className='flex gap-2 items-center'>
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
    );
}

export default MobileMenu;