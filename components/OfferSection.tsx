import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

export default function OfferSection() {
  return (
    <section
      id="offer"
      aria-label="Offer secion"
      className=" w-full bg-[#7065F0] pt-10 mt-40 max-h-[701px]"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 overflow-hidden relative h-auto">
        {/* right section */}
        <article className="text-[#f1f1f1] w-full max-w-[905px] mr-20">
          <p className="text-[2rem] md:text-[3rem] font-[500] md:leading-[67.2px] uppercase">
            EXPERIENCE LUXURY AT HALF THE PRICE!
          </p>
          <p className="text-[1.3rem] md:text-[2.8rem] font-[900] bg-[#f1f1f1] text-[#7065f0] py-2 px-4 rounded-3xl md:leading-[67.2px] w-full uppercase my-5">
            50% OFF PREMIUM RENTALS
          </p>
          <p className="text-[1.5rem] md:text-[3rem] font-[500] md:leading-[67.2px] uppercase">
            EXCLUSIVELY FOR PREMIUM SUBSCRIBERS
          </p>
          <p className="text-[1.3rem] font-[400] leading-[33.6px] first-letter:capitalize my-10">
            This limited-time offer wont last!{' '}
            <span className="md:inline-block">
              Book now to secure your dream home.
            </span>
          </p>
          <Button
            variant={'outline'}
            className="border-[#f1f1f1] mb-10 rounded-[40px] h-[74px] w-full md:w-[291px] text-[1.75rem] font-normal text-[#f1f1f1] hover:text-[#f1f1f1]/80 transition-colors duration-100 ease-in-out"
          >
            See offer details
          </Button>
        </article>
        {/* left section */}
        <div className="hidden lg:block absolute -bottom-[20%] -right-[40%] w-[1300px] h-full">
          <Image
            src="/offerHouse_1795x1197.png"
            alt="Image of a beautiful house"
            width={1795}
            height={1197}
            loading="lazy"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1795px"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
