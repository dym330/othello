import React from 'react';
import styled from 'styled-components';

// constants
import { COLORS, FONT_SIZE } from '../style_constants'

const MainWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${ COLORS.MAIN };
`;

const GameTitle = styled.p`
  font-size: ${ FONT_SIZE.LOGO };
`;

const StartButton = styled.a`
  display: inline-block;
  padding: 0.3em 1em;
  text-decoration: none;
  color: white;
  background-color: #23582a;
  border: solid 2px #23582a;
  border-radius: 3px;
  transition: .4s;
  font-size: ${ FONT_SIZE.MAIN_BUTTON };
  &:hover {
    background: #2d7236;
    color: white;
  }
`;

export const Homes = () => {
  return (
    <React.Fragment>
      <MainWrapper>
        <GameTitle>
          オセロ
        </GameTitle>
        <StartButton href="/othello">
          game start
        </StartButton>
      </MainWrapper>
    </React.Fragment>
  );
}