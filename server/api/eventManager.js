const router = require('express').Router()
const {EventManager} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  EventManager.findAll({
    where: {
      event_manager_status: 'Active'
    }
  })
    .then(managers => res.json(managers))
    .catch(next)
})