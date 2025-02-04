import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { IoIosArrowBack, IoIosArrowForward , } from "react-icons/io"

export default function IndustrySectors() {
  const sectors = [
    {
      title: "Chemical & Fertilizers",
      image:
        "https://www.prakashsteelage.com/Backend/images/industry_sector/image-1700803172.jpg",
      icon: "🏭",
    },
    {
      title: "Condensers",
      image:
        "https://www.prakashsteelage.com/Backend/images/industry_sector/image-1700803100.jpg",
      icon: "⚙️",
    },
    {
      title: "Dairy",
      image:
        "https://www.prakashsteelage.com/Backend/images/industry_sector/image-1700803674.jpg",
      icon: "🥛",
    },
    {
      title: "Desalination",
      image:
        "https://www.prakashsteelage.com/Backend/images/industry_sector/image-1700803820.jpg",
      icon: "🚰",
    },
    {
      title: "Distilleries",
      image:
        "https://www.prakashsteelage.com/Backend/images/industry_sector/image-1700803897.jpg",
      icon: "🍺",
    },
    {
      title: "Food & Beverage",
      image:
        "https://www.prakashsteelage.com/Backend/images/industry_sector/image-1700804046.jpg",
      icon: "🍽️",
    }
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="flex absolute pl-1 md:-right-10 top-[43%] transform -translate-y-1/2 z-10 pt-2 cursor-pointer text-red-700 bg-gray-50 hover:bg-gray-200 rounded-full h-8 w-8 justify-center items-center"
        style={{ ...style, display: "block", right: "10px", zIndex: 1 }}
        onClick={onClick}
      >
        <IoIosArrowForward size={25} className="-mt-1" />
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="flex absolute -left-2 md:-left-10 top-[43%] transform -translate-y-1/2 z-10 pt-2 cursor-pointer text-red-700 bg-gray-50 hover:bg-gray-200 rounded-full h-8 w-8 justify-center items-center"
        style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
        onClick={onClick}
      >
        <IoIosArrowBack size={25} className="-mt-1" />
      </div>
    );
  }

  return (
    <div className="py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">PRAKASH STEELAGE LTD.</h2>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Industry Sectors</h3>
        </div>

        <Slider {...settings}>
          {sectors.map((sector, index) => (
            <div key={index} className="px-2">
              <div className="border-none">
                <div className="p-0">
                  <div className="relative">
                    <img
                      src={sector.image || "/placeholder.svg"}
                      alt={sector.title}
                      width={600}
                      height={400}
                      className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white p-4 rounded-full shadow-lg">
                      <span className="text-3xl">{sector.icon}</span>
                    </div>
                  </div>
                  <div className="text-center pt-12 pb-6">
                    <h3 className="text-xl font-semibold text-gray-800">{sector.title}</h3>
                  </div>
                  <div className="h-1 bg-teal-600 w-full rounded-b-lg" />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}