'use client';
import BestGames from '@/components/pages/homepage/BestGames';
import WorstGames from '@/components/pages/homepage/WorstGames';
import UpcomingGames from '@/components/pages/homepage/UpcomingGames';
import GameRanks from '@/components/pages/homepage/GameRanks';

const Page = () => {
  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <BestGames />

      <WorstGames />

      <UpcomingGames />

      <hr className="border-zinc-700" />

      <GameRanks />
    </div>
  );
};

export default Page;
