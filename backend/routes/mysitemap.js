const fs = require("fs");
const path = require("path");
const axios = require("axios");
const Sitemap = require("../model/mysitemap");

// Base configuration
const BASE_URL = "https://apurvachemicals.com/";
const BLOG_API_URL = `${BASE_URL}/api/news/getActiveNews`;
const CHEMICAL_API_URL = `${BASE_URL}/api/product/getProductsByCategory?categorySlug=dye-intermediate`;
const SITEMAP_API_URL = `${BASE_URL}/api/sitemap/get`;

// Directory to store sitemaps
const PUBLIC_DIR = path.join(__dirname, "..", "public");

// Generate blog sitemap
const generateBlogSitemap = async () => {
  try {
    const response = await axios.get(BLOG_API_URL);
    const blogs = response.data.data || [];

    if (!Array.isArray(blogs)) {
      throw new Error("Blog API did not return an array.");
    }

    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xmlContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    blogs.forEach((blog) => {
      xmlContent += `  <url>\n`;
      xmlContent += `    <loc>${BASE_URL}/blog/${blog.slug}</loc>\n`;
      xmlContent += `    <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>\n`;
      xmlContent += `    <changefreq>weekly</changefreq>\n`;
      xmlContent += `    <priority>0.8</priority>\n`;
      xmlContent += `  </url>\n`;
    });

    xmlContent += `</urlset>`;

    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    const sitemapPath = path.join(PUBLIC_DIR, "blog-sitemap.xml");
    fs.writeFileSync(sitemapPath, xmlContent);

    console.log("Blog sitemap generated successfully as blog-sitemap.xml");

    await Sitemap.findOneAndUpdate(
      { name: "blog-sitemap.xml" },
      { timestamp: Date.now() },
      { upsert: true, new: true }
    );

    console.log("Blog sitemap record updated in the database");
  } catch (error) {
    console.error("Error generating blog sitemap:", error.message);
  }
};

// Generate chemical sitemap
const generateChemicalSitemap = async () => {
    try {
      const response = await axios.get(CHEMICAL_API_URL);
    
      const chemicals = Array.isArray(response.data.products) ? response.data.products : [];
  
      if (!Array.isArray(chemicals)) {
       
        throw new Error("Chemical API did not return an array.");
      }
  
      console.log(`Processing ${chemicals.length} chemical products for sitemap`);
  
      let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xmlContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
      chemicals.forEach((chemical, index) => {
        if (!chemical.slug || !chemical.updatedAt) {
          console.warn(`Skipping invalid chemical at index ${index}:`, chemical);
          return;
        }
        xmlContent += `  <url>\n`;
        xmlContent += `    <loc>${BASE_URL}/${chemical.slug}</loc>\n`; // Corrected URL path
        xmlContent += `    <lastmod>${new Date(chemical.updatedAt).toISOString()}</lastmod>\n`;
        xmlContent += `    <changefreq>weekly</changefreq>\n`;
        xmlContent += `    <priority>0.8</priority>\n`;
        xmlContent += `  </url>\n`;
      });
  
      xmlContent += `</urlset>`;
  
      if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
      }
  
      const sitemapPath = path.join(PUBLIC_DIR, "chemical-sitemap.xml");
      fs.writeFileSync(sitemapPath, xmlContent);
  
      console.log("Chemical sitemap generated successfully as chemical-sitemap.xml");
  
      await Sitemap.findOneAndUpdate(
        { name: "chemical-sitemap.xml" },
        { timestamp: Date.now() },
        { upsert: true, new: true }
      );
  
      console.log("Chemical sitemap record updated in the database");
    } catch (error) {
      console.error("Error generating chemical sitemap:", error.message);
      if (error.response) {
        console.error("API Response Data:", error.response.data);
        console.error("API Response Status:", error.response.status);
      }
    }
  };

// Generate main sitemap
const generateMainSitemap = async () => {
    try {
      const response = await axios.get(SITEMAP_API_URL);
      console.log("Sitemap API response:", response.data);
  
      const items = Array.isArray(response.data) ? response.data : [];
      if (!Array.isArray(items)) {
        console.error("Expected an array, received:", typeof items, items);
      }
  
      console.log(`Processing ${items.length} sitemap entries`);
  
      let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xmlContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
      items.forEach((item, index) => {
        if (!item.name || !item.timestamp) {
          console.warn(`Skipping invalid sitemap item at index ${index}:`, item);
          return;
        }
        xmlContent += `  <url>\n`;
        xmlContent += `    <loc>${BASE_URL}/${item.name}</loc>\n`;
        xmlContent += `    <lastmod>${new Date(item.timestamp).toISOString()}</lastmod>\n`;
        xmlContent += `    <changefreq>daily</changefreq>\n`;
        xmlContent += `    <priority>1.0</priority>\n`;
        xmlContent += `  </url>\n`;
      });
  
      xmlContent += `</urlset>`;
  
      if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
      }
  
      const sitemapPath = path.join(PUBLIC_DIR, "sitemap.xml");
      fs.writeFileSync(sitemapPath, xmlContent);
  
      console.log("Main sitemap generated successfully as sitemap.xml");
  
      await Sitemap.findOneAndUpdate(
        { name: "sitemap.xml" },
        { timestamp: Date.now() },
        { upsert: true, new: true }
      );
  
      console.log("Main sitemap record updated in the database");
    } catch (error) {
      console.error("Error generating main sitemap:", error.message);
      if (error.response) {
        console.error("API Response Data:", error.response.data);
        console.error("API Response Status:", error.response.status);
      }
    }
  };

// Generate all sitemaps
const generateAllSitemaps = async () => {
  await generateMainSitemap();
  await generateBlogSitemap();
  await generateChemicalSitemap();
};

module.exports = {
  generateBlogSitemap,
  generateChemicalSitemap,
  generateMainSitemap,
  generateAllSitemaps,
};
