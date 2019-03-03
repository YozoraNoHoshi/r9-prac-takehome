import React, { PureComponent } from 'react';
import JokeCard from './JokeCard';
import styled from 'styled-components';

const StyledJokeList = styled.div`
  display: flex;
  margin: 5px;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  background: lightgray;
  border-radius: 25px;
  & > .header {
    background: darkgray;
    font-size: 2em;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }
  & > div {
    text-align: center;
    width: 100%;
  }
`;

const SplitRows = styled.div`
  display: flex;
  flex-direction: row;
  & > div {
    display: flex;
    text-align: center;
    width: 50%;
    flex-direction: column;
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
    if (this.props.random) {
      let jokes = Object.values(this.props.jokes);
      let mid = Math.ceil(jokes.length / 2);
      return !this.props.loading ? (
        <StyledJokeList>
          <div className="header">{this.props.label}</div>
          <SplitRows>
            <div>{this.renderJokes(jokes.slice(0, mid))}</div>
            <div>{this.renderJokes(jokes.slice(mid, jokes.length))}</div>
          </SplitRows>
        </StyledJokeList>
      ) : (
        <StyledJokeList>
          <div className="header">{this.props.label}</div>
          <SplitRows>
            <div style={{ fontSize: '2em' }}>Getting jokes...</div>
          </SplitRows>
        </StyledJokeList>
      );
    } else {
      return (
        <StyledJokeList>
          <div className="header">{this.props.label}</div>
          {this.renderJokes(Object.values(this.props.jokes))}
        </StyledJokeList>
      );
    }
  }
}

JokeList.defaultProps = { jokes: {}, label: '', handleClick: console.log };

JokeList.propTypes = {};

export default JokeList;
