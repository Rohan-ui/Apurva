// File: apiService.js
import axios from 'axios';

// Configure axios defaults if needed
const baseURL = import.meta.env.VITE_API_URL || '';
const apiClient = axios.create({
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// Header related API calls
export const fetchHeader = async () => {
    try {
        const response = await apiClient.get('/api/header/getHeader');
        return response.data;
    } catch (error) {
        console.error('Error fetching header:', error);
        throw error;
    }
};

// Footer related API calls
export const fetchFooter = async () => {
    try {
        const response = await apiClient.get('/api/footer/getFooter');
        return response.data;
    } catch (error) {
        console.error('Error fetching footer:', error);
        throw error;
    }
};

// Logo related API calls
export const fetchHeaderLogo = async () => {
    try {
        const response = await apiClient.get('/api/logo/headercolor');
        return response.data;
    } catch (error) {
        console.error('Error fetching header logo:', error);
        throw error;
    }
};

// Menu related API calls
export const fetchMenuListings = async () => {
    try {
        const response = await apiClient.get(`${baseURL}/api/menulisting/getMenulisting`);
        if (response.data && typeof response.data === 'object') {
            return response.data.menuListings || [];
        }
        return [];
    } catch (error) {
        console.error('Error fetching menu listings:', error);
        return [];
    }
};

// Blog related API calls
export const fetchBlogCategories = async () => {
    try {
        const response = await apiClient.get('/api/news/getCategoryAndPhoto');
        return response.data;
    } catch (error) {
        console.error('Error fetching blog categories:', error);
        throw error;
    }
};

// Product related API calls
export const fetchProductCategories = async () => {
    try {
        const response = await apiClient.get('/api/product/getCategoryAndPhoto');
        return response.data;
    } catch (error) {
        console.error('Error fetching product categories:', error);
        throw error;
    }
};

export default {
    fetchHeader,
    fetchFooter,
    fetchHeaderLogo,
    fetchMenuListings,
    fetchBlogCategories,
    fetchProductCategories
};