import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



function ContactUsInquiryForm({ onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [clientIp, setClientIp] = useState('');
    const [utmParams, setUtmParams] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
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
        setIsSubmitting(true);

        try {
            await axios.post('/api/inquiries/createInquiry', {
                name,
                email,
                phone,
                message,
                ipaddress: clientIp,
                ...utmParams,
            });

            // Show success message on successful submission
            setSuccessMessage('Your message has been successfully sent. We will get back to you soon.');
            // Clear form fields
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            navigate('/thankyou');
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.error : 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white p-3 md:p-8 md:rounded-xl  shadow-2xl w-full max-w-lg relative">
                {/* Close Icon at the Top-Right Corner */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-700 hover:text-primary"
                >
                    <FaTimes size={25} />
                </button>

                <h2 className="text-3xl  mb-6 text-gray-800 font-bold text-center">Inquiry Now</h2>
                {successMessage ? (
                    <p className="text-green-600 font-medium mb-4">{successMessage}</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className='flex gap-1'>
                            <div className="mb-2 w-full">
                                <label className="block text-gray-600 font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="mb-2 w-full">
                                <label className="block text-gray-600 font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-600 font-medium mb-2">Phone No</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-600 font-medium mb-2">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                                rows="2"
                                placeholder="Write your message here"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <ReCAPTCHA
                                sitekey={import.meta.env.VITE_SITE_KEY}
                                onChange={(value) => setCaptchaValue(value)}
                            />
                        </div>
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="submit"
                                className={`bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition-all duration-200 w-full ${(!captchaValue || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={!captchaValue || isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ContactUsInquiryForm;
