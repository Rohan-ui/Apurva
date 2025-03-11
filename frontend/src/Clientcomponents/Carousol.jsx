import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import ContactUsInquiryForm from './ContactUsInquiry';
import ParticleBackground from './ParticleBackground';

// Skeleton component that matches the exact layout of the real content
const CarouselSkeleton = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="lg:flex lg:flex-row-reverse">
        {/* Image section skeleton */}
        <div className="lg:w-1/2 flex justify-center items-center mt-8 md:mt-0">
          <div className="flex items-center justify-center lg:relative">
            {/* Main image skeleton */}
            <div className="w-[70%] md:w-1/2 lg:w-[450px] xl:w-[500px] relative" 
                style={{ aspectRatio: "1/1.2", height: "auto" }}>
              <div className="w-full h-full bg-gray-200 animate-pulse rounded-md"></div>
            </div>
            
            {/* Small image skeleton */}
            <div className="hidden md:block md:w-[30%] lg:w-[50%] lg:absolute lg:-right-5 lg:top-10 xl:top-56 xl:left-[360px]">
              <div className="w-full h-40 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
        
        {/* Text section skeleton */}
        <div className="lg:w-1/2 xl:flex xl:flex-col xl:justify-center p-4">
          <div className="space-y-4 py-5 pt-4 lg:pl-10">
            {/* Title skeleton */}
            <div className="h-14 w-3/4 bg-gray-200 animate-pulse rounded-md"></div>
            
            {/* Content skeleton */}
            <div className="space-y-2 font-semibold lg:py-7 xl:w-[80%]">
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-4 w-4/6 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          </div>
          
          {/* Button skeletons */}
          <div className="flex gap-2 justify-center items-center md:justify-start py-4 lg:pl-10 flex-row md:space-y-0 md:gap-6">
            <div className="h-14 w-36 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="h-14 w-36 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
      
      {/* Pagination dots skeleton */}
      <div className="flex justify-center mt-4 gap-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-3 h-3 rounded-full bg-gray-300 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
};

function Carousel() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  
  // Refs for animations
  const slideRefs = useRef([]);
  const textRefs = useRef([]);
  const imgRefs = useRef([]);
  const smallImgRefs = useRef([]);
  const buttonRefs = useRef([]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle body overflow for inquiry form
  useEffect(() => {
    document.body.style.overflow = showInquiryForm ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showInquiryForm]);

  // Fetch banner data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/banner/getBannersBySectionHome', { withCredentials: true });
        const data = response.data?.data || [];
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Preload images once banners are loaded
  useEffect(() => {
    if (banners.length > 0 && !imagesPreloaded) {
      const imagePromises = [];
      
      banners.forEach(banner => {
        banner.photo.forEach(photoId => {
          const img = new Image();
          const promise = new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Continue even if image fails to load
          });
          img.src = `/api/image/download/${photoId}`;
          imagePromises.push(promise);
        });
      });
      
      Promise.all(imagePromises).then(() => {
        setImagesPreloaded(true);
      });
    }
  }, [banners, imagesPreloaded]);

  // Auto-rotate slides
  useEffect(() => {
    if (banners.length > 0 && imagesPreloaded) {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
      }, 5000);

      return () => clearInterval(slideInterval);
    }
  }, [banners.length, imagesPreloaded]);

  // Animations when slide changes
  useEffect(() => {
    if (banners.length > 0 && !loading && imagesPreloaded) {
      // Animation timeline for better synchronization
      const tl = gsap.timeline();
      
      // Text animation
      tl.fromTo(
        textRefs.current[currentSlide],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
      
      // Main image animation
      tl.fromTo(
        imgRefs.current[currentSlide],
        { x: 50, opacity: 0.8 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=0.6" // Overlap with previous animation
      );
      
      // Small image animation
      if (smallImgRefs.current[currentSlide]) {
        tl.fromTo(
          smallImgRefs.current[currentSlide],
          { x: 50, opacity: 0.8 },
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          "-=0.8"
        );
      }
      
      // Button animation
      tl.fromTo(
        buttonRefs.current[currentSlide],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.15 },
        "-=0.6"
      );
    }
  }, [currentSlide, banners.length, loading, imagesPreloaded]);

  // Loading and empty states
  if (loading || !imagesPreloaded) {
    return (
      <div className="relative">
        <ParticleBackground />
        <div className="relative flex justify-center items-center md:mb-16">
          <CarouselSkeleton />
        </div>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="relative">
        <ParticleBackground />
        <div className="text-center py-12">No banners available</div>
      </div>
    );
  }

  return (
    <>
      <ParticleBackground />
      <div className="relative flex justify-center items-center md:mb-16">
        <div className="relative mb-8 w-full max-w-screen-xl">
          {showInquiryForm && (
            <ContactUsInquiryForm onClose={() => setShowInquiryForm(false)} />
          )}
          
          {banners.map((slide, index) => (
            <div
              key={index}
              className={`lg:flex lg:flex-row-reverse transition-opacity duration-700 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 transform scale-100 z-10' 
                  : 'opacity-0 transform scale-0 z-0 absolute inset-0'
              }`}
              ref={el => (slideRefs.current[index] = el)}
            >
              {/* Image section with aspect ratio container */}
              <div className="lg:w-1/2 flex justify-center items-center mt-8 md:mt-0">
                <div className="flex items-center md:gap-10 lg:gap-0 justify-center lg:relative">
                  {/* Main image with aspect ratio */}
                  <div className="w-[70%] md:w-1/2 lg:w-[450px] xl:w-[500px] relative" 
                       style={{
                         aspectRatio: "1/1.2", 
                         height: "auto"
                       }}>
                    <img
                      ref={el => (imgRefs.current[index] = el)}
                      className="w-full h-full object-contain"
                      src={`/api/image/download/${slide.photo[0]}`}
                      alt={slide.alt[0] || ""}
                      title={slide.imgTitle[0] || ""}
                      loading="eager"
                    />
                  </div>
                  
                  {/* Small image with fixed position */}
                  {slide.photo[1] && (
                    <div className="hidden md:block md:w-[30%] lg:w-[50%] lg:absolute lg:-right-5 lg:top-10 xl:top-56 xl:left-[360px]">
                      <img
                        ref={el => (smallImgRefs.current[index] = el)}
                        src={`/api/image/download/${slide.photo[1]}`}
                        alt={slide.alt[1] || ""}
                        title={slide.imgTitle[1] || ""}
                        loading="eager"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Text section */}
              <div className="lg:w-1/2 xl:flex xl:flex-col xl:justify-center p-4">
                <div 
                  className="space-y-4 py-5 pt-4 lg:pl-10" 
                  ref={el => (textRefs.current[index] = el)}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-[57px] xl:pr-20 xl:w-full font-daysOne text-gray-800 text-center md:text-left">
                    {slide.title}
                  </h2>
                  <div className="font-semibold lg:py-7 xl:w-[80%]">
                    <ReactQuill
                      readOnly={true}
                      value={slide.details}
                      modules={{ toolbar: false }}
                      theme="bubble"
                      className="quill"
                    />
                  </div>
                </div>
                
                {/* Buttons */}
                <div 
                  className="flex gap-2 justify-center items-center md:justify-start py-4 lg:pl-10 flex-row md:space-y-0 md:gap-6" 
                  ref={el => (buttonRefs.current[index] = el)}
                >
                  <button 
                    onClick={() => setShowInquiryForm(true)}
                    className="bg-primary hover:bg-secondary text-white text-lg font-medium p-4 rounded lg:px-7"
                  >
                    INQUIRY NOW
                  </button>
                  <Link to="/about-us">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white text-lg font-medium p-4 rounded lg:px-7">
                      ABOUT US
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-4 gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel;