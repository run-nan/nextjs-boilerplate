'use client';

import React from 'react';
import { CellState } from '../utils/gomokuUtils';

// Define props for the Cell component
interface CellProps {
  state: CellState;
  row: number;
  col: number;
  isLastMove: boolean;
  onClick: (row: number, col: number) => void;
}

export default function Cell({ state, row, col, isLastMove, onClick }: CellProps) {
  // Handler for click events
  const handleClick = () => {
    // Only trigger the onClick handler if the cell is empty (null state)
    if (state === null) {
      onClick(row, col);
    }
  };

  return (
    <div 
      className={`
        w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9
        border border-amber-800
        flex items-center justify-center
        relative
        cursor-pointer
        transition-colors duration-200
        ${isLastMove ? 'bg-amber-200' : ''}
        ${state === null ? 'hover:bg-amber-50' : ''}
      `}
      onClick={handleClick}
      aria-label={`Cell ${row},${col} ${state || 'empty'}`}
    >
      {/* Render the stone if a player has placed one */}
      {state && (
        <div 
          className={`
            rounded-full w-4/5 h-4/5
            ${state === 'black' 
              ? 'bg-black shadow-md' 
              : 'bg-white border border-gray-400 shadow-md'
            }
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
  );
}