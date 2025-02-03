import React,{useEffect,useState} from 'react';
import ReactSlick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios'
import { Link } from 'react-router-dom';


function Partners() {
    const [partners, setPartners] = useState([]);
    const [loadings, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/partners/getActivePartners`, { withCredentials: true });
          const partnersWithIds = response.data.data
          setPartners(partnersWithIds)
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);

  const settings = {
 
    arrows: false,
    infinite: true,
    speed: 3000,
    autoplay:true,
    autoplaySpeed: 2000,
    slidesToShow: 4, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1536, 
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
         
        },
      },
      {
        breakpoint: 1280, 
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
      
        },
      },
      {
        breakpoint: 1022, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        
        },
      },
      {
        breakpoint: 766, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
       
        },
      },
    ],
  };


  return (
    <div className="bg-black h-[40vh] flex justify-center items-center">
    <div className="w-full max-w-screen-xl">
      <ReactSlick {...settings}>
        {partners.map((logo, index) => (
          <div key={index} className='flex justify-center items-center'>
            <Link to={logo.url} className='focus:outline-none'>
              <img 
                src={`/api/image/download/${logo.photo[0]}`} 
                alt={logo.alt} 
                title={logo.imgTitle} 
                className="mx-auto h-[2cm] w-full px-8 text-center focus:outline-none" 
              />
            </Link>
          </div>
        ))}
      </ReactSlick>
    </div>
  </div>
  
  );
}

export default Partners;
