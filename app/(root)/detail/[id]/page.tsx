import React from 'react';
import { notFound } from 'next/navigation';

import {
  mockMonthlyBestGamesData,
  mockMonthlyWorstGamesData,
  mockUpcomingGamesData,
} from '@/constants/mock-game-data';
import GameDetail from '@/components/pages/game-detail-page/game-detail';

const GameDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = React.use(params);
  const allGames = [
    ...mockMonthlyBestGamesData,
    ...mockMonthlyWorstGamesData,
    ...mockUpcomingGamesData,
  ];
  const game = allGames.find((g) => g.id === resolvedParams.id);

  if (!game) {
    notFound();
  }

  return <GameDetail game={game} />;
};

export default GameDetailPage;
