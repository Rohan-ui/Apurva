import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailForm = () => {
    const [CASNo, setCASNo] = useState("");
    const [formula, setFormula] = useState("");
    const [MW, setMW] = useState("");
    const [synonym, setSynonym] = useState("");
    const [EINECS, setEINECS] = useState("");
    const [density, setDensity] = useState("");
    const [meltingPoint, setMeltingPoint] = useState("");
    const [solubility, setSolubility] = useState("");
    const [appearance, setAppearance] = useState("");
    const [purity, setPurity] = useState("");
    const [application, setApplication] = useState("");
    const [packing, setPacking] = useState("");
    const [insolubles, setInsolubles] = useState("");
    const [products, setProducts] = useState([])
    const [productId, setProductId] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('/api/product/getAllProductTitles', { withCredentials: true });
            setAllProducts(response.data.products);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                CASNo,
                formula,
                MW,
                synonym,
                EINECS,
                density,
                meltingPoint,
                solubility,
                appearance,
                purity,
                application,
                packing,
                insolubles,
                products,
                productId,
            };

            const response = await axios.post('/api/productDetail/CreateProductDetail', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            console.log(response.data); // Log response data if needed

            setCASNo("");
            setFormula("");
            setMW("");
            setSynonym("");
            setEINECS("");
            setDensity("");
            setMeltingPoint("");
            setSolubility("");
            setAppearance("");
            setPurity("");
            setApplication("");
            setPacking("")
            setInsolubles("")
            setProducts([]);
            setProductId("");
            navigate('/product');
        } catch (error) {
            console.error(error);
        }
    };

    const handleProductChange = (e) => {
        setProductId(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Add Product Details</h1>
            <ToastContainer />
            <div className="mb-4">
                <label htmlFor="productId" className="block font-semibold mb-2">
                    Product
                </label>
                <select
                    id="productId"
                    value={productId}
                    onChange={handleProductChange}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                >
                    <option value="">Select Product</option>
                    {allProducts.map(product => (
                        <option key={product._id} value={product.slug}>
                            {product.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="CASNo" className="block font-semibold mb-2">
                    CAS No
                </label>
                <input
                    type="text"
                    id="CASNo"
                    value={CASNo}
                    onChange={(e) => setCASNo(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"

                />
            </div>
            <div className="mb-4">
                <label htmlFor="formula" className="block font-semibold mb-2">
                    Formula
                </label>
                <input
                    type="text"
                    id="formula"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"

                />
            </div>
            <div className="mb-4">
                <label htmlFor="MW" className="block font-semibold mb-2">
                    Molacular Weight
                </label>
                <input
                    type="text"
                    id="MW"
                    value={MW}
                    onChange={(e) => setMW(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"

                />
            </div>
            <div className="mb-4">
                <label htmlFor="synonym" className="block font-semibold mb-2">
                    Synonyms
                </label>
                <textarea
                    type="text"
                    id="synonym"
                    value={synonym}
                    onChange={(e) => setSynonym(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"

                />
            </div>
            <div className="mb-4">
                <label htmlFor="EINECS" className="block font-semibold mb-2">
                    EINECS
                </label>
                <input
                    type="text"
                    id="EINECS"
                    value={EINECS}
                    onChange={(e) => setEINECS(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="density" className="block font-semibold mb-2">
                    Density
                </label>
                <input
                    type="text"
                    id="density"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="EINECS" className="block font-semibold mb-2">
                    Melting Point
                </label>
                <input
                    type="text"
                    id="meltingPoint"
                    value={meltingPoint}
                    onChange={(e) => setMeltingPoint(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="solubility" className="block font-semibold mb-2">
                    Solubility
                </label>
                <input
                    type="text"
                    id="solubility"
                    value={solubility}
                    onChange={(e) => setSolubility(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="appearance" className="block font-semibold mb-2">
                    Appearance
                </label>
                <input
                    type="text"
                    id="appearance"
                    value={appearance}
                    onChange={(e) => setAppearance(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="purity" className="block font-semibold mb-2">
                    Purity
                </label>
                <input
                    type="text"
                    id="purity"
                    value={purity}
                    onChange={(e) => setPurity(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="application" className="block font-semibold mb-2">
                    Application
                </label>
                <input
                    type="text"
                    id="application"
                    value={application}
                    onChange={(e) => setApplication(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="packing" className="block font-semibold mb-2">
                    Packing
                </label>
                <input
                    type="text"
                    id="packing"
                    value={packing}
                    onChange={(e) => setPacking(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="insolubles" className="block font-semibold mb-2">
                    Insolubles
                </label>
                <input
                    type="text"
                    id="insulables"
                    value={insolubles}
                    onChange={(e) => setInsolubles(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
                >
                    Save Details
                </button>
            </div>
        </form>
    );
};

export default ProductDetailForm;
