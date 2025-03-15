import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { FaPlay } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
// Lazy load ReactQuill
const ReactQuill = lazy(() => import('react-quill'));

// Create a QuillViewer component that lazy loads when visible
const QuillViewer = ({ value, className }) => {
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
        <div ref={containerRef} className={className || ""}>
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

function Video() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const location = useLocation();
    const [pagecontent, setPageContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const preloadedImages = useRef([]);
    const observerRef = useRef(null);
    const containerRef = useRef(null);

    const preloadImages = (imageUrls) => {
        if (imageUrls.length === 0) {
            setImagesLoaded(true);
            return;
        }

        const promises = imageUrls.map((url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    preloadedImages.current.push(img);
                    resolve();
                };
                img.onerror = (error) => {
                    console.error(`Failed to load image: ${url}`, error);
                    resolve(); // Resolve anyway to avoid blocking other images
                };
            });
        });

        Promise.all(promises)
            .then(() => {
                console.log('All images preloaded successfully');
                setImagesLoaded(true);
            })
            .catch((error) => {
                console.error('Error preloading images:', error);
                // Continue anyway to avoid blocking the UI
                setImagesLoaded(true);
            });
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/aboutus/getActiveAboutus`, { withCredentials: true });
            setPageContent(response.data);
            
            // Extract image URLs for preloading
            const imageUrls = [];
            if (response.data.photo && response.data.photo.length > 0) {
                response.data.photo.forEach(photoId => {
                    if (photoId) {
                        imageUrls.push(`/api/image/download/${photoId}`);
                    }
                });
            }
            
            // Start preloading images
            preloadImages(imageUrls);
        } catch (error) {
            console.error('Error fetching content:', error);
            setImagesLoaded(true); // Set to true on error to avoid UI being stuck
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        
        // Set up Intersection Observer for lazy loading
        observerRef.current = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                fetchData();
                observerRef.current.disconnect();
            }
        }, { threshold: 0.1 });
        
        // Start observing when component mounts
        if (containerRef.current) {
            observerRef.current.observe(containerRef.current);
        }
        
        return () => {
            // Clean up observer on unmount
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
        setVideoUrl(pagecontent.video);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setVideoUrl('');
    };

    // Skeleton loading component - made to match the exact layout of the loaded content
    const SkeletonLoader = () => (
        <div className='flex justify-center items-center md:py-16 bg-gray-100'>
            <div className='p-4 md:px-20 w-full max-w-screen-xl'>
                <div className='xl:flex xl:gap-10'>
                    {/* Skeleton for image area */}
                    <div className='flex justify-center items-center xl:w-1/2'>
                        <div className='relative w-full'>
                            <div className='bg-gray-300 animate-pulse rounded-lg h-64 md:h-96 w-full'></div>
                            <div className='absolute inset-0 flex justify-center items-center'>
                                <div className='bg-gray-400 animate-pulse p-5 rounded-full'></div>
                            </div>
                            <div className='hidden md:block absolute bottom-0 -left-[6rem] md:w-[40%]'>
                                <div className='bg-gray-300 animate-pulse rounded-lg h-32 w-full'></div>
                            </div>
                        </div>
                    </div>

                    {/* Skeleton for text area - exact match to content layout */}
                    <div className='py-5 space-y-10 xl:w-1/2'>
                        <div className='mt-5'>
                            <div className='bg-gray-300 animate-pulse h-10 w-3/4 rounded mb-8 mx-auto md:mx-0'></div>
                            <div className='space-y-3 my-8'>
                                <div className='bg-gray-300 animate-pulse h-4 w-full rounded'></div>
                                <div className='bg-gray-300 animate-pulse h-4 w-full rounded'></div>
                                <div className='bg-gray-300 animate-pulse h-4 w-3/4 rounded'></div>
                            </div>
                        </div>
                        
                        {location.pathname !== '/about-us' && (
                            <div className='flex justify-center md:justify-start mt-8'>
                                <div className='bg-gray-400 animate-pulse h-12 w-40 rounded'></div>
                            </div>
                        )}
                        
                        {location.pathname === '/about-us' && (
                            <div className='space-y-3 pt-4'>
                                <div className='bg-gray-300 animate-pulse h-4 w-full rounded'></div>
                                <div className='bg-gray-300 animate-pulse h-4 w-full rounded'></div>
                                <div className='bg-gray-300 animate-pulse h-4 w-full rounded'></div>
                                <div className='bg-gray-300 animate-pulse h-4 w-3/4 rounded'></div>
                                <div className='bg-gray-300 animate-pulse h-4 w-full rounded'></div>
                                <div className='bg-gray-300 animate-pulse h-4 w-full rounded'></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // Show skeleton loader while content is loading or images are preloading
    if (loading || !imagesLoaded) {
        return <SkeletonLoader />;
    }

    return (
        <div ref={containerRef} className='flex justify-center items-center md:py-16 bg-gray-100'>
            <div className='p-4 md:px-20 w-full max-w-screen-xl'>
                <div className='xl:flex xl:gap-10'>
                    <div className='flex justify-center items-center xl:w-1/2'>
                        <div className='relative'>
                            {pagecontent.photo && pagecontent.photo.length > 0 && (
                                <>
                                    <img 
                                        src={`/api/image/download/${pagecontent.photo[0]}`} 
                                        alt={pagecontent.alt && pagecontent.alt[0] ? pagecontent.alt[0] : 'Video thumbnail'} 
                                        title={pagecontent.imgTitle && pagecontent.imgTitle[0] ? pagecontent.imgTitle[0] : ''} 
                                        className='md:w-auto md:h-auto md:max-w-full rounded-lg'
                                        loading="lazy"
                                        width="600"
                                        height="400"
                                    />
                                    <div className='absolute bottom-10 sm:bottom-24 md:bottom-10 md:inset-0 md:flex md:justify-center md:items-center'>
                                        <div
                                            onClick={openModal}
                                            className='cursor-pointer text-white animate-pulse bg-primary hover:bg-secondary p-5 xl:p-10 rounded-full flex justify-center items-center md:text-xl'
                                        >
                                            <FaPlay size={24} />
                                        </div>
                                    </div>
                                    {pagecontent.photo[1] && (
                                        <div className='hidden md:block absolute bottom-0 -left-[6rem] md:w-[40%]'>
                                            <img 
                                                src={`/api/image/download/${pagecontent.photo[1]}`} 
                                                alt={pagecontent.alt && pagecontent.alt[1] ? pagecontent.alt[1] : 'Secondary image'} 
                                                title={pagecontent.imgTitle && pagecontent.imgTitle[1] ? pagecontent.imgTitle[1] : ''}
                                                loading="lazy"
                                                width="240"
                                                height="160"
                                                className="rounded-lg"
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className='py-5 space-y-10 xl:w-1/2'>
                        <div className='mt-5'>
                            <p className='text-3xl sm:text-4xl font-daysOne md:px-0 md:text-[40px] text-gray-800 mt-4 text-center md:text-left '>{pagecontent.subheading}</p>

                            {/* Replace ReactQuill with lazy-loaded QuillViewer */}
                            {location.pathname === '/about-us' ? (
                                <QuillViewer 
                                    value={pagecontent.shortDescription || ''} 
                                    className="justify-center mt-8" 
                                />
                            ) : (
                                <QuillViewer 
                                    value={pagecontent.shortDescription || ''} 
                                    className="justify-center my-8" 
                                />
                            )}
                        </div>

                        {/* Replace ReactQuill with lazy-loaded QuillViewer */}
                        {location.pathname === '/about-us' && (
                            <QuillViewer 
                                value={pagecontent.longDescription || ''} 
                                className="justify-center text-justify pt-4" 
                            />
                        )}

                        {location.pathname !== '/about-us' && (
                            <div className='flex justify-center md:justify-start'>
                                <Link to="/aboutus" className='cursor-pointer bg-primary hover:bg-secondary text-white font-semibold p-4 md:px-7 rounded uppercase'>Know More</Link>
                            </div>
                        )}
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-5 rounded-lg shadow-lg relative w-11/12 md:w-4/5 lg:w-3/4 xl:w-1/2 h-1/2 md:h-3/5">
                            <button
                                className="absolute top-2 right-2 p-2 text-white bg-black rounded-full z-50 w-8 h-8 flex items-center justify-center"
                                onClick={closeModal}
                            >
                                ✖
                            </button>
                            <div className="w-full h-full">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={videoUrl}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Video;