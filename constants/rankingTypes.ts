import type { RankedGame } from './mockRankingData';

export type RankingType = RankedGame['rankingType'];

export const rankingTypes: { value: RankingType; label: string }[] = [
  { value: 'overall', label: 'Overall' },
  { value: 'story', label: 'Story' },
  { value: 'graphics', label: 'Graphics' },
  { value: 'gameplay', label: 'Gameplay' },
  { value: 'longevity', label: 'Longevity' },
  { value: 'music', label: 'Music' },
  { value: 'innovation', label: 'Innovation' },
];
