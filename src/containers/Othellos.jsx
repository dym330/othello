import React, { useState } from 'react'
import styled from 'styled-components';

// components
import { OthelloSquare } from '../components/OthelloSquare'

// constants
import { COLORS } from '../style_constants'

const MainWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${ COLORS.MAIN };
`;

const BoardWrapper = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
`;


export const Othellos = () => {
  const initializeArray = ["","","","","","","","",
                           "","","","","","","","",
                           "","","","","","","","",
                           "","","","●","○","","","",
                           "","","","○","●","","","",
                           "","","","","","","","",
                           "","","","","","","","",
                           "","","","","","","","",]
  const [pieces, setPieces] = useState(initializeArray);
  const [gameState, setGameState] = useState(true);

  // 引数の場所を黒にして、ゲームの状態を変更する
  const changeBlackPiece = (i) => {
    const piecesArray = pieces.slice();
    piecesArray[i] = "●";
    setPieces(piecesArray);
    setGameState(!gameState);
  }

  // 引数の場所を白にして、ゲームの状態を変更する
  const changeWhitePiece = (i) => {
    const piecesArray = pieces.slice();
    piecesArray[i] = "○";
    setPieces(piecesArray);
    setGameState(!gameState);
  }

  // マスをクリックした際の挙動
  const squareClick = (i) => {
    if (pieces[i]) {
      return;
    }
    if (gameState === true) {
      changeBlackPiece(i);
    } else {
      changeWhitePiece(i);
    }
  }

  return (
    <React.Fragment>
      <MainWrapper>
        <BoardWrapper>
          {
            pieces.map((piece, index) =>
              <OthelloSquare piece={piece} key={index} onClick={() => squareClick(index)}/>
            )
          }
        </BoardWrapper>
        <button onClick={() => console.log(pieces)}>aaaaaaaaaa</button>
      </MainWrapper>
    </React.Fragment>
  )
}