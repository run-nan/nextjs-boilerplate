'use client';

import { useState, useEffect, useCallback } from 'react';

// Player types
type Player = 'black' | 'white';
type CellState = Player | null;
type GameStatus = 'playing' | 'blackWin' | 'whiteWin' | 'draw';

// Board size constant
const BOARD_SIZE = 20;

// Function to initialize an empty board
const initializeBoard = (): CellState[][] => {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
};

export default function Gomoku() {
  // Game state
  const [board, setBoard] = useState<CellState[][]>(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('black');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [lastMove, setLastMove] = useState<[number, number] | null>(null);

  // Check if the game is over
  const checkWinner = useCallback((board: CellState[][], row: number, col: number, player: Player): boolean => {
    const directions = [
      [0, 1],   // horizontal
      [1, 0],   // vertical
      [1, 1],   // diagonal (top-left to bottom-right)
      [1, -1],  // diagonal (top-right to bottom-left)
    ];

    return directions.some(([dx, dy]) => {
      let count = 1; // Count the current piece

      // Check in positive direction
      for (let i = 1; i < 5; i++) {
        const newRow = row + i * dx;
        const newCol = col + i * dy;
        
        if (
          newRow >= 0 && newRow < BOARD_SIZE &&
          newCol >= 0 && newCol < BOARD_SIZE &&
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      // Check in negative direction
      for (let i = 1; i < 5; i++) {
        const newRow = row - i * dx;
        const newCol = col - i * dy;
        
        if (
          newRow >= 0 && newRow < BOARD_SIZE &&
          newCol >= 0 && newCol < BOARD_SIZE &&
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      return count >= 5;
    });
  }, []);

  // Check if the board is full (draw)
  const checkDraw = useCallback((board: CellState[][]): boolean => {
    return board.every(row => row.every(cell => cell !== null));
  }, []);

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    // If the game is over or the cell is already occupied, do nothing
    if (gameStatus !== 'playing' || board[row][col] !== null) {
      return;
    }

    // Create a new board with the move
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    setLastMove([row, col]);

    // Check if the current player has won
    if (checkWinner(newBoard, row, col, currentPlayer)) {
      setGameStatus(currentPlayer === 'black' ? 'blackWin' : 'whiteWin');
    } else if (checkDraw(newBoard)) {
      setGameStatus('draw');
    } else {
      // Switch players
      setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
    }
  };

  // Reset game
  const resetGame = () => {
    setBoard(initializeBoard());
    setCurrentPlayer('black');
    setGameStatus('playing');
    setLastMove(null);
  };

  // Render board
  const renderBoard = () => {
    return (
      <div className="grid grid-cols-20 bg-amber-100 border border-amber-800 relative">
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              className={`
                w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10
                border border-amber-800
                flex items-center justify-center
                relative
                ${lastMove && lastMove[0] === rowIndex && lastMove[1] === colIndex ? 'bg-amber-200' : ''}
              `}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell && (
                <div 
                  className={`
                    rounded-full w-5/6 h-5/6
                    ${cell === 'black' ? 'bg-black' : 'bg-white border border-black'}
                  `}
                ></div>
              )}
              {/* Lines for board intersections */}
              <div className="absolute inset-0 pointer-events-none">
                {/* This creates the visual effect of intersection lines */}
              </div>
            </div>
          ))
        ))}
      </div>
    );
  };

  // Render game status
  const renderGameInfo = () => {
    let message = '';
    
    switch (gameStatus) {
      case 'playing':
        message = `当前玩家：${currentPlayer === 'black' ? '黑子' : '白子'}`;
        break;
      case 'blackWin':
        message = '黑子胜利！';
        break;
      case 'whiteWin':
        message = '白子胜利！';
        break;
      case 'draw':
        message = '游戏结束，平局！';
        break;
    }

    return (
      <div className="text-center my-4">
        <h2 className="text-xl font-bold mb-2">{message}</h2>
        <button
          onClick={resetGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          重新开始
        </button>
      </div>
    );
  };

  // Game instructions
  const renderInstructions = () => {
    return (
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-md mx-auto">
        <h3 className="font-bold text-lg mb-2">游戏规则：</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>黑子先行</li>
          <li>玩家轮流放置己方棋子</li>
          <li>先连成五子一线者获胜</li>
          <li>连线可以是水平、垂直或对角线</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">五子棋(Gomoku)</h1>
      {renderGameInfo()}
      <div className="overflow-auto max-w-full">
        {renderBoard()}
      </div>
      {renderInstructions()}
    </div>
  );
}