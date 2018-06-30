import React, {Fragment} from 'react';
import {observer, PropTypes} from 'mobx-react';
import {getRoot} from 'mobx-state-tree';
import styled from 'styled-components';

const CellWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: ${({unveiled}) => (unveiled ? '#eee' : '#bdbdbd')};
  color: #333333;
  border: 1px solid #333;
  height: 50px;
  width: 50px;
  user-select: none;
`;

const Mistake = styled.div`
  position: absolute;
`;

const Cell = ({cell}) => {
  const lost = getRoot(cell).state === 'lost';
  const won = getRoot(cell).state === 'won';
  const isFlag = cell.marker === '🏴';
  const isBomb = cell.value === '💣';
  const isMistake = isFlag && isBomb;
  const isNormal = !isFlag && !isBomb;
  const isHidden = !cell.unveiled;
  return (
    <CellWrapper
      unveiled={getRoot(cell).won || cell.unveiled}
      onClick={cell.unveil}
      onContextMenu={cell.mark}>
      {(lost || won) && (
        <Fragment>
          {isMistake && (
            <Mistake>
              <span role="img" aria-label="Incorrect">
                🚫
              </span>
            </Mistake>
          )}
          {!isMistake &&
            isFlag && (
              <span role="img" aria-label="Flag">
                {cell.marker}
              </span>
            )}
          {!isMistake &&
            isBomb && (
              <span role="img" aria-label="Mine">
                {cell.value}
              </span>
            )}
          {isNormal && cell.value}
        </Fragment>
      )}
      {!lost &&
        !won && (
          <Fragment>
            {cell.marker && cell.marker}
            {!cell.marker && isHidden && ''}
            {!cell.marker && !isHidden && cell.value}
          </Fragment>
        )}
    </CellWrapper>
  );
};
Cell.propTypes = {
  cell: PropTypes.observableObject.isRequired,
};
export default observer(Cell);
