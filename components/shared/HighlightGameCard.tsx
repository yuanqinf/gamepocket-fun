'use client';

import React from 'react';
import Image from 'next/image';
import { ThumbsDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Generic game interface that can be extended by specific game types
export interface BaseGame {
  id: number;
  title: string;
  imageUrl?: string;
}

interface GameCardProps<T extends BaseGame> {
  game: T;
  index?: number;
  showRanking?: boolean;
  rankingColor?: string;
  ratingColor?: string;
  ratingLabel?: string;
  ratingValue?: number | string;
  issuesLabel?: string;
  issuesValue?: string;
  fallbackIcon?: React.ReactNode;
}

const HighlightGameCard = <T extends BaseGame>({
  game,
  index = 0,
  showRanking = true,
  rankingColor = 'bg-red-900',
  ratingColor = 'text-red-400',
  ratingLabel = 'Rating',
  ratingValue,
  issuesLabel = 'Issues',
  issuesValue,
  fallbackIcon = <ThumbsDown size={48} className="text-zinc-500" />,
}: GameCardProps<T>) => {
  return (
    <Card className="game-card-base h-full">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-3">
          {showRanking && (
            <div
              className={`${rankingColor} flex-center h-12 w-12 flex-shrink-0 rounded-full`}
            >
              <span className="font-bold">{index + 1}</span>
            </div>
          )}
          <div
            className={`overflow-hidden ${showRanking ? 'max-w-[calc(100%-60px)]' : 'w-full'}`}
          >
            <CardTitle className="block truncate text-base">
              {game.title}
            </CardTitle>
            {ratingValue && (
              <CardDescription className={ratingColor}>
                {ratingLabel}: {ratingValue}
                {typeof ratingValue === 'number' ? '/10' : ''}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="relative mb-3 aspect-video overflow-hidden rounded-lg bg-zinc-700">
          {game.imageUrl ? (
            <Image
              src={game.imageUrl}
              alt={game.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="flex-center h-full w-full">{fallbackIcon}</div>
          )}
        </div>
      </CardContent>
      {issuesValue && (
        <CardFooter className="border-t border-zinc-700 pt-4 text-sm text-zinc-400">
          <p>
            {issuesLabel}: {issuesValue}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default HighlightGameCard;
