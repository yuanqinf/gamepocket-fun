export interface TrendingGame {
  id: string;
  title: string;
  developer: string;
  category: string;
  rating: number;
  price: number;
  discount?: number;
  imageUrl: string;
}

export const TRENDING_GAMES: TrendingGame[] = [
  {
    id: 'game-1',
    title: 'Elden Ring',
    developer: 'FromSoftware',
    category: 'Action RPG',
    rating: 4.9,
    price: 59.99,
    discount: 15,
    imageUrl:
      'https://images.steamusercontent.com/ugc/2058741034012526512/379E6434B473E7BE31C50525EB946D4212A8C8B3/',
  },
  {
    id: 'game-2',
    title: 'Starfield',
    developer: 'Bethesda',
    category: 'RPG',
    rating: 4.5,
    price: 69.99,
    imageUrl:
      'https://i.redd.it/more-4k-8k-starfield-wallpapers-link-in-comments-v0-pfisbuzgufjb1.jpg?width=1920&format=pjpg&auto=webp&s=ed3190666cca0eda9d8f85aafc5ef747ca330219',
  },
  {
    id: 'game-3',
    title: "Baldur's Gate 3",
    developer: 'Larian Studios',
    category: 'RPG',
    rating: 4.8,
    price: 59.99,
    discount: 10,
    imageUrl:
      'https://preview.redd.it/baldurs-gate-3-wallpaper-3440x1440-5120x1440-v0-a7eos4ir1jcb1.jpeg?width=3840&format=pjpg&auto=webp&s=b86e744bcb682b38023a9448de420bdf4e870965',
  },
  {
    id: 'game-4',
    title: 'Cyberpunk 2077',
    developer: 'CD Projekt Red',
    category: 'Action RPG',
    rating: 4.2,
    price: 39.99,
    discount: 33,
    imageUrl:
      'https://wallpapercat.com/w/full/d/d/1/2630-3840x2160-desktop-4k-cyberpunk-2077-background-image.jpg',
  },
  {
    id: 'game-5',
    title: 'Hogwarts Legacy',
    developer: 'Avalanche',
    category: 'Action RPG',
    rating: 4.6,
    price: 49.99,
    imageUrl:
      'https://preview.redd.it/hogwarts-legacy-dark-edition-official-pc-wallpaper-v0-potn7vwaxyj91.png?auto=webp&s=2be2adcb6fd6bddf87ec8f4ea55628a3631df1e0',
  },
];
