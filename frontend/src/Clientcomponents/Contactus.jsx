import React, { useState, useEffect } from 'react'
import img1 from '../assets/contact-01.svg'
import img2 from '../assets/contact-02.svg'
import img3 from '../assets/contact-03.svg'
import axios from 'axios'
import Modal from 'react-modal';
import { FaTimes } from "react-icons/fa";

function Contactus() {

    const [phoneNo, setPhoneNo] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [address, setAddress] = useState("");
    const [addresslink, setAddresslink] = useState("");
    const [location, setLocation] = useState("")
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [clientIp, setClientIp] = useState('');
    const [utmParams, setUtmParams] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
 
    

    useEffect(() => {
        const fetchClientIp = async () => {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                setClientIp(response.data.ip);
            } catch (error) {
                console.error('Error fetching IP address', error);
            }
        };

        fetchClientIp();

        const params = new URLSearchParams(window.location.search);
        setUtmParams({
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_id: params.get('utm_id') || '',
            gclid: params.get('gclid') || '',
            gcid_source: params.get('gcid_source') || '',
            utm_content: params.get('utm_content') || '',
            utm_term: params.get('utm_term') || '',
        });
    }, []);

    const fetchHeader = async () => {
        try {
            const response = await axios.get('/api/header/getPhoneAndHours', { withCredentials: true });
            const header = response.data;
            setPhoneNo(header.phoneNo || "");
            setOpeningHours(header.openingHours || "");
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFooter = async () => {
        try {
            const response = await axios.get('/api/footer/getAddressAndLocation', { withCredentials: true });
            const footer = response.data;

            // Ensure  are initialized as empty string if data is not available

            setAddress(footer.address || "");
            setAddresslink(footer.addresslink || "");
            setLocation(footer.location || "");
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchHeader();
        fetchFooter();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post('/api/inquiries/createInquiry', {
                name,
                email,
                phone,
                message,
                ipaddress: clientIp,
                ...utmParams,
            });

            // Open modal on successful submission
            setModalIsOpen(true);
            // Clear form fields
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.error : 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center p-4 gap-8 ">
            <div className="w-full md:w-1/3 lg:w-[22%] flex flex-col gap-16 mb-8 flex-shrink-0">
                <div className=" border shadow border-[#ECEEF3] hover:border-primary rounded pl-[25px] pr-[25px] py-[51px] ">
                    <div className="flex flex-col items-center mb-2 ">
                    
                        <img className='py-4' src={img1} alt="address" title='address' />
                        <h3 className=" text-2xl font-bold text-gray-800 ml-2 text-center">Address line</h3>
                    </div>
                    <p className="text-gray-700 text-center text-lg"><a href={addresslink} target='_blank' className='hover:text-primary'>{address}</a></p>
                </div>
                <div className=" border shadow border-[#ECEEF3] hover:border-primary rounded pl-[25px] pr-[25px] py-[51px]">
                    <div className="flex flex-col items-center mb-2 ">
                      
                        <img className='py-4' src={img2} alt="Phone Number" title='Phone Number' />
                        <h3 className="text-2xl font-bold text-gray-800 ml-2 text-center">Phone Number</h3>
                    </div>
                    <p className="text-gray-800 text-center text-lg"><a href={`tel:${phoneNo}`} className='hover:text-primary'>{phoneNo}</a></p>
                </div>
                <div className=" border shadow border-[#ECEEF3] hover:border-primary rounded pl-[25px] pr-[25px] py-[51px]">
                    <div className="flex flex-col items-center mb-2 ">
                     
                        <img className=' border rounded-md border-red-700 ' src={img3} alt="Opening Hours" title='Opening Hours' />
                        <h3 className="text-2xl font-bold text-gray-800 ml-2 text-center">Email Address</h3>
                    </div>
                    <p className="text-gray-700 text-center text-lg">{openingHours}</p>
                    {/* <p className="text-indigo-950 text-center text-lg">09:00 AM - 05:00 PM</p> */}
                </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-2/3 ">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message :</h2>
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className='flex flex-col lg:flex-row gap-8 '>
                        <input
                            type="text"
                            placeholder="Enter your Name"
                            className=" w-full p-4 border border-gray-100 rounded shadow-xl [box-shadow:0px_16px_24px_rgba(189,_196,_205,_0.13)] hover:border-secondary focus:outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Enter your mail"
                            className="w-full p-4 border border-gray-100 rounded shadow-xl [box-shadow:0px_16px_24px_rgba(189,_196,_205,_0.13)] hover:border-secondary focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col lg:flex-row gap-8 w-full'>
                        <input
                            type="text"
                            placeholder="Enter your Phone number"
                            className="w-full p-4 border border-gray-100 rounded shadow-xl [box-shadow:0px_16px_24px_rgba(189,_196,_205,_0.13)] hover:border-secondary focus:outline-none"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <textarea
                        placeholder="Type your message"
                        className="p-4 border border-gray-100 rounded md:col-span-2 shadow-xl [box-shadow:0px_16px_24px_rgba(189,_196,_205,_0.13)] hover:border-secondary focus:outline-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="md:col-span-2 bg-primary text-white py-4 px-8 rounded w-fit"
                    >
                        SEND MESSAGE
                    </button>
                </form>
                <iframe src={location} height="450" className='border-0 mt-16 w-full rounded-md' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Submission Successful"
                    className="fixed inset-0 flex items-center justify-center z-50 p-4"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                >
                    <div className="bg-[#f5faf7ed] p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <h2 className="text-2xl font-bold mb-4 text-green-700">Thank You!</h2>
                        <p className="mb-4">Your message has been successfully sent.</p>
                        <p className='mb-4'> We will get back to you soon.</p>
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className=" text-black px-4 py-2  absolute top-2 right-2"
                        >
                            <FaTimes size={25} />
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Contactus
