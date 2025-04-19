import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogPage from './BlogPage';
import ProductDetailPage from './ProductDetailPage';
import ProductCategoryGrid from './ProductCategoryGrid';
import SingleBlogPage from './SingleBlogPage';
import Simple404Page from './404';

const SlugPage = () => {
  const { slug } = useParams();
  const [slugType, setSlugType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to check if slug is valid
  const isValidSlug = (slug) => {
    if (!slug || slug.trim() === '' || slug.startsWith('/')) return false;
    if (slug.includes('//')) return false;
    return true;
  };

  useEffect(() => {
    if (!isValidSlug(slug)) {
      setError('not-found');
      document.title = '404 - Not Found';
      setLoading(false);
    }
  }, [slug]);

  const fetchSlugs = async () => {
    try {
      if (!isValidSlug(slug)) return;

      document.title = 'Loading...';
      const response = await axios.get('/api/dynamicSlug/getAllSlugs');
      const { productSlugs, productCategorySlugs, newsSlugs, newsCategorySlugs } = response.data;

      if (productSlugs.includes(slug)) {
        setSlugType('product');
        document.title = slug;
      } else if (productCategorySlugs.includes(slug)) {
        setSlugType('productCategory');
        document.title = slug;
      } else if (newsSlugs.includes(slug)) {
        setSlugType('news');
        document.title = slug;
      } else if (newsCategorySlugs.includes(slug)) {
        setSlugType('newsCategory');
        document.title = slug;
      } else {
        setError('not-found');
        document.title = '404 - Not Found';
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching slugs:', err);
      setError('server-error');
      document.title = 'Error';
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlugs();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ height: '100vh', background: '#fff' }}></div>
    );
  }

  if (error === 'not-found') return <Simple404Page />;
  if (error) return <div>Error: {error}</div>;

  switch (slugType) {
    case 'product':
      return <ProductDetailPage slugs={slug} />;
    case 'productCategory':
      return <ProductCategoryGrid slugs={slug} />;
    case 'news':
      return <SingleBlogPage slugs={slug} />;
    case 'newsCategory':
      return <BlogPage slugs={slug} />;
    default:
      return <Simple404Page />;
  }
};

export default SlugPage;
