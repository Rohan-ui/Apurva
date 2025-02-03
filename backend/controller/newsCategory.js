const NewsCategory = require("../model/newsCategory");
const News = require("../model/news")
const fs = require('fs');
const path = require('path');

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
    }
  });
};

const insertCategory = async (req, res) => {
  const { category, alt, imgTitle} = req.body;

  const photo = req.file.filename

  try {
    const existingCategory = await NewsCategory.findOne({ category });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new NewsCategory({ category, photo, alt, imgTitle });
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateCategory = async (req, res) => {
  // Update main category
  const { categoryId } = req.query;

  const { category, alt, imgTitle} = req.body;
  let photo = req.body.photo;

  if (req.file) {

    photo = req.file.filename;
  }

  try {
    const updatedCategory = await NewsCategory.findOneAndUpdate(
      {slug:categoryId},
      { category, photo, alt, imgTitle},
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error });
  }
};

const deletecategory = async (req, res) => {
  const { id } = req.query;

  try {
    // Find the category by its ID
    const category = await NewsCategory.findOne({slug:id});

    // Check if the category exists
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if there are subcategories or sub-subcategories
    const hasSubcategories = category.subCategories.length > 0;
    const hasSubSubcategories = category.subCategories.some(subCat => subCat.subSubCategory.length > 0);

    if (hasSubcategories || hasSubSubcategories) {
      return res.status(400).json({ message: 'Category has associated subcategories or sub-subcategories and cannot be deleted' });
    }

    const photoPath = path.join(__dirname, '../logos', category.photo);
    deleteFile(photoPath);

    // Proceed to delete the category
    const deletedCategory = await NewsCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find and update all news that reference this category, removing the category reference
    await News.updateMany(
      { categories: id },
      { $pull: { categories: id } }
    );

    res.status(200).json({ message: 'Category deleted successfully and references removed from news' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await NewsCategory.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

const getSpecificCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const categories = await NewsCategory.findOne({ _id: categoryId });

    if (!categories) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

const getSpecificCategoryDetails = async (req, res) => {
  try {

    // Find the category by its slug
    const category = await NewsCategory.find().select('slug category photo alt imgTitle description');

    // Check if category exists
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Send the response with the category details
    res.status(200).json(category);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error });
  }
};





const fetchCategoryUrlPriorityFreq = async (req, res) => {
  try {
    const categories = await NewsCategory.find({}, 'id url changeFreq priority lastmod ')
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// const fetchCategoryUrlmeta = async (req, res) => {
//   try {
//     const categories = await NewsCategory.find({}, 'id url metatitle metadescription metakeywords metacanonical metalanguage metaschema otherMeta subCategories')
//     // .populate({
//     //   path: 'subCategories',
//     //   select: 'id url metatitle metadescription metakeywords metacanonical metalanguage metaschema otherMeta subSubCategory',
//     //   populate: {
//     //     path: 'subSubCategory',
//     //     select: 'id url metatitle metadescription metakeywords metacanonical metalanguage metaschema otherMeta',
//     //   },
//     // });

//     res.status(200).json(categories);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// const editCategoryUrlPriorityFreq = async (req, res) => {
//   try {
//     const { id } = req.query;
//     const { url, priority, changeFreq } = req.body;
    
//     const updateFields = { url, priority, changeFreq };
//     let updatedDocument = null;

//     // Search and update the top-level ProductCategory document
//     updatedDocument = await NewsCategory.findByIdAndUpdate(
//       id,
//       { $set: updateFields },
//       { new: true }
//     );

//     if (!updatedDocument) {
//       // If not found, search and update in subCategories
//       updatedDocument = await NewsCategory.findOneAndUpdate(
//         { 'subCategories._id': id },
//         { $set: { 'subCategories.$.url': url, 'subCategories.$.priority': priority, 'subCategories.$.changeFreq': changeFreq } },
//         { new: true }
//       );
//     }

//     if (!updatedDocument) {
//       // If not found, search and update in subSubCategories
//       updatedDocument = await NewsCategory.findOneAndUpdate(
//         { 'subCategories.subSubCategory._id': id },
//         { $set: { 'subCategories.$[subCat].subSubCategory.$[subSubCat].url': url, 'subCategories.$[subCat].subSubCategory.$[subSubCat].priority': priority, 'subCategories.$[subCat].subSubCategory.$[subSubCat].changeFreq': changeFreq } },
//         { arrayFilters: [{ 'subCat.subSubCategory._id': id }, { 'subSubCat._id': id }], new: true }
//       );
//     }

//     if (!updatedDocument) {
//       return res.status(404).json({ error: "ID not found in any category" });
//     }

//     res.status(200).json({ message: "Url, priority, change frequency, and lastmod updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const editCategoryUrlmeta = async (req, res) => {
//   try {
//     const { id } = req.query;
//     const { url, metatitle, metadescription, metakeywords, metalanguage, metacanonical, metaschema, otherMeta } = req.body;
//     console.log(id);

//     const updateFields = { url, metatitle, metadescription, metakeywords, metalanguage, metacanonical, metaschema, otherMeta };
//     let updatedDocument = null;

//     // Search and update the top-level NewsCategory document
//     updatedDocument = await NewsCategory.findByIdAndUpdate(
//       id,
//       { $set: updateFields },
//       { new: true }
//     );

//     if (!updatedDocument) {
//       // If not found, search and update in subCategories
//       updatedDocument = await NewsCategory.findOneAndUpdate(
//         { 'subCategories._id': id },
//         {
//           $set: {
//             'subCategories.$.url': url,
//             'subCategories.$.metatitle': metatitle,
//             'subCategories.$.metadescription': metadescription,
//             'subCategories.$.metakeywords': metakeywords,
//             'subCategories.$.metalanguage': metalanguage,
//             'subCategories.$.metacanonical': metacanonical,
//             'subCategories.$.metaschema': metaschema,
//             'subCategories.$.otherMeta': otherMeta,
//           }
//         },
//         { new: true }
//       );
//     }

//     if (!updatedDocument) {
//       // If not found, search and update in subSubCategories
//       updatedDocument = await NewsCategory.findOneAndUpdate(
//         { 'subCategories.subSubCategory._id': id },
//         {
//           $set: {
//             'subCategories.$[subCat].subSubCategory.$[subSubCat].url': url,
//             'subCategories.$[subCat].subSubCategory.$[subSubCat].metatitle': metatitle,
//             'subCategories.$[subCat].subSubCategory.$[subSubCat].metadescription': metadescription,
//             'subCategories.$[subCat].subSubCategory.$[subSubCat].metakeywords': metakeywords,
//             'subCategories.$[subCat].subSubCategory.$[subSubCat].metalanguage': metalanguage,
//             'subCategories.$[subCat].subSubCategory.$[subSubCat].metacanonical': metacanonical,
//             'subCategories.$[subCat].subSubCategory.$[subSubCat].metaschema': metaschema,
//             'subCategories.$[subCat].subSubCategory.$[subSubCat].otherMeta': otherMeta,
//           }
//         },
//         { arrayFilters: [{ 'subCat.subSubCategory._id': id }, { 'subSubCat._id': id }], new: true }
//       );
//     }

//     if (!updatedDocument) {
//       return res.status(404).json({ error: "ID not found in any category" });
//     }

//     res.status(200).json({ message: "Meta details updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };



// const fetchCategoryUrlPriorityFreqById = async (req, res) => {
//   try {
//     const { id } = req.query;

//     if (!id) {
//       return res.status(400).json({ error: "ID is required" });
//     }

//     let categoryData = null;

//     // Attempt to find the category by ID at the top level
//     const topCategory = await NewsCategory.findById(id).select('url priority changeFreq');

//     if (topCategory) {
//       categoryData = {
//         url: topCategory.url,
//         priority: topCategory.priority,
//         changeFreq: topCategory.changeFreq
//       };
//       // } else {
//       //   // If not found at the top level, search in subcategories
//       //   const parentCategory = await NewsCategory.findOne(
//       //     { 'subCategories._id': id },
//       //     { 'subCategories.$': 1 }
//       //   );

//       // if (parentCategory && parentCategory.subCategories && parentCategory.subCategories.length > 0) {
//       //   const subCategory = parentCategory.subCategories[0];
//       //   categoryData = {
//       //     url: subCategory.url,
//       //     priority: subCategory.priority,
//       //     changeFreq: subCategory.changeFreq
//       //   };
//       // }
//     }

//     // if (!categoryData) {
//     //   // If not found in subcategories, search in sub-subcategories
//     //   const parentCategory = await NewsCategory.findOne(
//     //     { 'subCategories.subSubCategory._id': id },
//     //     { 'subCategories.subSubCategory.$': 1 }
//     //   );

//     //   if (parentCategory && parentCategory.subCategories && parentCategory.subCategories.length > 0) {
//     //     const subSubCategory = parentCategory.subCategories[0].subSubCategory[0];
//     //     categoryData = {
//     //       url: subSubCategory.url,
//     //       priority: subSubCategory.priority,
//     //       changeFreq: subSubCategory.changeFreq
//     //     };
//     //   }
//     // }

//     if (!categoryData) {
//       return res.status(404).json({ error: "Category not found" });
//     }

//     res.status(200).json(categoryData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const fetchCategoryUrlmetaById = async (req, res) => {
//   try {
//     const { id } = req.query;
//     if (!id) {
//       return res.status(400).json({ error: "ID is required" });
//     }

//     let categoryData = null;

//     // Find the product category by ID and select specific fields
//     categoryData = await NewsCategory.findById(id).select('url metatitle metadescription metakeywords metalanguage metacanonical metaschema otherMeta');

//     // if (!categoryData) {
//     //   // If not found at the top level, search in subcategories
//     //   categoryData = await NewsCategory.findOne(
//     //     { 'subCategories._id': id },
//     //     {
//     //       'subCategories.$': 1,
//     //       'subCategories.url': 1,
//     //       'subCategories.metatitle': 1,
//     //       'subCategories.metadescription': 1,
//     //       'subCategories.metakeywords': 1,
//     //       'subCategories.metalanguage': 1,
//     //       'subCategories.metacanonical': 1,
//     //       'subCategories.metaschema': 1,
//     //       'subCategories.otherMeta': 1,
//     //     }
//     //   );
//     // }

//     // if (!categoryData) {
//     //   // If not found in subcategories, search in sub-subcategories
//     //   categoryData = await NewsCategory.findOne(
//     //     { 'subCategories.subSubCategory._id': id },
//     //     {
//     //       'subCategories.subSubCategory.$': 1,
//     //       'subCategories.subSubCategory.url': 1,
//     //       'subCategories.subSubCategory.metatitle': 1,
//     //       'subCategories.subSubCategory.metadescription': 1,
//     //       'subCategories.subSubCategory.metakeywords': 1,
//     //       'subCategories.subSubCategory.metalanguage': 1,
//     //       'subCategories.subSubCategory.metacanonical': 1,
//     //       'subCategories.subSubCategory.metaschema': 1,
//     //       'subCategories.subSubCategory.otherMeta': 1,
//     //     }
//     //   );
//     // }

//     if (!categoryData) {
//       return res.status(404).json({ error: "Category not found" });
//     }

//     res.status(200).json(categoryData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };


const getCategoryAndPhoto = async (req, res) => {
  try {
    const categories = await NewsCategory.find().select('category photo alt imgTitle slug');

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

module.exports = {getSpecificCategoryDetails, getCategoryAndPhoto, insertCategory, updateCategory, deletecategory, getAll, getSpecificCategory, fetchCategoryUrlPriorityFreq };