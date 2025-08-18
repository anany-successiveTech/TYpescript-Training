"use client";

import React, { useEffect, useState } from "react";
import "@/app/styles/game.css";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

const TicTacToe: React.FC = () => {
  // State for board cells
  const [cell, setCell] = useState<string[]>(Array(9).fill(""));
  // Track whose turn it is (X always starts)
  const [player, setPlayer] = useState<"X" | "O">("X");
  // Winner state
  const [winner, setWinner] = useState<"X" | "O" | "Draw" | null>(null);
  // Snackbar toggles
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [winAlertOpen, setWinAlertOpen] = useState<boolean>(false);

  // All winning combinations
  type WinningCombination = [number, number, number]; // we are performing index wise type checking.
  const winningPattern: WinningCombination[] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check if a player has won or if it's a draw
  const checkWinner = (cells: string[]): void => {
    for (let [a, b, c] of winningPattern) {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinner(cells[a] as "X" | "O");
        setWinAlertOpen(true);
        return;
      }
    }
    if (!cells.includes("") && !winner) {
      setWinner("Draw");
      setWinAlertOpen(true);
    }
  };

  // Handle click for player move
  const handleMoveClick = (index: number): void => {
    if (cell[index] !== "" || winner) return;

    const newCell = [...cell];
    newCell[index] = "X";
    setCell(newCell);
    checkWinner(newCell);
    if (!winner) {
      setPlayer(player === "X" ? "O" : "X"); // switch turns
    }

    // if (!winner) {
    //   setTimeout(() => {
    //     makeComputerMove(newCell);
    //   }, 500);
    // }
  };

  // Computer makes a random move
  const makeComputerMove = (cells: string[]): void => {
    if (winner) return;

    const emptyIndexes: number[] = [];
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === "") emptyIndexes.push(i);
    }

    if (emptyIndexes.length === 0) return;

    const randomIndex =
      emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    const newCells = [...cells];
    newCells[randomIndex] = "O";

    setCell(newCells);
    checkWinner(newCells);
    setPlayer("X");
  };
  // added useEffect for making computers move
  useEffect(() => {
    if (player === "O" && !winner) {
      setTimeout(() => {
        makeComputerMove(cell);
      }, 500);
    }
  }, [player, winner]);

  // Reset game to initial state
  const handleResetGame = (): void => {
    setCell(Array(9).fill(""));
    setPlayer("X");
    setWinner(null);
    setSnackbarOpen(true);
    setWinAlertOpen(false);
  };
  // Added the map method for rendoring the buttons {optimized version}.
  return (
    <div>
      <div className="ttt-header">
        <h1>TIC TAC TOE</h1>
        <Typography variant="subtitle1" color="text.secondary">
          {winner ? "" : "Your Turn: X"}
        </Typography>
      </div>
      <div className="ttt-game-container">
        {cell.map((cellValue, index) => (
          <button
            key={index}
            onClick={() => handleMoveClick(index)}
            disabled={Boolean(winner) || cellValue !== ""}
          >
            {cellValue}
          </button>
        ))}
      </div>

      <div className="ttt-controls">
        <button onClick={handleResetGame}>Reset Game</button>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Game Reset Successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={winAlertOpen}
        autoHideDuration={3000}
        onClose={() => setWinAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setWinAlertOpen(false)}
          severity={winner === "Draw" ? "info" : "success"}
          sx={{ width: "100%" }}
        >
          {winner === "Draw" ? "It's a Draw!" : `🎉 Player ${winner} Wins!`}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TicTacToe;
