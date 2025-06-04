'use client';

import { useState } from 'react';
import { WORST_GAMES } from '@/constants/mockWorstGames';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';
import PaginationDots from '@/components/shared/PaginationDots';
import MediumGameCard from '@/components/shared/MediumGameCard';

const WorstGames = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold">Shame of the Month</h2>
      {/* Desktop Grid View */}
      <div className="hidden gap-4 md:grid md:grid-cols-3">
        {WORST_GAMES.map((game, index) => (
          <MediumGameCard
            key={game.id}
            game={game}
            index={index}
            ratingValue={game.rating}
            issuesValue={game.issues}
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
            {WORST_GAMES.map((game, index) => (
              <CarouselItem
                key={game.id}
                className="pr-4 pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <MediumGameCard
                  game={game}
                  index={index}
                  ratingValue={game.rating}
                  issuesValue={game.issues}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Mobile pagination dots */}
        <PaginationDots
          totalItems={WORST_GAMES.length}
          activeIndex={activeIndex}
          carouselApi={carouselApi}
        />
      </div>
    </section>
  );
};

export default WorstGames;
