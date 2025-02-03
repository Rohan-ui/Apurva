import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function OurPeople() {
    const [description, setDescription] = useState("");
    const [currentPhoto, setCurrentPhoto] = useState("");
    const [photo, setPhoto] = useState(null);
    const [altText, setAltText] = useState("");
    const [imgTitle, setImgTitle] = useState("")
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");

    useEffect(() => {
        fetchOurPeople();
    }, []);

    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=ourpeople', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };

    const saveHeadings = async () => {
        try {
            await axios.put('/api/pageHeading/updateHeading?pageType=ourpeople', {
                pagetype: 'ourpeople',
                heading,
                subheading,
            }, { withCredentials: true });
            notify();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHeadings();
    }, []);

    const handleHeadingChange = (e) => setHeading(e.target.value);
    const handleSubheadingChange = (e) => setSubheading(e.target.value);


    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleDeleteImage = () => {
        setPhoto(null);
        setAltText(null);
        setImgTitle(null)
        setCurrentPhoto("");
    };

    const notify = () => {
        toast.success("Updated Successfully!");
    };

    const fetchOurPeople = async () => {
        try {
            const response = await axios.get('/api/ourpeople/getOurPeople', { withCredentials: true });
            const ourpeople = response.data;

            setDescription(ourpeople.description || "");
            setCurrentPhoto(ourpeople.photo);
            setAltText(ourpeople.alt);
            setImgTitle(ourpeople.imgTitle);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("description", description);
        formData.append("alt", altText);
        formData.append("imgTitle", imgTitle);
        if (photo) {
            formData.append("photo", photo);
        } else if (currentPhoto) {
            formData.append("photo", currentPhoto);
        }

        try {
            await axios.put(`/api/ourpeople/updateOurPeople`, formData, { withCredentials: true });
            notify();
        } catch (error) {
            console.error(error);
        }
    };

    const modules = {
        toolbar: [
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Our People</h1>
            <ToastContainer />
            <div className="mb-8 mt-8 border border-gray-200 shadow-lg p-4 rounded ">
                <div className="grid md:grid-cols-2  md:gap-2 grid-cols-1">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2 uppercase font-serif">Heading</label>
                        <input
                            type="text"
                            value={heading}
                            onChange={handleHeadingChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2 uppercase font-serif">Sub heading</label>
                        <input
                            type="text"
                            value={subheading}
                            onChange={handleSubheadingChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                        />
                    </div>
                </div>
                <button
                    onClick={saveHeadings}
                    className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300"
                >
                    Save
                </button>
            </div>
            <div className="mb-8">
                <label htmlFor="description" className="block font-semibold mb-2">
                    Description
                </label>
                <ReactQuill
                    value={description}
                    onChange={setDescription}
                    modules={modules}
                    className="quill"
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

                { 
                    <div className="mt-2 w-56 relative group">
                        <img
                            src={photo ? URL.createObjectURL(photo) : currentPhoto ? `/api/logo/download/${currentPhoto}` : ""}
                            alt="Gallery"
                            className="h-32 w-56 object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleDeleteImage}
                            className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
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
                            <label htmlFor="imgTitle" className="block font-semibold mb-2">Alternative Text</label>
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
                }
            </div>
            <div className="mt-4">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                    Save Changes
                </button>
            </div>
        </form>
    )
}

export default OurPeople
