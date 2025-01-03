const { Op } = require('sequelize');
const { Product, Category, Review, User } = require('../models');

exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (category) {
      whereClause.categoryId = category;
    }
    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` };
    }

    const products = await Product.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Category,
          attributes: ['id', 'name', 'slug']
        },
        {
          model: Review,
          attributes: ['rating']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      products: products.rows,
      totalPages: Math.ceil(products.count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['id', 'name']
        },
        {
          model: Review,
          attributes: ['rating', 'comment', 'userId'],
          include: [{
            model: User,
            attributes: ['id', 'name']
          }]
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Increment view count
    await product.increment('viewCount');

    const formattedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
      images: product.images,
      sizes: product.sizes,
      category: product.Category,
      rating: product.Reviews.reduce((acc, review) => acc + review.rating, 0) / product.Reviews.length,
      reviews: product.Reviews.length,
      reviewDetails: product.Reviews.map(review => ({
        rating: review.rating,
        comment: review.comment,
        user: {
          id: review.userId,
          name: review.User.name,
        }
      }))
    };

    res.json(formattedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

exports.getSimilarProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        categoryId: req.params.categoryId,
      },
      include: [
        {
          model: Review,
          attributes: ['rating']
        }
      ],
      limit: 8
    });

    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
      image: product.images[0],
      rating: product.Reviews.reduce((acc, review) => acc + review.rating, 0) / product.Reviews.length,
      reviews: product.Reviews.length
    }));

    res.json(formattedProducts);

  } catch (error) {
    console.error('Error fetching similar products:', error);
    res.status(500).json({ message: 'Error fetching similar products' });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        isFeatured: true
      },
      include: [
        {
          model: Category,
          attributes: ['id', 'name']
        },
        {
          model: Review,
          attributes: ['rating']
        }
      ],
      limit: 8
    });

    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
      image: product.images[0],
      rating: product.Reviews.reduce((acc, review) => acc + review.rating, 0) / product.Reviews.length,
      reviews: product.Reviews.length
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ message: 'Error fetching featured products' });
  }
};

exports.getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['id', 'name']
        },
        {
          model: Review,
          attributes: ['rating']
        }
      ],
      order: [['viewCount', 'DESC']],
      limit: 12
    });

    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
      image: product.images[0],
      rating: product.Reviews.reduce((acc, review) => acc + review.rating, 0) / product.Reviews.length,
      reviews: product.Reviews.length
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching trending products:', error);
    res.status(500).json({ message: 'Error fetching trending products' });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, sort = 'popular' } = req.query;

    const where = {};
    if (query) {
      where[Op.or] = [
        { name: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } }
      ];
    }
    if (category) {
      // Handle multiple categories
      const categories = Array.isArray(category) ? category : category.split(',').map(Number);

      where.categoryId = {
        [Op.in]: categories
      };
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    let order;
    switch (sort) {
      case 'price-low':
        order = [['price', 'ASC']];
        break;
      case 'price-high':
        order = [['price', 'DESC']];
        break;
      case 'newest':
        order = [['createdAt', 'DESC']];
        break;
      default:
        order = [['viewCount', 'DESC']];
    }

    const products = await Product.findAll({
      where,
      include: [
        {
          model: Category,
          attributes: ['id', 'name']
        },
        {
          model: Review,
          attributes: ['rating']
        }
      ],
      order,
      limit: 24
    });


    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.images[0],
      rating: product.Reviews.reduce((acc, review) => acc + review.rating, 0) / product.Reviews.length,
      reviews: product.Reviews.length
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Error searching products' });
  }
}; 