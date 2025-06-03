import { Gamepad2 } from 'lucide-react';

const UpcomingGames = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Coming Soon...</h2>
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
  );
};

export default UpcomingGames;
