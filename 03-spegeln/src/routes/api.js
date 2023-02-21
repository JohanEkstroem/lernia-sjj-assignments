import express from 'express';

import CMSAdapter from '../adapters/CMSAdapter.js';
import MovieResource from '../resources/MovieResource.js';
import NextScreeningsResource from '../resources/NextScreeningsResource.js';

const router = express();

/*
Startsidan ska visa en lista på visningar de kommande dagarna. Listan ska laddas in med hjälp av webbläsarens fetch() EFTER att sidan har visats, d.v.s. inte renderas på servern.
Endast visningar för de kommande fem dagarna ska visas
Max 10 filmvisningar ska visas. Om det finns fler än 10 visningar de kommande fem dagarna ska bara så många dagar visas som resulterar i max 10 visningar.
Ovanstående logik ska programmeras på servern, och testas med hjälp av ett enhetstest och mockade datakällor

- [x] Create API route
- [x] Fetch screenings from CMS API
  - [x] Find the right URL
  - [x] Fetch from code
  - [x] Fetch in a way that works with tests
- [x] Filter according to logic in assignment
- [x] Respond with JSON
*/

router.get('/next_screenings', async (req, res) => {
  const cms = new CMSAdapter();
  const resource = new NextScreeningsResource(cms);
  const data = await resource.retrieve();
  res.status(200).json({ data });
});

router.get('/movies/:movieId/screenings', async (req, res) => {
  const cms = new CMSAdapter();
  const resource = new MovieResource(req.params.movieId, cms);
  const data = await resource.retrieveScreenings();
  res.status(200).json({ data });
});

router.get('/movies/:movieId/reviews', async (req, res) => {
  const page = req.query.p || 0;
  const cms = new CMSAdapter();
  const resource = new MovieResource(req.params.movieId, cms);
  const data = await resource.retrieveReviews(page);
  res.status(200).json({ data });
});

export default router;