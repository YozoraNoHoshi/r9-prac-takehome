import React, { Component } from 'react';

import JokeList from './JokeList';
import styled from 'styled-components';
import AppContainer from './AppContainer';

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;

  & > div.ranking {
    width: 50%;
    margin: 1%;
  }
  & > div.random {
    width: 50%;
    margin: 1%;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    & > div.ranking {
      width: 95%;
    }
    & > div.random {
      width: 95%;
    }
  }
`;

const NewJokes = styled.button`
  width: 50%;
  margin-top: 2%;
  padding: 20px;
  color: white;
  font-size: 2em;
  border-radius: 10px;
  background: steelblue;
`;

const Loading = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
class App extends Component {
  render() {
    return (
      <AppContainer>
        {({ state, handleClick, getRandomJokes }) => {
          return state.loaded ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <NewJokes onClick={getRandomJokes}>Get new jokes</NewJokes>
              <StyledApp>
                <div className="ranking">
                  <JokeList
                    label="Highest Rated"
                    jokes={state.top}
                    handleClick={handleClick}
                  />
                  <JokeList
                    label="Bottom of the Barrel"
                    jokes={state.bottom}
                    handleClick={handleClick}
                  />
                </div>
                <div className="random">
                  <JokeList
                    random
                    loading={state.gettingJokes}
                    label="Random Selection"
                    jokes={state.jokes}
                    handleClick={handleClick}
                  />
                </div>
              </StyledApp>
            </div>
          ) : (
            <Loading>Loading...</Loading>
          );
        }}
      </AppContainer>
    );
  }
}
export default App;
