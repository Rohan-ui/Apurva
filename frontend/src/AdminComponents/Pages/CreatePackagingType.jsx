import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const NewPackagingTypeForm = () => {
    const [title, setTitle] = useState("");
    const [photo, setPhoto] = useState(null);
    const [altText, setAltText] = useState("");
    const [imgTitle, setImgTitle] = useState("");
    const navigate = useNavigate();

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleDeleteImage = () => {
        setPhoto(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("alt", altText);
        formData.append("imgTitle", imgTitle);
        if (photo) {
            formData.append("photo", photo);
        }

        try {
            await axios.post('/api/packagingtype/insertPackagingType', formData, { withCredentials: true });
            // Reset form fields
            setTitle("");
            setPhoto(null);
            setAltText("");
            setImgTitle("");
            navigate('/packagingType');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Add Packaging Type</h1>
            <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>
            <div className="mb-8">
                <label htmlFor="photo" className="block font-semibold mb-2">Photo</label>
                <input
                    type="file"
                    name="photo"
                    id="photo"
                    onChange={handlePhotoChange}
                    className="border rounded focus:outline-none"
                    accept="image/*"
                />

                {photo && (
                    <div className="mt-2 w-56 relative group">
                        <img
                            src={URL.createObjectURL(photo)}
                            alt="Packaging"
                            className="h-32 w-56 object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleDeleteImage}
                            className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 flex items-center justify-center hover:bg-red-600 focus:outline-none"
                        >
                            X
                        </button>
                        <div className="mb-4">
                            <label htmlFor="alt" className="block font-semibold mb-2">Alternative Text</label>
                            <input
                                type="text"
                                id="alt"
                                value={altText}
                                onChange={(e) => setAltText(e.target.value)}
                                className="w-56 p-2 border rounded focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="imgTitle" className="block font-semibold mb-2">Image Title</label>
                            <input
                                type="text"
                                id="imgTitle"
                                value={imgTitle}
                                onChange={(e) => setImgTitle(e.target.value)}
                                className="w-56 p-2 border rounded focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                )}
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Packaging Type</button>
        </form>
    );
};

export default NewPackagingTypeForm;
