// File: src/components/product/ProductsGrid.js
import React, { useState, useEffect, useCallback, memo } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import ServiceCard from './productGrid/ServiceCard';
import ProductSkeleton from './productGrid/ProductSkeleton';
import { createSliderSettings } from './productGrid/SliderSettings';
import { fetchHeadings,fetchProducts } from './productGrid/ProductService';

// Main product slider component
function ProductsGrid() {
    const [products, setProducts] = useState([]);
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    // Window resize listener
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Create memoized slider settings
    const sliderSettings = React.useMemo(() => createSliderSettings(isMobile), [isMobile]);

    useEffect(() => {
        // Use AbortController for cleanup
        const controller = new AbortController();
        
        const loadData = async () => {
            setLoading(true);
            try {
                const [productsData, headingsData] = await Promise.all([
                    fetchProducts(),
                    fetchHeadings()
                ]);
                
                setProducts(productsData);
                setHeading(headingsData.heading || '');
                setSubheading(headingsData.subheading || '');
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
        
        loadData();
        
        // Cleanup function to abort any pending requests
        return () => {
            controller.abort();
        };
    }, []);

    // Custom CSS for Slick slider
    const slickStyles = `
        .slick-dots {
            bottom: -40px; 
            z-index: 10;
        }
        .slick-dots li button:before {
            font-size: 12px;
            color: #b91c1;
        }
        .slick-dots li.slick-active button:before {
            color: red; 
        }
        .slick-slide {
            height: auto; /* Prevent inconsistent heights */
        }
        .slick-track {
            display: flex;
            align-items: stretch;
        }
    `;

    // Show limited skeletons during loading
    if (loading) {
        return (
            <div className="flex justify-center items-center overflow-hidden bg-white py-4">
                <div className="w-[90%] max-w-screen-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <ProductSkeleton key={item} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Only render if we have products
    if (!products.length) {
        return null;
    }

    // Limit number of products shown to improve performance
    const displayProducts = products.slice(0, 8);

    return (
        <div className="flex justify-center items-center overflow-hidden bg-white py-4">
            <div className="w-[90%] max-w-screen-xl">
                {window.location.pathname !== '/product' && (
                    <SectionHeader 
                        heading={heading} 
                        subheading={subheading} 
                    />
                )}

                <style>{slickStyles}</style>

                <div className="relative slider-container">
                    <Slider {...sliderSettings}>
                        {displayProducts.map((item, index) => (
                            <div key={item._id || `product-${index}`} className="px-2 pb-4">
                                <ServiceCard
                                    imageSrc={`/api/image/download/${item.photo?.[0]}`}
                                    iconIndex={index}
                                    title={item.title || ''}
                                    imgTitle={item.imgTitle || ''}
                                    alt={item.alt || ''}
                                    slug={item.slug || ''}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

// Section header component
const SectionHeader = memo(({ heading, subheading }) => (
    <div className="mb-6">
        <p className="text-primary md:text-[18px] font-bold uppercase text-center md:text-left">____ {heading}</p>
        <div className="py-3 lg:flex lg:items-center lg:justify-between gap-2">
            <p className="text-2xl sm:text-3xl text-gray-800 font-bold text-center md:text-left">{subheading}</p>
            <p className="py-2 text-gray-500 font-medium">
                <Link to="/dye-intermediate" className="flex items-center gap-1 text-primary font-medium">
                    View All <FaArrowRight />
                </Link>
            </p>
        </div>
    </div>
));

export default memo(ProductsGrid);