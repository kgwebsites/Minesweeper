import React from 'react';
import PropTypes from 'prop-types';

const ResumeGame = ({start}) => <button onClick={start}>Resume Game</button>;

ResumeGame.propTypes = {
  start: PropTypes.func.isRequired,
};

export default ResumeGame;
