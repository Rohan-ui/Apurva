import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const UseDocumentTitle = () => {
    // Check if we're in a Router context first
    let location;
    try {
        location = useLocation();
        console.log(location)
    } catch (error) {
        // Fallback if not in Router context
        console.warn("useLocation hook failed - component not within Router context. Using default path.");
        location = { pathname: window.location.pathname };
    }
    
    const [metaTitle, setMetaTitle] = useState("Loading...");
    const [metaDescription, setMetaDescription] = useState("");
    const [metaKeyword, setMetaKeyword] = useState("");

    useEffect(() => {
        const fetchMetaData = async () => {
            try {
                let currentPath = location.pathname.toLowerCase();
                if (currentPath.length > 1) {
                    currentPath = currentPath.substring(1);
                }
                console.log(currentPath);
                
                // First try to get product by slug using the getDataBySlug API endpoint
                try {
                    const productBySlugResponse = await axios.get(`/api/product/getProductsByCategory?categorySlug=${currentPath}`);
                   
                    if (productBySlugResponse.data) {
                        // Assuming the API returns metadata in the response
                        const productData = productBySlugResponse.data;
                        console.log(productData);
                        if (productData.metatitle || productData.metadescription || productData.metakeywords) {
                            setMetaTitle(productData.metatitle || "Product Page");
                            setMetaDescription(productData.metadescription || "");
                            setMetaKeyword(productData.metakeywords || "");
                            return; // Exit if we found a match
                        }
                    }
                } catch (productSlugError) {
                    console.log("No match found in product by slug, continuing to check other sources");
                }
                
                // Next, try to get product by category using the getProductByCategory API endpoint
                try {
                    const productByCategoryResponse = await axios.get(`/api/product/getDataBySlug?slugs=${currentPath}`);
                    console.log(productByCategoryResponse.data.productData
                        );
                    if (productByCategoryResponse.data.productData) {
                        // Assuming the API returns category metadata in the response
                        const categoryData = productByCategoryResponse.data.productData;
                        console.log(categoryData);
                        if (categoryData.metatitle || categoryData.metadescription || categoryData.metakeywords) {
                            setMetaTitle(categoryData.metatitle || "Product Category");
                            setMetaDescription(categoryData.metadescription || "");
                            setMetaKeyword(categoryData.metakeywords || "");
                            return; // Exit if we found a match
                        }
                    }
                } catch (productCategoryError) {
                    console.log("No match found in product categories, continuing to check other sources");
                }
                
                // If no match found in categories, fetch static meta data
                const metaResponse = await axios.get("/api/staticMeta/get-meta");

                if (metaResponse.data && Array.isArray(metaResponse.data.data)) {
                    const metaDataList = metaResponse.data.data;

                    // First try to find exact match for current path
                    let matchedMeta = metaDataList.find(
                        (meta) => meta.pageSlug && meta.pageSlug.toLowerCase() === currentPath
                    );
                    console.log(matchedMeta);

                    if (matchedMeta) {
                        setMetaTitle(matchedMeta.metaTitle || "Static Page");
                        setMetaDescription(matchedMeta.metaDescription || "Default description");
                        setMetaKeyword(matchedMeta.metaKeyword || "default, static, page");
                    } else {
                        // If no match found, look for static-page pageSlug
                        const staticPageMeta = metaDataList.find(
                            (meta) => meta.pageSlug && meta.pageSlug.toLowerCase() === "static-page"
                        );
                        
                        if (staticPageMeta) {
                            setMetaTitle(staticPageMeta.metaTitle || "Static Page");
                            setMetaDescription(staticPageMeta.metaDescription || "Default description");
                            setMetaKeyword(staticPageMeta.metaKeyword || "default, static, page");
                        } else {
                            // If static-page not found, try to use home page meta (with pageSlug '/')
                            const homeMeta = metaDataList.find(
                                (meta) => meta.pageSlug === "static-page"
                            );
                            
                            if (homeMeta) {
                                setMetaTitle(homeMeta.metaTitle || "Apurva Chemicals");
                                setMetaDescription(homeMeta.metaDescription || "Default description");
                                setMetaKeyword(homeMeta.metaKeyword || "default, static, page");
                            } else {
                                // Last fallback
                                setMetaTitle("Apurva Chemicals");
                                setMetaDescription("Default meta description for static pages.");
                                setMetaKeyword("default, static, page");
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching meta data:", error);
                setMetaTitle("Apurva Chemicals");
                setMetaDescription("Default meta description for static pages.");
                setMetaKeyword("default, static, page");
            }
        };

        fetchMetaData();
    }, [location ]);

    useEffect(() => {
        document.title = metaTitle;

        const updateMetaTag = (name, content) => {
            let tag = document.querySelector(`meta[name="${name}"]`);
            if (!tag) {
                tag = document.createElement("meta");
                tag.setAttribute("name", name);
                document.head.appendChild(tag);
            }
            tag.setAttribute("content", content);
        };

        updateMetaTag("description", metaDescription);
        updateMetaTag("keywords", metaKeyword);
    }, [metaTitle, metaDescription, metaKeyword]);
};

export default UseDocumentTitle;