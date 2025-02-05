import React, { useState, useEffect } from 'react';
import { FaPlay } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';

function Video() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const location = useLocation();
    const [pagecontent, setPageContent] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/aboutus/getActiveAboutus`, { withCredentials: true });
            setPageContent(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
        setVideoUrl(pagecontent.video);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setVideoUrl('');
    };

    return (
        <div className='flex justify-center items-center md:py-16 bg-gray-100'>
            <div className='p-4  md:px-20  '>
                <div className='xl:flex xl:gap-10'>
                    <div className='flex justify-center items-center xl:w-1/2'>
                        <div className='relative'>
                            {pagecontent.photo && pagecontent.photo.length > 0 && (
                                <>
                                    <img src={`/api/image/download/${pagecontent.photo[0]}`} alt={pagecontent.alt[0]} title={pagecontent.imgTitle[0]} className='md:w-auto md:h-auto md:max-w-full' />
                                    <div className='absolute bottom-10 sm:bottom-24 md:bottom-10 md:inset-0 md:flex md:justify-center md:items-center'>
                                        <div
                                            onClick={openModal}
                                            className='cursor-pointer text-white animate-pulse bg-primary hover:bg-secondary p-5 xl:p-10 rounded-full flex justify-center items-center md:text-xl'
                                        >
                                            <FaPlay size={24} />
                                        </div>
                                    </div>
                                    <div className='hidden md:block absolute bottom-0 -left-[6rem] md:w-[40%]'>
                                        <img src={`/api/image/download/${pagecontent.photo[1]}`} alt={pagecontent.alt[1]} title={pagecontent.imgTitle[1]} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='py-5 space-y-10 xl:w-1/2'>
                       
                        <div className='mt-5'>
                            <p className='text-3xl sm:text-4xl font-daysOne md:px-0 md:text-[40px] text-gray-800 mt-4 text-center md:text-left '>{pagecontent.subheading}</p>
                            {location.pathname == '/aboutus' ? <p className='justify-center mt-8'>
                                <ReactQuill
                                    readOnly={true}
                                    value={pagecontent.shortDescription || ''}
                                    modules={{ toolbar: false }}
                                    theme="bubble"
                                    className="quill"
                                />
                            </p> : <p className='justify-center  my-8'>
                                <ReactQuill
                                    readOnly={true}
                                    value={pagecontent.shortDescription || ''}
                                    modules={{ toolbar: false }}
                                    theme="bubble"
                                    className="quill"
                                />
                            </p>}
                        </div>
                        {location.pathname === '/aboutus' && (
                            <p className='justify-center text-justify pt-4'>

                                <ReactQuill
                                    readOnly={true}
                                    value={pagecontent.longDescription || ''}
                                    modules={{ toolbar: false }}
                                    theme="bubble"
                                    className="quill"
                                />
                            </p>
                        )}
                        {location.pathname !== '/aboutus' && (
                            <div className='flex justify-center md:justify-start'>

                                <Link to="/aboutus" className='cursor-pointer   bg-primary hover:bg-secondary text-white font-semibold p-4 md:px-7 rounded uppercase '>Know More</Link>

                            </div>

                        )}
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
                        <div className="bg-white p-5 rounded-lg shadow-lg relative w-1/2 h-1/2 ">
                            <button
                                className="absolute top-0 right-0 p-2 text-white bg-black rounded z-50"
                                onClick={closeModal}
                            >
                                ✖
                            </button>
                            <div className=" w-full h-full">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={videoUrl}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Video;
