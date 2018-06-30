import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ResumeGame from './ResumeGame';
import RestartGame from './RestartGame';

const GamePausedStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  button {
    margin: 0 0.5rem;
  }
`;

const GamePaused = ({start, restart}) => (
  <GamePausedStyle>
    <ResumeGame start={start} />
    <RestartGame restart={restart} />
  </GamePausedStyle>
);

GamePaused.propTypes = {
  start: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
};

export default GamePaused;
