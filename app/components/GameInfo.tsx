'use client';

import React from 'react';

// Type definitions
type Player = 'black' | 'white';
type GameStatus = 'playing' | 'blackWin' | 'whiteWin' | 'draw';

interface GameInfoProps {
  currentPlayer: Player;
  gameStatus: GameStatus;
  onResetGame: () => void;
}

export default function GameInfo({ currentPlayer, gameStatus, onResetGame }: GameInfoProps) {
  // Determine the status message
  const getStatusMessage = () => {
    switch (gameStatus) {
      case 'playing':
        return (
          <div className="flex items-center justify-center space-x-2">
            <span>当前玩家：</span>
            <div 
              className={`rounded-full w-5 h-5 inline-block ${
                currentPlayer === 'black' ? 'bg-black' : 'bg-white border border-gray-400'
              }`}
            ></div>
            <span>{currentPlayer === 'black' ? '黑子' : '白子'}</span>
          </div>
        );
      case 'blackWin':
        return (
          <div className="flex items-center justify-center space-x-2">
            <div className="rounded-full w-5 h-5 bg-black"></div>
            <span className="font-bold text-green-600">黑子胜利！</span>
          </div>
        );
      case 'whiteWin':
        return (
          <div className="flex items-center justify-center space-x-2">
            <div className="rounded-full w-5 h-5 bg-white border border-gray-400"></div>
            <span className="font-bold text-green-600">白子胜利！</span>
          </div>
        );
      case 'draw':
        return <span className="font-bold text-yellow-600">游戏结束，平局！</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 w-full max-w-md">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-3">游戏状态</h2>
        <div className="text-lg py-2">{getStatusMessage()}</div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onResetGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          新游戏
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg mb-2">游戏规则：</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>黑子先行，玩家轮流落子</li>
          <li>每回合在空位上放置一个己方棋子</li>
          <li>率先在横向、纵向或对角线上连成五子一线者获胜</li>
          <li>如棋盘填满仍无人获胜，则为平局</li>
        </ul>
      </div>
    </div>
  );
}