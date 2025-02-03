import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { GrDocumentTest } from "react-icons/gr";
import { LuTestTube2 } from "react-icons/lu";
import { GrTest } from "react-icons/gr";
import { FaBacterium } from "react-icons/fa";
import { GiHeartOrgan } from "react-icons/gi";
import { GiDna2 } from "react-icons/gi";
import { SiMicrogenetics } from "react-icons/si";
import { RiTestTubeLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";

function ProductCategoryGrid() {

  const [product, setProduct] = useState([]);
  const [category,setCategory]=useState([])
  const { slug } = useParams(); // Get category slug from URL

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`/api/product/getProductsByCategory?categorySlug=${slug}`);
        setProduct(response.data.products);
        setCategory(response.data.category)
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [slug]);

  return (
    <div className=" pb-14">
   
        <>
          <style>
            {`
          .banner-background {
           background-image: url(/api/logo/download/${category.photo});
        `}
          </style>
          <div
            className={`banner-background relative bg-cover bg-center bg-no-repeat`}
            title={category.imgTitle}
          >
            <div className='flex flex-col justify-center items-center h-[40vh] sm:h-[30vh] mb-10'>
              <h1 className='font-bold text-white sm:text-2xl md:text-3xl z-10 uppercase  text-center'>
                {category.category}
              </h1>
              <div className="absolute bottom-4 flex space-x-2 z-10">
                <Link to="/" className="text-white hover:text-gray-300 uppercase">Home</Link>
                <span className="text-white">/</span>
                <p className="text-white hover:text-gray-300  cursor-pointer uppercase">{category.category}</p>
              </div>
              <div className='absolute inset-0 bg-black opacity-40 z-1'></div>
            </div>
          </div>
          <p className='text-center mx-auto w-[80%] font-semibold m-8'>{category.description}</p>
        </>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16 m-4'>

        {product.map((product, index) => (
          <ServiceCard
            key={product.id}
            imageSrc={product.photo && product.photo.length > 0 && `/api/image/download/${product.photo[0]}`}
            icon={iconMap[index % iconMap.length]}
            title={product.title}
            imgTitle={product.imgTitle}
            alt={product.alt}
            slug={product.slug}
          />
        ))}

      </div>
    </div>
  );
}

export default ProductCategoryGrid;

const colorMap = {
  GrDocumentTest: {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      hoverBgColor: 'group-hover:bg-blue-500',
      hoverTextColor: 'group-hover:text-white',
  },
  LuTestTube2: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      hoverBgColor: 'group-hover:bg-red-500',
      hoverTextColor: 'group-hover:text-white',
  },
  GrTest: {
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-600',
      hoverBgColor: 'group-hover:bg-teal-500',
      hoverTextColor: 'group-hover:text-white',
  },
  FaBacterium: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      hoverBgColor: 'group-hover:bg-green-500',
      hoverTextColor: 'group-hover:text-white',
  },
  GiHeartOrgan: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      hoverBgColor: 'group-hover:bg-red-500',
      hoverTextColor: 'group-hover:text-white',
  },
  GiDna2: {
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      hoverBgColor: 'group-hover:bg-purple-500',
      hoverTextColor: 'group-hover:text-white',
  },
  SiMicrogenetics: {
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600',
      hoverBgColor: 'group-hover:bg-pink-500',
      hoverTextColor: 'group-hover:text-white',
  },
  RiTestTubeLine: {
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      hoverBgColor: 'group-hover:bg-orange-500',
      hoverTextColor: 'group-hover:text-white',
  }
};

const iconMap = [GrDocumentTest, LuTestTube2, GrTest, FaBacterium, GiHeartOrgan, GiDna2, SiMicrogenetics, RiTestTubeLine];

function ServiceCard({ imageSrc, icon: Icon, title, slug, alt, imgTitle }) {
  const iconName = Icon.displayName || Icon.name;
  const colors = colorMap[iconName] || {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-600',
      hoverBgColor: 'group-hover:bg-gray-200',
      hoverTextColor: 'group-hover:text-white',
  };

  return (
      <>
          <div className={`bg-white shadow-lg group h-[10cm] `}>
            <div className='overflow-hidden '>
                <Link to={`/${slug}`}>
                    <img src={imageSrc} alt={alt} title={imgTitle} className="w-full h-56 object-cover bg-gray-100 transform group-hover:scale-125 transition duration-500" />
                </Link>
            </div>
            <div className="py-5 px-4 items-start justify-center flex flex-col gap-2 flex-wrap md:flex-nowrap ">
                <div className='flex items-center w-full gap-4'>
                    <div className={`flex justify-center items-center ${colors.bgColor} ${colors.hoverBgColor} rounded-full p-4 h-fit`}>
                        <Icon className={`${colors.textColor} ${colors.hoverTextColor} transition duration-300 text-[18px]`} />
                    </div>
                    <Link to={`/${slug}`} className={`text-[18px] font-bold text-gray-800 `}>{title}</Link>
                </div>
                <div className="flex w-full justify-end">
                    <Link to={`/${slug}`} className={`text-primary font-medium flex items-center text-[14px]`}>
                        READ MORE <FaArrowRight className="ml-2" />
                    </Link>
                </div>
            </div>
        </div>
      </>
  );
}