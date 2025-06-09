'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Gamepad2, Star } from 'lucide-react';
import { mockMonthlyBestGamesData } from '@/constants/mockGameData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';
import PaginationDots from '@/components/shared/PaginationDots';

const MonthlyBestGames = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const calculateAverageRating = (ratings: Record<string, number>) =>
    (Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / Object.values(ratings).length).toFixed(1);

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
            <CarouselContent>
              {mockMonthlyBestGamesData.map((game) => (
                <CarouselItem key={game.id}>
                  <Link href={`/games/${game.id}`} className="block">
                    <div className="game-card aspect-video relative">
                      <div className="absolute top-0 right-0 p-6 z-10">
                        <Bookmark size={24} className="text-white hover:text-yellow-400 cursor-pointer" fill="rgba(0,0,0,0.5)" />
                      </div>
                      <div className="absolute bottom-0 left-0 p-3 z-10">
                        <div className="flex items-center bg-black bg-opacity-50 px-2 py-1 text-white rounded">
                          <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={36}
                            height={36}
                          />
                          <span>Catalog Rating: {calculateAverageRating(game.rating.catalogRating)}</span>
                        </div>
                      </div>
                      {game.images && game.images.banner ? (
                        <Image
                          src={game.images.banner}
                          alt={game.id}
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
            totalItems={mockMonthlyBestGamesData.length}
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
              gridTemplateRows: `repeat(${mockMonthlyBestGamesData.length}, 1fr)`,
            }}
          >
            {mockMonthlyBestGamesData.map((game, index) => (
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
                    src={game.images.thumbnail}
                    alt={game.id}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h4 className="break-words text-sm font-medium hidden xl:block">{game.name}</h4>
                  <p className="truncate text-xs text-zinc-400">
                    {game.developer}
                  </p>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs">{calculateAverageRating(game.rating.catalogRating)}</span>
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

export default MonthlyBestGames;
