import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { mockRankingData } from '@/constants/mockRankingData';
import { rankingTypes } from '@/constants/rankingTypes';
import RankGameCard from '@/components/shared/Card/RankGameCard';

const GameRanks = () => {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Top Games</h2>
      {/* Tabs for ≥sm screens */}
      <Tabs defaultValue="overall" className="hidden w-full sm:block">
        {(() => {
          return (
            <>
              <TabsList
                className="scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent mb-4 flex w-full gap-2 overflow-x-auto sm:grid sm:grid-cols-7"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {rankingTypes.map((t) => (
                  <TabsTrigger
                    key={t.value}
                    value={t.value}
                    className="min-w-[90px] flex-shrink-0 truncate sm:min-w-0"
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {rankingTypes.map((t) => {
                const games = mockRankingData
                  .filter((g) => g.rankingType === t.value)
                  .sort((a, b) => a.rank - b.rank)
                  .slice(0, 5);
                return (
                  <TabsContent key={t.value} value={t.value}>
                    <div className="space-y-3">
                      {games.map((game) => (
                        <RankGameCard
                          key={`${t.value}-${game.gameId}`}
                          game={game}
                        />
                      ))}
                    </div>
                  </TabsContent>
                );
              })}
            </>
          );
        })()}
      </Tabs>

      {/* Carousel for small screens */}
      <div className="block w-full sm:hidden">
        {(() => {
          return (
            <Carousel opts={{ align: 'start' }} className="w-full">
              <CarouselContent>
                {rankingTypes.map((t) => {
                  const games = mockRankingData
                    .filter((g) => g.rankingType === t.value)
                    .sort((a, b) => a.rank - b.rank)
                    .slice(0, 5);
                  return (
                    <CarouselItem key={t.value} className="basis-full pl-2">
                      <div className="mb-2 px-2 text-lg font-semibold">
                        {t.label}
                      </div>
                      <div className="space-y-3 px-2">
                        {games.map((game) => (
                          <RankGameCard
                            key={`mobile-${t.value}-${game.gameId}`}
                            game={game}
                          />
                        ))}
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          );
        })()}
      </div>
    </section>
  );
};

export default GameRanks;
