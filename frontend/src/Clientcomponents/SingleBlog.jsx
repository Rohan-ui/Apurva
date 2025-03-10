import React, { useState, useEffect } from 'react'
// import previous from '../assets/previous.jpg'
// import next from '../assets/next.jpg'
// import profile1 from '../assets/profile1.jpeg'
// import profile2 from '../assets/profile2.jpeg'
// import { TbScanEye } from "react-icons/tb";
import { FaRegFolder } from "react-icons/fa6";
import Slider from 'react-slick';
// import { FaShareAlt } from "react-icons/fa";
// import blogdetail from "../assets/blogdetail.jpg"
// import mission1 from "../assets/mission1.jpg"
// import mission2 from "../assets/mission2.jpg"
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import ReactQuill from 'react-quill';


function SingleBlog() {
    const { slug } = useParams();
    const [blogData, setBlogData] = useState([]);
    // const [blogcategories, setBlogCategories] = useState([]);
    const [news, setNews] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/news/getLatestActiveNews`, { withCredentials: true });
            const newsWithIds = response.data.data.map((newsItem, index) => ({
                ...newsItem,
            }));
            setNews(newsWithIds);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [comment, setComment] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    // };

    useEffect(() => {
        // Fetch product data from the backend
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/news/getDataBySlug?slugs=${slug}`);
                const { productData } = response.data;
                setBlogData(productData);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchData();
    }, [slug]);

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await axios.get('/api/news/getCategoryAndPhoto');
    //             setBlogCategories(response.data);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     fetchCategories();
    // }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
    };

    
    return (
       <>
        <div
        className={`relative bg-cover bg-center bg-no-repeat`}
        style={{ backgroundImage: `url(/api/image/download/${blogData.photo})` }}
    // title={formattedCategory}
    >
        <div className='flex flex-col justify-center items-center h-[40vh] md:h-[30vh] mb-10'>
            <h1 className='font-bold text-white sm:text-2xl md:text-3xl text-xl z-10  text-center '>
                {blogData.title}
            </h1>
            <div className="absolute bottom-4 flex space-x-2 z-10">
                <Link to="/blogs" className="text-white hover:text-gray-300 ">Blog</Link>
                <span className="text-white">/</span>
                <p className="text-white hover:text-gray-300  cursor-pointer ">{blogData.title}</p>
            </div>
            <div className='absolute inset-0 bg-black opacity-40 z-1'></div>
        </div>
    </div>
        <div className='lg:flex lg:py-10 lg:px-2 xl:py-16 xl:px-20'>

            {/* L H S  */}

            <div className='lg:w-2/3'>

                {/* 3 card  */}

                <div className='m-5 space-y-5'>
                    <div><img src={`/api/image/download/${blogData.photo}`} className='rounded w-full' alt={blogData.alt} title={blogData.imgTitle} /></div>
                    <p className='text-2xl font-semibold font-montserrat'>{blogData.title}</p>
                    <p className='text-lg'> <ReactQuill
                        readOnly={true}
                        value={blogData.details}
                        modules={{ toolbar: false }}
                        theme="bubble"
                        className="quill"
                    /></p>
                </div>
            </div>

            {/* keyword  */}

            <div className='lg:w-1/3 space-y-16'>

                {/* slide  */}
                <div className='m-4 shadow-md rounded'>
                    <div className='p-5 py-10'>
                        <p className="text-2xl font-semibold mb-6 font-montserrat">Latest Post</p>
                        <hr className='border-4 rounded w-1/6 border-primary my-4' />
                        <Slider {...settings}>
                            {news.map((post) => (
                                <div key={post.id} className='p-4 w-full md:w-full'>
                                    <div className='relative'>
                                       <Link to={`/${post.slug}`}>
                                       <img src={`/api/image/download/${post.photo[0]}`} alt={post.alt[0]} title={post.imgTitle[0]} className='rounded w-full object-cover' />
                                       </Link>
                                        <p className='flex items-center gap-2 bottom-0 absolute bg-primary text-white p-2 md:px-4 rounded font-nunito'>
                                            <FaRegFolder />{post.category}
                                        </p>
                                    </div>
                                    <div className='pt-5 space-y-3'>
                                        <p className='text-gray-500 font-nunito'>{post.date}</p>
                                        <Link to={`/${post.slug}`} className='text-gray-800 font-medium text-lg pr-4 font-montserrat'>{post.title}</Link>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>

        </div>
       </>
    )
}

export default SingleBlog
