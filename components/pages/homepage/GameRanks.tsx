import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  topActiveGamesData,
  topRatedGamesData,
  topSellingGamesData,
} from '@/constants/games';
import RankGameCard from '@/components/shared/RankGameCard';

const GameRanks = () => {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Top Games</h2>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="rated">Rated</TabsTrigger>
          <TabsTrigger value="selling">Selling</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="space-y-3">
            {topActiveGamesData.map((game) => (
              <RankGameCard key={`top-active-${game.id}`} game={game} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="rated">
          <div className="space-y-3">
            {topRatedGamesData.map((game) => (
              <RankGameCard key={`top-rated-${game.id}`} game={game} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="selling">
          <div className="space-y-3">
            {topSellingGamesData.map((game) => (
              <RankGameCard key={`top-selling-${game.id}`} game={game} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default GameRanks;
