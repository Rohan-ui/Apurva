import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import { IoKeypad } from "@react-icons/all-files/io5/IoKeypad";


function DesktopMenu({ menuItems, handleMenuItemClick, colorlogo, phoneNo, setShowInquiryForm, isLoading = false }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const logoUrl = `/api/logo/download/${colorlogo?.photo}`;

    // Preload the logo image
    useEffect(() => {
        if (colorlogo?.photo) {
            const preloadImage = new Image();
            preloadImage.src = logoUrl;
            preloadImage.onload = () => setTimeout(() => setImageLoaded(true), 100);
        }
    }, [colorlogo]);

    // Skeleton Loader for the entire menu
    if (isLoading) {
        return (
            <div className="lg:w-1/2 flex justify-center items-center mt-8 md:mt-0">
                <div className="flex items-center justify-center lg:relative">
                    <div className="w-[70%] md:w-1/2 lg:h-[500px] lg:w-[450px] lg:mt-16 xl:h-[600px] xl:w-[500px] bg-gray-200 animate-pulse rounded"></div>
                    <div className="hidden md:block md:w-[40%] lg:absolute lg:-right-5 lg:top-10 xl:top-56 xl:left-[360px]">
                        <div className="h-40 w-40 lg:h-60 lg:w-60 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='hidden lg:block'>
            <div className='flex items-center w-full bg-white font-semibold'>
                <Link to="/" className='w-[20%] h-24 flex justify-center items-center px-4'>
                    {!imageLoaded && (
                        <div className="w-32 h-16 bg-gray-200 animate-pulse rounded"></div>
                    )}
                    {colorlogo?.photo && (
                        <>
                            <link rel="preload" href={logoUrl} as="image" />
                            <img
                                src={logoUrl}
                                alt={colorlogo.alt || 'Company Logo'}
                                title={colorlogo.imgTitle || 'Company Logo'}
                                className={`w-auto h-[16vh] object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'hidden'}`}
                                loading="lazy"
                                onLoad={() => setImageLoaded(true)}
                            />
                        </>
                    )}
                </Link>

                <div className='w-[80%] flex flex-col border-l'>
                    <div className='border-b'>
                        <div className='flex justify-end items-center gap-6 px-8 py-4'>
                            <div className='flex gap-2 justify-center items-center'>
                                <IoKeypad className='text-primary' size={20} />
                                {isLoading ? (
                                    <div className="h-5 w-36 bg-gray-200 animate-pulse rounded"></div>
                                ) : (
                                    <p className='uppercase text-gray-500 font-bold'>
                                        Help Desk :
                                        <span className='font-bold text-black'>
                                            <a href={`tel:${phoneNo}`} className='text-gray-500 hover:text-blue-500'>{phoneNo}</a>
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='lg:flex justify-between -mb-[2px] items-center hidden'>
                        <div className='hidden lg:flex items-center justify-center space-x-8 pl-8 uppercase font-bold'>
                            {isLoading ? (
                                Array(5).fill().map((_, index) => (
                                    <div key={index} className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
                                ))
                            ) : (
                                menuItems.map((item, index) => (
                                    <DesktopMenuItem
                                        key={index}
                                        item={item}
                                        handleMenuItemClick={handleMenuItemClick}
                                        isLoading={isLoading}
                                    />
                                ))
                            )}
                        </div>

                        <div className='flex items-center border-t-1 border-gray-400 -mt-[2px] h-full'>
                            <button
                                onClick={() => setShowInquiryForm(true)}
                                className='border border-gray-400 px-8 bg-primary text-white h-full py-4 uppercase hover:bg-secondary transition-colors duration-300'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="h-5 w-24 bg-primary-dark animate-pulse rounded"></div>
                                ) : (
                                    "Inquiry Now"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-component for desktop menu items
function DesktopMenuItem({ item, handleMenuItemClick, isLoading }) {
    const [subMenuLoaded, setSubMenuLoaded] = useState(false);

    useEffect(() => {
        if (item.subItems) {
            const timer = setTimeout(() => {
                setSubMenuLoaded(true);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [item.subItems]);

    return (
        <div className='relative cursor-pointer flex items-center font-montserrat group hover:text-secondary py-4'>
            <div onClick={() => handleMenuItemClick(item.path)} className='inline-block'>
                {item.pagename}
            </div>

            {item.subItems && <span className='ml-1'><IoIosArrowDown /></span>}

            {item.subItems && (
                <ul className='absolute top-full left-0 rounded w-48 z-20 hidden group-hover:block transition-opacity duration-300'>
                    {!subMenuLoaded ? (
                        Array(3).fill().map((_, index) => (
                            <li key={index} className='px-4 py-2 shadow-md border-b-1 border-gray-400 bg-white'>
                                <div className="h-5 w-32 bg-gray-200 animate-pulse rounded"></div>
                            </li>
                        ))
                    ) : (
                        item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex} className='px-4 py-2 shadow-md text-primary border-b-1 border-gray-400 bg-white hover:shadow-lg relative group/subitem'>
                                <div onClick={() => handleMenuItemClick(subItem.path)} className='flex justify-between items-center'>
                                    {subItem.title}
                                </div>

                                {subItem.subsubItems && (
                                    <ul className='bg-white border border-gray-500 w-[40rem] absolute left-full top-0 hidden group-hover/subitem:grid grid-cols-2'>
                                        {subItem.subsubItems.map((subsubItem, subsubIndex) => (
                                            <li key={subsubIndex} className='p-2 px-6 bg-white hover:text-white text-black hover:bg-primary' onClick={() => handleMenuItemClick(subsubItem.path)}>
                                                {subsubItem.title}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default DesktopMenu;
