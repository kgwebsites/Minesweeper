import React from 'react';
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

export default Score;
