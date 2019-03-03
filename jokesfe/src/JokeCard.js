import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyledJokeCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 1px 1px 2px darkgray;
  & > div {
    display: flex;
    flex-direction: row;
  }
  & > div > button {
    padding: 5px;
    margin: 5px;
    background-color: black;
    color: white;
  }
`;

class JokeCard extends PureComponent {
  voteUp = () => {
    this.props.handleClick(this.props.id);
  };
  voteDown = () => {
    this.props.handleClick(this.props.id, 'down');
  };
  render() {
    return (
      <StyledJokeCard>
        <div>{this.props.joke}</div>
        <div>Current Score: {this.props.votes}</div>
        <div>
          <button onClick={this.voteUp}>Vote up</button>
          <button onClick={this.voteDown}>Vote down</button>
        </div>
      </StyledJokeCard>
    );
  }
}

JokeCard.defaultProps = {
  joke: '',
  votes: 0,
  handleClick: console.log,
  id: ''
};

export default JokeCard;
