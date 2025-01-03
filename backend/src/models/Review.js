const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id'
    }
  }
});

Review.associate = (models) => {
  Review.belongsTo(models.User, {
    foreignKey: 'userId'
  });
  Review.belongsTo(models.Product, {
    foreignKey: 'productId'
  });
};

module.exports = Review;