'use client';

import React from 'react';

// Type definitions
type Player = 'black' | 'white';
type CellState = Player | null;

// Board size constant
const BOARD_SIZE = 20;

// Props for the Board component
interface BoardProps {
  board: CellState[][];
  lastMove: [number, number] | null;
  onCellClick: (row: number, col: number) => void;
}

export default function Board({ board, lastMove, onCellClick }: BoardProps) {
  return (
    <div className="relative">
      {/* Grid styling for responsive design */}
      <div 
        className="grid bg-amber-100 border-2 border-amber-800 rounded-md shadow-lg"
        style={{ 
          gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(0, 1fr))` 
        }}
      >
        {board.map((row, rowIndex) => (
          // Map through each cell in the row
          row.map((cell, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              className={`
                w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9
                border border-amber-800
                flex items-center justify-center
                relative
                cursor-pointer
                transition-colors duration-200
                ${lastMove && lastMove[0] === rowIndex && lastMove[1] === colIndex ? 'bg-amber-200' : ''}
                hover:bg-amber-50
              `}
              onClick={() => onCellClick(rowIndex, colIndex)}
              aria-label={`Cell ${rowIndex},${colIndex} ${cell || 'empty'}`}
            >
              {/* Render stone if cell has a value */}
              {cell && (
                <div 
                  className={`
                    rounded-full w-4/5 h-4/5
                    ${cell === 'black' ? 'bg-black shadow-md' : 'bg-white border border-gray-400 shadow-md'}
                    transition-transform duration-150 ease-in-out
                    transform hover:scale-105
                  `}
                ></div>
              )}
              
              {/* Visual effect for board intersections */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Horizontal and vertical lines to create intersection effect */}
                  <div className="absolute h-px w-full bg-amber-800 opacity-70"></div>
                  <div className="absolute v-px h-full w-px bg-amber-800 opacity-70"></div>
                </div>
              </div>
            </div>
          ))
        ))}
      </div>

      {/* Board coordinates for better orientation */}
      <div className="flex justify-center mt-2 text-xs sm:text-sm opacity-70 overflow-hidden">
        {Array.from({ length: BOARD_SIZE }).map((_, index) => (
          <div key={`col-${index}`} className="w-6 sm:w-7 md:w-8 lg:w-9 text-center">
            {String.fromCharCode(65 + index)}
          </div>
        ))}
      </div>
      
      <div className="absolute left-0 top-0 flex flex-col text-xs sm:text-sm opacity-70">
        {Array.from({ length: BOARD_SIZE }).map((_, index) => (
          <div key={`row-${index}`} className="h-6 sm:h-7 md:h-8 lg:h-9 flex items-center">
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}