import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';


function AboutImg() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [banners, setBanners] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/banner/getBannersBySectionAboutus', { withCredentials: true });
            setBanners(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>

            {banners.map((banner, index) => (
                <>
                    <style>
                        {`
                          .banner-background {
                           background-image:url(/api/image/download/${banner.photo})
                       `}
                    </style>
                    <div
                        key={index}
                        className=' banner-background relative bg-cover bg-center  bg-no-repeat'
                        title={banner.title}
                    >
                        <div className='flex justify-center items-center h-[40vh] md:h-[30vh]'>
                            <h1 className='font-semibold text-white sm:text-2xl md:text-3xl text-xl z-10 '>{banner.title}</h1>
                            <div className="absolute bottom-4 flex space-x-2 z-10">
                                <Link to="/" className="text-white hover:text-gray-300 ">Home</Link>
                                <span className="text-white">/</span>
                                <a href="#" className="text-white hover:text-gray-300  cursor-pointer ">{banner.title}</a>
                            </div>
                            <div className='absolute inset-0 bg-black opacity-40 z-1'></div>
                        </div>
                    </div>
                </>
            ))}
        </div>
    );
}

export default AboutImg;
