import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoDiamond } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { GiTestTubes } from "react-icons/gi";
import axios from 'axios'

const Counter = () => {
    const [startCounting, setStartCounting] = useState(false);
    const [counters, setCounters] = useState([]);
    const [loadings, setLoading] = useState(true);
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const fetchHeadings = async () => {
        try {
          const response = await axios.get('/api/pageHeading/heading?pageType=counter', { withCredentials: true });
          const { heading, subheading } = response.data;
          setHeading(heading || '');
          setSubheading(subheading || '');
        } catch (error) {
          console.error(error);
        }
      };
    

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/counter/getActiveCounters`, { withCredentials: true });
            // Add data validation
            const data = Array.isArray(response.data) ? response.data : [];
            const countersWithIds = data.map((counter, index) => ({
                ...counter,
                icon: counter.icon,
                id: index + 1,
            }));
            setCounters(countersWithIds);
        } catch (error) {
            console.error('Error fetching counters:', error);
            setCounters([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (inView) {
            setStartCounting(true);
        }
    }, [inView]);

    useEffect(() => {
        fetchData();
        fetchHeadings();
      }, []);
    

    // const heading = {
    //     title: 'OUR COMPANY FACTS',
    //     subTitle: 'We are proud of our achievements and expertise'
    // };

    


    // const facts = [
    //     {
    //         id: 1,
    //         icon: <GiTestTubes size={64} className='pt-4 pl-4 rounded-full p-2 bg-red-500 text-white' />,
    //         value: 1492,
    //         description: 'Laboratories in 100+ states'
    //     },
    //     {
    //         id: 2,
    //         icon: <FaUserDoctor size={64} className='pt-4 pl-4 rounded-full p-2 bg-red-500 text-white' />,
    //         value: 152,
    //         description: 'Laboratory specialists'
    //     },
    //     {
    //         id: 3,
    //         icon: <IoDiamond size={64} className='pt-4 pl-4 rounded-full p-2 bg-red-500 text-white' />,
    //         value: 245,
    //         description: 'Material collection points'
    //     },
    //     {
    //         id: 4,
    //         icon: <HiMiniUserGroup size={64} className='pt-4 pl-4 rounded-full p-2 bg-red-500 text-white' />,
    //         value: 3406,
    //         description: 'Patients diagnosed in 2022'
    //     }
    // ];

    return (
        <div className="mt-16 relative bg-black text-white py-10 bg-cover bg-center bg-fixed bg-[url('C:\react\Apurva-chemical\frontend\src\assets\about.webp')]" ref={ref}>
            <div className="absolute inset-0 bg-black opacity-80"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:items-center">
                <div className="text-start space-y-4 lg:w-1/3">
                    <div>
                        <p className='text-primary font-bold  md:text-[20px] uppercase text-center md:text-left'>____ {heading}</p>
                    </div>
                    <div className='space-y-5 py-5 lg:flex lg:items-center lg:justify-between gap-2'>
                        <p className='text-3xl sm:text-4xl  text-white font-daysOne text-center md:text-left'>{subheading}</p>
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:w-2/3 font-montserrat">
                    {counters.map(fact => (
                        <div key={fact.id} className="p-6 relative overflow-hidden bg-white rounded shadow-lg text-center lg:py-10 lg:space-y-2">
                            <div className='absolute -left-3 -top-3'>
                                {/* {fact.icon} */}
                            </div>
                            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900">
                                {startCounting && <CountUp end={fact.no} duration={2} />}
                            </h3>
                            <p className="text-gray-600 text-xl font-medium">{fact.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Counter;
