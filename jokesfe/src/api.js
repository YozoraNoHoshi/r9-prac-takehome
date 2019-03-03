import axios from 'axios';
const BASE_URL = 'http://localhost:3001';

export async function get5Jokes() {
  let response = await axios.get(`${BASE_URL}/jokes`);
  return response.data;
}

export async function getRandomJokes(amount) {
  let response = await axios.get(`${BASE_URL}/jokes/random`, {
    params: { amount }
  });
  return response.data.jokes;
}

export async function voteJoke(id, direction) {
  let response = await axios.post(`${BASE_URL}/jokes/${id}/vote`, {
    direction
  });
  return response.data.joke;
}
