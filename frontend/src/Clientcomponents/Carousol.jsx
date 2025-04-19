import React, { useState, useEffect, useRef } from 'react';
// import { FaFacebookF, FaYoutube } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
import gsap from 'gsap';
import axios from 'axios'
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import ContactUsInquiryForm from './ContactUsInquiry';
import ParticleBackground from './ParticleBackground';

function Carousol() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRefs = useRef([]);
    const textRefs = useRef([]);
    const imgRefs = useRef([]);
    const smallImgRefs = useRef([]);  // Reference for small images
    const buttonRefs = useRef([]);  // Reference for buttons
    const [showInquiryForm, setShowInquiryForm] = useState(false);

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


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionHome', { withCredentials: true });
            // Add data validation
            const data = response.data?.data || [];
            setBanners(data);
        } catch (error) {
            console.error('Error fetching banners:', error);
            setBanners([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Only start the interval if we have banners
    useEffect(() => {
        if (banners.length > 0) {
            const slideInterval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
            }, 5000);

            return () => clearInterval(slideInterval);
        }
    }, [banners.length]);

    // Only run animations if we have banners
    useEffect(() => {
        if (banners.length > 0 && !loading) {
            // Animate text from below
            gsap.fromTo(
                textRefs.current[currentSlide],
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
            );
            // Animate main image from the right
            gsap.fromTo(
                imgRefs.current[currentSlide],
                { x: 50 },
                { x: 0, duration: 5, ease: 'power3.out' }
            );
            // Animate small image from the right
            gsap.fromTo(
                smallImgRefs.current[currentSlide],
                { x: 50 },
                { x: 0, duration: 4, ease: 'power3.out' }
            );
            // Animate buttons from below
            gsap.fromTo(
                buttonRefs.current[currentSlide],
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 2, ease: 'power3.out', stagger: 0.2 }
            );
        }
    }, [currentSlide, banners.length, loading]);

    // Show loading state or return early if no banners
    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    if (banners.length === 0) {
        return <div>No banners available</div>; // Or any other fallback UI
    }

    return (
        <>
            <ParticleBackground />
            <div className='relative flex justify-center items-center md:mb-16'>
                <div className='relative mb-8'>
                    {showInquiryForm && (
                        <ContactUsInquiryForm
                            onClose={() => setShowInquiryForm(false)}
                        />
                    )}
                    {banners.map((slide, index) => (
                        <div
                            key={index}
                            className={` lg:flex lg:flex-row-reverse transition-opacity duration-2000  ease-in-out ${index === currentSlide ? 'opacity-100 transform scale-100 z-10' : 'opacity-0 transform scale-0 z-0 absolute'}`}
                            ref={el => slideRefs.current[index] = el}
                        >
                            <div className='lg:w-1/2 flex justify-center items-center mt-8 md:mt-0'>
                                <div className='flex items-center justify-center  lg:relative'>
                                    <img
                                        ref={el => imgRefs.current[index] = el}
                                        className='w-[70%] md:w-1/2 lg:h-[500px] lg:w-[450px] lg:mt-16 xl:h-[600px] xl:w-[500px]'
                                        src={`/api/image/download/${slide.photo[0]}`}
                                        alt={slide.alt[0]}
                                        title={slide.imgTitle[0]}
                                    />
                                    <div className='hidden md:flex justify-center items-center md:w-[40%] lg:absolute lg:-right-5 lg:top-10 xl:top-56 xl:left-[360px]'>
                                        <img
                                            ref={el => smallImgRefs.current[index] = el}  // Reference for animation
                                            src={`/api/image/download/${slide.photo[1]}`}
                                            alt={slide.alt[1]}
                                            title={slide.imgTitle[1]}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='lg:w-1/2 xl:flex xl:flex-col xl:justify-center p-4'>
                                <div className='space-y-4 py-5 pt-4 lg:pl-10' ref={el => textRefs.current[index] = el}>
                                    <p className='text-3xl sm:text-4xl md:text-5xl xl:text-[57px] xl:pr-20 xl:w-full font-daysOne text-gray-800 text-center md:text-left'>{slide.title}</p>
                                    <p className='font-semibold lg:py-7 xl:w-[80%]'>
                                        <ReactQuill
                                            readOnly={true}
                                            value={slide.details}
                                            modules={{ toolbar: false }}
                                            theme="bubble"
                                            className="quill"
                                        />
                                    </p>
                                </div>
                                <div className='flex gap-2 justify-center items-center md:justify-start py-4 lg:pl-10 flex-row md:space-y-0 md:gap-6' ref={el => buttonRefs.current[index] = el}>
                                    <div onClick={() => setShowInquiryForm(true)}>
                                        <button className='bg-primary hover:bg-secondary text-white text-lg font-medium p-4 rounded lg:px-7'>INQUIRY NOW</button>
                                    </div>
                                    <Link to="/about-us">
                                        <button className='bg-gray-700 hover:bg-gray-600 text-white text-lg font-medium p-4 rounded lg:px-7'>ABOUT US</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                
                </div>
            </div>
        </>

    );
}

export default Carousol;
