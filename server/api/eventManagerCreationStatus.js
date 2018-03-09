const {EventManagerCreationStatus, Product, EventManager} = require('../db/models')
var cron = require('node-cron')
const axios = require('axios')

const task = cron.schedule('*/5 * * * *', function () {
  console.log('The cron job is currently running every 5 minutes')
  
  EventManagerCreationStatus.findAll({
      where: {
        eventManagerCreationStatus: 'Pending'
      },
      raw: true
    })
      .then(eventManagerStatuses => {
        eventManagerStatuses && eventManagerStatuses.forEach(eventManagerStatus => {
          EventManager.findById(eventManagerStatus.eventManagerId)
            .then(eventManager => {
              let eventManagerDetails = {
                url: eventManager.eventManagerUrl,
                eventManagerName: eventManager.eventManagerName.toUpperCase() + '_ACCESS_TOKEN',
                token: process.env[eventManager.eventManagerName.toUpperCase() + '_ACCESS_TOKEN'] || 
                  require('../../secrets.js')[eventManager.eventManagerName.toUpperCase() + '_ACCESS_TOKEN'],
                postPath: eventManager.eventManagerPostPath,
                productId: eventManagerStatus.productId
              }
              return eventManagerDetails
            })
            .then(eventManagerDetails => {
              let url = eventManagerDetails.url;
              let postPath = eventManagerDetails.postPath;
              let token = eventManagerDetails.token;
              // newEvent keys should be dynamic based on other API requirements
              Product.findById(eventManagerDetails.productId)
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
                  axios.post(url + postPath + token, newEvent)
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
                        .then(eventManager => console.log(eventManager))
                        .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
                })
            })
        })
      })
      .catch(error => console.log(error))
}, false)

module.exports = task