import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const AppView = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  > :first-child {
    grid-column-start: 2;
  }
`;

export const StyledStatusBar = styled.div`
  padding: 5.5rem;
  .Status__Content {
    display: block;
    position: fixed;
    top: 5px;
    left: 0;
    width: 100%;
  }
`;

export const Trophy = styled.div`
  position: fixed;
  font-size: 3rem;
  right: 0.5rem;
  top: 0.5rem;
`;

export const StatusBar = ({children}) => (
  <StyledStatusBar className="Status">
    <div className="Status__Content">{children}</div>
  </StyledStatusBar>
);

StatusBar.propTypes = {
  children: PropTypes.node.isRequired,
};
