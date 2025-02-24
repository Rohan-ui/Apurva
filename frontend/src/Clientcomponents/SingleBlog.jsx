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



                {/* share card  */}

                {/* <div className='m-4 rounded-lg bg-gray-100 md:flex md:justify-between md:items-center md:text-center'>
                    <div className='flex flex-wrap p-6 gap-3 font-nunito'>
                        <p className='bg-white hover:bg-teal-500 hover:text-white rounded duration-500 cursor-pointer p-3'>COVID-19</p>
                        <p className='bg-white hover:bg-teal-500 hover:text-white rounded duration-500 cursor-pointer p-3'>BACTERIA</p>
                        <p className='bg-white hover:bg-teal-500 hover:text-white rounded duration-500 cursor-pointer p-3'>MEDICINE</p>
                    </div>
                    <p className='flex items-center gap-2 text-gray-500 font-medium  p-6   hover:text-teal-500 md:flex md:text-center md:justify-between font-montserrat '>Share this post <div><FaShareAlt /></div></p>
                </div> */}



                {/* card  */}

                {/* <div className="p-4">
                    <p className="text-2xl font-semibold mb-6 font-montserrat">Comments</p>
                    {comments.map((comment, index) => (
                        <div key={index} className="mb-6 ">
                            <div className="flex items-start mb-2 py-5 gap-1 md:gap-2">
                                <img src={comment.profileImg} alt={`${comment.name}'s profile`} className="h-20 w-20  mr-4" />
                                <div className='space-y-5'>
                                    <div className=" md:flex md:justify-between md:items-center">
                                        <p className="font-semibold text-2xl font-montserrat">{comment.name}</p>
                                        <p className="text-gray-400 text-base font-medium font-nunito">{comment.date}</p>
                                    </div>
                                    <p className="text-gray-700 text-lg font-nunito">{comment.comment}</p>
                                    <button className="text-gray-500 hover:underline mt-2 flex items-center font-medium font-montserrat">
                                        Reply
                                    </button>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}

                    form 

                    <div className="bg-white p-6 rounded-lg shadow-md mt-10 border">
                        <h2 className="text-2xl font-semibold mb-4 font-montserrat">Send Your Comment</h2>
                        <p className="text-gray-500 text-lg mb-4 font-nunito">Your email address will not be published. Required fields are marked *</p>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Your Name *"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="font-nunito border border-gray-300 bg-gray-100 p-4 rounded-lg w-full"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="font-nunito border border-gray-300 bg-gray-100 p-4 rounded-lg w-full"
                                    required
                                />
                            </div>
                            <textarea
                                placeholder="Comment ..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="font-nunito border border-gray-300 bg-gray-100 p-4 rounded-lg w-full h-32 mb-4"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-gray-900 text-white w-full py-4 rounded hover:bg-teal-500 font-montserrat"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Post Comment'}
                            </button>
                            {error && <p className="text-red-500 mt-4">{error}</p>}
                        </form>
                    </div>
                </div> */}
            </div>

            {/* keyword  */}

            <div className='lg:w-1/3 space-y-16'>



                {/* categories  */}

                {/* <div className='m-4 shadow-md'>
                    <div className='p-5 py-10'>
                        <p className="text-2xl font-semibold mb-6 font-montserrat">Categories</p>
                        <hr className='border-4 rounded w-1/6 border-red-500 my-4' />
                        <ul className='space-y-3 font-nunito'>
                            {blogcategories.map((category, index) => (
                               <Link to={`/${category.slug}`}> <li
                               key={index}
                               className='flex items-center gap-2 text-gray-600 text-lg bg-white p-3 rounded hover:bg-red-500 hover:text-white cursor-pointer'
                           >
                               <FaRegFolder />
                               {category.category}
                           </li></Link>
                            ))}
                        </ul>
                    </div>
                </div> */}


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



                {/* tags card  */}

                {/* <div className="p-6 m-4 shadow-md rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4 flex items-center font-daysOne">
                       Popular Tags
                    </h3>
                    <hr className='border-4 rounded w-1/6 border-teal-500 my-4' />
                    <div className="flex flex-wrap gap-3 font-nunito">
                        {tags.map((tag, index) => (
                            <span key={index} className="bg-white font-semibold text-gray-700 px-5 py-2 rounded shadow hover:bg-teal-500 hover:text-white cursor-pointer">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div> */}



            </div>

        </div>
       </>
    )
}

export default SingleBlog
