# syndicator

## Limitations & Assumptions
- Due to time constraints, only included 'Events' as a category. Ideally, we would have multiple categories and include logic to only post entries tagged as 'Events' in event management tools like eventbrite.com

- Only structured data will be leveraged to enter a new event so that we're able to leverage a relational database. There's a many to many relationship between Product / Event and an Event Management Tool like eventbrite

- Merchants will have accounts and enter their own events into the admin panel. Hence, the logic gets the merchant info for an event post from the user's merchant ID

- Due to time contraints, only leveraged to work with one API, eventbrite, and had to hardcode the timezone and currency for the POST request. Ideally these data points should be retrieved from the database

- The POST request parameters are currently hardcoded for eventbrite, ideally these should be dynamic and adjust based on the API we're working with

- PostgreSQL database was leveraged

- Ideally once an event is posted should get an ID from the Event Management Tool to store in our database for updates

- Due to time constraints, unable to use css style on admin panel

- Cron job set to 5 minute interval

## Run in localhost
- run `npm install` to install packages
- run `npm run seed` to populate database with dummy data
- open `localhost:8080/home` in browser (Chrome)
- login with the following credentials -> email: murphy@email.com, password: 123