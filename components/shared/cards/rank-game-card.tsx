import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { RankedGame } from '@/constants/mockRankingData';

interface RankGameCardProps {
  game: RankedGame;
}

const RankGameCard: React.FC<RankGameCardProps> = ({ game }) => {
  return (
    <Card className="game-card-base transition-colors hover:bg-zinc-700/70">
      <CardContent className="flex items-center gap-4 p-3">
        <div className="flex min-w-[50px] flex-col items-center justify-center pr-2 text-center">
          <span className="text-3xl font-bold text-zinc-400">{game.rank}</span>
          {game.rankChange !== undefined && game.rankChange !== 0 && (
            <div
              className={`flex items-center ${game.rankChange > 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {game.rankChange > 0 ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              )}
              <span className="ml-0.5 text-sm font-semibold">
                {Math.abs(game.rankChange)}
              </span>
            </div>
          )}
          {(game.rankChange === undefined || game.rankChange === 0) && (
            <div className="flex items-center text-zinc-600">
              <Minus size={18} className="text-yellow-500" />
            </div>
          )}
        </div>
        <Image
          src={game.bannerUrl}
          alt={`${game.gameName} banner`}
          width={128} // w-32
          height={72} // aspect-video like, roughly half of width
          className="ml-auto flex-shrink-0 rounded-md object-cover"
        />
        <div className="flex w-48 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-white">
              {game.gameName}
            </h3>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-zinc-400">
            {game.developer}
          </div>
          <p className="truncate text-xs text-zinc-400">{game.genre}</p>
        </div>

        <div className="hidden flex-grow flex-row items-center justify-center gap-3 text-zinc-400 sm:flex">
          <div>
            <span className="text-base font-medium text-zinc-300">
              {(() => {
                const labelMap: Record<RankedGame['rankingType'], string> = {
                  overall: 'Score',
                  story: 'Story',
                  graphics: 'Graphics',
                  gameplay: 'Gameplay',
                  longevity: 'Longevity',
                  music: 'Music',
                  innovation: 'Innovation',
                };
                return labelMap[game.rankingType];
              })()}
              {': '}
            </span>
            <span className="text-base font-bold text-white">{game.score}</span>
          </div>
          {game.scoreChange === 0 ? (
            <div className="flex items-center">
              {' '}
              {/* Stat change percentage container */}
              <Minus size={20} className="text-yellow-500" />
              <span className="ml-0.5 text-lg font-semibold text-yellow-500">
                {'eq.'}
              </span>
            </div>
          ) : (
            <div
              className={`flex items-center ${game.scoreChange > 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {game.scoreChange > 0 ? (
                <ArrowUp size={20} />
              ) : (
                <ArrowDown size={20} />
              )}
              <span className="ml-0.5 text-lg font-semibold">
                {Math.abs(game.scoreChange)}
              </span>
            </div>
          )}
        </div>
        <div className="rank-card-comment-container">
          <div className="flex flex-col gap-1">
            <p className="line-clamp-1">
              {game.monthlyActivePlayers
                ? `${game.monthlyActivePlayers.toLocaleString()} played`
                : 'N/A'}
            </p>
            <p className="line-clamp-1">
              {game.totalRatings
                ? `${game.totalRatings.toLocaleString()} rated`
                : 'N/A'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankGameCard;
