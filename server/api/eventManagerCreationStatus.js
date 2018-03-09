const router = require('express').Router()
const {EventManagerCreationStatus} = require('../db/models')
var cron = require('node-cron')

// const task = cron.schedule('*/5 * * * *', function () {
  // console.log('I am running every 5 minutes')
  router.get('/', (req, res, next) => {
    EventManagerCreationStatus.findAll({
      where: {
        event_manager_creation_status: 'Pending'
      }
    })
      .then(managers => {res.json(managers)})
      .catch(next)
  })
  
  router.put('/', (req, res, next) => {
    const products = req.body;
    products.forEach(product =>
      EventManagerCreationStatus.update({
        event_manager_creation_status: 'Created'
      }, {
        where: {
          productId: product.productId,
          event_manager_creation_status: 'Pending'
        },
        returning: true,
        plain: true
      })
      .then(eventManager => res.json(eventManager))
      .catch(error => console.log(error))
    )
  })
// }, false)

module.exports = router