import React, { useState, useEffect } from "react";

const Tictac = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [totalMoves, setTotalMoves] = useState(0);
  const [userCanClick, setUserCanClick] = useState(true);

  useEffect(() => {
    if (totalMoves === 9) {
      setTotalMoves(0);
      setWinner("draw");
      setGameEnded(true);
    }

    const result = winnerLogic();
    if (result === "X" || result === "O") {
      setWinner(result);
      setGameEnded(true);
      setTotalMoves(0);
    }
  }, [board]);

  useEffect(() => {
    if (turn === "O" && !gameEnded) {
      setUserCanClick(false);
      if (totalMoves === 9) {
        return;
      }

      // Check for a winner before making the AI move
      const result = winnerLogic();
      if (result === "X" || result === "O") {
        return;
      }

      setTimeout(() => {
        let random;
        do {
          random = Math.floor(Math.random() * 9);
        } while (board[random] !== null);

        setUserCanClick(true);
        clicked(random);
      }, 1000);
    }
  }, [turn]);

  const clicked = (index) => {
    if (gameEnded || !userCanClick) return;

    if (board[index] === null) {
      let updatedBoard = [...board];
      updatedBoard[index] = turn;
      setTurn(turn === "X" ? "O" : "X");
      setBoard(updatedBoard);
      setTotalMoves((prev) => prev + 1);
    }
  };

  const winnerLogic = () => {
    let winningMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    for (let i = 0; i < winningMoves.length; i++) {
      if (
        board[winningMoves[i][0]] === board[winningMoves[i][1]] &&
        board[winningMoves[i][0]] === board[winningMoves[i][2]]
      )
        return board[winningMoves[i][0]];
    }
  };

  const playAgain = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setGameEnded(false);
    setTurn("X");
    setResetGame(true);
    setTotalMoves(0);
    setUserCanClick(true);
  };

  useEffect(() => {
    if (resetGame) {
      setResetGame(false);
    }
  }, [resetGame]);

  // purpose of using a separate resetGame state: --

  //   when you reset the game, the useEffect that checks the winner still watches the board state, but it doesn't run again when resetGame changes because it's not watching resetGame.

  // In summary, the introduction of the resetGame state helps separate the action of resetting the game from the action of checking the winner. It ensures that the useEffect for checking the winner doesn't run when the game is being reset. The resetGame state serves as a signal to control the timing of the reset operation and avoid unintended side effects in your component.

  return (
    <div className="main z-20">
      <div className="inner-main">
        <div className="p-2 heading">
          <h1>Tic-Tac-Toe</h1>
          <button>X</button>
        </div>
        <div className="h w-full bg-white p-5 grid place-content-center">
          <button className="px-5 py-2 w-fit mx-auto mb-5">
            {!gameEnded
              ? "Game is On"
              : winner === "draw"
                ? "It's a Draw"
                : winner === "X"
                  ? "X wins"
                  : "O wins"}
          </button>

          <div className="board grid grid-cols-3 border-blue-950 border">
            {board.map((value, index) => (
              <div
                key={index}
                className="square h-16 border-blue-950 border text-3xl grid place-content-center"
                onClick={() => clicked(index)}
                style={{ minWidth: "4rem" }}
              >
                {value}
              </div>
            ))}
          </div>

          {gameEnded === true && (
            <button
              onClick={playAgain}
              className="px-5 py-2 w-fit mx-auto mt-5"
            >
              Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tictac;
