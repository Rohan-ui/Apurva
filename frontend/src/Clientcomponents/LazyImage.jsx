// src/Clientcomponents/LazyImage.js
import React, { forwardRef } from 'react';

const LazyImage = forwardRef(({ src, alt, title, className, loading, decoding, fetchpriority, ...props }, ref) => {
    return (
        <img
            ref={ref}
            src={src}
            alt={alt || ''} // Fallback for missing alt
            title={title || ''} // Fallback for missing title
            className={className}
            loading={loading || 'lazy'}
            decoding={decoding || 'async'}
            fetchpriority={fetchpriority || 'auto'}
            onError={(e) => (e.target.src = '/fallback-image.jpg')} // Fallback image on error
            {...props}
        />
    );
});

export default LazyImage;