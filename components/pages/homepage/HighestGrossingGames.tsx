const HighestGrossingGames = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Highest Grossing This Month</h2>
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
  );
};

export default HighestGrossingGames;
