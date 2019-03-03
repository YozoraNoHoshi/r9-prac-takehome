import React, { Component } from 'react';
import { getRandomJokes, get5Jokes, voteJoke } from './api';
import JokeList from './JokeList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { jokes: {}, top: {}, bottom: {} };
  }
  async componentDidMount() {
    await this.getRandomJokes();
    await this.get5Jokes();
  }

  handleClick = async (id, direction) => {
    let votedJoke = await voteJoke(id, direction);
    if (!this.state.jokes[votedJoke.id]) await this.get5Jokes();
    if (this.state.jokes[votedJoke.id]) {
      this.setState(prev => {
        return {
          jokes: {
            ...prev.jokes,
            [votedJoke.id]: votedJoke
          }
        };
      });
    }
  };

  get5Jokes = async () => {
    let { top, bottom } = await get5Jokes();
    this.setState({ top, bottom });
  };

  getRandomJokes = async () => {
    let jokes = await getRandomJokes(20);
    this.setState({ jokes });
  };

  render() {
    return (
      <div className="App">
        <JokeList jokes={this.state.top} handleClick={this.handleClick} />
        <JokeList jokes={this.state.bottom} handleClick={this.handleClick} />
        <JokeList jokes={this.state.jokes} handleClick={this.handleClick} />
        <button onClick={this.getRandomJokes}>Get new jokes</button>
      </div>
    );
  }
}

export default App;
