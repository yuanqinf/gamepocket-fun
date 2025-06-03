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
} from '@/components/ui/carousel';

const TrendingGames = () => {
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
      <h2 className="text-2xl font-bold mb-6">Trending Games</h2>

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
                        <Gamepad2 size={60} className="text-zinc-500" />
                      )}
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Pagination Dots */}
          <div className="pagination-dots-container">
            {TRENDING_GAMES.map((_, index) => (
              <button
                key={`dot-${index}`}
                className={`pagination-dot ${activeIndex === index ? 'pagination-dot-active' : 'pagination-dot-inactive'}`}
                onClick={() => {
                  setActiveIndex(index);
                  carouselApi?.scrollTo(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar - Takes 1/4 of the width on large screens */}
        <div className="hidden lg:block">
          <div className="bg-zinc-800 rounded-lg p-4 h-full">
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
                  className={`thumbnail-item ${activeIndex === index ? 'thumbnail-item-active' : 'thumbnail-item-inactive'}`}
                  onClick={() => {
                    setActiveIndex(index);
                    carouselApi?.scrollTo(index);
                  }}
                >
                  <div className="thumbnail-image-container w-12 h-12">
                    <Image
                      src={'https://placehold.co/600x600/png'}
                      alt={game.title}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {game.title}
                    </h4>
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
      </div>
    </section>
  );
};

export default TrendingGames;
