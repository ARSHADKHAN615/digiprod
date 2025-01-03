const { Category, Product, User, Review } = require('../models');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    // Create categories
    const categories = await Category.bulkCreate([
      { 
        name: 'Beauty',
        description: 'Beauty and cosmetic products',
        image: 'https://dummyimage.com/800x600/000/fff',
        slug: 'beauty',
        isActive: true
      },
      {
        name: 'Fashion',
        description: 'Fashion accessories and clothing',
        image: 'https://dummyimage.com/800x600/000/fff',
        slug: 'fashion',
        isActive: true
      },
      {
        name: 'Kids',
        description: 'Children\'s clothing and accessories',
        image: 'https://dummyimage.com/800x600/000/fff',
        slug: 'kids',
        isActive: true
      },
      {
        name: 'Mens',
        description: 'Men\'s clothing and accessories',
        image: 'https://dummyimage.com/800x600/000/fff',
        slug: 'mens',
        isActive: true
      },
      {
        name: 'Womens',
        description: 'Women\'s clothing and accessories',
        image: 'https://dummyimage.com/800x600/000/fff',
        slug: 'womens',
        isActive: true
      }
    ]);

    // Create sample users
    const users = await User.bulkCreate([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
      }
    ]);

    // Create sample products
    const products = await Product.bulkCreate([
      {
        name: 'Nike Air Jordan 1',
        description: 'The iconic sneaker that started it all. Made famous by Michael Jordan, this original "Chicago" colorway has stood the test of time.',
        price: 1500,
        originalPrice: 2999,
        stock: 50,
        images: [
          'https://dummyimage.com/600x800/000/fff',
          'https://dummyimage.com/600x800/000/fff',
          'https://dummyimage.com/600x800/000/fff',
          'https://dummyimage.com/600x800/000/fff'
        ],
        sizes: ['6', '7', '8', '9', '10'],
        isFeatured: true,
        viewCount: 1250,
        categoryId: categories[3].id // Mens
      },
      {
        name: 'Floral Summer Dress',
        description: 'Light and breezy floral dress perfect for summer days.',
        price: 1990,
        originalPrice: 2999,
        stock: 30,
        images: [
          'https://dummyimage.com/600x800/000/fff',
          'https://dummyimage.com/600x800/000/fff',
          'https://dummyimage.com/600x800/000/fff'
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        isFeatured: true,
        viewCount: 890,
        categoryId: categories[4].id // Womens
      },
      {
        name: 'Kids Denim Jacket',
        description: 'Stylish denim jacket for kids with comfortable fit.',
        price: 999,
        originalPrice: 1499,
        stock: 25,
        images: [
          'https://dummyimage.com/600x800/000/fff',
          'https://dummyimage.com/600x800/000/fff'
        ],
        sizes: ['2Y', '3Y', '4Y', '5Y', '6Y'],
        isFeatured: false,
        viewCount: 450,
        categoryId: categories[2].id // Kids
      },
      {
        name: 'Luxury Lipstick Set',
        description: 'Set of 5 luxury lipsticks in trending colors.',
        price: 2499,
        originalPrice: 3999,
        stock: 15,
        images: [
          'https://dummyimage.com/400x400/000/fff',
          'https://dummyimage.com/400x400/000/fff'
        ],
        sizes: ['Standard'],
        isFeatured: true,
        viewCount: 780,
        categoryId: categories[0].id // Beauty
      },
      {
        name: 'Designer Handbag',
        description: 'Premium leather handbag with gold accents.',
        price: 4999,
        originalPrice: 7999,
        stock: 10,
        images: [
          'https://dummyimage.com/600x600/000/fff',
          'https://dummyimage.com/600x600/000/fff',
          'https://dummyimage.com/600x600/000/fff'
        ],
        sizes: ['Standard'],
        isFeatured: true,
        viewCount: 1100,
        categoryId: categories[1].id // Fashion
      }
    ]);

    // Create sample reviews
    await Review.bulkCreate([
      {
        rating: 5,
        comment: 'Amazing quality and comfort!',
        userId: users[0].id,
        productId: products[0].id
      },
      {
        rating: 4,
        comment: 'Great product, but a bit pricey.',
        userId: users[1].id,
        productId: products[0].id
      },
      {
        rating: 5,
        comment: 'Perfect summer dress!',
        userId: users[1].id,
        productId: products[1].id
      },
      {
        rating: 4,
        comment: 'My kid loves it!',
        userId: users[0].id,
        productId: products[2].id
      },
      {
        rating: 5,
        comment: 'Beautiful colors and long-lasting.',
        userId: users[1].id,
        productId: products[3].id
      }
    ]);

    console.log('Sample data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;