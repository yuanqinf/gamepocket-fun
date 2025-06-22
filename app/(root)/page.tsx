'use client';
import MonthlyBestGames from '@/components/pages/homepage/monthly-best-games';
import MonthlyWorstGames from '@/components/pages/homepage/monthly-worst-games';
import UpcomingGames from '@/components/pages/homepage/upcoming-games';
import GameRanks from '@/components/pages/homepage/game-ranks';

const HomePage = () => {
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

export default HomePage;
