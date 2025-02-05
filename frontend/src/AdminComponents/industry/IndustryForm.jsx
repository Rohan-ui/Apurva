import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CreateIndustry = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState(null);
    const [image, setImage] = useState(null);
    const [iconPreview, setIconPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/api/industry/${id}`);
                    const { title, icon, image } = response.data;
                    setTitle(title);
                    setIcon(icon);
                    setImage(image);
                    setIconPreview(`/api/image/download/${icon}`);
                    setImagePreview(`/api/image/download/${image}`);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [id]);

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        setIcon(file);
        setIconPreview(URL.createObjectURL(file));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        if (icon instanceof File) formData.append('icon', icon);
        if (image instanceof File) formData.append('image', image);

        try {
            if (id) {
                await axios.put(`/api/industry/update/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('/api/industry/add', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/industry');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="w-full md:w-1/2  p-4 bg-white shadow-md rounded-lg ">
            <h1 className="text-2xl font-bold  mb-4">
                {id ? 'Update Industry' : 'Add Industry'}
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             <div className='flex gap-3 items-center'>
             <label htmlFor="">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="border border-gray-300 rounded p-2"
                    required
                />
             </div>

                <label className="flex flex-col items-center border-2 border-dashed p-4 cursor-pointer">
                    Upload Icon
                    <input type="file" className="hidden" onChange={handleIconChange} />
                </label>
                {iconPreview && (
                    <img src={iconPreview} alt="Icon Preview" className="w-24 h-24 object-cover " />
                )}

                <label className="flex flex-col items-center border-2 border-dashed p-4 cursor-pointer">
                    Upload Image
                    <input type="file" className="hidden" onChange={handleImageChange} />
                </label>
                {imagePreview && (
                    <img src={imagePreview} alt="Image Preview" className="w-24 h-24 object-cover " />
                )}

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    {id ? 'Update' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default CreateIndustry;
