import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function GetStarted() {
  return (
    <section
      id="Get-started"
      className="my-20 py-5 md:max-h-[701px] bg-[#7065F0] text-[#f1f1f1] md:rounded-[40px]  md:mx-20"
    >
      <div className="max-w-[699px] mx-auto text-left md:text-center flex flex-col justify-between mb-8 px-4">
        <p className="  font-semibold text-[2.1rem] md:text-4xl mb-10 md:leading-[60px]">
          Ready to buy or rent your dream property?
        </p>
        <p className="text-[1.3rem] md:text-[2rem] text-center py-3 md:py-0 font-[900] bg-[#f1f1f1] text-[#7065f0] rounded-2xl md:rounded-3xl  md:leading-[67.2px] uppercase my-5">
          Easy!
        </p>
        <p className=" text-[1rem] md:text-2xl first-letter:capitalize">
          Download the app on google Play Store or Apple Store to get amazing
          deals
        </p>
      </div>
      <div className="my-10 w-[299px] mx-auto rounded-[40px]">
        <Link href={'/download'}>
          <Button
            aria-label="Get Started with App"
            className={cn(
              'h-[72px] text-xl capitalize w-full rounded-[40px] border-2 bg-[#7065F0] border-[#f1f1f1] text-[#f1f1f1] hover:text-[#f1f1f1]/80 transition-colors duration-100 ease-in-out'
            )}
          >
            Get Started <ArrowRight size={32} className="h-8 w-8" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
