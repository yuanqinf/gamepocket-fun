'use client';
import BestGames from '@/components/pages/homepage/BestGames';
import WorstGames from '@/components/pages/homepage/WorstGames';
import UpcomingGames from '@/components/pages/homepage/UpcomingGames';
import TopRatedGames from '@/components/pages/homepage/TopRatedGames';
import TopActiveGames from '@/components/pages/homepage/TopActiveGames';
import TopRevenueGames from '@/components/pages/homepage/TopRevenueGames';

const Page = () => {
  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <BestGames />

      <WorstGames />

      <UpcomingGames />

      <hr className="border-zinc-700" />

      <TopActiveGames />

      <TopRatedGames />

      <TopRevenueGames />
    </div>
  );
};

export default Page;
