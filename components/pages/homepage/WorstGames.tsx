const WorstGames = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{'Shame of the Month :('}</h2>
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
  );
};

export default WorstGames;
