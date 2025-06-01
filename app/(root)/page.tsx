'use client';
import TrendingGames from '@/components/pages/homepage/TrendingGames';
import { Gamepad2 } from 'lucide-react';

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Trending Games Section */}
      <TrendingGames />

      {/* Popular Upcoming Games */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Popular Upcoming Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={`upcoming-${i}`}
                className="bg-zinc-800 rounded-lg p-4 h-64 flex flex-col"
              >
                <div className="bg-zinc-700 rounded h-40 mb-2 flex items-center justify-center">
                  <Gamepad2 size={40} className="text-zinc-500" />
                </div>
                <h3 className="font-medium">Upcoming Game {i + 1}</h3>
                <p className="text-sm text-zinc-400">Release: Q{i + 1} 2025</p>
              </div>
            ))}
        </div>
      </section>

      <hr className="border-zinc-700" />

      {/* TOP 10 Active Players Carousel */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          TOP 10 Active Players This Month
        </h2>
        <div className="bg-zinc-800 rounded-lg p-4 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`active-${i}`}
                  className="bg-zinc-700 rounded-lg p-4 w-64 flex-shrink-0"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-zinc-600 h-12 w-12 rounded-full flex items-center justify-center">
                      <span className="font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Player Name</h3>
                      <p className="text-xs text-zinc-400">
                        Active hours: {120 - i * 10}
                      </p>
                    </div>
                  </div>
                  <div className="bg-zinc-600 h-32 rounded flex items-center justify-center">
                    <span className="text-zinc-400">Game Stats</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* TOP 10 Most Paid Carousel */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          TOP 10 Most Paid Games This Month
        </h2>
        <div className="bg-zinc-800 rounded-lg p-4 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`paid-${i}`}
                  className="bg-zinc-700 rounded-lg p-4 w-64 flex-shrink-0"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-zinc-600 h-12 w-12 rounded-full flex items-center justify-center">
                      <span className="font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Game Title</h3>
                      <p className="text-xs text-emerald-400">
                        ${(1000 - i * 75).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="bg-zinc-600 h-32 rounded flex items-center justify-center">
                    <span className="text-zinc-400">Game Cover</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* TOP 3 Worst Games */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          TOP 3 Worst Games This Month
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={`worst-${i}`} className="bg-zinc-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-900 h-12 w-12 rounded-full flex items-center justify-center">
                    <span className="font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Disappointing Game</h3>
                    <p className="text-xs text-red-400">
                      Rating: {1.5 - i * 0.5}/10
                    </p>
                  </div>
                </div>
                <div className="bg-zinc-700 h-48 rounded mb-3 flex items-center justify-center">
                  <span className="text-zinc-400">Game Cover</span>
                </div>
                <p className="text-sm text-zinc-400">
                  Issues: Performance problems, bugs, poor gameplay
                </p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
