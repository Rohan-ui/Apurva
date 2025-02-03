import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NewCategoryForm = () => {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [altText, setAltText] = useState("");
    const [imgTitle, setImgTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [url, setUrl] = useState("");
    const [metatitle, setMetatitle] = useState("");
    const [metadescription, setMetadescription] = useState("");
    const [metakeywords, setMetakeywords] = useState("");
    const [metalanguage, setMetalanguage] = useState("");
    const [metacanonical, setMetacanonical] = useState("");
    const [metaschema, setMetaschema] = useState("");
    const [otherMeta, setOthermeta] = useState("");
    const [priority, setPriority] = useState(0);
    const [changeFreq, setChangeFreq] = useState("");
    const navigate = useNavigate();

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleDeleteImage = () => {
        setPhoto(null);
    };

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

    const generateUrl = () => {
        return `http://apurvachemicals.com/${slug}`;
    };

    useEffect(() => {
        setUrl(generateUrl());
    }, [slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('category', category);
            formData.append('description', description);
            if (photo) {
                formData.append('photo', photo);
            }
            formData.append('alt', altText);
            formData.append('imgTitle', imgTitle);
            formData.append('slug', slug);
            formData.append('metatitle', metatitle);
            formData.append('metakeywords', metakeywords);
            formData.append('metadescription', metadescription);
            formData.append('metalanguage', metalanguage);
            formData.append('metacanonical', metacanonical);
            formData.append('metaschema', metaschema);
            formData.append('otherMeta', otherMeta);
            formData.append('url', url);
            formData.append('priority', priority === "" ? 0 : priority);
            formData.append('changeFreq', changeFreq);

            await axios.post('/api/product/insertCategory', formData, { withCredentials: true });

            // Reset form fields
            setCategory("");
            setDescription("");
            setPhoto(null);
            setAltText("");
            setImgTitle("");
            setSlug("");
            setMetatitle("");
            setMetadescription("");
            setMetakeywords("");
            setMetalanguage("");
            setMetacanonical("");
            setMetaschema("");
            setOthermeta("");
            setUrl("");
            setPriority("");
            setChangeFreq("");
            navigate('/ProductCategory');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Add Category</h1>
            <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-2">
                    Category
                </label>
                <input
                    type="text"
                    id="title"
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
                {photo && (
                    <div className="mt-2 w-56 relative group">
                        <img
                            src={URL.createObjectURL(photo)}
                            alt="Category"
                            className="h-32 w-56 object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleDeleteImage}
                            className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
                        >
                            X
                        </button>
                    </div>
                )}
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
                    Meta Language
                </label>
                <textarea
                    id="meta"
                    value={metalanguage}
                    onChange={(e) => setMetalanguage(e.target.value)}
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
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
                Add Category
            </button>
        </form>
    );
};

export default NewCategoryForm;
