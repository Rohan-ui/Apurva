import React, { useEffect, useState } from 'react';
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaXTwitter } from "react-icons/fa6";

import { Link } from 'react-router-dom';
import axios from 'axios';

// Skeleton component for loading states
const Skeleton = ({ className }) => {
  return <div className={`animate-pulse bg-gray-300 rounded ${className}`}></div>;
};

const Footer = () => {
    const [footerData, setFooterData] = useState({});
    const [headerData, setHeaderData] = useState({});
    const [whitelogo, setWhiteLogo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logoLoaded, setLogoLoaded] = useState(false);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [footerResponse, headerResponse, logoResponse] = await Promise.all([
                    axios.get('/api/footer/getFooter', { withCredentials: true }),
                    axios.get('/api/header/getHeader', { withCredentials: true }),
                    axios.get('/api/logo/footerwhite')
                ]);

                setFooterData(footerResponse.data || {});
                setHeaderData(headerResponse.data || {});
                setWhiteLogo(logoResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching footer or header data:", error);
                setLoading(false);
            }
        };

        // Set a minimum display time for the skeleton to prevent flickering
        const timer = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <footer className="bg-gray-100 text-gray-800 pt-12 pb-8 lg:px-5 xl:px-10">
            <div className="px-4 md:px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div>
                        <Link to="/">
                            {loading ? (
                                <Skeleton className="h-16 w-24 md:w-32" />
                            ) : whitelogo ? (
                                <img
                                    src={`/api/logo/download/${whitelogo.photo}`}
                                    alt={whitelogo.alt || "Logo"}
                                    title={whitelogo.imgTitle || "Company Logo"}
                                    className='md:w-[6cm] w-1/2'
                                    loading="lazy"
                                    onLoad={() => setLogoLoaded(true)}
                                    onError={() => setLogoLoaded(false)}
                                />
                            ) : (
                                <p className="text-gray-500">Logo unavailable</p>
                            )}
                        </Link>
                        {loading ? (
                            <div className="mt-6 space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        ) : (
                            <p className='mt-6'>{footerData.description || "Company description goes here."}</p>
                        )}
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h5 className="text-lg font-bold mb-4">Useful Links</h5>
                        {loading ? (
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        ) : (
                            <ul className="space-y-2">
                                <li><Link to='/about-us' className="hover:text-primary">About us</Link></li>
                                <li><Link to="/blogs" className="hover:text-blue-500">Blogs</Link></li>
                                <li><Link to="/contact-us" className="hover:text-primary">Contact us</Link></li>
                            </ul>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h5 className="text-lg font-bold mb-4">Contact Info</h5>
                        {loading ? (
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="mr-2 h-4 w-4 bg-gray-300 rounded-full"></div>
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                                <div className="flex items-center">
                                    <div className="mr-2 h-4 w-4 bg-gray-300 rounded-full"></div>
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                                <div className="flex items-center">
                                    <div className="mr-2 h-4 w-4 bg-gray-300 rounded-full"></div>
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </div>
                        ) : (
                            <ul className="space-y-2">
                                <li>
                                    <a href={footerData.addresslink} target='_blank' rel="noopener noreferrer" className="hover:text-primary flex items-center">
                                        <FaMapMarkerAlt className="mr-2 h-6 w-6" />
                                        {footerData.address || "Company Address"}
                                    </a>
                                </li>
                                <li>
                                    <a href={`tel:${footerData.phoneNo}`} className="hover:text-primary flex items-center">
                                        <FaPhoneAlt className="mr-2" />
                                        {footerData.phoneNo || "N/A"}
                                    </a>
                                </li>
                                <li>
                                    <a href={`mailto:${footerData.email}`} className="hover:text-primary flex items-center">
                                        <FaEnvelope className="mr-2" />
                                        {footerData.email || "N/A"}
                                    </a>
                                </li>
                                {footerData.email2 && (
                                    <li>
                                        <a href={`mailto:${footerData.email2}`} className="hover:text-primary flex items-center">
                                            <FaEnvelope className="mr-2" />
                                            {footerData.email2}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Location Map */}
                    <div>
                        <h5 className="text-lg font-bold mb-4">Location</h5>
                        {loading ? (
                            <Skeleton className="h-40 w-full rounded-md" />
                        ) : (
                            <iframe
                                src={footerData.location || ""}
                                className='border-0 h-[90%] w-full rounded-md'
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        )}
                        <div className='flex justify-between items-center space-x-4 float-end max-w-5xl text-gray-500 mt-9 text-sm space-y-2'>
                            <Link to="/privacy-policy"><p className='hover:text-gray-700 cursor-pointer'>Privacy Policy</p></Link>
                            <Link to="/terms-and-conditions"><p className='hover:text-gray-700 cursor-pointer'>Terms & Conditions</p></Link>
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-end space-x-4 mt-8 pr-5">
                    {loading ? (
                        <div className="flex space-x-4">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                        </div>
                    ) : (
                        <>
                            {headerData.facebooklink && (
                                <a href={headerData.facebooklink} target='_blank' rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                                    <FaFacebookF />
                                </a>
                            )}
                            {headerData.twitterlink && (
                                <a href={headerData.twitterlink} target='_blank' rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                                    <FaXTwitter />
                                </a>
                            )}
                            {headerData.linkedinlink && (
                                <a href={headerData.linkedinlink} target='_blank' rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                                    <FaInstagram />
                                </a>
                            )}
                            {headerData.youtubelink && (
                                <a href={headerData.youtubelink} target='_blank' rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                                    <FaYoutube />
                                </a>
                            )}
                        </>
                    )}
                </div>

                {/* Copyright */}
                <p className="text-gray-500 font-semibold mt-8 text-center pt-10">
                    Copyright {currentYear} © Apurva Chemicals Pvt. Ltd. All Rights Reserved.
                    Designed & Developed by <span className='text-primary font-bold'>
                        <a href="https://rndtechnosoft.com/" target='_blank' rel="noopener noreferrer">RnD Technosoft</a>
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;