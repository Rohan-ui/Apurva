import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [altText, setAltText] = useState("");
  const [imgTitle, setImgTitle] = useState("");
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [slug, setSlug] = useState("");
  const [metatitle, setMetatitle] = useState("");
  const [metadescription, setMetadescription] = useState("");
  const [metakeywords, setMetakeywords] = useState("");
  const [metalanguage, setMetalanguage] = useState("");
  const [metacanonical, setMetacanonical] = useState("");
  const [metaschema, setMetaschema] = useState("");
  const [otherMeta, setOthermeta] = useState("");
  const [url, setUrl] = useState("");
  const [changeFreq, setChangeFreq] = useState("");
  const [priority, setPriority] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (categoryId) {
        try {
          const response = await axios.get(`/api/news/getSpecificCategory?categoryId=${categoryId}`, { withCredentials: true });
          const { category, description, photo, alt, imgTitle, slug, metatitle, metadescription, metakeywords, metalanguage, metacanonical, metaschema, otherMeta, changeFreq, priority } = response.data;

          setCategory(category);
          setDescription(description);
          setCurrentPhoto(photo);
          setAltText(alt);
          setImgTitle(imgTitle);
          setSlug(slug);
          setMetatitle(metatitle);
          setMetadescription(metadescription);
          setMetakeywords(metakeywords);
          setMetalanguage(metalanguage);
          setMetacanonical(metacanonical);
          setMetaschema(metaschema);
          setOthermeta(otherMeta);
          setChangeFreq(changeFreq);
          setPriority(priority);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [categoryId]);

  const generateUrl = () => {
    return `https://apurvachemicals.com/${slug}`;
  };

  useEffect(() => {
    setUrl(generateUrl());
  }, [slug]);

  useEffect(() => {
    setSlug(category.replace(/\s+/g, '-')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
    );
  }, [category])

  useEffect(() => {
    setSlug(slug.toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
    );
  }, [slug])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setAltText("");
    setImgTitle("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", category);
    formData.append("description", description);
    formData.append("alt", altText);
    formData.append("imgTitle", imgTitle);
    formData.append("slug", slug);
    formData.append("metatitle", metatitle);
    formData.append("metakeywords", metakeywords);
    formData.append("metadescription", metadescription);
    formData.append("metalanguage", metalanguage);
    formData.append("metacanonical", metacanonical);
    formData.append("metaschema", metaschema);
    formData.append("otherMeta", otherMeta);
    formData.append("url", url);
    formData.append("changeFreq", changeFreq);
    formData.append('priority', priority === "" ? 0 : priority);

    if (photo) {
      formData.append("photo", photo);
    } else {
      formData.append("photo", currentPhoto);
    }

    try {
      await axios.put(`/api/news/updateCategory?categoryId=${categoryId}`, formData, { withCredentials: true });
      navigate("/NewsCategory");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Category</h1>
      <div className="mb-4">
        <label htmlFor="category" className="block font-semibold mb-2">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        ></textarea>
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
            <div className="mb-4">
              <label htmlFor="alt" className="block font-semibold mb-2">Alternative Text</label>
              <input
                type="text"
                id="alt"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none"
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
      <div className="mb-4 mt-4">
        <label htmlFor="slug" className="block font-semibold mb-2">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4 mt-4">
        <label htmlFor="url" className="block font-semibold mb-2">
          URL
        </label>
        <input
          type="text"
          id="url"
          value={url}
          disabled
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="meta" className="block font-semibold mb-2">
          Meta Title
        </label>
        <textarea
          id="meta"
          value={metatitle}
          onChange={(e) => setMetatitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="meta" className="block font-semibold mb-2">
          Meta Description
        </label>
        <textarea
          id="meta"
          value={metadescription}
          onChange={(e) => setMetadescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="meta" className="block font-semibold mb-2">
          Meta Keywords
        </label>
        <textarea
          id="meta"
          value={metakeywords}
          onChange={(e) => setMetakeywords(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="meta" className="block font-semibold mb-2">
          Meta Canonical
        </label>
        <textarea
          id="meta"
          value={metacanonical}
          onChange={(e) => setMetacanonical(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="meta" className="block font-semibold mb-2">
          Meta Schema
        </label>
        <textarea
          id="meta"
          value={metaschema}
          onChange={(e) => setMetaschema(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="meta" className="block font-semibold mb-2">
          Other Meta
        </label>
        <textarea
          id="meta"
          value={otherMeta}
          onChange={(e) => setOthermeta(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="changeFreq" className="block font-semibold mb-2">
          Change Frequency
        </label>
        <input
          type="text"
          id="changeFreq"
          value={changeFreq}
          onChange={(e) => setChangeFreq(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block font-semibold mb-2">
          Priority
        </label>
        <input
          type="text"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  );
};

export default EditCategory;
