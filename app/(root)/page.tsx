'use client';
import MonthlyBestGames from '@/components/pages/homepage/MonthlyBestGames';
import MonthlyWorstGames from '@/components/pages/homepage/MonthlyWorstGames';
import UpcomingGames from '@/components/pages/homepage/UpcomingGames';
import GameRanks from '@/components/pages/homepage/GameRanks';

const Page = () => {
  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <MonthlyBestGames />

      <MonthlyWorstGames />

      <UpcomingGames />

      <hr className="border-zinc-700" />

      <GameRanks />
    </div>
  );
};

export default Page;
