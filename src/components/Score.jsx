import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SubTitle from '../styles/SubTitle';

const StyledScore = styled.div`
  text-align: center;
`;

const Score = ({score}) => (
  <StyledScore>
    <SubTitle>{score}</SubTitle>
  </StyledScore>
);

Score.propTypes = {
  score: PropTypes.string.isRequired,
};

export default Score;
