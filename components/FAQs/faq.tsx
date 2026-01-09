'use client';

import { ChevronDown } from 'lucide-react';

export default function FAQWrapper({
  question,
  answer,
  isOpen,
  onClick
}: FAQWrapper) {
  return (
    <section>
      <div className="mx-auto space-y-6">
        <div
          onClick={onClick}
          className="space-y-5 bg-[#F5F5F5] rounded-[10px] py-3 px-2 cursor-pointer"
        >
          <div className="flex items-center">
            <button
              onClick={onClick}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-2 lg:py-5 text-left font-medium transition-colors hover:bg-muted/50 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75"
            >
              <p className="text-[#000929] font-[500] text-base md:text-[1.25rem] lg:text-[1.5rem] max-w-[80%] w-full">
                {question}
              </p>
              <ChevronDown
                className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
          {isOpen && (
            <div className="pl-10 pr-4 pb-4 text-muted-foreground">
              <p className="text-[#808080] text-sm md:text-base lg:text-[1.25rem] font-normal">
                {answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
