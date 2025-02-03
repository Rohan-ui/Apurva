import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const EditPackagingTypeForm = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState("");
  const [altText, setAltText] = useState("");
  const [imgTitle, setImgTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPackagingType = async () => {
      try {
        const response = await axios.get(`/api/packagingtype/getPackagingTypeById?id=${id}`, { withCredentials: true });
        const packagingType = response.data;
        setTitle(packagingType.title);
        setCurrentPhoto(packagingType.photo);
        setAltText(packagingType.alt);
        setImgTitle(packagingType.imgTitle);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPackagingType();
  }, [id]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleDeleteImage = () => {
    setPhoto(null);
    setAltText("");
    setImgTitle("");
    setCurrentPhoto("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("alt", altText);
    formData.append("imgTitle", imgTitle);
    if (photo) {
      formData.append("photo", photo);
    } else if (currentPhoto) {
      formData.append("photo", currentPhoto);
    }

    try {
      await axios.put(`/api/packagingtype/updatePackagingType?id=${id}`, formData, { withCredentials: true });
      navigate('/packagingType');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Packaging Type</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-2">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-8">
        <label htmlFor="photo" className="block font-semibold mb-2">Photo</label>
        <input
          type="file"
          name="photo"
          id="photo"
          onChange={handlePhotoChange}
          className="border rounded focus:outline-none"
          accept="image/*"
        />

        {(photo || currentPhoto) && (
          <div className="mt-2 w-56 relative group">
            <img
              src={photo ? URL.createObjectURL(photo) : `/api/logo/download/${currentPhoto}`}
              alt={altText}
              className="h-32 w-56 object-cover"
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
            <div className="mb-4">
              <label htmlFor="alt" className="block font-semibold mb-2">Alternative Text</label>
              <input
                type="text"
                id="alt"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-56 p-2 border rounded focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imgTitle" className="block font-semibold mb-2">Image Title</label>
              <input
                type="text"
                id="imgTitle"
                value={imgTitle}
                onChange={(e) => setImgTitle(e.target.value)}
                className="w-56 p-2 border rounded focus:outline-none"
                required
              />
            </div>
          </div>
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Packaging Type</button>
    </form>
  );
};

export default EditPackagingTypeForm;
