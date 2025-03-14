// Type definitions for Gomoku game
export type PlayerType = 'black' | 'white';
export type CellState = PlayerType | null;
export type GameStatus = 'playing' | 'blackWin' | 'whiteWin' | 'draw';
export type Position = [number, number]; // [row, col]

// Board size constant
export const BOARD_SIZE = 20;

/**
 * Initializes an empty board with the specified size.
 * @returns A 2D array representing the empty board
 */
export const initializeBoard = (): CellState[][] => {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
};

/**
 * Checks if the last move resulted in a win.
 * @param board - Current board state
 * @param row - Row index of the last move
 * @param col - Column index of the last move
 * @param player - Player who made the last move
 * @returns Boolean indicating if the player has won
 */
export const checkWinner = (
  board: CellState[][], 
  row: number, 
  col: number, 
  player: PlayerType
): boolean => {
  // Define the four directions to check:
  // horizontal, vertical, diagonal (top-left to bottom-right), diagonal (top-right to bottom-left)
  const directions: [number, number][] = [
    [0, 1],  // horizontal
    [1, 0],  // vertical
    [1, 1],  // diagonal (top-left to bottom-right)
    [1, -1], // diagonal (top-right to bottom-left)
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
};

/**
 * Checks if the board is full (draw condition).
 * @param board - Current board state
 * @returns Boolean indicating if the board is full
 */
export const checkDraw = (board: CellState[][]): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};

/**
 * Returns the next player based on the current player.
 * @param currentPlayer - Current player
 * @returns The next player
 */
export const getNextPlayer = (currentPlayer: PlayerType): PlayerType => {
  return currentPlayer === 'black' ? 'white' : 'black';
};

/**
 * Creates a deep copy of the board.
 * @param board - Current board state
 * @returns A new copy of the board
 */
export const copyBoard = (board: CellState[][]): CellState[][] => {
  return board.map(row => [...row]);
};

/**
 * Determines the game status after a move.
 * @param board - Current board state
 * @param lastMove - Position of the last move [row, col]
 * @param player - Player who made the last move
 * @returns The current game status
 */
export const getGameStatus = (
  board: CellState[][], 
  lastMove: Position | null, 
  player: PlayerType
): GameStatus => {
  if (!lastMove) {
    return 'playing';
  }
  
  const [row, col] = lastMove;
  
  if (checkWinner(board, row, col, player)) {
    return player === 'black' ? 'blackWin' : 'whiteWin';
  }
  
  if (checkDraw(board)) {
    return 'draw';
  }
  
  return 'playing';
};

/**
 * Checks if a move is valid.
 * @param board - Current board state
 * @param row - Row index of the intended move
 * @param col - Column index of the intended move
 * @returns Boolean indicating if the move is valid
 */
export const isValidMove = (board: CellState[][], row: number, col: number): boolean => {
  return (
    row >= 0 && row < BOARD_SIZE &&
    col >= 0 && col < BOARD_SIZE &&
    board[row][col] === null
  );
};