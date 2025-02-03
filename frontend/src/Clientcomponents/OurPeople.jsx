import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Ourpeople from "../assets/Group1.png"
import ReactQuill from 'react-quill';

function OurPeople() {
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [description, setDescription] = useState("");
    const [currentPhoto, setCurrentPhoto] = useState("");
    const [altText, setAltText] = useState("");
    const [imgTitle, setImgTitle] = useState("")

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

    useEffect(() => {
        fetchHeadings();
        fetchOurPeople();
    }, []);

    return (
        <>
            <div className=" flex flex-col-reverse lg:flex-row w-[90%] justify-center items-center mx-auto my-16  gap-8">
                <div className=" flex flex-col justify-center text-black   ">
                    <p className=" uppercase md:text-[20px] text-primary font-bold mb-4 text-center md:text-left">____{heading}</p>
                    <p className='font-daysOne text-3xl sm:text-4xl mb-8 text-center md:text-left text-gray-800'>{subheading}</p>
                    <p className=" md:text-[20px] justify-center  flex">
                        <ReactQuill
                            readOnly={true}
                            value={description || ''}
                            modules={{ toolbar: false }}
                            theme="bubble"
                            className="quill"
                        />
                    </p>
                </div>
                <img src={`/api/logo/download/${currentPhoto}`} alt={altText} title={imgTitle} className="md:w-[500px] md:h-[500px]  sm:w-[400px] sm:h-[400px] w-[300px] h-[300px] " />
            </div>


        </>
    )
}

export default OurPeople
