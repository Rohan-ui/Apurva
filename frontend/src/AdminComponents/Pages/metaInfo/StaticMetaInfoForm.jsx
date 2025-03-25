import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const StaticMetaForm = () => {
    const [formData, setFormData] = useState({
        pageName: "",
        pageSlug: "",
        metaTitle: "",
        metaDescription: "",
        metaKeyword: "",
    });
    const [menuList, setMenuList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get("/api/menulisting/getMenulisting");
                setMenuList(response.data.menuListings
                    || []);
                console.log(response.data.menuListings
                )
            } catch (error) {
                console.error("Error fetching menu list:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMenus();
    }, []);

    useEffect(() => {
        if (id) {
            axios.get(`/api/staticMeta/get-meta/${id}`).then((response) => {
                if (response.data.success) {
                    setFormData(response.data.data);
                }
            });
        }
    }, [id]);

    const generateSlug = (pageName) => {
        return pageName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "pageName") {
            setFormData((prev) => ({ ...prev, pageSlug: generateSlug(value) }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`/api/staticMeta/update-meta/${id}`, formData);
                alert("Meta data updated successfully!");
            } else {
                await axios.post("/api/staticMeta/add-meta", formData);
                alert("Meta data added successfully!");
                setFormData({ pageName: "", pageSlug: "", metaTitle: "", metaDescription: "", metaKeyword: "" });
            }
            navigate("/meta");
        } catch (error) {
            alert("Failed to save meta data.");
        }
    };

    return (
        <div className=" mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
            {/* <nav className="mb-4 text-sm text-gray-500">
                <Link to="/dashboard" className="hover:underline">Dashboard</Link> /
                <Link to="/meta-info" className="hover:underline">Meta List</Link> /
                {id ? "Edit Meta" : "Add Meta"}
            </nav> */}

            <form onSubmit={handleSubmit} className="space-y-4  w-full sm:w-1/2">
                <div>
                    <label className="block text-gray-700 font-medium">Page Name</label>
                    <select
                        name="pageName"
                        value={formData.pageName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Select a page</option>
                        <option value="Static Page">Static Page</option>

                        {menuList.map((menu) => (
                            <option key={menu._id} value={menu.pagename}>
                                {menu.pagename}
                            </option>
                        ))}
                    </select>

                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Page Slug</label>
                    <input
                        type="text"
                        name="pageSlug"
                        value={formData.pageSlug}
                        onChange={handleChange}  // Allow manual edits
                        className="w-full p-2 border rounded-md"
                    />
                </div>


                <div>
                    <label className="block text-gray-700 font-medium">Meta Title</label>
                    <input
                        type="text"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Meta Description</label>
                    <textarea
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Meta Keywords</label>
                    <input
                        type="text"
                        name="metaKeyword"
                        value={formData.metaKeyword}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    {id ? "Update Meta" : "Add Meta"}
                </button>
            </form>
        </div>
    );
};

export default StaticMetaForm;
