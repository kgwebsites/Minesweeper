import React from 'react';
import {inject, observer, PropTypes} from 'mobx-react';
import styled from 'styled-components';
import posed from 'react-pose';
import Cell from './Cell';

const GridWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Grid = styled.div`
  display: inline-grid;
  position: relative;
  grid-template-rows: repeat(${({rows}) => rows}, 50px);
  grid-template-columns: repeat(${({columns}) => columns}, 50px);
`;

const CongratsStyle = styled.div`
  position: absolute;
  opacity: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  font-size: 100px;
`;

const Congrats = posed(CongratsStyle)({
  visible: {
    opacity: 1,
    transition: () => ({type: 'tween', yoyo: 1, duration: 1000}),
  },
  overlay: {
    zIndex: 9,
  },
});

const Disabled = styled.div`
  display: ${({disabled}) => (disabled ? 'block' : 'none')};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const Board = ({app: {cells, columnCount, rowCount, state}}) => (
  <GridWrapper>
    <Grid rows={rowCount} columns={columnCount}>
      <Disabled
        disabled={state !== 'active' && state !== 'won' && state !== 'paused'}
      />
      <Congrats
        initialPose="hidden"
        pose={state === 'won' && ['visible', 'overlay']}>
        <span role="img" aria-label="Congrats">
          🎉
        </span>
      </Congrats>
      {cells.map(cell => <Cell key={cell.id} cell={cell} />)}
    </Grid>
  </GridWrapper>
);

Board.propTypes = {
  app: PropTypes.observableObject.isRequired,
};

export default inject('app')(observer(Board));
