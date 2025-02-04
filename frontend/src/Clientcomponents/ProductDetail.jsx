import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import ReactQuill from "react-quill"
import { ProductImages } from "./productComponent/ProductImages"
import { ProductDetailsTable } from "./productComponent/ProductDetailsTable"
import { RelatedProducts } from "./productComponent/RelatedProducts"
import InquiryForm from "./InquiryForm"
import { GrDocumentTest, GrTest } from "react-icons/gr"
import { LuTestTube2 } from "react-icons/lu"
import { FaBacterium } from "react-icons/fa"
import { GiHeartOrgan, GiDna2 } from "react-icons/gi"
import { SiMicrogenetics } from "react-icons/si"
import { RiTestTubeLine } from "react-icons/ri"

const iconMap = [
  GrDocumentTest,
  LuTestTube2,
  GrTest,
  FaBacterium,
  GiHeartOrgan,
  GiDna2,
  SiMicrogenetics,
  RiTestTubeLine,
]

function ProductDetail() {
  const { slug } = useParams()
  const [productData, setProductData] = useState({})
  const [productDetails, setProductDetails] = useState({})
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [activeSection, setActiveSection] = useState("details")
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    if (showInquiryForm) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [showInquiryForm])

  useEffect(() => {
    fetchData()
    fetchRelatedData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/product/getDataBySlug?slugs=${slug}`)
      const { productData, productDetailData } = response.data
      setProductData(productData)
      setProductDetails(productDetailData)
    } catch (error) {
      console.error("Error fetching product data:", error)
    }
  }

  const fetchRelatedData = async () => {
    try {
      const response = await axios.get(`/api/product/getRelatedProducts?slugs=${slug}`)
      setRelatedProducts(response.data)
    } catch (error) {
      console.error("Error fetching related products:", error)
    }
  }

  return (
    <>
      {showInquiryForm && <InquiryForm productName={productData.title} onClose={() => setShowInquiryForm(false)} />}
      {productData.photo && productData.photo.length > 0 && (
        <style>
          {`
          .banner-background {
            background-image: url(/api/image/download/${productData.photo[0]})
          }
          `}
        </style>
      )}
      <div className="banner-background relative bg-cover bg-center bg-no-repeat">
        <div className="flex justify-center items-center h-[20vh] sm:h-[30vh] md:h-[30vh] md:mb-10">
          <h1 className="font-bold text-white sm:text-2xl md:text-3xl text-xl z-10 text-center uppercase">
            {productData.title}
          </h1>
          <div className="absolute bottom-2 flex space-x-4 z-10">
            <Link to="/" className="text-white hover:text-gray-300 ">
              Home
            </Link>
            <span className="text-white">/</span>
            <p className="text-white hover:text-gray-300 cursor-pointer ">{productData.title}</p>
          </div>
          <div className="absolute inset-0 bg-black opacity-40 z-1"></div>
        </div>
      </div>

      <div className="flex flex-col justify-center  md:flex-row gap-5 md:gap-10 mx-2 md:mx-20 ">
        <div className=" md:w-1/3 w-full  ">    
            <ProductImages photos={productData.photo || []} />
        </div>
        <div className="w-[90%] md:w-1/2">
          {activeSection === "details" && (
            <div className="">
              <div className="  ">
                <h2 className="text-2xl border-b-2 w-fit border-red-700 font-bold text-primary mb-3"> {productData.title}</h2>
                <ProductDetailsTable details={productDetails} />
              </div>
              <div className="space-x-5 md:space-y-2">
          <button
            onClick={() => setShowInquiryForm(true)}
            className="bg-primary px-2 py-1 md:px-10 mt-3 md:py-2 float-right  rounded hover:border-b-4 border-b-primary hover:text-black hover:bg-white hover:shadow-lg text-white font-bold shadow-lg shadow-gray-200"
          >
            INQUIRY NOW
          </button>
        </div>
            </div>
          )}
        </div>
      </div>
      
      
    <div className="flex flex-col justify-center items-center mx-2 md:mx-20">
    <p className="bg-gray-100 mt-5 w-[87%]  mx-2 md:mx-20 p-5 rounded-lg">
            <span className="text-xl  font-bold text-red-700">Description:-</span>
            <ReactQuill
              readOnly={true}
              value={productData.details}
              modules={{ toolbar: false }}
              theme="bubble"
              className="quill "
            />
      </p>
    </div>

     
   

      {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} iconMap={iconMap} />}
    </>
  )
}

export default ProductDetail

