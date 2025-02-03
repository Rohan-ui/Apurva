import { useState } from "react"
import Slider from "react-slick"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const CustomPrevArrow = (props) => (
  <div
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-[#0f0f0f54] rounded-full h-8 w-8 flex justify-center items-center"
    onClick={props.onClick}
  >
    <IoIosArrowBack size={25} />
  </div>
)

const CustomNextArrow = (props) => (
  <div
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-[#0f0f0f54] rounded-full h-8 w-8 flex justify-center items-center"
    onClick={props.onClick}
  >
    <IoIosArrowForward size={25} />
  </div>
)

export const ProductImages = ({ photos }) => {
  const [selectedImage, setSelectedImage] = useState(photos[0])
  const [sliderRef, setSliderRef] = useState(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    beforeChange: (current, next) => {
      setSelectedImage(photos[next])
    },
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  }

  const handleThumbnailClick = (img) => {
    setSelectedImage(img)
    const index = photos.indexOf(img)
    if (sliderRef && index !== -1) {
      sliderRef.slickGoTo(index)
    }
  }

  if (photos.length === 0) {
    return null
  }

  if (photos.length === 1) {
    return (
      <div className="mb-4">
        <img
          src={`/api/image/download/${photos[0]}`}
          alt="Product Image"
          className="w-full h-[9cm] bg-gray-100 lg:h-[10cm] object-cover md:rounded-lg"
        />
      </div>
    )
  }

  return (
    <>
      <Slider {...settings} ref={setSliderRef} className="mb-4">
        {photos.map((img, index) => (
          <div key={index}>
            <img
              src={`/api/image/download/${img}`}
              alt={`Product Image ${index + 1}`}
              className="w-full h-[9cm] lg:h-[10cm] object-cover md:rounded-lg"
            />
          </div>
        ))}
      </Slider>
      <div className="flex justify-center items-center gap-4 md:gap-12 lg:gap-8">
        {photos.map((img, index) => (
          <div
            key={index}
            className={`border-2 ${selectedImage === img ? "border-blue-500" : "border-gray-400"}`}
            onClick={() => handleThumbnailClick(img)}
          >
            <img
              src={`/api/image/download/${img}`}
              alt={`Thumbnail ${index + 1}`}
              className="w-[4cm] h-[2cm] md:w-[4cm] md:h-[3cm] lg:w-[4cm] lg:h-[2cm] object-cover cursor-pointer"
            />
          </div>
        ))}
      </div>
    </>
  )
}

