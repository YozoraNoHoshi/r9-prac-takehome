import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyledJokeCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 1px 1px 2px black;
  margin: 10px;
  padding: 10px;
  background: white;
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  & > div > button {
    padding: 5px;
    margin: 5px;
    color: white;
  }
  & > div > .vote-down {
    background-color: orangered;
  }
  & > div > .vote-up {
    background-color: skyblue;
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
        <div>
          <button className="vote-up" onClick={this.voteUp}>
            Vote up
          </button>
          <button className="vote-down" onClick={this.voteDown}>
            Vote down
          </button>
          <div>Current Score: {this.props.votes}</div>
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
