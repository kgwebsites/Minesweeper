import React from 'react';
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import Score from './components/Score';
import Board from './components/Board';
import PlayButtons from './components/PlayButtons';
import GamePaused from './components/GamePaused'
import PauseGame from './components/PauseGame';
import EnterName from './components/EnterName';
import Leaderboard from './components/Leaderboard';

const AppView = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
    > :first-child {
      grid-column-start: 2;
    }
`;

const StyledStatusBar = styled.div`
  padding: 5.5rem;
  .Status__Content {
    display: block;
    position: fixed;
    top: 5px;
    left: 0;
    width: 100%;
  }
`;

const Trophy = styled.div`
  position: fixed;
  font-size: 3rem;
  right: .5rem;
  top: .5rem;
`;

const StatusBar = ({children}) => (
  <StyledStatusBar className="Status">
    <div className="Status__Content">{children}</div>
  </StyledStatusBar>
);

const App = ({app}) => {
  function start(e) {
    app.setDimensions(+e.target.dataset.columns, +e.target.dataset.rows);
    app.setMineCount(+e.target.dataset.mines);
    app.startGame();
  }
  function newGame(e) {
    app.toggleBoard();
    start(e);
  }
  const lost = app.gameOn && app.lost;
  const won = app.gameOn && app.won;
  const paused = app.gameOn && app.paused && !app.won && !app.lost;
  const inPlay = !paused && app.gameOn && !lost && !won;
  const newGameScreen = !app.gameOn;
  return (
    <div>
      <StatusBar>
        <Trophy onClick={app.toggleLeaderboard}><span role="img" aria-label="Leaderboard">🏆</span></Trophy>
        <Score score={app.timeTrunc} />
        {lost && <PlayButtons start={newGame}/>}
        {won && <PlayButtons start={newGame}/>}
        {paused && <GamePaused start={app.resumeGame} restart={app.restart} />}
        {inPlay && <PauseGame pause={app.pauseGame} />}
        {newGameScreen && <PlayButtons start={newGame}/>}
      </StatusBar>
      {app.showLeaderboard && <Leaderboard bestScores={app.bestSorted} />}
      <AppView>
        {!newGameScreen && <Board/>}
        {app.user.new && (
          <EnterName name={app.user.name} updateName={app.user.updateName} highlight={app.user.new} />
          )}
      </AppView>
    </div>
  );
}

export default inject('app')(observer(App));
