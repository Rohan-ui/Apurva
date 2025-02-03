import React, { useState } from 'react';
import axios from 'axios';
import ParticleBackground from './ParticleBackgroundNewsLetter';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/api/newsletter/postnewsletter', { email }, { withCredentials: true });
            setMessage(response.data.message);
            setEmail('');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to subscribe');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative rounded-lg md:mb-16  lg:mb-16 py-32">
            {/* Particle Background */}
            <ParticleBackground />

            {/* Overlay for Dark Filter */}
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
            
            <div className="container mx-auto px-4 relative z-10 xl:flex xl:items-center">
                <div className="max-w-lg mx-auto text-center text-white">
                    <h2 className="text-3xl xl:text-4xl font-semibold mb-4 font-daysOne">Newsletter</h2>
                    <p className="text-md mb-8">#Subscribe newsletter to get every update</p>
                    <form className="flex justify-center flex-col gap-2 md:flex-row" onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="info.yourwebmail@gmail.com" 
                            className="p-3 w-full xl:w-80 text-gray-700 focus:outline-none rounded-lg" 
                        />
                        <button 
                            type="submit" 
                            className={`bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                        </button>
                    </form>
                    {message && (
                        <p className={`mt-4 ${message.includes('successfully') ? 'text-green-500' : 'text-primary'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
