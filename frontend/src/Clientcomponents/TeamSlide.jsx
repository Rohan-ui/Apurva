import React,{useEffect,useState} from 'react';
import Slider from 'react-slick';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const TeamSlide = () => {

    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [staff, setStaff] = useState([]);

    const fetchData = async () => {

        try {
            const response = await axios.get(`/api/staff/getActiveStaff`, { withCredentials: true });
            const staffWithIds = response.data.data.map((staffMember, index) => ({
                ...staffMember,
            }));
            setStaff(staffWithIds);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=ourStaff', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchHeadings();
    }, []);

    return (
        <div className="w-full mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-cover bg-center">
            <div className='flex flex-col justify-center items-center text-center'>
                <div>
                    <p className='text-primary font-bold uppercase md:text-[20px] py-8'>____ {heading}</p>
                </div>
                <div className='space-y-5 py-5 lg:flex lg:items-center lg:justify-between gap-2'>
                    <p className='text-3xl sm:text-4xl text-gray-800 md:text-5xl font-daysOne'>{subheading}</p>
                </div>
            </div>
            <Slider {...settings}>
                {staff.map((member, index) => (
                    <div key={index} className="p-4">
                        <div className="rounded-lg text-center hover:scale-105 duration-500">
                            <div className=" py-6">
                                <img className="w-auto h-auto mx-auto" src={`/api/image/download/${member.photo}`} alt={member.alt}  title={member.imgTitle}/>
                            </div>
                            <div className='py-6 px-4 bg-white '>
                                <h3 className="text-2xl font-medium capitalize">{member.name}</h3>
                                <p className="text-primary font-medium">{member.designation}</p>
                                <div className="flex justify-center items-center mt-4 space-x-4 bg-gray-100 py-2">
                                    <Link to={member.facebook}><FaFacebookF className='hover:text-blue-700 duration-100' /></Link>
                                    <hr className='h-5 border border-gray-300' />
                                   <Link  to={member.twitter}> <FaXTwitter className='hover:text-sky-500 duration-100' /></Link>
                                    <hr className='h-5 border border-gray-300' />
                                  <Link  to={member.linkdin}>  <FaLinkedinIn className='hover:text-blue-600 duration-100' /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TeamSlide;
