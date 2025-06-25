'use client';

import { useState } from 'react';
import { allGamesData } from '@/constants/mock-game-data';
import MiniGameCard from '@/components/shared/cards/mini-game-card';
import HighlightGameCard from '@/components/shared/cards/highlight-game-card';
import { GameData } from '@/constants/mock-game-data';

const GameExplorePage = () => {
  const [selectedGame, setSelectedGame] = useState<GameData>(allGamesData[0]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left side: Selectable items */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {allGamesData.map((game) => (
              <div
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className="cursor-pointer"
              >
                <MiniGameCard game={game} />
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Hero view */}
        <aside className="sticky top-4 hidden h-fit lg:col-span-1 lg:block">
          {selectedGame && <HighlightGameCard game={selectedGame} />}
        </aside>
      </div>
    </div>
  );
};

export default GameExplorePage;
