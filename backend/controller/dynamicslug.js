const Product = require("../model/product");
const ProductCategory = require("../model/productCategory");
const News = require("../model/news");
const NewsCategory = require("../model/newsCategory");

const getAllSlugs = async (req, res) => {
  try {
    // Fetch slugs from each model
    const productSlugs = await Product.find({}, 'slug').exec(); 
    const productCategorySlugs = await ProductCategory.find({}, 'slug').exec();
    const newsSlugs = await News.find({}, 'slug').exec();
    const newsCategorySlugs = await NewsCategory.find({}, 'slug').exec();

    // Structure the response to return slugs separately
    return res.status(200).json({
      success: true,
      productSlugs: productSlugs.map(item => item.slug),          
      productCategorySlugs: productCategorySlugs.map(item => item.slug),
      newsSlugs: newsSlugs.map(item => item.slug),
      newsCategorySlugs: newsCategorySlugs.map(item => item.slug),
    });
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getAllSlugs,
};
