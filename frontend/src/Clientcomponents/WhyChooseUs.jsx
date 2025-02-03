import React, { useState, useEffect } from 'react';
import { FaFlask, FaBrain, FaClock, FaUsers } from 'react-icons/fa';
import axios from 'axios'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FeatureCard = ({ icon, alt, imgTitle, title, description }) => (
    <div className="flex flex-col justify-center items-center md:items-start  p-6">
        <div className="bg-white rounded-full p-6  w-fit mb-8 transition-all duration-1000 ">
            <img className="text-5xl text-primary transition-all duration-1000 w-[2cm] " src={`/api/image/download/${icon}`} alt={alt} title={imgTitle} />
        </div>
        <h3 className="text-2xl  mb-4 text-white font-daysOne text-center md:text-left">{title}</h3>
        <p className="text-secondary text-[16px] ">
            <ReactQuill
                readOnly={true}
                value={description}
                modules={{ toolbar: false }}
                theme="bubble"
                className="quill"
            /></p>
    </div>
);


function WhyChooseUs() {

    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [loadings, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=whychooseus', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/whyChooseUs/getAllWhyChooseUs`, { withCredentials: true });
            const data = Array.isArray(response.data) ? response.data : [];
            const itemsWithIds = data.map((item, index) => ({
                ...item,
            }));
            setItems(itemsWithIds);
        } catch (error) {
            console.error('Error fetching why choose us data:', error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeadings();
        fetchData();
    }, []);

    return (

        <div className="bg-black text-white py-16 px-4 flex justify-center items-center mb-16">
            <div className="max-w-6xl mx-auto">
                <h2 className="md:text-[20px] font-bold text-primary text-center mb-6 uppercase">____{heading}</h2>
                <h1 className="text-3xl sm:text-4xl  font-daysOne text-center mb-12 capitalize ">{subheading}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <FeatureCard
                            key={index}
                            icon={item.photo}
                            alt={item.alt}
                            imgTitle={item.imgTitle}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default WhyChooseUs;
