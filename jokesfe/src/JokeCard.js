import React, { PureComponent } from 'react';

class JokeCard extends PureComponent {
  voteUp = () => {
    this.props.handleClick(this.props.id);
  };
  voteDown = () => {
    this.props.handleClick(this.props.id, 'down');
  };
  render() {
    return (
      <div className="JokeCard">
        <div>{this.props.joke}</div>
        <div>Current Score: {this.props.vote}</div>
        <div onClick={this.voteUp}>Vote up</div>
        <div onClick={this.voteDown}>Vote down</div>
      </div>
    );
  }
}

JokeCard.defaultProps = { joke: '', vote: 0, handleClick: console.log, id: '' };

export default JokeCard;
