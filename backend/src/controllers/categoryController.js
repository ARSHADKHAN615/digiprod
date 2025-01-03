const Category = require('../models/Category');
const Product = require('../models/Product');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { isActive: true },
      include: [{
        model: Product,
        attributes: ['id']
      }]
    });

    // Add product count to each category
    const categoriesWithCount = categories.map(category => ({
      ...category.toJSON(),
      productCount: category.Products.length
    }));

    res.json(categoriesWithCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { 
        id: req.params.id,
        isActive: true
      },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'price', 'images', 'averageRating']
      }]
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};