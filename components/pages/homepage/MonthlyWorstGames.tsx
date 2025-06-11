'use client';

import { useState } from 'react';
import { mockMonthlyWorstGamesData, GameData } from '@/constants/mockGameData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';
import PaginationDots from '@/components/shared/PaginationDots';
import HighlightGameCard from '@/components/shared/HighlightGameCard';

const MonthlyWorstGames = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold">Shame of the Month</h2>
      {/* Desktop Grid View */}
      <div className="hidden gap-4 md:grid md:grid-cols-3">
        {mockMonthlyWorstGamesData.map((game: GameData) => (
          <HighlightGameCard
            key={game.id}
            game={game}
          />
        ))}
      </div>

      {/* Mobile Carousel View */}
      <div className="md:hidden">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
          setApi={(api) => {
            setCarouselApi(api);
            if (api) {
              api.on('select', () => {
                if (api) {
                  const selectedIndex = api.selectedScrollSnap();
                  setActiveIndex(selectedIndex);
                }
              });
            }
          }}
        >
          <CarouselContent>
            {mockMonthlyWorstGamesData.map((game: GameData) => (
              <CarouselItem
                key={game.id}
                className="pr-4 pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <HighlightGameCard
                  game={game}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Mobile pagination dots */}
        <PaginationDots
          totalItems={mockMonthlyWorstGamesData.length}
          activeIndex={activeIndex}
          carouselApi={carouselApi}
        />
      </div>
    </section>
  );
};

export default MonthlyWorstGames;
