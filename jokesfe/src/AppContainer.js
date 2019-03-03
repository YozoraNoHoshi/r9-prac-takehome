import React, { PureComponent } from 'react';
import { getRandomJokes, get5Jokes, voteJoke } from './api';

class AppContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      jokes: {},
      top: {},
      bottom: {},
      loaded: false,
      gettingJokes: false
    };
  }
  async componentDidMount() {
    let jokes = localStorage.getItem('jokes');
    if (jokes) {
      await this.get5Jokes();
      this.setState({ jokes, loaded: true });
      return;
    }
    await this.getRandomJokes();
    await this.get5Jokes();
    this.setState({ loaded: true });
  }

  sendToLocalStorage = () => {
    localStorage.setItem('jokes', this.state.jokes);
  };

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
    this.sendToLocalStorage();
  };

  get5Jokes = async () => {
    let { top, bottom } = await get5Jokes();
    this.setState({ top, bottom });
  };

  getRandomJokes = async () => {
    this.setState({ gettingJokes: true });
    let jokes = await getRandomJokes(20);
    this.setState({ jokes, gettingJokes: false });
    this.sendToLocalStorage();
  };

  render() {
    return this.props.children({
      state: this.state,
      handleClick: this.handleClick,
      getRandomJokes: this.getRandomJokes
    });
  }
}

AppContainer.defaultProps = {};

AppContainer.propTypes = {};

export default AppContainer;
