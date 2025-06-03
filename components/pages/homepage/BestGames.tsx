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
      <h2 className="text-2xl font-bold mb-6">Games of the Month</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Carousel - Takes 3/4 of the width on large screens */}
        <div className="lg:col-span-3 relative">
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
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 border-none text-white w-10 h-10"
                variant="outline"
              />
              <CarouselNext
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 border-none text-white w-10 h-10"
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
                        <div className="flex-center w-full h-full">
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
        <div className="hidden lg:block bg-zinc-800 rounded-lg p-4 h-full">
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
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all ${activeIndex === index ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'}`}
                onClick={() => {
                  setActiveIndex(index);
                  carouselApi?.scrollTo(index);
                }}
              >
                <div className="rounded-md overflow-hidden flex-shrink-0 w-12 h-12">
                  <Image
                    src={'https://placehold.co/600x600/png'}
                    alt={game.title}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <h4 className="font-medium text-sm truncate">{game.title}</h4>
                  <p className="text-xs text-zinc-400 truncate">
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
