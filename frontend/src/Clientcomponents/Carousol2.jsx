import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ContactUsInquiryForm from './ContactUsInquiry';
import ParticleBackground from './ParticleBackground';
import BannerSkeleton from './BannerSkeleton';

// Lazy load ReactQuill
const ReactQuill = lazy(() => import('react-quill'));

// Create a QuillViewer component that lazy loads when visible
const QuillViewer = ({ value }) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        
        observer.observe(containerRef.current);
        
        return () => {
            if (containerRef.current) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="font-semibold py-4 lg:py-7 w-full lg:w-4/5">
            {isVisible ? (
                <Suspense fallback={<div className="animate-pulse bg-gray-100 h-32 rounded"></div>}>
                    <ReactQuill
                        readOnly={true}
                        value={value || ''}
                        modules={{ toolbar: false }}
                        theme="bubble"
                        className="quill"
                    />
                </Suspense>
            ) : (
                <div className="animate-pulse bg-gray-100 h-32 rounded"></div>
            )}
        </div>
    );
};

function Carousol() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [imagesPreloaded, setImagesPreloaded] = useState(false);
    const preloadedImages = useRef([]);
    const slideIntervalRef = useRef(null);
    const carouselContainerRef = useRef(null);

    // Handle body scroll when inquiry form is open
    useEffect(() => {
        document.body.style.overflow = showInquiryForm ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [showInquiryForm]);

    // Preload banner images for smoother transitions
    const preloadBannerImages = (bannerData) => {
        if (!bannerData || bannerData.length === 0) {
            setImagesPreloaded(true);
            return;
        }

        const imagesToPreload = [];
        bannerData.forEach(banner => {
            if (banner.photo && banner.photo.length > 0) {
                banner.photo.forEach(photoId => {
                    if (photoId) {
                        // Prioritize loading the first slide's images
                        const priority = banner === bannerData[0] ? 'high' : 'low';
                        imagesToPreload.push({
                            url: `/api/image/download/${photoId}?format=webp&quality=80`,
                            priority
                        });
                    }
                });
            }
        });

        // Sort by priority to load important images first
        imagesToPreload.sort((a, b) => a.priority === 'high' ? -1 : 1);

        let loaded = 0;
        const totalToLoad = imagesToPreload.length;

        // Load first slide images immediately, then rest in the background
        imagesToPreload.forEach((imgData, index) => {
            const img = new Image();

            // Set loading priority for browsers that support it
            if (index === 0 || index === 1) {
                img.fetchpriority = "high";
            }

            img.src = imgData.url;
            img.onload = () => {
                preloadedImages.current.push(img);
                loaded++;

                // Consider preloading complete after first slide is loaded or after 2 seconds
                if ((imgData.priority === 'high' && loaded >= Math.min(2, totalToLoad)) || loaded === totalToLoad) {
                    setImagesPreloaded(true);
                }
            };
            img.onerror = () => {
                loaded++;
                if (loaded === totalToLoad) {
                    setImagesPreloaded(true);
                }
            };
        });

        // Failsafe - ensure we show content even if images are slow to load
        setTimeout(() => {
            setImagesPreloaded(true);
        }, 2000);
    };

    // Fetch banner data
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionHome', { withCredentials: true });
            const data = response.data?.data || [];
            setBanners(data);

            // Preload banner images
            preloadBannerImages(data);
        } catch (error) {
            console.error('Error fetching banners:', error);
            setBanners([]);
            setImagesPreloaded(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // Clean up
        return () => {
            if (slideIntervalRef.current) {
                clearInterval(slideIntervalRef.current);
            }
        };
    }, []);

    // Carousel auto-rotation
    useEffect(() => {
        if (banners.length > 0 && imagesPreloaded) {
            slideIntervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % banners.length);
            }, 5000);

            return () => {
                if (slideIntervalRef.current) {
                    clearInterval(slideIntervalRef.current);
                }
            };
        }
    }, [banners.length, imagesPreloaded]);

    // Image component with error handling and optimization
    const OptimizedImage = ({ photoId, alt, title, className, isMain = false }) => {
        const [error, setError] = useState(false);
        const [loaded, setLoaded] = useState(false);

        // Determine proper size hints based on className
        let sizes = "100vw";
        if (className.includes("lg:w-[450px]")) {
            sizes = "(max-width: 1024px) 70vw, 450px";
        } else if (className.includes("xl:w-[500px]")) {
            sizes = "(max-width: 1280px) 450px, 500px";
        }

        const imageUrl = `/api/image/download/${photoId}`;

        return (
            <div className={`${className} relative`}>
                {!loaded && !error && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
                )}
                <img
                    className={`w-full h-full object-cover ${!loaded ? 'opacity-0' : 'opacity-100'}`}
                    src={`${imageUrl}?format=webp&quality=${isMain ? '80' : '60'}`}
                    alt={alt || 'Banner image'}
                    title={title}
                    loading={isMain && currentSlide === 0 ? "eager" : "lazy"}
                    fetchpriority={isMain && currentSlide === 0 ? "high" : "auto"}
                    decoding={isMain && currentSlide === 0 ? "sync" : "async"}
                    sizes={sizes}
                    onLoad={() => setLoaded(true)}
                    onError={() => setError(true)}
                />
                {error && (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">Image not available</span>
                    </div>
                )}
            </div>
        );
    };

    // Calculate the max height needed for content to prevent layout shifts
    const getContentContainerStyle = () => {
        // Set minimum heights to prevent content shifts
        return {
            minHeight: loading || !imagesPreloaded ? '400px' : '400px'
        };
    };

    // Base container that maintains consistent dimensions regardless of content state
    return (
        <>
            <ParticleBackground />
            <div className="relative flex justify-center items-center md:mb-16">
                <div
                    ref={carouselContainerRef}
                    className="relative mb-8 w-full max-w-7xl"
                    style={{ minHeight: '500px' }} // Ensure minimum height is maintained at all times
                >
                    {/* Show skeleton while loading */}
                    {(loading || !imagesPreloaded) && <BannerSkeleton />}

                    {/* Show actual content when ready */}
                    {!loading && imagesPreloaded && (
                        <>
                            {showInquiryForm && (
                                <ContactUsInquiryForm onClose={() => setShowInquiryForm(false)} />
                            )}

                            {banners.length === 0 ? (
                                <div className="text-center py-12">No banners available</div>
                            ) : (
                                <>
                                    {/* Carousel slides with absolute positioning to prevent shifts */}
                                    <div className="relative" style={{ minHeight: '500px' }}>
                                        {banners.map((slide, index) => (
                                            <div
                                                key={index}
                                                className={`lg:flex lg:flex-row-reverse transition-opacity duration-500 ease-in-out absolute w-full ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                                    }`}
                                                style={getContentContainerStyle()}
                                            >
                                                <div className="lg:w-1/2 flex justify-center items-center mt-8 md:mt-0">
                                                    <div className="flex items-center justify-center lg:relative">
                                                        {slide.photo?.[0] && (
                                                            <OptimizedImage
                                                                photoId={slide.photo[0]}
                                                                alt={slide.alt?.[0] || 'Banner image'}
                                                                title={slide.imgTitle?.[0]}
                                                                className="w-[70%] md:w-1/2 lg:h-[500px] lg:w-[450px] lg:mt-16 xl:h-[600px] xl:w-[500px]"
                                                                isMain={true}
                                                            />
                                                        )}
                                                        <div className="hidden md:flex justify-center items-center md:w-[40%] lg:absolute lg:-right-5 lg:top-10 xl:top-56 xl:left-[360px]">
                                                            {slide.photo?.[1] && (
                                                                <OptimizedImage
                                                                    photoId={slide.photo[1]}
                                                                    alt={slide.alt?.[1] || 'Secondary banner image'}
                                                                    title={slide.imgTitle?.[1]}
                                                                    className="h-40 w-40 lg:h-60 lg:w-60"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-1/2 flex flex-col justify-center p-4">
                                                    <div className="space-y-4 py-5 pt-4 lg:pl-10">
                                                        <p className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-daysOne text-gray-800 text-center md:text-left">
                                                            {slide.title || 'Untitled'}
                                                        </p>
                                                        
                                                        {/* Replace ReactQuill with lazy loading QuillViewer component */}
                                                        <QuillViewer value={slide.details || ''} />
                                                        
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start py-4 lg:pl-10">
                                                        <div onClick={() => setShowInquiryForm(true)}>
                                                            <button className="bg-primary hover:bg-secondary text-white text-lg font-medium p-4 rounded lg:px-7">
                                                                INQUIRY NOW
                                                            </button>
                                                        </div>
                                                        <Link to="/about-us">
                                                            <button className="bg-gray-700 hover:bg-gray-600 text-white text-lg font-medium p-4 rounded lg:px-7">
                                                                ABOUT US
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Carousol;