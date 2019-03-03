import React, { PureComponent } from 'react';
import JokeCard from './JokeCard';
import styled from 'styled-components';

const StyledJokeList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  & > div {
    text-align: center;
    width: 100%;
  }
`;
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
          votes={j.votes}
          handleClick={this.props.handleClick}
        />
      );
    });
  };
  render() {
    return (
      <StyledJokeList>
        <div>{this.props.label}</div>
        {this.renderJokes(Object.values(this.props.jokes))}
      </StyledJokeList>
    );
  }
}

JokeList.defaultProps = { jokes: {}, label: '', handleClick: console.log };

JokeList.propTypes = {};

export default JokeList;
