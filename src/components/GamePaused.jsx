import React from 'react';
import styled from 'styled-components';
import ResumeGame from './ResumeGame';
import RestartGame from './RestartGame';

const GamePausedStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  button {
    margin: 0 .5rem;
  }
`;

const GamePaused = ({start, restart}) => (
  <GamePausedStyle>
    <ResumeGame start={start} />
    <RestartGame restart={restart} />
  </GamePausedStyle>
);

export default GamePaused;
