import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogPage from './BlogPage';
import ProductDetailPage from './ProductDetailPage';
import ProductCategoryGrid from './ProductCategoryGrid';
import SingleBlogPage from './SingleBlogPage';


const SlugPage = () => {
  const { slug } = useParams();
  const [slugType, setSlugType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch slugs from the backend
  const fetchSlugs = async () => {
    try {
      const response = await axios.get('/api/dynamicSlug/getAllSlugs');
      const { productSlugs, productCategorySlugs, newsSlugs, newsCategorySlugs } = response.data;

      // Determine the type of slug and set the correct type for routing
      if (productSlugs.includes(slug)) {
        setSlugType('product');
      } else if (productCategorySlugs.includes(slug)) {
        setSlugType('productCategory');
      } else if (newsSlugs.includes(slug)) {
        setSlugType('news');
      } else if (newsCategorySlugs.includes(slug)) {
        setSlugType('newsCategory');
      } else {
        setError('Slug not found');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching slugs:', err);
      setError('Error fetching slugs');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlugs();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Render the correct component based on the slug type
  switch (slugType) {
    case 'product':
      return <ProductDetailPage slugs={slug} />;
    case 'productCategory':
      return <ProductCategoryGrid slugs={slug} />;
    case 'news':
      return <SingleBlogPage slugs={slug} />;
    // case 'newsCategory':
    //   return <BlogPage categoryslug={slug} />;
    default:
      return <div>Unknown slug type</div>;
  }
};

export default SlugPage;
