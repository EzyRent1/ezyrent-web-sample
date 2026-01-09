'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/carousel/carousel';
import { Button } from '@/components/ui/button';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { carouselContent } from '@/config/carousel';

export default function AboutUsCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      intervalId = setInterval(() => {
        api?.scrollNext();
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [api, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="App-features" className="py-12 bg-gray-100">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20  flex-1">
        <h3 className="text-center mb-4 text-[#7065F0] font-semibold text-[2.1rem] md:text-5xl md:leading-[67.2px] ">
          App Only Features
        </h3>
        <Carousel
          setApi={setApi}
          className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg"
        >
          <CarouselContent>
            {carouselContent.map((item, index) => (
              <CarouselItem className="" key={index}>
                <Card className="border-[#7065F0] py-12 px-6 md:py-4 bg-white">
                  <CardContent className="flex flex-col items-center    justify-center p-6 h-[200px]">
                    <div className="border rounded-full shadow-sm p-3 bg-[#e9e8f0]">
                      <item.icon className="w-12 h-12 text-[#7065F0]" />
                    </div>
                    <h4 className="text-lg md:text-2xl text-[#7065F0] font-semibold mb-2">
                      {item.title}
                    </h4>
                    <p className="md:text-center text-justify text-[#000929] font-semibold">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center mt-4 gap-0 md:gap-4">
            <CarouselPrevious className=" border-0 hidden md:block" />
            <Button
              variant="outline"
              size="icon"
              className="  w-6 h-6 md:h-8 md:w-8 border bg-[#ffffff] border-[#7065F0]"
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <PauseIcon className="h-4 w-4 text-[#7065F0]" />
              ) : (
                <PlayIcon className="h-4 w-4 text-[#7065F0] font-bold" />
              )}
            </Button>
            <CarouselNext className=" border-0 hidden md:block " />
          </div>
          <div className="py-2 text-center text-[#000929]  text-sm text-muted-foreground">
            Slide {current} of {count}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
