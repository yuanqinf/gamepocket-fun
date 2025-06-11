'use client';
import React from 'react';
import { GameData } from '../../constants/mockGameData';
import { Star, Calendar, Gamepad2, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';

type SteamReviewPresentation = {
  IconComponent: React.ElementType;
  colorClass: string;
  label: string;
};

export default function HighlightGameCard({ game }: { game: GameData }) {
  const getSteamReviewPresentation = (review?: string): SteamReviewPresentation | null => {
    if (!review?.trim()) return null;

    const lowerReview = review.toLowerCase();
    let IconComponent: React.ElementType = ThumbsUp;
    let colorClass = 'text-neutral-400';

    if (lowerReview.includes('positive')) {
      colorClass = 'text-green-500';
    } else if (lowerReview.includes('negative')) {
      colorClass = 'text-red-500';
      IconComponent = ThumbsDown;
    } else if (lowerReview.includes('mixed')) {
      colorClass = 'text-yellow-400';
      IconComponent = Meh;
    }
    return { IconComponent, colorClass, label: review };
  };

  const formatNumberAbbreviated = (num: number): string => {
    if (num >= 1000000) {
      const val = num / 1000000;
      return (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)) + 'M';
    } else if (num >= 1000) {
      const val = num / 1000;
      return (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)) + 'K';
    } else {
      return num.toLocaleString();
    }
  };

  const monthlyActivePlayers = game.monthlyActivePlayers ?? 0;
  const estimatedTotalUnitSold = game.estimatedTotalUnitSold ?? 0;

  let playerSalesInfo = '';
  if (estimatedTotalUnitSold > 0) {
    playerSalesInfo = `~ ${formatNumberAbbreviated(estimatedTotalUnitSold)} units sold`;
  } else if (monthlyActivePlayers > 0) {
    playerSalesInfo = `${formatNumberAbbreviated(monthlyActivePlayers)} active players`;
  }

  const steamPresentation = getSteamReviewPresentation(game.rating?.steamAllReview);
  let avatarBorderColorClass = 'border-neutral-700'; // Default border
  if (steamPresentation && steamPresentation.colorClass) {
    avatarBorderColorClass = steamPresentation.colorClass.replace('text-', 'border-');
  }

  const calculateAverageRating = (ratings: Record<string, number>) =>
    (Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / Object.values(ratings).length).toFixed(1);

  const ratingBlockColors = [
    'bg-red-500',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-lime-500',
    'bg-green-500',
  ];

  return (
    <div className="highlight-card">
      {/* Top Row */}
      <div className="flex items-center mb-3">
        <div className={`p-0.5 rounded-full mr-3 flex-shrink-0 border-2 ${avatarBorderColorClass}`}>
          <img
            src={game.images.thumbnail}
            alt={`${game.name} avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex-grow min-w-0">
          <h2 className="text-lg font-semibold truncate" title={game.name}>{game.name}</h2>
        </div>
        <div className="flex items-center text-yellow-400 ml-2 flex-shrink-0">
          <Star size={18} className="mr-1 fill-current" />
          <span className="text-md font-bold">{calculateAverageRating(game.rating.catalogRating)}</span>
        </div>
      </div>

      {/* Subtext Row */}
      <div className="flex items-center text-neutral-400 text-xs mb-3 space-x-2 truncate">
        <div className="flex items-center min-w-0">
          <Calendar size={12} className="mr-1 flex-shrink-0" />
          <span className="truncate" title={game.developer}>{game.developer}</span>
        </div>
        <span className="text-neutral-500">•</span>
        <div className="flex items-center min-w-0">
          <Gamepad2 size={12} className="mr-1 flex-shrink-0" />
          <span className="truncate" title={game.genre}>{game.genre}</span>
        </div>
      </div>

      {/* Media: Banner Image */}
      {game.images?.banner && (
        <div className="mb-3 aspect-[16/9] overflow-hidden rounded-md bg-neutral-800">
          <img
            src={game.images.banner}
            alt={`${game.name} banner`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {/* Featured Comments */}
      {game.featuredCommentTags.length > 0 && (
        <div className="highlight-card-section mb-4 h-20">
          <div className="flex flex-wrap gap-1.5 h-full overflow-hidden">
            {game.featuredCommentTags.map((comment: string, index: number) => (
              <span
                key={index}
                className="highlight-card-comment-tag"
                title={comment}
              >
                {comment}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Catalog Rating Section */}
      {game.rating.catalogRating && (
        <div className="highlight-card-section mb-4">
          <div className="space-y-2 text-sm">
            {Object.entries(game.rating.catalogRating).map(([category, rating]) => (
              <div key={category} className="flex items-center">
                <span className="w-20 capitalize text-neutral-400 flex-shrink-0">{category}</span>
                <div className="flex flex-grow gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 flex-1 rounded-sm ${i < rating ? ratingBlockColors[i] : 'bg-neutral-700'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Row */}
      <div className="highlight-card-footer">
        {/* Player/Sales Info */}
        {playerSalesInfo && (
          <div className="truncate" title={playerSalesInfo}>
            <p className="font-medium text-neutral-300 truncate">{playerSalesInfo}</p>
          </div>
        )}

        {/* Steam Review */}
        {steamPresentation && (
          <div className="flex items-center" title={`Steam: ${steamPresentation.label}`}>
            <steamPresentation.IconComponent className={`w-4 h-4 mr-1.5 flex-shrink-0 ${steamPresentation.colorClass}`} />
            <span className={`hidden xl:inline-block font-semibold truncate ${steamPresentation.colorClass} capitalize`}>{steamPresentation.label}</span>
          </div>
        )}

        {/* Metacritic Score */}
        {game.rating?.metacriticUserScore !== undefined && (
          <div title={`Metacritic Score: ${game.rating.metacriticUserScore}`}>
            <span className="hidden sm:inline-block mr-1">Metacritic: </span>
            <span className="font-semibold text-neutral-200">{game.rating.metacriticUserScore}</span>
          </div>
        )}
      </div>
    </div>
  );
};
