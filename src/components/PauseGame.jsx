import React from 'react';
import PropTypes from 'prop-types';
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

PauseGame.propTypes = {
  pause: PropTypes.func.isRequired,
};

export default PauseGame;
