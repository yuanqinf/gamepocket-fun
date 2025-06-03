export interface WorstGame {
  id: number;
  title: string;
  rating: number;
  issues: string;
  imageUrl: string;
}

export const WORST_GAMES: WorstGame[] = [
  {
    id: 1,
    title: 'Concord',
    rating: 1.5,
    issues: 'Performance problems, bugs, poor gameplay mechanics',
    imageUrl:
      'https://4kwallpapers.com/images/wallpapers/concord-2024-games-1920x1080-17049.jpg',
  },
  {
    id: 2,
    title: 'Dragon Age: The Veilguard',
    rating: 1.0,
    issues: 'Broken controls, bad graphics, repetitive missions',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBiJc6FylZW1Ww_NrzOcHNOkf5f05gUFO0Wg&s',
  },
  {
    id: 3,
    title: 'Star wars outlaws',
    rating: 0.5,
    issues: 'Unplayable, crashes frequently, terrible story',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1u6cw8KuuI39lN5j0GoqtOnKClLJMSREe1g&s',
  },
];
