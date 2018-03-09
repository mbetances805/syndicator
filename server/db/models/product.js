const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  product_category: {
    type: Sequelize.ENUM('Events', 'Fitness'),
    allowNull: false
  },
  product_name: {
    type: Sequelize.STRING(),
    allowNull: false
  },
  product_headline: {
    type: Sequelize.STRING(),
    allowNull: false
  },
  product_description: {
    type: Sequelize.TEXT(),
    allowNull: false
  },
  product_fine_print: {
    type: Sequelize.TEXT(),
    allowNull: false
  },
  product_location: {
    type: Sequelize.TEXT(),
  },
  product_status: {
    type: Sequelize.ENUM('Active', 'Inactive'),
    allowNull: false
  },
  product_start_date: {
    type: Sequelize.DATE
  },
  product_end_date: {
    type: Sequelize.DATE
  }
})

module.exports = Product