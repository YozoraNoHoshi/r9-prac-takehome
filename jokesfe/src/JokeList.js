import React, { PureComponent } from 'react';
import JokeCard from './JokeCard';

class JokeList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderJokes = jokes => {
    return jokes.map(j => {
      return (
        <JokeCard
          key={j.id}
          joke={j.joke}
          id={j.id}
          vote={j.vote}
          handleClick={this.props.handleClick}
        />
      );
    });
  };
  render() {
    return (
      <div className="JokeList">
        {this.renderJokes(Object.values(this.props.jokes))}
      </div>
    );
  }
}

JokeList.defaultProps = { jokes: {}, handleClick: console.log };

JokeList.propTypes = {};

export default JokeList;
