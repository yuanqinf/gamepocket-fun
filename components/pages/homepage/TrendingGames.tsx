import React from 'react';
import { Gamepad2 } from 'lucide-react';

const TrendingGames = () => {
  return (
    <section className="relative">
      <h2 className="text-2xl font-bold mb-6">Trending Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-800 rounded-lg p-4 h-full flex flex-col">
          <div className="bg-zinc-700 rounded h-80 mb-2 flex items-center justify-center">
            <Gamepad2 size={60} className="text-zinc-500" />
          </div>
          <h3 className="font-medium text-lg">Featured Game</h3>
          <p className="text-zinc-400">Premium content and details</p>
        </div>
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`trending-${i}`}
                  className="bg-zinc-800 rounded-lg p-4 h-64 flex flex-col"
                >
                  <div className="bg-zinc-700 rounded h-40 mb-2 flex items-center justify-center">
                    <Gamepad2 size={40} className="text-zinc-500" />
                  </div>
                  <h3 className="font-medium">Game Title {i + 1}</h3>
                  <p className="text-sm text-zinc-400">Category • Rating</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingGames;
