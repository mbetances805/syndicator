const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  productCategory: {
    type: Sequelize.ENUM('Events', 'Fitness'),
    allowNull: false
  },
  productName: {
    type: Sequelize.STRING(),
    allowNull: false
  },
  productHeadline: {
    type: Sequelize.STRING(),
    allowNull: false
  },
  productDescription: {
    type: Sequelize.TEXT(),
    allowNull: false
  },
  productFinePrint: {
    type: Sequelize.TEXT(),
    allowNull: false
  },
  productLocation: {
    type: Sequelize.TEXT(),
  },
  productStatus: {
    type: Sequelize.ENUM('Active', 'Inactive'),
    allowNull: false
  },
  productStartDate: {
    type: Sequelize.DATE
  },
  productEndDate: {
    type: Sequelize.DATE
  }
})

module.exports = Product