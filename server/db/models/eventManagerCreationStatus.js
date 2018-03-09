const Sequelize = require('sequelize')
const db = require('../db')

const EventManagerCreationStatus = db.define('eventManagerCreationStatus', {
  event_manager_creation_status: {
    type: Sequelize.ENUM('Pending', 'Created', 'Failed'),
    allowNull: false,
    defaultValue: 'Pending'
  }
})

module.exports = EventManagerCreationStatus