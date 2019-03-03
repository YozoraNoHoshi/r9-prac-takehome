const db = require('../db');
const axios = require('axios');

class Joke {
  static convertJokesToObj(jokes) {
    return jokes.reduce((acc, val) => {
      acc[val.id] = val;
      return acc;
    }, {});
  }
  static async getAllLocalJokes() {
    let result = await db.query(`SELECT * from jokes`);
    return Joke.convertJokesToObj(result.rows);
  }

  // Get many jokes (from api)
  static async getJokes(totalJokes) {
    let jokes = {};
    let counter = 0;
    while (counter < totalJokes) {
      let res = await axios.get('https://icanhazdadjoke.com', {
        headers: { Accept: 'application/json' }
      });
      let { joke, id } = res.data;
      if (!jokes[id]) {
        jokes[id] = { joke, id, vote: 0 };
        counter += 1;
      }
    }
    console.log(jokes);
    return jokes;
  }

  // Get top 5 joke or bottom 5 joke (from db)
  static async get5Jokes(desc) {
    let direction = 'ASC';
    if (desc) direction = 'DESC';
    const result = await db.query(
      `SELECT * FROM jokes ORDER BY votes ${direction} LIMIT 5`
    );
    return Joke.convertJokesToObj(result.rows);
  }

  // Up/Down vote joke
  static async rateJoke(id, downvote) {
    let dir = 1;
    if (downvote) dir = -1;
    const result = await db.query(
      `UPDATE jokes SET votes = votes + $1 WHERE id = $2 RETURNING *`,
      [dir, id]
    );
    return { [result.rows[0].id]: result.rows[0] };
  }

  static async addManyJokesSelectively(jokes) {
    // Create a set of existing jokes to to match if a joke needs to be inserted
    const dbJokes = await db.query(`SELECT id FROM jokes`);
    let existingJokes = Joke.convertJokesToObj(dbJokes.rows);
    let addedJokes = {};
    // Can be better if addJoke compiles one single batch insert
    // Rather than making a bunch of single inserts
    for (let key in jokes) {
      let j = jokes[key];
      if (!existingJokes[j.id]) {
        let newJ = await Joke.addJoke(j);
        addedJokes[j.id] = newJ;
      }
    }
    return addedJokes;
  }
  static async addJoke(joke) {
    // Note - this is inefficient for adding multiple jokes at once.
    // Should be refactored to generate a query based on the number of jokes you want to add
    const result = await db.query(
      `INSERT INTO jokes (id, joke, votes) 
           VALUES ($1, $2, $3) 
           RETURNING *`,
      [joke.id, joke.joke, 0]
    );

    return result.rows[0];
  }
}

module.exports = Joke;
