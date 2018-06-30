import React from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import SubTitle from '../styles/SubTitle';

const StyledLeaderboard = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 12rem;
  width: 100%;
  .Leaderboard__Content {
    background: #333333;
    width: 300px;
    max-width: 100%;
    border: 1px solid #333;
    padding: 1rem;
    .Leaderboard__Content__Title {
      border-bottom: 1px solid;
      padding-bottom: .5rem;
    }
    .Leaderboard__Content__No-Winners {
      text-align: center;
    }
  }
`;

const NewBestScore = styled.span`
  font-size: 12pt;
  color: #4BB543;
`;

const Leaderboard = ({bestScores, newBestScore}) => (
  <StyledLeaderboard className="Leaderboard">
    <div className="Leaderboard__Content">
      <SubTitle className="Leaderboard__Content__Title">Top Scores</SubTitle>
      {bestScores.length !== 0 ? (
        bestScores.map(score => (
          <li key={score.id}>{score.value} - {score.name} {score.NewBestScore && <NewBestScore> New!</NewBestScore>}</li>
        ))
      ) : <div className="Leaderboard__Content__No-Winners">No winners yet...</div>}
    </div>
  </StyledLeaderboard>
);

export default observer(Leaderboard);
