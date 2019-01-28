const cron = require('node-cron');
const scrapeListings = require('./scrapeListings');
const scrapeFacebookListings = require('./scrapeFacebook');

// every 3 mins
cron.schedule('*/10 * * * *', async () => {
  scrapeListings();
  scrapeFacebookListings();
  console.log('Done scrapes!');
});
