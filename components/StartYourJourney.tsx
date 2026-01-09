'use client';

import React, { useRef, useState } from 'react';
import { PauseCircle, PlayCircle } from 'lucide-react';

const StartYourJourney: React.FC = () => {
  // Initialize refs for each video
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null)
  ];

  const [isPlaying, setIsPlaying] = useState<boolean[]>(Array(4).fill(false));

  const togglePlay = (index: number) => {
    const newIsPlaying = [...isPlaying];
    const video = videoRefs[index].current;

    if (video) {
      if (video.paused) {
        video.play();
        newIsPlaying[index] = true;
      } else {
        video.pause();
        newIsPlaying[index] = false;
      }
      setIsPlaying(newIsPlaying);
    } else {
      // console.error(`Video reference at index ${index} is undefined`);
    }
  };

  return (
    <section
      id="Video-playlist"
      className="mt-10 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 "
    >
      {/* Video content */}
      <div className="my-10 w-full md:h-[496px] grid md:grid-cols-2 gap-5">
        <div className="relative rounded-lg w-full border h-[250px] md:h-full overflow-hidden">
          <video
            ref={videoRefs[0]}
            src="/video/house1.mp4"
            className="w-full h-full object-cover"
            loop
            muted
          />
          <button
            onClick={() => togglePlay(0)}
            className="absolute inset-0 grid place-items-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-40"
          >
            {isPlaying[0] ? (
              <PauseCircle stroke="#f3f3f3" size={60} />
            ) : (
              <PlayCircle stroke="#f3f3f3" size={60} />
            )}
          </button>
        </div>

        <div className="w-full h-full grid md:grid-cols-2 gap-5">
          <div className="relative rounded-lg w-full h-[250px] md:h-full overflow-hidden">
            <video
              ref={videoRefs[1]}
              src="/video/house2.mp4"
              className="w-full h-full object-cover"
              loop
              muted
            />
            <button
              onClick={() => togglePlay(1)}
              className="absolute inset-0 grid place-items-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-40"
            >
              {isPlaying[1] ? (
                <PauseCircle stroke="#f3f3f3" size={60} />
              ) : (
                <PlayCircle stroke="#f3f3f3" size={60} />
              )}
            </button>
          </div>
          {/* 3rd and 4th */}
          <div className="w-full h-full grid md:grid-rows-2 gap-5">
            {[2, 3].map((index) => (
              <div
                key={index}
                className="relative rounded-lg w-full h-[250px] md:h-full overflow-hidden"
              >
                <video
                  ref={videoRefs[index]}
                  src={`/video/house${index + 1}.mp4`}
                  className="w-full h-full object-cover"
                  loop
                  muted
                />
                <button
                  onClick={() => togglePlay(index)}
                  className="absolute inset-0 grid place-items-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-40"
                >
                  {isPlaying[index] ? (
                    <PauseCircle stroke="#f3f3f3" size={60} />
                  ) : (
                    <PlayCircle stroke="#f3f3f3" size={60} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* action btn */}
    </section>
  );
};

export default StartYourJourney;
