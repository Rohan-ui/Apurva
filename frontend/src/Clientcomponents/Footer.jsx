import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaXTwitter } from "react-icons/fa6";
import axios from 'axios'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {

    const [description, setDescription] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [address, setAddress] = useState("");
    const [addresslink, setAddresslink] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [location, setLocation] = useState("")
    const [whitelogo, setWhiteLogo] = useState([]);
    const [facebooklink, setFacebooklink] = useState("");
    const [twitterlink, setTwitterlink] = useState("");
    const [youtubelink, setYoutubelink] = useState("");
    const [linkedinlink, setLinkedinlink] = useState("");

    useEffect(() => {
        const fetchFooterColorLogo = async () => {
            try {
                const response = await axios.get('/api/logo/footerwhite');
                setWhiteLogo(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchFooterColorLogo();
    }, []);

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const response = await axios.get('/api/footer/getFooter', { withCredentials: true });
                const footer = response.data;
                setAddress(footer.address || "");
                setAddresslink(footer.addresslink || "");
                setDescription(footer.description || "");
                setPhoneNo(footer.phoneNo || "");
                setEmail(footer.email || "");
                setEmail2(footer.email2 || "");
                setLocation(footer.location || "");
            } catch (error) {
                console.error(error);
            }
        };

        const fetchHeader = async () => {
            try {
                const response = await axios.get('/api/header/getHeader', { withCredentials: true });
                const header = response.data;
                setOpeningHours(header.openingHours || "");
                setFacebooklink(header.facebooklink || "");
                setTwitterlink(header.twitterlink || "");
                setYoutubelink(header.youtubelink || "");
                setLinkedinlink(header.linkedinlink || "");
            } catch (error) {
                console.error(error);
            }
        };

        fetchFooter();
        fetchHeader();
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 text-gray-800 pt-12 pb-8 lg:px-5 xl:px-10">
            <div className="px-4 md:px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <Link to="/"><img src={`/api/logo/download/${whitelogo.photo}`} alt={whitelogo.alt} title={whitelogo.imgTitle} className='md:w-[6cm] w-1/2' /></Link>
                        <p className='mt-6'>{description}</p>
                    </div>
                    {/* Useful Links */}
                    <div>
                        <h5 className="text-lg font-bold mb-4">Useful Links</h5>
                        <ul className="space-y-2">
                            <li><Link to='/about-us' href="#" className="hover:text-primary">About us</Link></li>
                            <li><Link to="/blogs" className="hover:text-blue-500">Blogs</Link></li>

                            <li><Link to="/contact-us" className="hover:text-primary">Contact us</Link></li>

                            {/* <li><Link to="/services" className="hover:text-blue-500">Services</Link></li> */}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h5 className="text-lg font-bold mb-4">Contact Info</h5>
                        <div>
                            <h5 className="text-lg font-bold mb-4">Contact Info</h5>
                            <ul className="space-y-2">
                                <li>
                                    <a href={addresslink} target='_blank' className="hover:text-primary flex items-center">
                                        <FaMapMarkerAlt className="mr-2 h-6 w-6 " />
                                        {address}
                                    </a>
                                </li>
                                <li>
                                    <a href={`tel:${phoneNo}`} className="hover:text-primary flex items-center">
                                        <FaPhoneAlt className="mr-2" />
                                        {phoneNo}
                                    </a>
                                </li>
                                <li>
                                    <a href={`mailto:${email}`} className="hover:text-primary flex items-center">
                                        <FaEnvelope className="mr-2" />
                                        {email}
                                    </a>
                                </li>
                                <li>
                                    <a href={`mailto:${email2}`} className="hover:text-primary flex items-center">
                                        <FaEnvelope className="mr-2" />
                                        {email2}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-lg font-bold mb-4">Location</h5>
                        <iframe src={location} className='border-0 space-y-2 h-[90%] w-full rounded-md' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <div className='flex justify-between items-center space-x-4  float-end max-w-5xl text-gray-500  mt-9 text-sm space-y-2'>
                 <Link to="/privacy-policy">   <p className='mt-2 hover:text-gray-700 cursor-pointer'>Privacy Policy</p></Link>
                
                <Link to="/terms-and-conditions"> <p className=' hover:text-gray-700 cursor-pointer'>Terms & Conditions</p></Link>
                </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8 pr-5">
                    <a href={facebooklink} target='_blank' className="text-gray-600 hover:text-primary"><FaFacebookF /></a>
                    <a href={twitterlink} target='_blank' className="text-gray-600 hover:text-primary"><FaXTwitter /></a>
                    <a href={linkedinlink} target='_blank' className="text-gray-600 hover:text-primary"><FaInstagram /></a>
                    <a href={youtubelink} target='_blank' className="text-gray-600 hover:text-primary"><FaYoutube /></a>
                </div>

                {/* Social Media Links */}
               


            </div>
                <p className="text-gray-500 font-semibold mt-8 text-center pt-10">Copyright {currentYear} © Apurva Chemicals Pvt. Ltd. All Rights Reserved. Designed & Developed by  <span className='text-primary font-bold '><a href="https://rndtechnosoft.com/" target='_blank'>RnD Technosoft</a></span></p>
        </footer>
    );
};

export default Footer;
