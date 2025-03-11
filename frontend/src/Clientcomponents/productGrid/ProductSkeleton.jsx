// File: src/components/product/ProductSkeleton.js
import React, { memo } from 'react';

// Simplified skeleton loading component
const ProductSkeleton = memo(() => (
    <div className="px-2 mb-4">
        <div className="bg-white shadow-lg h-[10cm] animate-pulse">
            <div className="w-full h-56 bg-gray-200"></div>
            <div className="py-6 px-4">
                <div className="flex items-center gap-4">
                    <div className="bg-gray-200 rounded-full p-3 h-8 w-8"></div>
                    <div className="h-5 bg-gray-200 w-3/4 rounded"></div>
                </div>
                <div className="flex justify-end mt-4">
                    <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
                </div>
            </div>
        </div>
    </div>
));

export default ProductSkeleton;