import React from 'react';
import ReactDOM from 'react-dom';
import {autorun} from 'mobx';
import {Provider} from 'mobx-react';
import {onSnapshot} from 'mobx-state-tree';
import 'milligram/dist/milligram.min.css';
import App from './App';
import AppStore from './models/App';
import registerServiceWorker from './registerServiceWorker';

const localState = localStorage.getItem('minesweeper');
const initialState = localState ? JSON.parse(localState) : {};
if (initialState.time === 0) initialState.state = 'new';
else if (initialState.state === 'active') initialState.state = 'paused';
const app = AppStore.create(initialState);

onSnapshot(app, snapshot => {
  localStorage.setItem('minesweeper', JSON.stringify(snapshot));
});

autorun(() => {
  if (app.won) {
    app.setWonState();
    if (app.time < app.bestScoreMin) {
      if (app.user.name) app.setNewBest();
      else app.user.showNameInput();
    }
  }
});

ReactDOM.render(
  <Provider app={app}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
