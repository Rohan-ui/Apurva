const Product = require("../model/product")
const productCategory = require("../model/productCategory")
const ExcelJS = require('exceljs');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path')
const ImportedFile = require("../model/importedFiles")
const ProductDetail = require("../model/productDetail")


const insertProduct = async (req, res) => {
  try {
    const { 
      title, details, alt, imgTitle, slug, metatitle, 
      metadescription, metakeywords, metacanonical, 
      metalanguage, metaschema, otherMeta, categories, 
      url, priority, changeFreq, status 
    } = req.body;

    // Handle multiple photos
    const photo = req.files['photo'] ? req.files['photo'].map(file => file.filename) : [];
    
    // Handle spec and msds files
    const spec = req.files?.specs?.[0]?.filename || '';
    const msds = req.files?.msds?.[0]?.filename || '';

    const product = new Product({
      title,
      details,
      alt,
      imgTitle,
      slug,
      msds,
      spec,
      metatitle,
      metadescription,
      metakeywords,
      metacanonical,
      metalanguage,
      metaschema,
      otherMeta,
      photo,
      url,
      changeFreq,
      priority,
      status,
      categories,
    });

    await product.save();
    res.status(201).json({ 
      message: 'Product inserted successfully',
      product
    });
  } catch (error) {
    console.log('Error inserting product:', error);
    res.status(500).json({ 
      message: 'Error inserting product',
      error: error.message 
    });
  }
};

const updateProduct = async (req, res) => {
  const { slugs } = req.query;
  const updateFields = req.body;

  try {
    // Fetch the existing product
    const existingProduct = await Product.findOne({ slug: slugs });

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Handle photos
    if (req.files?.photo?.length > 0) {
      const newPhotoPaths = req.files['photo'].map(file => file.filename);
      updateFields.photo = [...existingProduct.photo, ...newPhotoPaths];
    } else {
      updateFields.photo = existingProduct.photo;
    }

    // Handle spec file
    if (req.files?.specs?.[0]) {
      updateFields.spec = req.files.specs[0].filename;
    } else {
      updateFields.spec = existingProduct.spec;
    }

    // Handle msds file
    if (req.files?.msds?.[0]) {
      updateFields.msds = req.files.msds[0].filename;
    } else {
      updateFields.msds = existingProduct.msds;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug: slugs },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found during update' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      message: 'Error updating product',
      error: error.message 
    });
  }
};

const deleteProduct = async (req, res) => {
  const { slugs } = req.query;

  try {
    const product = await Product.findOne({ slug: slugs });

    product.photo.forEach(filename => {
      const filePath = path.join(__dirname, '../images', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        console.warn(`File not found: ${filename}`);
      }
    });

    const deletedProduct = await Product.findOneAndDelete({ slug: slugs });


    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error });
  }
};

const deletePhotoAndAltText = async (req, res) => {

  const { slugs, imageFilename, index } = req.params;
  console.log(slugs)
  try {
   
    const product = await Product.findOne({ slug: slugs });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Remove the photo and its alt text
    product.photo = product.photo.filter(photo => photo !== imageFilename);
    product.alt.splice(index, 1);
    product.imgTitle.splice(index, 1);

    await product.save();

    const filePath = path.join(__dirname, '..', 'images', imageFilename);

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Photo and alt text deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo and alt text:', error);
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 5;
    const count = await Product.countDocuments();
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);


    const productsWithCategoryName = await Promise.all(products.map(async (product) => {
      const category = await productCategory.findOne({ 'slug': product.categories });
      const categoryName = category ? category.category : 'Uncategorized';
      return {
        ...product.toJSON(),
        categoryName
      };
    }));
    res.status(200).json({
      data: productsWithCategoryName,
      total: count,
      currentPage: page,
      hasNextPage: count > page * limit
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    let errorMessage = 'Server error';
    if (error.name === 'CastError') {
      errorMessage = 'Invalid query parameter format';
    }
    res.status(500).json({ message: errorMessage, error });
  }
};

const getRelatedProducts = async (req, res) => {
  const { slugs } = req.query;

  try {
    // Fetch the current product
    const currentProduct = await Product.findOne({ slug: slugs });
    if (!currentProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const relatedProducts = await Product.find({
      categories: { $eq: currentProduct.categories },
      slug: { $ne: slugs }
    }).limit(10);

    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllProductTitles = async (req, res) => {
  try {
    const products = await Product.find().select('title _id slug');

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error retrieving product titles:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { categorySlug } = req.query;

    if (!categorySlug) {
      return res.status(400).json({ message: 'Category slug query parameter is required' });
    }

    // Find the category by its slug and include only specific fields
    const category = await productCategory.findOne({ slug: categorySlug }).select('category photo alt imgTitle description');

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find all products that belong to the category
    const products = await Product.find({
      categories: categorySlug,
    });

    // Return the category and products in the response
    res.status(200).json({
      category, // Include category details in the response
      products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    let errorMessage = 'Server error';
    if (error.name === 'CastError') {
      errorMessage = 'Invalid query parameter format';
    }
    res.status(500).json({ message: errorMessage, error });
  }
};


const getActiveProducts = async (req, res) => {
  try {
  
    const products = await Product.find({ status: 'active' });

    // Map through products to include category names
    const productsWithCategoryName = await Promise.all(products.map(async (product) => {
      const category = await productCategory.findOne({ 'slug': product.categories });
      const categoryName = category ? category.category : 'Uncategorized';
      return {
        ...product.toJSON(),
        categoryName
      };
    }));

    // Respond with the products and their category names
    res.status(200).json({
      data: productsWithCategoryName,
      total: productsWithCategoryName.length
    });
  } catch (error) {
    console.error("Error retrieving active products:", error);
    let errorMessage = 'Server error';
    if (error.name === 'CastError') {
      errorMessage = 'Invalid query parameter format';
    }
    res.status(500).json({ message: errorMessage, error });
  }
};

const getSingleProduct = async (req, res) => {
  const { slugs } = req.query;

  try {
    const product = await Product.findOne({ slug: slugs });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const getCategoryProducts = async (req, res) => {
  const { categoryId } = req.query;

  try {
    const products = await Product.find({ categories: categoryId });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// const getSubcategoryProducts = async (req, res) => {
//   const { subcategoryId } = req.query;

//   try {
//     const products = await Product.find({ subcategories: subcategoryId });

//     if (products.length === 0) {
//       return res.status(404).json({ message: 'No products found for this subcategory' });
//     }

//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// const getSubSubcategoryProducts = async (req, res) => {
//   const { subSubcategoryId } = req.query;

//   try {
//     const products = await Product.find({ subSubcategories: subSubcategoryId });

//     if (products.length === 0) {
//       return res.status(404).json({ message: 'No products found for this sub-subcategory' });
//     }

//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

const countProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.status(200).json({ total: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error counting services' });
  }
};

const exportProductsToExcel = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    // Add headers
    worksheet.addRow(['ID', 'Title', 'Details', 'Photo', 'Alt', 'imgTitle', 'Status', 'Categories']);

    // Add data rows
    products.forEach(product => {
      worksheet.addRow([
        product._id.toString(),
        product.title,
        product.details,
        product.photo.join(', '),
        product.alt.join(', '),
        product.imgTitle.join(', '),
        product.status,
      ]);
    });

    // Generate a unique filename
    const filename = `products_${Date.now()}.xlsx`;

    // Set headers to trigger file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    // Write the Excel file to the response stream
    await workbook.xlsx.write(res);

    res.status(200).end();
  } catch (error) {
    console.error('Error exporting products:', error);
    res.status(500).json({ message: 'Failed to export products' });
  }
};

const importProducts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File not provided' });
    }

    const fileName = req.fileName;


    const importedFile = new ImportedFile({ fileName });
    await importedFile.save();
    const filePath = path.join(__dirname, '../files', fileName); // Use file.originalname to get the original filename
    const fileContents = fs.readFileSync(filePath);

    const workbook = XLSX.read(fileContents, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    const products = jsonData.map(item => ({
      title: item.Title,
      photo: item.Photo ? item.Photo.split(',').map(photo => photo.trim()) : [],
      alt: item.Alt ? item.Alt.split(',').map(alt => alt.trim()) : [],
      imgTitle: item.imgTitle ? item.imgTitle.split(',').map(alt => alt.trim()) : [],
      details: item.Details,
      status: item.Status,
      categories: item.Categories,
    }));

    await Product.insertMany(products);

    res.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).json({ message: 'Failed to import data' });
  }
};

const fetchUrlPriorityFreq = async (req, res) => {
  try {
    // Get productId from request parameters
    const product = await Product.find({}).select('_id url priority changeFreq lastmod');
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchUrlmeta = async (req, res) => {
  try {
    // Get productId from request parameters
    const product = await Product.find({}).select('_id url metatitle metadescription metakeywords metacanonical metalanguage metaschema otherMeta');
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

const editUrlPriorityFreq = async (req, res) => {
  try {
    const { id } = req.query; // Get productId from request parameters
    const { url, priority, changeFreq } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { url, priority, changeFreq, lastmod: Date.now() },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


const editUrlmeta = async (req, res) => {
  try {
    const { id } = req.query; // Get productId from request parameters
    const { url, metatitle, metadescription, metakeywords, metacanonical, metalanguage, metaschema, otherMeta } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { url, metatitle, metadescription, metakeywords, metacanonical, metalanguage, metaschema, otherMeta },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
// const deleteUrlPriorityFreq = async (req, res) => {
//   try {
//     const { id } = req.query; // Get productId from request parameters

//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       { $unset: { url: "", priority: "", changeFreq: "" } },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.status(200).json({ message: "Url, priority, and freq deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

const fetchUrlPriorityFreqById = async (req, res) => {
  try {
    const { id } = req.query; // Extract id from query parameters

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    // Find the product by ID and select specific fields
    const product = await Product.findById(id).select('url priority changeFreq');

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchUrlmetaById = async (req, res) => {
  try {
    const { id } = req.query; // Extract id from query parameters

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    // Find the product by ID and select specific fields
    const product = await Product.findById(id).select('url metatitle metadescription metakeywords metacanonical metalanguage metaschema otherMeta');

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const downloadCatalogue = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../catalogues', filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'File download failed' });
    }
  });
};

const viewCatalogue = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'catalogues', filename);
  res.sendFile(filePath);
};

const getDataBySlug = async (req, res) => {
  try {
    // Extract slug from query parameters
    const { slugs } = req.query;

    if (!slugs) {
      return res.status(400).json({ error: "Slug is required" });
    }

    // Find product data by slug
    const productData = await Product.findOne({ slug: slugs });

    if (!productData) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find product detail data by slug
    const productDetailData = await ProductDetail.findOne({ productId: slugs });

    // if (!productDetailData) {
    //   return res.status(404).json({ error: "Product details not found" });
    // }


    res.status(200).json({
      productData,
      productDetailData
    });
  } catch (error) {
    console.error('Error fetching data by slug:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getRelatedProducts, getAllProductTitles, getDataBySlug, getProductsByCategory, getActiveProducts, downloadCatalogue, viewCatalogue, insertProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct, getCategoryProducts, countProducts, deletePhotoAndAltText, exportProductsToExcel, importProducts, fetchUrlPriorityFreq, editUrlPriorityFreq, fetchUrlPriorityFreqById, fetchUrlmeta, editUrlmeta, fetchUrlmetaById } 
