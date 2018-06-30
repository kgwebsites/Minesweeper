import React from 'react';
import {observer} from 'mobx-react';
import {getRoot} from 'mobx-state-tree';
import styled from 'styled-components';

const CellWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: ${({unveiled}) => unveiled ? '#eee' : '#bdbdbd'};
  color: #333333;
  border: 1px solid #333;
  height: 50px;
  width: 50px;
  user-select: none;
`;

const Mistake = styled.div`
  position: absolute;
`;

const Cell = ({cell}) => (
  <CellWrapper unveiled={getRoot(cell).won || cell.unveiled} onClick={cell.unveil} onContextMenu={cell.mark}>
    {getRoot(cell).lost && cell.marker === '🏴' && cell.value !== '💣' && (
      <Mistake><span role="img" aria-label="Incorrect">🚫</span></Mistake>
    )}
    {(getRoot(cell).won || getRoot(cell).lost) ? (
      cell.marker === '🏴' ? <span role="img" aria-label="Flag">{cell.marker}</span> : (
        cell.value === '💣' ? <span role="img" aria-label="Mine">{cell.value}</span> : cell.value
      )
    ) : (
        cell.marker ? cell.marker : (!cell.unveiled ? '' : cell.value)
    )}
  </CellWrapper>
);

export default observer(Cell);
