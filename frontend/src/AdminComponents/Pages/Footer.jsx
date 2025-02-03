import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditFooter = () => {

  const [address, setAddress] = useState("");
  const [addresslink, setAddresslink] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [email2,setEmail2]=useState("")
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState(""); // New description state
  const navigate = useNavigate();

  useEffect(() => {
    fetchFooter();
  }, []);

  const notify = () => {
    toast.success("Updated Successfully!");
  };

  const fetchFooter = async () => {
    try {
      const response = await axios.get('/api/footer/getFooter', { withCredentials: true });
      const footer = response.data;

      setAddress(footer.address || "");
      setAddresslink(footer.addresslink || "");
      setPhoneNo(footer.phoneNo || "");
      setEmail(footer.email || "");
      setEmail2(footer.email2 || "");
      setLocation(footer.location || "");
      setDescription(footer.description || ""); // Set description
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const footerData = {
        address,
        addresslink,
        phoneNo,
        email,
        email2,
        location,
        description // Include description in the update
      };

      const response = await axios.put('/api/footer/updateFooter', footerData, { withCredentials: true });
      notify();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Footer Settings</h1>
      <ToastContainer />
      <div className="mb-4">
        <label htmlFor="address" className="block font-semibold mb-2">
          Address
        </label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="addresslink" className="block font-semibold mb-2">
          Address Link
        </label>
        <textarea
          id="addresslink"
          value={addresslink}
          onChange={(e) => setAddresslink(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNo" className="block font-semibold mb-2">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNo"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"

        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-semibold mb-2">
          Email 1
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email2" className="block font-semibold mb-2">
          Email 2
        </label>
        <input
          type="email"
          id="email2"
          value={email2}
          onChange={(e) => setEmail2(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block font-semibold mb-2">
          Location
        </label>
        <textarea
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4"> {/* New description field */}
        <label htmlFor="description" className="block font-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditFooter;
