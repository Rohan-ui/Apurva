import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function IndustrySectors() {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get("/api/industry/all");
        setSectors(response.data); // Assuming response.data is an array
      } catch (error) {
        console.error("Error fetching industry sectors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSectors();

    // Track screen width changes
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: isSmallScreen ? null : <SampleNextArrow />,
    prevArrow: isSmallScreen ? null : <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 480, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="flex absolute pl-1 md:-right-10 top-[43%] transform -translate-y-1/2 z-10 pt-2 cursor-pointer text-red-700 h-8 w-8 justify-center items-center transition-transform duration-300 hover:scale-110"
        onClick={onClick}
      >
        <IoIosArrowForward size={25} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="flex absolute -left-2 md:-left-10 top-[43%] transform -translate-y-1/2 z-10 pt-2 cursor-pointer text-red-700 h-8 w-8 justify-center items-center transition-transform duration-300 hover:scale-110"
        onClick={onClick}
      >
        <IoIosArrowBack size={25} />
      </div>
    );
  }

  return (
    <div className="py-12 px-4 mb-10 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-red-800 mb-2">
            APURVA CHEMICALS PVT LTD.
          </h2>
          <h3 className="text-4xl font-bold text-gray-600 mb-4">
            Industry Sectors
          </h3>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 rounded-lg h-[300px]"
              />
            ))}
          </div>
        ) : (
          <Slider {...settings}>
            {sectors.map((sector) => (
              <div key={sector._id} className="px-2">
                <div className="border-none transition-transform duration-300 transform hover:scale-90 hover:shadow-xl rounded-lg">
                  <div className="relative">
                    <img
                      src={`/api/image/download/${sector.image}`}
                      alt={sector.title}
                      className="w-full h-[300px] object-cover rounded-t-lg"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white p-4 rounded-full shadow-lg transition-transform duration-300 hover:rotate-12 hover:scale-110">
                      <img
                        src={`/api/image/download/${sector.icon}`}
                        alt="icon"
                        className="w-10 h-10"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="text-center pt-12 pb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {sector.title}
                    </h3>
                  </div>
                  <div className="h-1 bg-red-800 w-full rounded-b-lg" />
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
