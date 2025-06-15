// Central color constants for consistent styling
// Tailwind CSS class names for text colors
export const TAILWIND_TEXT_COLORS = {
  neutral: 'text-neutral-400',
  positive: 'text-green-500',
  negative: 'text-red-500',
  mixed: 'text-yellow-400',
} as const;

// Tailwind CSS class names for border colors
export const TAILWIND_BORDER_COLORS = {
  neutral: 'border-neutral-700',
} as const;

// Hex colors for rating block fills (index 0 → level-1 etc.)
export const RATING_BLOCK_COLORS: readonly string[] = [
  '#ef4444', // red-500
  '#fb923c', // orange-400
  '#facc15', // yellow-400
  '#84cc16', // lime-500
  '#22c55e', // green-500
];

export const EMPTY_BLOCK_COLOR = '#404040'; // neutral-700 hex
