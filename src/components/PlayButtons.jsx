import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlayButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  button {
    margin: 0 0.5rem;
  }
`;

const PlayButtons = ({start}) => (
  <PlayButtonsWrapper>
    <button data-columns="8" data-rows="8" data-mines="10" onClick={start}>
      Easy
    </button>
    <button data-columns="16" data-rows="16" data-mines="40" onClick={start}>
      Medium
    </button>
    <button data-columns="24" data-rows="24" data-mines="99" onClick={start}>
      Hard
    </button>
  </PlayButtonsWrapper>
);

PlayButtons.propTypes = {
  start: PropTypes.func.isRequired,
};

export default PlayButtons;
