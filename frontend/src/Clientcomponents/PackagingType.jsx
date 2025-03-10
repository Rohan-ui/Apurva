import React, { useState, useEffect } from 'react';
import JumboBag from "../assets/jumbobag.jpg";
import CorrugatedBox from "../assets/corrugatedbox.jpg";
import PaperBag from "../assets/paperbag.jpg";
import HDPEbag from "../assets/HDPEbag.jpg";
import axios from 'axios'
import ReactQuill from 'react-quill';

const packagingData = [
    { image: CorrugatedBox, title: "Corrugated Box" },
    { image: PaperBag, title: "Paper Bag" },
    { image: HDPEbag, title: "HDPE Bag" },
    { image: JumboBag, title: "Jumbo Bag" },
];

function PackagingType() {
    const [description, setDescription] = useState("");
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [heading2,setHeading2]=useState("")
    const [subheading2,setSubheading2]=useState("")
    const [packagingTypes, setPackagingTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPackagingDetail = async () => {
        try {
            const response = await axios.get('/api/packagingdetail/getPackagingDetail', { withCredentials: true });
            const packagingdetail = response.data;

            setDescription(packagingdetail.description || "");
            setHeading(packagingdetail.heading || "");
            setSubheading(packagingdetail.subheading || "");
        } catch (error) {
            console.error(error);
        }
    };

    const fetchHeadings = async () => {
        try {
          const response = await axios.get('/api/pageHeading/heading?pageType=packagingType', { withCredentials: true });
          const { heading, subheading } = response.data;
          setHeading2(heading || '');
          setSubheading2(subheading || '');
        } catch (error) {
          console.error(error);
        }
      };
    
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/packagingtype/getPackagingTypes`, { withCredentials: true });
          const packagingTypesWithIds = response.data.map((type, index) => ({
            ...type,
            id: index + 1,
          }));
          setPackagingTypes(packagingTypesWithIds);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    

    useEffect(() => {
        fetchPackagingDetail();
        fetchHeadings();
        fetchData();
    }, []);

    return (
        <div className="p-4 md:px-16 py-16 bg-gray-100 ">
            <p className='md:text-[20px] text-primary font-bold mb-4 uppercase text-center md:text-left'>____{heading}</p>
            <p className=" sm:text-4xl text-3xl font-daysOne mb-6 text-center md:text-left text-gray-800">{subheading}</p>
            <p className="md:text-[20px] mb-8">
                <ReactQuill
                    readOnly={true}
                    value={description || ''}
                    modules={{ toolbar: false }}
                    theme="bubble"
                    className="quill"
                />
            </p>
            <p className='md:text-2xl text-xl font-daysOne mb-6 text-gray-800'>{heading2}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                {packagingTypes.map((item, index) => (
                    <div key={index} className="text-center">
                        <div className='overflow-hidden'>
                            <img src={`/api/logo/download/${item.photo}`} alt={item.title} className="w-full h-[6cm] mb-2 rounded-md transition-all duration-1000" />
                        </div>
                        <p className='md:text-[18px] text-primary font-bold uppercase'>{item.title}</p>
                    </div>
                ))}
            </div>
            <p className='md:text-[20px]'>{subheading2}</p>
        </div>
    );
}

export default PackagingType;
