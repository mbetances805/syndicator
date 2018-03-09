const Sequelize = require('sequelize')
const db = require('../db')

const Merchant = db.define('merchant', {
  merchant_name: {
    type: Sequelize.STRING(),
    allowNull: false
  },
  merchant_address: {
    type: Sequelize.TEXT(),
    allowNull: false
  },
  merchant_phone_number: {
    type: Sequelize.TEXT(),
    allowNull: false
  },
  merchant_status: {
    type: Sequelize.ENUM('Active', 'Inactive'),
    allowNull: false
  }
})

module.exports = Merchant