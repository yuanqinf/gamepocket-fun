import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Monitor,
  Gamepad2,
  ArrowUp,
  ArrowDown,
  Minus,
  MessageCircle,
} from 'lucide-react';
import { Game } from '@/constants/games';

interface RankGameCardProps {
  game: Game;
}

const RankGameCard: React.FC<RankGameCardProps> = ({ game }) => {
  return (
    <Card className="game-card-base transition-colors hover:bg-zinc-700/70">
      <CardContent className="flex items-center gap-4 p-3">
        <div className="flex w-auto min-w-[50px] flex-col items-center justify-center pr-2 text-center">
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
          alt={`${game.title} banner`}
          width={128} // w-32
          height={72} // aspect-video like, roughly half of width
          className="ml-auto flex-shrink-0 rounded-md object-cover"
        />
        <div className="flex flex-grow flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-white">
              {game.title}
            </h3>
            {game.isGlobal && (
              <Badge
                variant="secondary"
                className="h-5 border-zinc-500 bg-zinc-600 text-xs text-zinc-300"
              >
                Global
              </Badge>
            )}
          </div>
          <div className="flex items-center text-sm text-zinc-400">
            <p>
              <span className="font-medium text-zinc-300">
                {game.statLabel}:
              </span>{' '}
              {game.statValue}
            </p>
            {game.statChangePercent !== undefined &&
              game.statChangePercent !== 0 && (
                <div
                  className={`ml-2 flex items-center ${game.statChangePercent > 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {game.statChangePercent > 0 ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  )}
                  <span className="ml-0.5 text-xs font-semibold">
                    {Math.abs(game.statChangePercent)}%
                  </span>
                </div>
              )}
          </div>
          <p className="text-xs text-zinc-400">{game.categories.join(' • ')}</p>
          <div className="mt-0.5 flex items-center gap-1.5 text-zinc-400">
            {game.platforms.includes('pc') && <Monitor size={14} />}
            {game.platforms.includes('ps5') && <Gamepad2 size={14} />}
            {game.platforms.includes('xbox') && <Gamepad2 size={14} />}
            {game.platforms.includes('switch') && <Gamepad2 size={14} />}
          </div>
        </div>
        {game.featuredComment && (
          <div className="rank-card-comment-container">
            <MessageCircle
              size={16}
              className="mt-0.5 flex-shrink-0 text-zinc-500"
            />
            <p className="line-clamp-3">{game.featuredComment}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RankGameCard;
