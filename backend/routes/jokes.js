const express = require('express');
const router = express.Router();
const Joke = require('../models/joke');

// Get top 5 and bottom 5 jokes
router.get('/', async function(req, res, next) {
  try {
    let jokes = [Joke.get5Jokes('down'), Joke.get5Jokes()];
    jokes = await Promise.all(jokes);
    return res.json({ top: jokes[0], bottom: jokes[1] });
  } catch (err) {
    return next(err);
  }
});

// Get new Random Jokes from API - no dupes
router.get('/random', async function(req, res, next) {
  try {
    // Get new set of jokes from API
    let jokesFromAPI = await Joke.getJokes(req.query.amount);
    await Joke.addManyJokesSelectively(jokesFromAPI);
    // Get all the jokes from local db
    let local = await Joke.getAllLocalJokes();
    // Returns the jokes from localdb that have the same id as the ones pulled from API
    for (let key in jokesFromAPI) {
      jokesFromAPI[key] = local[key];
    }
    return res.json({ jokes: jokesFromAPI });
  } catch (error) {
    return next(error);
  }
});

// Upvote/downvote joke
router.post('/:id/vote', async function(req, res, next) {
  try {
    let joke = await Joke.rateJoke(req.params.id, req.body.direction);
    return res.json({ joke });
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
