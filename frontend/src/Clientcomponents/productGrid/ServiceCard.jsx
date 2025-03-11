// File: src/components/product/ServiceCard.js
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { colorMap ,iconMap } from './Colormap';

// Service card component - memoized to prevent unnecessary re-renders
const ServiceCard = memo(function ServiceCard({ imageSrc, iconIndex, title, slug, alt, imgTitle }) {
    const Icon = iconMap[iconIndex % iconMap.length];
    const iconName = Icon.displayName || Icon.name;
    const colors = colorMap[iconName] || {
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600',
        hoverBgColor: 'group-hover:bg-gray-200',
        hoverTextColor: 'group-hover:text-white',
    };

    return (
        <div className="bg-white shadow-lg group h-[10cm]">
            <div className="overflow-hidden">
                <Link to={`/${slug}`}>
                    <img 
                        src={imageSrc} 
                        alt={alt || title} 
                        title={imgTitle || title} 
                        className="w-full h-56 object-cover transform group-hover:scale-125 bg-gray-100 transition duration-500"
                        loading="lazy"
                        width="400"
                        height="224"
                    />
                </Link>
            </div>
            <div className="py-6 px-4 flex flex-col gap-2">
                <div className="flex items-center gap-4">
                    <div className={`${colors.bgColor} ${colors.hoverBgColor} rounded-full p-3 flex items-center justify-center`}>
                        <Icon className={`${colors.textColor} ${colors.hoverTextColor} transition duration-300 text-[18px]`} />
                    </div>
                    <Link to={`/${slug}`} className="text-[16px] font-bold text-gray-800">{title}</Link>
                </div>
                <div className="flex justify-end mt-2">
                    <Link to={`/${slug}`} className="text-primary font-medium flex items-center text-[14px]">
                        READ MORE <FaArrowRight className="ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
});

export default ServiceCard; 