'use client';
import Image from 'next/image';
import { GameData } from '@/constants/mockGameData';
import { Star, Ghost, Gamepad2, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';

type SteamReviewPresentation = {
  IconComponent: React.ElementType;
  colorClass: string;
  label: string;
};

export default function HighlightGameCard({ game }: { game: GameData }) {
  const getSteamReviewPresentation = (
    review?: string,
  ): SteamReviewPresentation | null => {
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

  const steamPresentation = getSteamReviewPresentation(
    game.rating?.steamAllReview,
  );
  let avatarBorderColorClass = 'border-neutral-700'; // Default border
  if (steamPresentation && steamPresentation.colorClass) {
    avatarBorderColorClass = steamPresentation.colorClass.replace(
      'text-',
      'border-',
    );
  }

  /**
   * Calculates the average rating from a record of category ratings
   * @param ratings - Object containing rating categories and their values
   * @returns The average rating as a string with one decimal place
   */
  const calculateAverageRating = (ratings: Record<string, number>) => {
    const values = Object.values(ratings);
    if (values.length === 0) return '0.0';

    const sum = values.reduce((total, rating) => total + rating, 0);
    const average = sum / values.length;
    return average.toFixed(1);
  };

  // Define the color scale for rating blocks (1-5) using hex values directly
  const ratingColors = [
    '#ef4444', // Rating level 1 (red-500)
    '#fb923c', // Rating level 2 (orange-400)
    '#facc15', // Rating level 3 (yellow-400)
    '#84cc16', // Rating level 4 (lime-500)
    '#22c55e', // Rating level 5 (green-500)
  ];

  // Background color for empty rating blocks
  const emptyBlockColor = '#404040'; // neutral-700

  /**
   * Generates the appropriate style object for a rating block based on the rating value
   * @param blockIndex - The index of the block (0-4, representing rating levels 1-5)
   * @param categoryRating - The actual rating value (can be a float like 3.5)
   * @returns A React inline style object with the appropriate background color or gradient
   */
  const getBlockFillStyle = (blockIndex: number, categoryRating: number) => {
    const fullValue = Math.floor(categoryRating);
    const fractionalPart = categoryRating - fullValue;

    // Get the appropriate colors for this block
    const fillColor = ratingColors[blockIndex] || emptyBlockColor;
    const bgColor = emptyBlockColor; // Empty/unfilled portion color

    // Calculate how much of this block should be filled (0-100%)
    let fillPercent = 0;
    if (blockIndex < fullValue) {
      // Blocks before the current rating level are completely filled
      fillPercent = 100;
    } else if (blockIndex === fullValue) {
      // The current level block is partially filled based on the decimal part
      fillPercent = Math.round(fractionalPart * 100);
    }
    // Blocks after the current level remain at 0% fill

    // Return the appropriate style based on fill percentage
    if (fillPercent === 100) {
      // Fully filled block
      return { backgroundColor: fillColor };
    } else if (fillPercent === 0) {
      // Empty block
      return { backgroundColor: bgColor };
    } else {
      // Partially filled block - use a gradient
      return {
        background: `linear-gradient(to right, ${fillColor} ${fillPercent}%, ${bgColor} ${fillPercent}%)`,
      };
    }
  };

  return (
    <div className="highlight-card">
      {/* Top Row */}
      <div className="mb-3 flex items-center">
        <div
          className={`mr-3 flex-shrink-0 rounded-full border-2 p-0.5 ${avatarBorderColorClass}`}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={game.images.thumbnail}
              alt={`${game.name} avatar`}
              fill
              sizes="40px"
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="min-w-0 flex-grow">
          <h2 className="truncate text-lg font-semibold" title={game.name}>
            {game.name}
          </h2>
        </div>
        <div className="ml-2 flex flex-shrink-0 items-center text-yellow-400">
          <Star size={18} className="mr-1 fill-current" />
          <span className="text-md font-bold">
            {calculateAverageRating(game.rating.catalogRating)}
          </span>
        </div>
      </div>

      {/* Subtext Row */}
      <div className="mb-3 flex items-center space-x-2 truncate text-xs text-neutral-400">
        <div className="flex min-w-0 items-center">
          <Ghost size={12} className="mr-1 flex-shrink-0" />
          <span className="truncate" title={game.developer}>
            {game.developer}
          </span>
        </div>
        <span className="text-neutral-500">•</span>
        <div className="flex min-w-0 items-center">
          <Gamepad2 size={12} className="mr-1 flex-shrink-0" />
          <span className="truncate" title={game.genre}>
            {game.genre}
          </span>
        </div>
      </div>

      {/* Media: Banner Image */}
      {game.images?.banner && (
        <div className="mb-3 aspect-[16/9] overflow-hidden rounded-md bg-neutral-800">
          <div className="relative h-full w-full">
            <Image
              src={game.images.banner}
              alt={`${game.name} banner`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      )}
      {/* Featured Comments */}
      {game.featuredCommentTags.length > 0 && (
        <div className="highlight-card-section mb-4 h-20">
          <div className="flex h-full flex-wrap gap-1.5 overflow-hidden">
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
            {Object.entries(game.rating.catalogRating).map(
              ([category, rating]) => (
                <div key={category} className="flex items-center">
                  <span className="w-20 flex-shrink-0 text-neutral-400 capitalize">
                    {category}
                  </span>
                  <div className="flex flex-grow gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-3 flex-1 rounded-sm"
                        style={getBlockFillStyle(i, rating)}
                      />
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}

      {/* Footer Row */}
      <div className="highlight-card-footer">
        {/* Player/Sales Info */}
        {playerSalesInfo && (
          <div className="truncate" title={playerSalesInfo}>
            <p className="truncate font-medium text-neutral-300">
              {playerSalesInfo}
            </p>
          </div>
        )}

        {/* Steam Review */}
        {steamPresentation && (
          <div
            className="flex items-center"
            title={`Steam: ${steamPresentation.label}`}
          >
            <steamPresentation.IconComponent
              className={`mr-1.5 h-4 w-4 flex-shrink-0 ${steamPresentation.colorClass}`}
            />
            <span
              className={`hidden truncate font-semibold xl:inline-block ${steamPresentation.colorClass} capitalize`}
            >
              {steamPresentation.label}
            </span>
          </div>
        )}

        {/* Metacritic Score */}
        {game.rating?.metacriticUserScore !== undefined && (
          <div title={`Metacritic Score: ${game.rating.metacriticUserScore}`}>
            <span className="mr-1 hidden sm:inline-block">Metacritic: </span>
            <span className="font-semibold text-neutral-200">
              {game.rating.metacriticUserScore}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
