import React from 'react';
import {inject, observer} from 'mobx-react';
import Score from './components/Score';
import Board from './components/Board';
import PlayButtons from './components/PlayButtons';
import GamePaused from './components/GamePaused'
import PauseGame from './components/PauseGame';
import EnterName from './components/EnterName';
import Leaderboard from './components/Leaderboard';
import {AppView, Trophy, StatusBar} from './styles/App';

const App = ({app}) => {
  function start(e) {
    app.setDimensions(+e.target.dataset.columns, +e.target.dataset.rows);
    app.setMineCount(+e.target.dataset.mines);
    app.startGame();
  }
  const showPlayButtons = app.state === 'won' || app.state === 'lost' || app.state === 'new';
  const paused = app.state === 'paused';
  const inPlay = app.state ==='active';
  return (
    <div>
      <StatusBar>
        <Trophy onClick={app.toggleLeaderboard}><span role="img" aria-label="Leaderboard">🏆</span></Trophy>
        <Score score={app.timeTrunc} />
        {showPlayButtons && <PlayButtons start={start}/>}
        {paused && <GamePaused start={app.resumeGame} restart={app.reset} />}
        {inPlay && <PauseGame pause={app.pauseGame} />}
      </StatusBar>
      {app.showLeaderboard && <Leaderboard bestScores={app.bestSorted} />}
      <AppView>
        <Board/>
        {app.user.new && (
          <EnterName name={app.user.name} updateName={app.user.updateName} />
        )}
      </AppView>
    </div>
  );
}

export default inject('app')(observer(App));
