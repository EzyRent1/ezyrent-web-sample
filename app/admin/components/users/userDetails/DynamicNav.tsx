'use client';

import { useState } from 'react';

interface DetailNavProps {
  currentState: (state: NavState) => void;
}

export type NavState = 'overview' | 'assigned' | 'inspection';

export const DetailNav = ({ currentState }: DetailNavProps) => {
  const [navState, setNavState] = useState('overview');

  const handleStateChange = (state: NavState) => {
    setNavState(state);
    currentState(state);
  };
  return (
    <section className="flex  justify-between gap-2 md:gap-5 p-1 bg-[#F4F4F4] w-full">
      {(['overview', 'assigned', 'inspection'] as NavState[]).map(
        (state: NavState) => {
          const fullStateText = state.charAt(0).toUpperCase() + state.slice(1);
          return (
            <button
              className={`flex-1 text-center text-xs md:text-base p-2 ${navState === state ? 'font-bold bg-[#FFFFFF]' : 'text-[#999999] hover:text-black hover:font-bold'}`}
              onClick={() => handleStateChange(state)}
              key={state}
            >
              {fullStateText === 'Assigned'
                ? 'Assigned Properties'
                : fullStateText === 'Inspection'
                  ? 'Inspection History'
                  : 'Overview'}
            </button>
          );
        }
      )}
    </section>
  );
};
