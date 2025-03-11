// File: src/components/product/SliderArrows.js
import React, { memo } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Custom slider arrows
export const CustomPrevArrow = memo((props) => (
    <button
        type="button"
        aria-label="Previous slide"
        className="absolute -left-2 md:-left-10 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-[#0f0f0f54] hover:bg-[#0f0f0f85] rounded-full h-8 w-8 flex justify-center items-center"
        onClick={props.onClick}
    >
        <IoIosArrowBack size={25} />
    </button>
));

export const CustomNextArrow = memo((props) => (
    <button
        type="button"
        aria-label="Next slide"
        className="absolute -right-2 md:-right-10 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-[#0f0f0f54] hover:bg-[#0f0f0f85] rounded-full h-8 w-8 flex justify-center items-center"
        onClick={props.onClick}
    >
        <IoIosArrowForward size={25} />
    </button>
));