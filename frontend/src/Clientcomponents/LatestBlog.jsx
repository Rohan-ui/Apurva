import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaRegUserCircle } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';

function BlogPage() {
    // const { slug } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    // const [banners, setBanners] = useState([]);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // window.scrollTo(0, 0);
        fetchBlog();
        fetchHeadings();
        // fetchBanners();
        // fetchCategory();
    }, []);

    const fetchBlog = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/news/getLatestActiveNews`, { withCredentials: true });
            // Add data validation
            const data = response.data?.data || response.data || [];
            // Ensure we're working with an array
            setBlogs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setBlogs([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    // const fetchCategory = async () => {
    //     try {
    //         let response
    //         if (slug) {
    //             response = await axios.get(`/api/news/getSpecificCategoryDetails?categoryId=${slug}`, { withCredentials: true })
    //             setCategories(response.data);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching blogs:", error);
    //     }
    // };


    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=news', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };

    // const fetchBanners = async () => {
    //     try {
    //         const response = await axios.get('/api/banner/getBannersBySectionBlog', { withCredentials: true });
    //         setBanners(response.data.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const handleSearchInputChange = (event) => {
    //     setSearchQuery(event.target.value);
    // };

    const filteredBlogs = Array.isArray(blogs) 
        ? blogs.filter(blog => blog?.title?.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    // const formattedCategory = slugs ? slugs.replace(/-/g, ' ') : categoryslug.replace(/-/g, ' ');

    // Show loading state
    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    return (
        <div>
           

                <>
                    <div className='md:px-20 p-4 mt-16 '>
                        <div>
                            <p className='text-primary md:text-[20px] font-bold pb-8 uppercase text-center md:text-left'>____ {heading}</p>
                        </div>
                       <div className='py-4 lg:flex lg:items-center lg:justify-between gap-2 '>
                                                 <p className='text-3xl sm:text-4xl text-gray-800  font-daysOne text-center md:text-left'>{subheading}</p>
                                                 <p className='py-3 text-gray-500 font-semibold flex flex-wrap gap-2'>
                                                 Explore Fresh Perspectives on Products and Industry Innovations.: <Link to="/blogs" className='flex items-center gap-2 text-primary font-semibold'> View All  <FaArrowRight /> </Link>
                                                 </p>
                                             </div>
                    </div>
                </>
         

            <div className="mx-auto  p-4 md:px-20 w-full mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBlogs.map((post, index) => (
                        <div key={index} className="relative border rounded-lg overflow-hidden group hover:shadow-lg">
                            <div className='overflow-hidden'>
                                <Link to={`/${post?.slug || ''}`}>
                                    <img
                                        src={`/api/image/download/${post?.photo?.[0]}`}
                                        alt={post?.alt?.[0] || ''}
                                        title={post?.imgTitle?.[0] || ''}
                                        className="w-full h-48 object-cover group-hover:scale-110 duration-300 rounded-t-lg"
                                    />
                                </Link>
                            </div>
                            <div className="p-6 bg-white">
                                <div className="flex items-center space-x-3 text-gray-600 mb-3">
                                    <FaRegUserCircle size={24} />
                                    <div>
                                        <p className="font-semibold capitalize">{post?.postedBy || ''}</p>
                                        <p className="text-gray-500 text-sm">{post?.date || ''}</p>
                                    </div>
                                </div>
                                <Link 
                                    to={`/${post?.slug || ''}`} 
                                    className="text-lg font-semibold text-gray-900 hover:text-primary capitalize cursor-pointer"
                                >
                                    {post?.title || ''}
                                </Link>
                                <div className="flex justify-between items-center mt-4">
                                    <Link
                                        to={`/${post?.slug || ''}`}
                                        className="text-primary font-bold hover:text-secondary"
                                    >
                                        Read more {'>'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BlogPage;
