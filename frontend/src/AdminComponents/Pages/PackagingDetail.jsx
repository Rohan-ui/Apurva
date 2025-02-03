import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function OurPeople() {
    const [description, setDescription] = useState("");
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");

    useEffect(() => {
        fetchPackagingDetail();
    }, []);

    // const fetchHeadings = async () => {
    //     try {
    //         const response = await axios.get('/api/pageHeading/heading?pageType=ourpeople', { withCredentials: true });
    //         const { heading, subheading } = response.data;
    //         setHeading(heading || '');
    //         setSubheading(subheading || '');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const saveHeadings = async () => {
    //     try {
    //         await axios.put('/api/pageHeading/updateHeading?pageType=ourpeople', {
    //             pagetype: 'ourpeople',
    //             heading,
    //             subheading,
    //         }, { withCredentials: true });
    //         notify();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchHeadings();
    // }, []);

    // const handleHeadingChange = (e) => setHeading(e.target.value);
    // const handleSubheadingChange = (e) => setSubheading(e.target.value);



    const notify = () => {
        toast.success("Updated Successfully!");
    };

    const fetchPackagingDetail = async () => {
        try {
            const response = await axios.get('/api/packagingdetail/getPackagingDetail', { withCredentials: true });
            const packagingdetail = response.data;

            setDescription(packagingdetail.description || "");
            setHeading(packagingdetail.heading || "");
            setSubheading(packagingdetail.subheading || "");
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            description,
            heading,
            subheading
        };

        try {
            await axios.put(`/api/packagingdetail/updatePackagingDetail`, data, { withCredentials: true });
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
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Packaging Detail</h1>
            <ToastContainer />
            <div className="mb-6">
                <label className="block mb-2 font-semibold ">Heading</label>
                <input
                    type="text"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                />
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-semibold ">Sub heading</label>
                <input
                    type="text"
                    value={subheading}
                    onChange={(e) => setSubheading(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                />
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
