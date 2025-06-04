import { Gamepad2 } from 'lucide-react';
import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import PaginationDots from '@/components/shared/PaginationDots';

const UpcomingGames = () => {
  const upcomingGamesData = Array(8).fill(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Coming Soon...</h2>
      <Carousel
        setApi={(apiInstance) => {
          setCarouselApi(apiInstance);
          if (apiInstance) {
            apiInstance.on('select', () => {
              if (apiInstance) {
                setActiveIndex(apiInstance.selectedScrollSnap());
              }
            });
            // Set initial activeIndex
            setActiveIndex(apiInstance.selectedScrollSnap());
          }
        }}
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {upcomingGamesData.map((_, i) => (
            <CarouselItem
              key={`upcoming-${i}`}
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <div className="flex h-64 flex-col rounded-lg bg-zinc-800 p-4">
                  <div className="flex-center mb-2 flex h-40 flex-grow rounded bg-zinc-700">
                    <Gamepad2 size={40} className="text-zinc-500" />
                  </div>
                  <h3 className="mt-auto truncate font-medium">
                    Upcoming Game {i + 1}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Release: Q{(i % 4) + 1} 2025
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="carousel-nav-button-base left-4" />
        <CarouselNext className="carousel-nav-button-base right-4" />
      </Carousel>
      <div className="flex-center mt-4 sm:hidden">
        <PaginationDots
          totalItems={upcomingGamesData.length}
          activeIndex={activeIndex} // Already 0-indexed
          carouselApi={carouselApi}
        />
      </div>
    </section>
  );
};

export default UpcomingGames;
