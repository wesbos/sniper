const db = require('diskdb');
const { parseString } = require('xml2js');
const { promisify } = require('util');

const parseStringAsync = promisify(parseString);

const axios = require('axios');

db.connect(
  './db',
  ['listings', 'searches']
);
async function scrapeSearch(url) {
  const res = await axios.get(url, {
    responseType: 'text',
  });
  const json = await parseStringAsync(res.data, { explicitArray: false });
  if (!json.rss.channel.item) {
    return []; // no items
  }
  const items = json.rss.channel.item.map(item => ({
    title: item.title,
    link: item.link,
    description: item.description,
    price: item['g-core:price'],
    date: item.pubDate,
    image: item.enclosure.$.url,
    adId: item.link.split('/').pop(),
    nah: false,
    from: 'kijiji',
  }));
  // save to DB
  items.forEach(item => {
    // see if we already have it
    const existingItem = db.listings.findOne({ adId: item.adId });
    if (existingItem) {
      console.log(`Item ${item.adId} already in DB`);
      return;
    }
    const geg = db.listings.save(item);
    console.log(`Saved: ${geg._id}`);
  });

  return items;
}
async function scrapeListings() {
  const searches = db.searches.find();
  const scrapeSearches = searches.map(search => scrapeSearch(search.feed));
  const allData = await Promise.all(scrapeSearches);
  return 'Kijiji Search Finished';
}

module.exports = scrapeListings;
