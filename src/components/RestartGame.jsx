import React from 'react';
import PropTypes from 'prop-types';

const RestartGame = ({restart}) => (
  <button onClick={restart}>Restart Game</button>
);

RestartGame.propTypes = {
  restart: PropTypes.func.isRequired,
};

export default RestartGame;
