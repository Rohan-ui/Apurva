import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';
import { lazy } from "react";

const FaShoppingCart = lazy(() => import("react-icons/fa").then((module) => ({ default: module.FaShoppingCart })));
const GiVerticalBanner = lazy(() => import("react-icons/gi").then((module) => ({ default: module.GiVerticalBanner })));
const FaNewspaper = lazy(() => import("react-icons/fa6").then((module) => ({ default: module.FaNewspaper })));
const FaPeopleGroup = lazy(() => import("react-icons/fa6").then((module) => ({ default: module.FaPeopleGroup })));


const AdminDashboard = () => {
    const [countProducts, setCountProducts] = useState(0);
    const [countNews, setCountNews] = useState(0);
    const [countBanners, setCountBanners] = useState(0);
    const [countStaff, setCountStaff] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [countWithFields, setCountWithFields] = useState(0);
    const [countWithoutFields, setCountWithoutFields] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {

        axios.get('/api/product/countProduct', { withCredentials: true }).then(response => {
            setCountProducts(response.data.total);
        }).catch(error => {
            console.log("Error fetching data", error);
        });

      

        axios.get('/api/news/countNews', { withCredentials: true }).then(response => {
            setCountNews(response.data.total);
        }).catch(error => {
            console.log("Error fetching data", error);
        });

       
        axios.get('/api/banner/countBanner', { withCredentials: true }).then(response => {
            setCountBanners(response.data.total);
        }).catch(error => {
            console.log("Error fetching data", error);
        });

        axios.get('/api/staff/countStaff', { withCredentials: true }).then(response => {
            setCountStaff(response.data.total);
        }).catch(error => {
            console.log("Error fetching data", error);
        });

      
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/inquiries/getInquiries`, { withCredentials: true });
            const { totalCount, countWithFields, countWithoutFields } = response.data;

            setTotalCount(totalCount);
            setCountWithFields(countWithFields);
            setCountWithoutFields(countWithoutFields);
           
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const barchartOptions = {
        series: [
            {
                name: "Total",
                data: [totalCount, countWithFields, countWithoutFields],
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                width: 200,
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '20%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['All', 'GPM', 'SEO'],
            },
            yaxis: {
                title: {
                    text: 'Total'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    }
                }
            }
        },
    };

    const piechartOptions = {
        series: [totalCount, countWithFields, countWithoutFields],
        options: {
            chart: {
                type: 'pie',
                height: 350,
            },
            labels: ['Total', 'GPM', 'SEO'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    };
    return (
        <div className="flex flex-col flex-1 overflow-x-auto">
            <div className="p-4">
                <p className='font-bold uppercase'>Welcome to the Admin Panel Dashboard!</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {/* Box 2 */}
                    <div className="bg-red-500 border border-gray-300 rounded p-4 text-white flex justify-around" onClick={() => navigate("/product")}>
                        <div>
                            <h3 className="text-4xl font-bold mb-2">{countProducts}</h3>
                            <p className='font-semibold'>Products</p>
                        </div>
                        <Suspense fallback={<div>Loading Icons...</div>}>
                        <FaShoppingCart size={60} />
                        </Suspense>
                    </div>

                  

                    {/* Box 4 */}
                    <div className="bg-green-500 border border-gray-300 rounded p-4 text-white flex justify-around" onClick={() => navigate("/news")}>
                        <div>
                            <h3 className="text-4xl font-bold mb-2">{countNews}</h3>
                            <p className='font-semibold'>Blogs</p>
                        </div>
                        <Suspense fallback={<div>Loading Icons...</div>}>
                        <FaNewspaper size={60} />
                        </Suspense>
                    </div>
                    {/* Box 6 */}
                    <div className="bg-orange-500 border border-gray-300 rounded p-4 text-white flex justify-around" onClick={() => navigate("/banner")}>
                        <div>

                            <h3 className="text-4xl font-bold mb-2">{countBanners}</h3>
                            <p className='font-semibold'>Banners</p>
                        </div>
                        <Suspense fallback={<div>Loading Icons...</div>}>
                        <GiVerticalBanner size={60} />
                        </Suspense>
                      
                    </div>

                    {/* Box 7 */}
                    <div className="bg-pink-500 border border-gray-300 rounded p-4 text-white flex justify-around" onClick={() => navigate("/ourTeam")}>

                        <div>
                            <h3 className="text-4xl font-bold mb-2">{countStaff}</h3>
                            <p className='font-semibold'>Our Team</p>
                        </div>
                        <Suspense fallback={<div>Loading Icons...</div>}>
                        <FaPeopleGroup size={60} />
                        </Suspense>
                       

                    </div>
                </div>
            </div>
            <h2 className="text-xl font-bold font-serif text-gray-700 uppercase text-center ">Inquiries Overview</h2>
            <div className='flex flex-col md:flex-row justify-center items-center '>

                <div className="mt-8 m-2">

                    <Chart
                        options={barchartOptions.options}
                        series={barchartOptions.series}
                        type="bar"
                        height={350}
                        width={500}
                    />
                </div>
                <div className="mt-12 ">
                    <Chart
                        options={piechartOptions.options}
                        series={piechartOptions.series}
                        type="pie"
                        height={350}
                        width={500}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
