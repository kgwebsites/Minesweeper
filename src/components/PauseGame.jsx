import React from 'react';
import styled from 'styled-components';

const PauseGameStyle = styled.div`
  display: flex;
  justify-content: center;
`;

const PauseGame = ({pause}) => (
  <PauseGameStyle>
    <button onClick={pause}>Pause Game</button>
  </PauseGameStyle>
);

export default PauseGame;
