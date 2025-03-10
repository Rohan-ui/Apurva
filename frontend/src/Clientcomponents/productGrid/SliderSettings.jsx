// File: src/utils/sliderSettings.js
import React from 'react';
import { CustomNextArrow ,CustomPrevArrow } from './CustomeArrow';

// Create reusable Slider settings
export const createSliderSettings = (isMobile) => {
    return {
        infinite: false, // Changed to false to reduce initial DOM elements
        speed: 500, // Reduced for better performance
        slidesToShow: isMobile ? 1 : 5,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        lazyLoad: 'ondemand', // Enable lazy loading for slides
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            }
        ]
    };
};