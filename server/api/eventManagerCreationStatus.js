const {EventManagerCreationStatus, Product} = require('../db/models')
var cron = require('node-cron')
const axios = require('axios')

const task = cron.schedule('*/5 * * * *', function () {
  console.log('I am running every 5 minutes')
  
  EventManagerCreationStatus.findAll({
      where: {
        event_manager_creation_status: 'Pending'
      },
      raw: true
    })
      .then(eventManagerStatuses => {
        eventManagerStatuses && eventManagerStatuses.forEach(eventManagerStatus => {
          let url = eventManagerStatus.eventManagerUrl;
          let eventManager = eventManagerStatus.eventManagerName + `_ACCESS_TOKEN`;
          let token = process.env[eventManager ]|| require('../../secrets.js')[eventManager];
          let postPath = eventManagerStatus.eventManagerPostPath;
          Product.findById(eventManagerStatus.productId)
            .then(product => {
              let newEvent = {
                  'event.name.html': product.productName,
                  'event.description.html': product.productDescription,
                  'event.start.utc': product.productStartDate.toISOString().substring(0, 19) + 'Z',
                  'event.start.timezone': 'America/Los_Angeles',
                  'event.end.utc': product.productEndDate.toISOString().substring(0, 19) + 'Z',
                  'event.end.timezone': 'America/Los_Angeles',
                  'event.currency': 'USD'
              }
              axios.post(url+postPath+token, newEvent)
                .then(newEvent => {
                    EventManagerCreationStatus.update({
                          eventManagerCreationStatus: 'Created'
                    }, {
                      where: {
                        productId: product.id,
                      },
                      returning: true,
                      plain: true
                    })
                    .then(eventManager => res.json(eventManager))
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            })
        })
      })
      .catch(error => console.log(error))
}, false)

module.exports = task