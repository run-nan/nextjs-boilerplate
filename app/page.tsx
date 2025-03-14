'use client';
import Gomoku from './components/Gomoku.tsx';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Gomoku />
    </div>
  );
}