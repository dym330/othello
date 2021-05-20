import React, { useState, useEffect } from 'react'
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
  const [endState, setEndState] = useState(0);

  // 引数の場所を黒にして、ゲームの状態を変更する(引数は配列型)
  const changeBlackPiece = (changeArray) => {
    const piecesArray = pieces.slice();
    changeArray.forEach(i => {
      piecesArray[i] = "●";
    });
    setPieces(piecesArray);
  }

  // 引数の場所を白にして、ゲームの状態を変更する(引数は配列型)
  const changeWhitePiece = (changeArray) => {
    const piecesArray = pieces.slice();
    changeArray.forEach(i => {
      piecesArray[i] = "○";
    });
    setPieces(piecesArray);
  }

  // マスをクリックした際の挙動
  const squareClick = (i) => {
    // 既に駒が置いている箇所の場合は早期リターン
    if (pieces[i]) {
      return;
    }

    const changeArray = checkReturn(i);
    // オセロのルール上置けない場所の場合は早期リターン
    if (changeArray.length === 1) {
      return;
    }

    if (gameState === true) {
      changeBlackPiece(changeArray);
    } else {
      changeWhitePiece(changeArray);
    }
    setEndState(0);
    console.log(endState);
    setGameState(!gameState);
  }

  // 検査対象が駒を配置していい場所かの確認
  const checkNumber = (searchNumber, check, i) => {
    // 横の場合
    if (check === 1 || check === -1) {
      const leftLimit = Math.floor(i / 8) * 8;
      const rightLimit = leftLimit + 7
      if (searchNumber >= leftLimit && searchNumber <= rightLimit) {
        return true;
      } else {
        return false;
      }
    }
    // 右斜めの場合
    if (check === -7 || check === 9) {
      const searchNumberSurplus = searchNumber % 8
      const iSurplus = i % 8
      if (searchNumber >= 0 && searchNumber < 64 && iSurplus < searchNumberSurplus) {
        return true;
      } else {
        return false;
      }
    }
    // 左斜めの場合
    if (check === -9 || check === 7) {
      const searchNumberSurplus = searchNumber % 8
      const iSurplus = i % 8
      if (searchNumber >= 0 && searchNumber < 64 && iSurplus > searchNumberSurplus) {
        return true;
      } else {
        return false;
      }
    }
    // 上下の場合
    if (searchNumber >= 0 && searchNumber < 64) {
      return true;
    } else {
      return false;
    }
  }

  //引数の場所においた場合に、どの駒が変化するかを配列にて返す（配列には引数も含まれる）
  const checkReturn = (i) => {
    const myselfPiece = gameState ? "●" : "○"
    const opponentPiece = gameState ? "○" : "●"
    const searchArray = [8, -8, 7, -7, 9, -9, 1, -1]
    let changeArray = [i]

    for (let j = 0; j < searchArray.length; j++) {
      let searchNumber = i + searchArray[j]
      let count = 1
      if (checkNumber(searchNumber, searchArray[j], i) && pieces[searchNumber] === opponentPiece) {
        while(true) {
          if (checkNumber(searchNumber, searchArray[j], i) && pieces[searchNumber] === opponentPiece) {
            if (count > 6) break;
            searchNumber += searchArray[j];
            count += 1;
          } else if (checkNumber(searchNumber, searchArray[j], i) && pieces[searchNumber] === myselfPiece) {
            for (let k = 1; k <= count; k++) {
              changeArray.push(searchNumber - searchArray[j] * k)
            }
            break;
          } else {
            break;
          }
        }
      }
    }
    return changeArray
  }

  // 与えられた文字列がpiecesのどこに入っているかを配列で返す
  const piecesCountString = (countString) => {
    let stringArray = [];
    pieces.forEach((piece, index) => {
      if (piece === countString) {
        stringArray.push(index)
      }
    })
    return stringArray;
  }

  useEffect(() => {
    const checkArray = piecesCountString("");
    let count = 0;
    checkArray.forEach((check) => {
      if (checkReturn(check).length === 1) {
        count += 1
      }
    })
    if (count === checkArray.length) {
      let endcopy = endState
      endcopy += 1
      setEndState(endcopy);
      if (endcopy < 2) {
        setGameState(!gameState);
      }
    }
  },[gameState]);

  useEffect(() => {
    if (endState < 2) {
      return;
    }

    let winner = ""
    const blackPiecesCount = piecesCountString("●").length
    const whitePiecesCount = piecesCountString("○").length
    if (blackPiecesCount > whitePiecesCount) {
      winner = "●"
    } else {
      winner = "○"
    }
    document.getElementById("check").innerHTML = `勝者は${winner}です`
  },[endState]);

  return (
    <React.Fragment>
      <MainWrapper>
        <p id="check">現在の手番は{ gameState ? "●" : "○" }です</p>
        <p>●の数:{piecesCountString("●").length}個    ○の数:{piecesCountString("○").length}個</p>
        <BoardWrapper>
          {
            pieces.map((piece, index) =>
              <OthelloSquare piece={piece} key={index} onClick={() => squareClick(index)}/>
            )
          }
        </BoardWrapper>
        <button onClick={() => console.log(endState)}>aaaa</button>
      </MainWrapper>
    </React.Fragment>
  )
}