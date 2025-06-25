// Suggestion item types
export type SuggestionItem = {
  text: string;
  tag?: string;
};
// Hard coded suggestions
export const RECENT_ITEMS: SuggestionItem[] = [
  { text: 'Roblox', tag: 'Global' },
];
export const TRENDING_ITEMS: SuggestionItem[] = [
  { text: 'Fortnite' },
  { text: 'Call of Duty: Warzone Mobile' },
  { text: 'Remnant 2' },
];
