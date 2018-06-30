import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {observer, PropTypes as MobxPropTypes} from 'mobx-react';
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
    background: #1fbe69;
    box-shadow: 0px 10px 15px -5px #333;
    width: 300px;
    max-width: 100%;
    border: 1px solid #333;
    padding: 1rem;
    .Leaderboard__Content__Title {
      border-bottom: 1px solid;
      padding-bottom: 0.5rem;
    }
    .Leaderboard__Content__No-Winners {
      text-align: center;
    }
    .Leaderboard__Content__Score {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const NewBestScore = styled.span`
  font-size: 12pt;
  color: #4bb543;
`;

const Leaderboard = ({bestScores, newBestScore}) => (
  <StyledLeaderboard className="Leaderboard">
    <div className="Leaderboard__Content">
      <SubTitle className="Leaderboard__Content__Title">Top Scores</SubTitle>
      {bestScores.length !== 0 ? (
        bestScores.map(score => (
          <li className="Leaderboard__Content__Score" key={score.id}>
            <span>{score.name}</span>
            <span>
              {newBestScore && <NewBestScore>New! </NewBestScore>}
              {score.value}
            </span>
          </li>
        ))
      ) : (
        <div className="Leaderboard__Content__No-Winners">
          No winners yet...
        </div>
      )}
    </div>
  </StyledLeaderboard>
);

Leaderboard.propTypes = {
  bestScores: MobxPropTypes.observableArray.isRequired,
  newBestScore: PropTypes.bool,
};

export default observer(Leaderboard);
