const Sequelize = require('sequelize')
const db = require('../db')

const EventManager = db.define('eventManager', {
  event_manager_name: {
    type: Sequelize.STRING(),
    allowNull: false
  },
  event_manager_status: {
    type: Sequelize.ENUM('Active', 'Inactive'),
    allowNull: false
  }
})

module.exports = EventManager