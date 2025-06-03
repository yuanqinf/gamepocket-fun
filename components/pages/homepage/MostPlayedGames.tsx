const MostPlayedGames = () => {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Most Played This Month</h2>
      <div className="overflow-x-auto rounded-lg bg-zinc-800 p-4">
        <div className="flex min-w-max gap-4">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <div
                key={`active-${i}`}
                className="w-64 flex-shrink-0 rounded-lg bg-zinc-700 p-4"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-600">
                    <span className="font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Player Name</h3>
                    <p className="text-xs text-zinc-400">
                      Active hours: {120 - i * 10}
                    </p>
                  </div>
                </div>
                <div className="flex h-32 items-center justify-center rounded bg-zinc-600">
                  <span className="text-zinc-400">Game Stats</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MostPlayedGames;
