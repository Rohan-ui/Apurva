import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function InquiryForm({ productName, onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [clientIp, setClientIp] = useState('');
    const [utmParams, setUtmParams] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the client's IP address
        const fetchClientIp = async () => {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                setClientIp(response.data.ip);
            } catch (error) {
                console.error('Error fetching IP address', error);
            }
        };

        fetchClientIp();

        // Get UTM parameters from the URL
        const params = new URLSearchParams(window.location.search);
        setUtmParams({
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_id: params.get('utm_id') || '',
            gclid: params.get('gclid') || '',
            gcid_source: params.get('gcid_source') || '',
            utm_content: params.get('utm_content') || '',
            utm_term: params.get('utm_term') || '',
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaValue) {
            setErrorMessage('Please complete the reCAPTCHA.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/productinquiry/createproductinquiries', {
                name,
                email,
                phone,
                subject,
                message,
                productName,
                ipaddress: clientIp,
                ...utmParams, // Spread UTM parameters into the form data
            });

            // Clear form fields
            setName('');
            setEmail('');
            setPhone('');
            setSubject('');
            setMessage('');

            if (response.data.success) {
                navigate('/thankyou');
            }

        } catch (error) {
            // Handle error
            setErrorMessage(error.response ? error.response.data.error : 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} | ${hours}:${minutes}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-2 md:p-4 md:rounded-lg shadow-2xl w-full max-w-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-700 hover:text-primary"
                >
                    <FaTimes size={25} />
                </button>
                <h2 className="text-2xl font-semibold text-gray-800 w-[90%] mb-4">
                    New Inquiry for <span className='text-primary'>{productName}</span> | <span className='text-xl'>{formatDate()}</span>
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-1 md:gap-4">
                        <div className="mb-2 w-full">
                            <label className="block text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                placeholder='Enter your name'
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-2 w-full">
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                placeholder='Enter your email'
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 font-medium mb-2">Phone No</label>
                        <input
                            type="text"
                            value={phone}
                            placeholder='Enter your phone number'
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    
                    <div className="mb-2">
                        <label className="block text-gray-700 font-medium mb-2">Message</label>
                        <textarea
                            value={message}
                            placeholder='Enter your message'
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            rows="2"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <ReCAPTCHA
                            sitekey={import.meta.env.VITE_SITE_KEY}
                            onChange={(value) => setCaptchaValue(value)}
                        />
                    </div>
                    {errorMessage && <p className="text-primary mb-4">{errorMessage}</p>}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`bg-gray-800 text-white py-2 px-6 w-full md:w-1/2 mt-5 rounded-lg hover:bg-gray-900 transition-all duration-200 ${(!captchaValue || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!captchaValue || isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InquiryForm;