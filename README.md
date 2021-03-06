# syndicator

## Limitations & Assumptions
- Due to time constraints, only included 'Events' as a category. Ideally, we would have multiple categories and include logic to only post entries tagged as 'Events' in event management tools like eventbrite.com

- Only structured data will be leveraged to enter a new event so that we're able to leverage a relational database. There's a many to many relationship between Product / Event and an Event Management Tool like eventbrite. PostgreSQL database was leveraged

- Merchants will have accounts and enter their own events into the admin panel. Hence, the logic gets the merchant info for an event post from the user's merchant ID

- Due to time contraints, only managed to work with one API, eventbrite, and had to hardcode the timezone and currency for the POST request. Ideally these data points should be retrieved from the database

- The POST request parameters are currently hardcoded for eventbrite, ideally these should be dynamic and adjust based on the API we're working with

- Ideally once an event is posted should get an ID from the Event Management Tool to store in our database for updates

- Due to time constraints, I was unable to use nice css styling on the admin panel, I would've preferred to use an existing framework like bootstrap or materialize

- Due to time constraints, unable to write unit tests

- Cron job set to 5 minute interval

- The form is missing data validation and validation that all fields are populated for submission

- When signing up, user email and password are missing validation

## Run in localhost
- run `npm install` to install packages
- run `npm run seed` to populate database with dummy data
- open `localhost:8080/home` in browser (Chrome)
- login with the following credentials -> email: murphy@email.com, password: 123
- enter your Eventbrite personal token into the secrets file, following this format:\
            `const EVENTBRITE_ACCESS_TOKEN = 'enter your token here'`\
            `module.exports = {EVENTBRITE_ACCESS_TOKEN}`
