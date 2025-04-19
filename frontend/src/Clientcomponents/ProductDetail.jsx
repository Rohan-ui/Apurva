import { useState, useEffect, useRef } from "react"
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
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import MSDSSection from "./MsdsSection"
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
import "../quill.css"

function ProductDetail() {
  const { slug } = useParams();
  const [productData, setProductData] = useState({});
  const [productDetails, setProductDetails] = useState({});
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [activeSection, setActiveSection] = useState("details");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false); // State to toggle content visibility
  const descriptionRef = useRef(null); // Define descriptionRef

  useEffect(() => {
    if (showInquiryForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showInquiryForm]);

  useEffect(() => {
    fetchData();
    fetchRelatedData();
  }, [slug]); // Add slug as a dependency

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/product/getDataBySlug?slugs=${slug}`);
      const { productData, productDetailData } = response.data;
      console.log(productData.msds);
      setProductData(productData);
      setProductDetails(productDetailData);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const fetchRelatedData = async () => {
    try {
      const response = await axios.get(`/api/product/getRelatedProducts?slugs=${slug}`);
      setRelatedProducts(response.data);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const getPartialContent = (htmlContent) => {
    const contentLength = htmlContent.length;
    const partialLength = Math.floor(contentLength * 0.3); // 30% of the content
    return htmlContent.substring(0, partialLength) + "...";
  };

  return (
    <>


      <div className="max-w-[76rem] pb-1 mx-auto border-b md:pl-8 m-5 flex items-center space-x-4 z-10">
        <Link to="/" className="text-gray-500 hover:text-gray-300">
          Home
        </Link>
        <span className="text-gray-500">
          <MdKeyboardDoubleArrowRight />
        </span>
        <Link to="/dye-intermediate" className="text-gray-500 hover:text-gray-300 cursor-pointer">Dye Intermediate</Link>
        <span className="text-red-700 ">
          <MdKeyboardDoubleArrowRight />
        </span>
        <p className="text-red-700 font-medium hover:text-gray-300 cursor-pointer">{productData.title}</p>
      </div>

      <div className="flex flex-col justify-center  md:flex-row gap-5 md:gap-10 mx-2 md:mx-20 ">
        <div className=" md:w-1/3 w-full  ">
          <ProductImages photos={productData.photo || []} />
        </div>
        <div className="w-[90%] md:w-1/2">
          {activeSection === "details" && (
            <div className="">
              <div className="  ">
                <h1 className="text-2xl border-b-2 w-fit border-red-700 font-bold text-primary mb-3"> {productData.title}</h1>
                <ProductDetailsTable details={productDetails} />
              </div>
              <div className="space-x-5 md:space-y-2">
                <MSDSSection msds={productData.msds} name={productData.title} spec={productData.spec} />

              </div>
            </div>
          )}
        </div>
      </div>

      <div
  ref={descriptionRef}
  className="flex flex-col justify-center items-center mx-2 md:mx-20"
>
  <p className="bg-gray-100 mt-5 w-[87%] mx-2 md:mx-20 p-5 rounded-lg">
    <span className="text-xl font-bold text-red-700 ">Description:-</span>
    <ReactQuill
      value={showFullContent ? productData.details : getPartialContent(productData.details || "")}
      readOnly={true}
      theme={null} // Disable toolbar and editor UI
      className="quill mt-3"
    />
    {!showFullContent ? (
      <button
        className="text-red-700 mt-2 hover:underline"
        onClick={() => setShowFullContent(true)}
      >
        Read More
      </button>
    ) : (
      <button
        className="text-red-700 hover:underline"
        onClick={() => setShowFullContent(false)}
      >
        Show Less
      </button>
    )}
  </p>
</div>




      {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} iconMap={iconMap} />}
    </>
  )
}

export default ProductDetail

