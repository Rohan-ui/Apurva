// File: ScrollToTopButton.jsx
import React, { forwardRef } from 'react';
import { IoIosArrowUp } from "@react-icons/all-files/io/IoIosArrowUp";

const ScrollToTopButton = forwardRef(({ onClick }, ref) => {
    return (
        <div
            ref={ref}
            className="fixed bottom-8 right-8 w-10 h-10 bg-primary text-white rounded-md flex items-center justify-center cursor-pointer z-40"
            onClick={onClick}
        >
            <IoIosArrowUp size={24} />
        </div>
    );
});

export default ScrollToTopButton;