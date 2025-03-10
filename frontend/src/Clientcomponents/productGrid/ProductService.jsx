// File: src/services/productService.js
import axios from 'axios';

// Cached API call with localStorage - improved error handling
export const fetchProducts = async () => {
    try {
        // Check cache first
        const cachedData = localStorage.getItem('products');
        if (cachedData) {
            try {
                const { data, timestamp } = JSON.parse(cachedData);
                // Use cache if less than 10 minutes old
                if (Date.now() - timestamp < 600000 && Array.isArray(data) && data.length > 0) {
                    return data;
                }
            } catch (e) {
                // Invalid cache JSON, will fetch fresh data
                localStorage.removeItem('products');
            }
        }
        
        const apiUrl = '/api/product/getActiveProducts';
        const response = await axios.get(apiUrl, { 
            withCredentials: true,
            timeout: 5000 // Add timeout
        });
        
        // Add data validation
        const data = response.data?.data || response.data || [];
        // Ensure we're working with an array
        const productArray = Array.isArray(data) ? data : [];
        
        // Cache the result
        localStorage.setItem('products', JSON.stringify({
            data: productArray,
            timestamp: Date.now()
        }));
        
        return productArray;
    } catch (error) {
        console.error("Error fetching products:", error);
        return []; // Return empty array on error
    }
};

export const fetchHeadings = async () => {
    try {
        // Check cache first
        const cachedHeadings = localStorage.getItem('productHeadings');
        if (cachedHeadings) {
            try {
                const { heading, subheading, timestamp } = JSON.parse(cachedHeadings);
                // Use cache if less than 1 hour old
                if (Date.now() - timestamp < 3600000) {
                    return { heading: heading || '', subheading: subheading || '' };
                }
            } catch (e) {
                // Invalid cache, will fetch fresh data
                localStorage.removeItem('productHeadings');
            }
        }

        const response = await axios.get('/api/pageHeading/heading?pageType=product', { 
            withCredentials: true,
            timeout: 5000 // Add timeout
        });
        
        const { heading, subheading } = response.data || {};
        
        // Cache the headings
        localStorage.setItem('productHeadings', JSON.stringify({
            heading: heading || '',
            subheading: subheading || '',
            timestamp: Date.now()
        }));
        
        return { 
            heading: heading || '', 
            subheading: subheading || '' 
        };
    } catch (error) {
        console.error("Error fetching headings:", error);
        return { heading: '', subheading: '' };
    }
};