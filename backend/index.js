const express = require('express');
const cors = require('cors');
const db = require('diskdb');
const bodyParser = require('body-parser');
const { compareAsc } = require('date-fns');

require('./lib/cron');

db.connect(
  './db',
  ['listings', 'searches']
);

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* Searches */
// CREATE
app.post('/searches', async (req, res) => {
  console.log(req.body);
  const search = db.searches.save(req.body);
  console.log(search);
  res.json(search);
});

// READ
app.get('/searches', async (req, res) => {
  const searches = db.searches.find().reverse();
  res.json(searches);
});

// CREATE
app.post('/listings', async (req, res) => {
  console.log(req.body);
  db.listings.save(req.body.note);
  res.json(req.body.note);
});

// READ
app.get('/listings', async (req, res) => {
  console.log('Fetching listings');
  const listings = db.listings
    .find({ nah: false })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(listings);
});

// mark as nah
app.post('/listings/:id/nah', async (req, res) => {
  console.log('NAHING');
  const nah = db.listings.update({ _id: req.params.id }, { nah: true });
  console.log(nah);
  res.json('success');
});

// READ Single Listing
app.get('/listings/:id', async (req, res) => {
  console.log('finding single note');
  const note = db.listings.findOne({ _id: req.params.id });
  res.json({ note });
});

// UPDATE
app.put('/listings/:id', async (req, res) => {
  db.listings.update({ _id: req.body.note._id }, req.body.note);
  res.json(req.body.note);
});

// DELETE
app.delete('/listings/:id', async (req, res) => {
  db.notes.remove({ _id: req.params.id });
  res.json({ status: 'success' });
});

app.listen(8888, () => console.log('Example app listening on port 8888!'));
