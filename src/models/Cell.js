import {types, getRoot} from 'mobx-state-tree';

const Cell = types
  .model('Cell', {
    id: types.identifier(),
    unveiled: false,
    isMine: false,
    minesNearby: 0,
    leftEdge: false,
    rightEdge: false,
    marker: types.maybe(types.enumeration(['🏴', '❓'])),
  })
  .views(self => ({
    get value() {
      if (self.isMine && self.unveiled) return '💥';
      if (self.isMine) return '💣';
      if (self.minesNearby > 0) return `${self.minesNearby}`;
      return null;
    },
  }))
  .actions(self => ({
    unveil(e) {
      if (e && e.type === 'contextmenu') self.mark();
      else {
        self.marker = null;
        self.unveiled = true;
        if (self.value === '💥') getRoot(self).youLose();
        else {
          if (self.value === null) getRoot(self).unveilAdjacentBlanks(self);
          getRoot(self).incrementUnveiled();
        }
      }
    },
    mark(e) {
      console.log(e);
      e.preventDefault();
      if (!self.marker) self.marker = '🏴';
      else if (self.marker === '🏴') self.marker = '❓';
      else if (self.marker === '❓') self.marker = null;
    },
  }));
export default Cell;
