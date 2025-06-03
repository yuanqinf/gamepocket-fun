'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Gamepad2, Star } from 'lucide-react';
import { TRENDING_GAMES } from '@/constants/mockTrendingGames';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import PaginationDots from '@/components/shared/PaginationDots';

const BestGames = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll the active thumbnail into view when activeIndex changes
  useEffect(() => {
    if (thumbnailRefs.current[activeIndex]) {
      thumbnailRefs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  return (
    <section className="relative mb-12">
      <h2 className="mb-6 text-2xl font-bold">Games of the Month</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Main Carousel - Takes 3/4 of the width on large screens */}
        <div className="relative lg:col-span-3">
          <Carousel
            opts={{
              loop: true,
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
            <div className="hidden md:block">
              <CarouselPrevious
                className="absolute top-1/2 left-2 z-10 h-10 w-10 -translate-y-1/2 border-none bg-black/50 text-white hover:bg-black/70"
                variant="outline"
              />
              <CarouselNext
                className="absolute top-1/2 right-2 z-10 h-10 w-10 -translate-y-1/2 border-none bg-black/50 text-white hover:bg-black/70"
                variant="outline"
              />
            </div>
            <CarouselContent>
              {TRENDING_GAMES.map((game) => (
                <CarouselItem key={game.id}>
                  <Link href={`/games/${game.id}`} className="block">
                    <div className="game-card aspect-video">
                      {game.imageUrl ? (
                        <Image
                          src={game.imageUrl}
                          alt={game.title}
                          width={1920}
                          height={1080}
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex-center h-full w-full">
                          <Gamepad2 size={60} className="text-zinc-500" />
                        </div>
                      )}
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Mobile pagination dots */}
          <PaginationDots
            totalItems={TRENDING_GAMES.length}
            activeIndex={activeIndex}
            carouselApi={carouselApi}
            className="lg:hidden"
          />
        </div>

        {/* Right Sidebar - Takes 1/4 of the width on large screens */}
        <div className="hidden h-full rounded-lg bg-zinc-800 p-4 lg:block">
          <div
            className="grid h-full gap-3"
            style={{
              gridTemplateRows: `repeat(${TRENDING_GAMES.length}, 1fr)`,
            }}
          >
            {TRENDING_GAMES.map((game, index) => (
              <div
                key={`thumb-${game.id}`}
                ref={(el) => {
                  thumbnailRefs.current[index] = el;
                }}
                className={`flex cursor-pointer items-center gap-3 rounded-md p-2 transition-all ${activeIndex === index ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'}`}
                onClick={() => {
                  setActiveIndex(index);
                  carouselApi?.scrollTo(index);
                }}
              >
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={'https://placehold.co/600x600/png'}
                    alt={game.title}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-grow">
                  <h4 className="truncate text-sm font-medium">{game.title}</h4>
                  <p className="truncate text-xs text-zinc-400">
                    {game.developer}
                  </p>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs">{game.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestGames;
