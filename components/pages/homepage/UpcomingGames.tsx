import { Gamepad2 } from 'lucide-react';

const UpcomingGames = () => {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Coming Soon...</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={`upcoming-${i}`}
              className="flex h-64 flex-col rounded-lg bg-zinc-800 p-4"
            >
              <div className="mb-2 flex h-40 items-center justify-center rounded bg-zinc-700">
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
