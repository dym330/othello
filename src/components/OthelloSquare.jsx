import React from 'react';
import styled from 'styled-components';

// constants
import { FONT_SIZE } from '../style_constants'

const SquareWrapper = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${FONT_SIZE.PIECE};
  &:hover {
    background: #2d7236;
    cursor: pointer;
  }
`;

export const OthelloSquare = ({ piece, onClick }) => {
  return (
    <React.Fragment>
      <SquareWrapper onClick={() => onClick()}>
        {piece}
      </SquareWrapper>
    </React.Fragment>
  );
}