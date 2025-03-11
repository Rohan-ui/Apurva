// File: src/utils/iconUtils.js
// Individual icon imports to reduce bundle size
import { GrDocumentTest } from "react-icons/gr";
import { LuTestTube2 } from "react-icons/lu";
import { GrTest } from "react-icons/gr";
import { FaBacterium } from "react-icons/fa";
import { GiHeartOrgan } from "react-icons/gi";
import { GiDna2 } from "react-icons/gi";
import { SiMicrogenetics } from "react-icons/si";
import { RiTestTubeLine } from "react-icons/ri";

// Map icons based on product type or id
export const iconMap = [
    GrDocumentTest, 
    LuTestTube2, 
    GrTest, 
    FaBacterium, 
    GiHeartOrgan, 
    GiDna2, 
    SiMicrogenetics, 
    RiTestTubeLine
];

// Color map for icons
export const colorMap = {
    GrDocumentTest: {
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600',
        hoverBgColor: 'group-hover:bg-blue-500',
        hoverTextColor: 'group-hover:text-white',
    },
    LuTestTube2: {
        bgColor: 'bg-red-100',
        textColor: 'text-red-600',
        hoverBgColor: 'group-hover:bg-red-500',
        hoverTextColor: 'group-hover:text-white',
    },
    GrTest: {
        bgColor: 'bg-teal-100',
        textColor: 'text-teal-600',
        hoverBgColor: 'group-hover:bg-teal-500',
        hoverTextColor: 'group-hover:text-white',
    },
    FaBacterium: {
        bgColor: 'bg-green-100',
        textColor: 'text-green-600',
        hoverBgColor: 'group-hover:bg-green-500',
        hoverTextColor: 'group-hover:text-white',
    },
    GiHeartOrgan: {
        bgColor: 'bg-red-100',
        textColor: 'text-red-600',
        hoverBgColor: 'group-hover:bg-red-500',
        hoverTextColor: 'group-hover:text-white',
    },
    GiDna2: {
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-600',
        hoverBgColor: 'group-hover:bg-purple-500',
        hoverTextColor: 'group-hover:text-white',
    },
    SiMicrogenetics: {
        bgColor: 'bg-pink-100',
        textColor: 'text-pink-600',
        hoverBgColor: 'group-hover:bg-pink-500',
        hoverTextColor: 'group-hover:text-white',
    },
    RiTestTubeLine: {
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-600',
        hoverBgColor: 'group-hover:bg-orange-500',
        hoverTextColor: 'group-hover:text-white',
    }
};