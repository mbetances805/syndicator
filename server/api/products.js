const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Product.create({
    product_category: req.body.productCategory,
    product_name: req.body.productName,
    product_headline: req.body.productHeadline,
    product_description: req.body.productDescription,
    product_fine_print: req.body.productFinePrint,
    product_location: req.body.productAddress,
    product_status: req.body.productStatus,
    product_start_date: req.body.productStartDate,
    product_end_date: req.body.productEndDate,
    merchantId: req.body.merchantId
  })
    .then(product => {
      req.body.eventManagers.forEach(eventManager => {
        product.addEventManager(eventManager.id, {through: {event_manager_creation_status: 'Pending'}})
      })
      return product
    })
    .then(product => res.json(product))
    .catch(next)
})

// area for improvement is to add eager loading to this section
router.get('/pending', (req, res, next) => {
  Product.findAll({
    where: {
      product_status: 'Active'
    },
    include:[{all: true}]
  })
  .then(products => res.json(products))
  .catch(err => console.log(err))
})

// need to update to update status from Pending to Created
// router.get('/pending', (req, res, next) => {
//   Product.findAll({
//     where: {
//       product_status: 'Active'
//     },
//     include:[{all: true}]
//   })
//   .then(products => {
//     const filteredProducts = products.filter(product => {
//       let test = product.getEventManagers({ include: [{ all: true, nested: true }] })
//         .then(eventManagers => res.json(eventManagers))
//         .catch(error => console.log(error))
// 
//       console.log('test', test)
//       return product
// 
//     })
//     return filteredProducts
//   })
//   .then(products => res.json(products))
//   .catch(err => console.log(err))
// })

