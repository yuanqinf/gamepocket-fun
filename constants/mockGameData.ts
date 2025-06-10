type CatalogRating = {
  story: 1 | 2 | 3 | 4 | 5;
  music: 1 | 2 | 3 | 4 | 5;
  graphics: 1 | 2 | 3 | 4 | 5;
  gameplay: 1 | 2 | 3 | 4 | 5;
  longevity: 1 | 2 | 3 | 4 | 5;
  innovation: 1 | 2 | 3 | 4 | 5;
}

type SteamReview =
  | "overwhelmingly positive"
  | "very positive"
  | "mostly positive"
  | "positive"
  | "mixed"
  | "mostly negative"
  | "very negative"
  | "overwhelmingly negative";

export interface GameData {
  id: string;
  name: string;
  description: string;
  genre: string;
  tags: string[];
  price: number;
  website: string;
  platforms: ('pc' | 'ps5' | 'xbox' | 'switch')[];
  developer: string;
  images: {
    banner: string;
    gameplay: string;
    thumbnail: string;
  };
  videos: string[];
  release_date: string;
  rating: {
    steamRecentReview?: SteamReview
    steamAllReview?: SteamReview
    metacriticUserScore?: number;
    catalogRating: CatalogRating;
  }
  featuredCommentTags: string[];
  monthlyActivePlayers?: number;
  estimatedTotalUnitSold?: number;
}

export const mockMonthlyBestGamesData: GameData[] = [
  {
    id: 'elden-ring',
    name: "ELDEN RING",
    description: "An Epic Drama Born from a Myth Created by George R.R. Martin",
    genre: "Action RPG",
    tags: ["Souls-like", "Open World", "Fantasy"],
    price: 59.99,
    website: "https://en.bandainamcoent.eu/elden-ring/elden-ring",
    platforms: ['pc', 'ps5', 'xbox'],
    developer: "FromSoftware",
    images: {
      banner: "https://preview.redd.it/znxzjlws0i471.jpg?width=1920&format=pjpg&auto=webp&s=2514f6dd7c16a0ed3aa0c93cd80b134cd8853178",
      thumbnail: "https://egy4gamers.com/storage/2024/07/Elden-Ring.jpg",
      gameplay: "https://www.godisageek.com/wp-content/uploads/Elden-Ring-combat.jpg"
    },
    videos: ["https://www.youtube.com/watch?v=E3Huy2cdih0"],
    release_date: "2022-02-25",
    rating: {
      steamRecentReview: "very positive",
      steamAllReview: "very positive",
      metacriticUserScore: 8.3, 
      catalogRating: { story: 5, music: 5, graphics: 5, gameplay: 4, longevity: 3, innovation: 5 },
    },
    featuredCommentTags: ["Best Souls-like", "Best Open World", "Best Fantasy"],
    monthlyActivePlayers: 1050000, 
    estimatedTotalUnitSold: 50000000,
  },
  {
    id: 'black-myth-wukong',
    name: "Black Myth: Wukong",
    description: "An action RPG rooted in Chinese mythology",
    genre: "Action RPG",
    tags: ["Chinese Mythology", "Souls-like", "Open World"],
    price: 59.99,
    website: "https://blackmythwukong.com/",
    platforms: ['pc', 'ps5', 'xbox'],
    developer: "Game Science",
    images: {
      banner: "https://cdn1.epicgames.com/spt-assets/ca9ef1bcf2f54043baac351366aec677/black-myth-wukong-jz9yr.jpg",
      thumbnail: "https://sm.ign.com/t/ign_ap/cover/b/black-myth/black-myth-wukong_fmws.600.jpg",
      gameplay: "https://www.gematsu.com/wp-content/uploads/2022/08/Black-Myth_08-19-22.jpg"
    },
    videos: ["https://www.youtube.com/watch?v=7gYaZgn2pW8"],
    release_date: "2024-08-20",
    rating: {
      steamRecentReview: "very positive",
      steamAllReview: "overwhelmingly positive",
      metacriticUserScore: 8.2, 
      catalogRating: { story: 5, music: 5, graphics: 5, gameplay: 4, longevity: 2, innovation: 3 },
    },
    featuredCommentTags: ["Most Anticipated", "Stunning Visuals", "Next-Gen Souls-like"],
    monthlyActivePlayers: 550000, 
    estimatedTotalUnitSold: 25000000,
  },
  {
    id: 'baldurs-gate-3',
    name: "BALDUR'S GATE 3",
    description: "A story-rich, party-based RPG set in the universe of Dungeons & Dragons,",
    genre: "RPG",
    tags: ["D&D", "Turn-based", "Story-Rich"],
    price: 59.99,
    website: "https://baldursgate3.game/",
    platforms: ['pc', 'ps5', 'xbox'],
    developer: "Larian Studios",
    images: {
      banner: "https://cdn.wccftech.com/wp-content/uploads/2023/08/Baldurs-Gate-3-header-1920x1080.jpg",
      thumbnail: "https://sm.ign.com/t/ign_ap/cover/b/baldurs-ga/baldurs-gate-iii_9c7e.600.jpg",
      gameplay: "https://cdn.mos.cms.futurecdn.net/oavWjqPpN87uaYrcASSgti.jpg"
    },
    videos: ["https://www.youtube.com/watch?v=zg0_ulgtRqA"],
    release_date: "2023-08-03",
    rating: {
      steamRecentReview: "overwhelmingly positive",
      steamAllReview: "overwhelmingly positive",
      metacriticUserScore: 9.2, 
      catalogRating: { story: 5, music: 3, graphics: 4, gameplay: 4, longevity: 4, innovation: 5 },
    },
    featuredCommentTags: ["Best RPG", "Masterclass in Storytelling", "Top Turn-Based Combat"],
    monthlyActivePlayers: 800000, 
    estimatedTotalUnitSold: 20000000,
  },
  {
    id: 'cyberpunk-2077',
    name: "CYBERPUNK 2077",
    description: "A storydriven, open world RPG of the dark future from CD PROJEKT RED",
    genre: "Action RPG",
    tags: ["Sci-Fi", "Open World", "Narrative"],
    price: 59.99,
    website: "https://www.cyberpunk.net/",
    platforms: ['pc', 'ps5', 'xbox'],
    developer: "CD Projekt Red",
    images: {
      banner: "https://wallpapercat.com/w/full/1/7/f/2618-1920x1080-desktop-1080p-cyberpunk-2077-background.jpg",
      thumbnail: "https://sm.ign.com/t/ign_ap/cover/c/cyberpunk-/cyberpunk-2077-ultimate-edition_t3xe.600.jpg",
      gameplay: "https://i0.wp.com/waytoomany.games/wp-content/uploads/2022/02/Cyberpunk-2077_20220216225610.jpg?ssl=1"
    },
    videos: ["https://www.youtube.com/watch?v=qIcTM8WXFjk"],
    release_date: "2020-12-10",
    rating: {
      steamRecentReview: "very positive",
      steamAllReview: "very positive",
      metacriticUserScore: 7.9, 
      catalogRating: { story: 5, music: 4, graphics: 5, gameplay: 4, longevity: 4, innovation: 3 },
    },
    featuredCommentTags: ["Best Comeback", "Immersive Sci-Fi", "Narrative Powerhouse"],
    monthlyActivePlayers: 350000, 
    estimatedTotalUnitSold: 32000000,
  },
  {
    id: 'the-legend-of-zelda-breath-of-the-wild',
    name: "The Legend of Zelda: Breath of the Wild",
    description: "A 2017 action-adventure game developed and published by Nintendo",
    genre: "Adventure",
    tags: ["Open World", "Exploration", "Fantasy"],
    price: 59.99,
    website: "https://www.zelda.com/breath-of-the-wild/",
    platforms: ['switch'],
    developer: "Nintendo",
    images: {
      banner: "https://zelda.nintendo.com/breath-of-the-wild/assets/media/wallpapers/desktop-1.jpg",
      thumbnail: "https://sm.ign.com/t/ign_pk/cover/t/the-legend/the-legend-of-zelda-breath-of-the-wild-nintendo-switch-2-edi_bf37.600.png",
      gameplay: "https://staticg.sportskeeda.com/editor/2023/05/34684-16838975002342-1920.jpg"
    },
    videos: ["https://www.youtube.com/watch?v=zw47_q9wbBE"],
    release_date: "2017-03-03",
    rating: {
      metacriticUserScore: 8.9, 
      catalogRating: { story: 5, music: 5, graphics: 5, gameplay: 5, longevity: 5, innovation: 5 },
    },
    featuredCommentTags: ["Game of the Decade", "Best Exploration", "Revolutionary Open World"],
    monthlyActivePlayers: 200000, 
    estimatedTotalUnitSold: 40000000,
  },
];

export const mockMonthlyWorstGamesData: GameData[] = [
  {
    id: 'concord',
    name: 'Concord',
    description: 'A PvP sci-fi shooter with vibrant characters and team-based gameplay.',
    genre: 'Multiplayer Shooter',
    tags: ['Sci-Fi', 'PvP', 'Team-Based'],
    price: 59.99,
    website: 'https://www.playstation.com/en-us/games/concord/',
    platforms: ['pc', 'ps5'],
    developer: 'Firewalk Studios',
    images: {
      banner: 'https://blog.playstation.com/tachyon/2024/05/b06a8cc47aebcaeaff8cf93d58435221e8b1b616.jpg',
      gameplay: 'https://images.alphacoders.com/137/thumb-1920-1370133.jpeg',
      thumbnail: 'https://sm.ign.com/t/ign_nordic/cover/f/firewalk-s/firewalk-studios-probablymonsters-project_q9ua.600.jpg',
    },
    videos: ['https://www.youtube.com/watch?v=UroOs1dAq3k'],
    release_date: '2024-08-23',
    rating: {
      metacriticUserScore: 1.7, 
      catalogRating: { story: 1, music: 2, graphics: 2, gameplay: 1, longevity: 1, innovation: 1 },
    },
    featuredCommentTags: [
      'Overwatch Clone', 'Overpriced', 'Woke Criticism', 'Outdated Gameplay'
    ],
    monthlyActivePlayers: 0,
    estimatedTotalUnitSold: 0,
  },
  {
    id: 'dragon-age-the-veilguard',
    name: 'Dragon Age: The Veilguard',
    description: 'The next chapter in the Dragon Age franchise with new heroes and darker threats.',
    genre: 'Action RPG',
    tags: ['Fantasy', 'Story Rich', 'Choices Matter'],
    price: 69.99,
    website: 'https://www.ea.com/games/dragon-age/dragon-age-the-veilguard',
    platforms: ['pc', 'ps5', 'xbox'],
    developer: 'BioWare',
    images: {
      banner: 'https://4kwallpapers.com/images/wallpapers/dragon-age-the-2560x1440-18445.jpg',
      gameplay: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/10/dragon-age-veilguard-combat.jpg',
      thumbnail: 'https://sm.ign.com/t/ign_mear/cover/d/dragon-age/dragon-age-the-veilguard_yngr.600.jpg',
    },
    videos: ['https://www.youtube.com/watch?v=dZq1B3z1t2Y'],
    release_date: '2024-12-10',
    rating: {
      steamRecentReview: 'mixed',
      steamAllReview: 'mixed',
      metacriticUserScore: 3.9, 
      catalogRating: {
        story: 1,
        music: 2,
        graphics: 3,
        gameplay: 1,
        longevity: 2,
        innovation: 1,
      },
    },
    featuredCommentTags: [
      'Corporate/Soulless Design',
      'Shallow Gameplay',
      'Button-Mashing Combat',
      'Forced Political Correctness',
    ],
    monthlyActivePlayers: 1000,
    estimatedTotalUnitSold: 2000000,
  },
  {
    id: "overwatch-2",
    name: "Overwatch 2",
    description: "A free-to-play, team-based action game set in the optimistic future, where every match is the ultimate 5v5 battlefield brawl.",
    genre: "FPS",
    tags: [
      "Team-Based",
      "Hero Shooter",
      "Multiplayer"
    ],
    price: 0.0,
    website: "https://overwatch.blizzard.com/",
    platforms: [
      "pc",
      "ps5",
      "xbox",
      "switch"
    ],
    developer: "Blizzard Entertainment",
    images: {
      banner: "https://images7.alphacoders.com/124/1249649.png",
      gameplay: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL71Iq7E9Ic8EWxi06imbS-KS6fD7f241-Ag&s",
      thumbnail: "https://images.nintendolife.com/1558f6cd6d6fe/overwatch-2-cover.cover_large.jpg"
    },
    videos: [
      "https://www.youtube.com/watch?v=dqPB3cJpA9k"
    ],
    release_date: "2022-10-04",
    rating: {
      steamRecentReview:"mixed",
      steamAllReview: "overwhelmingly negative",
      metacriticUserScore: 1.8,
      catalogRating: {
        story: 1,
        music: 2,
        graphics: 2,
        gameplay: 1,
        longevity: 3,
        innovation: 1
      }
    },
    featuredCommentTags: [
      "Overpromised and Underdelivered",
      "Poor Sequel Execution",
      "Cash Grab",
      "Embarrassing Reputation Damage"
    ],
    monthlyActivePlayers: 20000,
    estimatedTotalUnitSold: 25000000
  },
];