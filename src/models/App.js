import {types} from 'mobx-state-tree';
import uuidv4 from 'uuid/v4';
import User from './User';
import Cell from './Cell';

let timer;

const AppStore = types.model('AppStore', {
  user: types.optional(User, {}),
  gameOn: false,
  paused: false,
  lost: false,
  showLeaderboard: false,
  columnCount: 8,
  rowCount: 8,
  mineCount: 10,
  totalUnveiled: 0,
  mineIndexes: types.maybe(types.array(types.number)),
  cells: types.optional(types.array(Cell), []),
  time: 0,
  best: types.optional(
    types.array(
      types.model('BestScore', {
        id: types.identifier(),
        value: types.number,
        new: false,
        name: types.string,
      })
    ),
  []),
}).views(self => ({
  get won() {
    const won = self.totalUnveiled === self.rowCount * self.columnCount - self.mineCount;
    if (won) self.stopTimer();
    return won;
  },
  get bestScoreMin() {
    return self.best.length > 0 ? Math.max(...self.best.map(score => score.value)) : 99999999999999;
  },
  get bestSorted() {
    return self.best.slice().sort((a, b) => a.value - b.value);
  },
  get timeTrunc() {
    const re = new RegExp('^-?\\d+(?:\\.\\d{0,' + (1 || -1) + '})?');
    return self.time.toString().match(re)[0];
  }
})).actions(self => ({
  setDimensions(columns, rows) {
    self.columnCount = columns;
    self.rowCount = rows;
  },
  setMineCount(mines) {
    self.mineCount = mines;
  },
  generateMines() {
    const arr = []
    while(arr.length < self.mineCount){
        const randomnumber = Math.floor(Math.random()*(self.rowCount * self.columnCount)) + 1;
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
    self.mineIndexes = arr;
  },
  generateCells() {
    for(let i = 0; i < self.columnCount * self.columnCount; i++) {
      const isMine = self.mineIndexes.includes(i);
      const c = self.columnCount;
      const leftEdge = i === 0 || i % c === 0;
      const rightEdge = i === c - 1 || (i + 1) % c === 0;
      let adjacent = [i - 1, i + 1, i - c, i - c - 1, i - c + 1, i + c, i + c - 1, i + c + 1];
      if (leftEdge) adjacent = [i + 1, i - c, i - c + 1, i + c, i + c + 1];
      if (rightEdge) adjacent = [i - 1, i - c, i - c - 1, i + c, i + c - 1];
      let minesNearby = 0;
      adjacent.filter(a => a >= 0).forEach(square => {
        if (self.mineIndexes.includes(square)) minesNearby++;
      });
      self.cells.push({id: `${i}`, isMine, minesNearby, leftEdge, rightEdge});
    }
  },
  unveilAdjacentBlanks({id, leftEdge, rightEdge}) {
    const c = self.columnCount;
    const i = +id;
    let adjacent = [i - 1, i + 1, i - c, i + c];
    if (leftEdge) adjacent = [i + 1, i - c, i + c];
    if (rightEdge) adjacent = [i - 1, i - c, i + c];
    adjacent.filter(a => a >= 0 && a <= (self.cells.length - 1)).forEach(cellId => {
      const cell = self.cells[cellId];
      if (cell && !cell.unveiled) cell.unveil();
    })
  },
  toggleBoard() {
    self.gameOn = !self.gameOn;
  },
  toggleLeaderboard() {
    self.showLeaderboard = !self.showLeaderboard;
  },
  timer(stop) {
    if (stop) clearInterval(timer);
    else {
      timer = setInterval(() => {
        self.incTime();
      }, 100);
    }
  },
  incTime() {
    self.time += .1;
  },
  stopTimer() {
    self.timer('stop');
  },
  setNewBest() {
    // Remove 10th worst score
    if (self.best.length >= 10) self.bestSorted[0].pop();
    // Add new score
    self.best.push({
      id: uuidv4(),
      value: +self.timeTrunc,
      name: self.user.name,
    });
  },
  startGame() {
    self.reset();
    self.paused = false;
    self.generateMines();
    self.generateCells();
    self.timer();
  },
  pauseGame() {
    self.paused = true;
    self.stopTimer();
  },
  resumeGame() {
    self.paused = false;
    self.timer();
  },
  incrementUnveiled() {
    self.totalUnveiled++;
  },
  youLose() {
    self.stopTimer();
    self.lost = true;
  },
  reset() {
    self.totalUnveiled = 0;
    self.time = 0;
    self.lost = false;
    self.cells = [];
  },
  restart() {
    self.reset();
    self.gameOn = false;
  }
}));

export default AppStore;
