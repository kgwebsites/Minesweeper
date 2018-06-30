import React from 'react';
import ReactDOM from 'react-dom';
import {autorun} from 'mobx';
import {Provider} from 'mobx-react';
import {onSnapshot} from 'mobx-state-tree';
import App from './App';
import AppStore from './models/App';
import registerServiceWorker from './registerServiceWorker';
import 'milligram/dist/milligram.min.css';

const localState = localStorage.getItem('minesweeper');
const initialState = localState ? JSON.parse(localState) : {};
initialState.paused = initialState.time !== 0 && !initialState.lost;
initialState.gameOn = initialState.time !== 0 && !initialState.lost;
if (!initialState.gameOn) initialState.time = 0;
const app = AppStore.create(initialState);

onSnapshot(app, snapshot => {
  localStorage.setItem('minesweeper', JSON.stringify(snapshot));
});

autorun((() => {
  if (app.won && (app.time < app.bestScoreMin)) {
    if (app.user.name) app.setNewBest();
    else app.user.showNameInput();
  }
}));

ReactDOM.render(
  <Provider app={app}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
