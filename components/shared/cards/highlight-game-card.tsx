import Image from 'next/image';
import { GameData } from '@/constants/mock-game-data';
import { Star, Ghost, Gamepad2, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import {
  TAILWIND_TEXT_COLORS,
  TAILWIND_BORDER_COLORS,
  RATING_BLOCK_COLORS,
  EMPTY_BLOCK_COLOR,
} from '@/constants/colors';
import styled from 'styled-components';

const RatingBlock = styled.div<{
  $fillColor: string;
  $bgColor: string;
  $fillPercent: number;
}>`
  background: ${(props) =>
    props.$fillPercent === 100
      ? props.$fillColor
      : props.$fillPercent === 0
        ? props.$bgColor
        : `linear-gradient(to right, ${props.$fillColor} ${props.$fillPercent}%, ${props.$bgColor} ${props.$fillPercent}%)`};
  height: 0.75rem;
  flex: 1;
  border-radius: 0.125rem;
`;

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
    let colorClass: string = TAILWIND_TEXT_COLORS.neutral;

    if (lowerReview.includes('positive')) {
      colorClass = TAILWIND_TEXT_COLORS.positive;
    } else if (lowerReview.includes('negative')) {
      colorClass = TAILWIND_TEXT_COLORS.negative;
      IconComponent = ThumbsDown;
    } else if (lowerReview.includes('mixed')) {
      colorClass = TAILWIND_TEXT_COLORS.mixed;
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

  const player_count = game.player_count ?? 0;

  let playerSalesInfo = '';
  if (player_count > 0) {
    playerSalesInfo = `~ ${formatNumberAbbreviated(player_count)} units sold`;
  }

  const steamPresentation = getSteamReviewPresentation(game.steam_all_review);
  let avatarBorderColorClass: string = TAILWIND_BORDER_COLORS.neutral; // Default border
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
    const fillColor = RATING_BLOCK_COLORS[blockIndex] || EMPTY_BLOCK_COLOR;
    const bgColor = EMPTY_BLOCK_COLOR; // Empty/unfilled portion color

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

    return { fillColor, bgColor, fillPercent };
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
              className="rounded-full object-cover"
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
            {calculateAverageRating(game.catalog_rating)}
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
              className="object-cover"
            />
          </div>
        </div>
      )}
      {/* Featured Comments */}
      {game.featured_comment_tags.length > 0 && (
        <div className="highlight-card-section mb-4">
          <div className="flex h-full flex-wrap gap-1.5 overflow-hidden">
            {game.featured_comment_tags.map(
              (comment: string, index: number) => (
                <span
                  key={index}
                  className="highlight-card-comment-tag"
                  title={comment}
                >
                  {comment}
                </span>
              ),
            )}
          </div>
        </div>
      )}

      {/* Catalog Rating Section */}
      {game.catalog_rating && (
        <div className="highlight-card-section mb-4">
          <div className="space-y-2 text-sm">
            {Object.entries(game.catalog_rating).map(([category, rating]) => (
              <div key={category} className="flex items-center">
                <span className="w-20 flex-shrink-0 text-neutral-400 capitalize">
                  {category}
                </span>
                <div className="flex flex-grow gap-1.5">
                  {[...Array(5)].map((_, i) => {
                    const { fillColor, bgColor, fillPercent } =
                      getBlockFillStyle(i, rating);
                    return (
                      <RatingBlock
                        key={i}
                        $fillColor={fillColor}
                        $bgColor={bgColor}
                        $fillPercent={fillPercent}
                      />
                    );
                  })}
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
        {game?.metacritic_user_score !== undefined && (
          <div title={`Metacritic Score: ${game.metacritic_user_score}`}>
            <span className="mr-1 hidden sm:inline-block">Metacritic: </span>
            <span className="font-semibold text-neutral-200">
              {game.metacritic_user_score}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
