import React, { useCallback, useEffect, useState } from 'react';
import { useWindowResizer } from '@/hooks/useWindowResizer';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  EmptyState,
  ErrorState,
  LoadingState
} from '@/components/propertyState';
import HouseListingCard from '@/components/ui/house-listing-card';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';

// interface Location {
//   latitude: number;
//   longitude: number;
// }

interface PropertiesCarousel {
  title: string;
  staticMode?: boolean;
  headingId?: string;
}

export default function PropertiesCarousel({
  title,
  staticMode = false,
  headingId = 'location-houses-heading'
}: PropertiesCarousel) {
  const [houseListing, setHouseListing] = useState<HouseListing[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animationDirection, setAnimationDirection] = useState<
    'slideRight' | 'slideLeft'
  >('slideRight');

  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 1000);

  const { isLargeScreen } = useWindowResizer();

  // make api call
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const queryParams = new URLSearchParams();

      if (staticMode === false) {
        queryParams.set('search', debouncedSearch || '');
      }

      const url = `/api/fetch-listing?${queryParams.toString()}`;
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.statusText}`);
      }

      const {
        data: { data }
      } = await response.json();
      setHouseListing(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch properties';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, staticMode]);

  useEffect(() => {
    if (staticMode) {
      // Only fetch once on mount for static carousel
      void fetchProperties();
    } else {
      setLoading(false);
    }
  }, [staticMode, fetchProperties]);

  useEffect(() => {
    // Dynamic carousel: run search-only fetch when user types
    if (!staticMode && debouncedSearch) {
      setLoading(true);
      void fetchProperties();
    }
  }, [debouncedSearch, staticMode, fetchProperties]);

  const itemsPerPage = isLargeScreen ? 6 : 3;
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex + itemsPerPage >= houseListing.length;

  const handlePrev = () => {
    if (!isAtStart) {
      setAnimationDirection('slideLeft');
      setCurrentIndex((prev) => prev - itemsPerPage);
    }
  };

  const handleNext = () => {
    if (!isAtEnd) {
      setAnimationDirection('slideRight');
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  };

  const visibleHouses = houseListing.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const renderEmptyState = () => {
    if (!staticMode) {
      return !debouncedSearch ? (
        <></>
      ) : (
        <EmptyState message="No property in your current/search location" />
      );
    } else {
      return <EmptyState />;
    }
  };

  return loading ? (
    !staticMode && debouncedSearch ? (
      <LoadingState />
    ) : (
      <></>
    )
  ) : (
    <section
      className="max-w-[1440px] py-10 lg:py-20 mx-auto px-5 md:px-10 lg:px-20 "
      aria-labelledby={headingId}
    >
      <div className="flex items-center w-full">
        <h2
          id={headingId}
          className="first-letter:capitalize font-semibold md:text-[1.5rem] text-[#7065F0]"
        >
          {title}
        </h2>
        <div className="flex items-center space-x-10 ml-auto">
          <button
            onClick={handlePrev}
            disabled={isAtStart}
            aria-label="Previous houses"
            className={cn(
              'rounded-full bg-[#ffffff] shadow-md shadow-black/40 p-2 flex items-center justify-center cursor-pointer transition-transform duration-300',
              !isAtStart && 'hover:shadow-sm',
              isAtStart && 'opacity-50 cursor-not-allowed'
            )}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={handleNext}
            disabled={isAtEnd}
            aria-label="Next houses"
            className={cn(
              'rounded-full bg-[#ffffff] shadow-md shadow-black/40 p-2 flex items-center justify-center cursor-pointer transition-transform duration-300',
              !isAtEnd && ' hover:shadow-sm',
              isAtEnd && 'opacity-50 cursor-not-allowed'
            )}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {!staticMode && (
        <div className="flex mt-4 items-center justify-center ">
          <div className="space-y-2 w-full max-w-md">
            <Input
              disabled={loading}
              placeholder="Enter location to search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-3xl p-6 md:mt-2"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center">
        {error ? (
          <ErrorState message={error} onRetry={fetchProperties} />
        ) : visibleHouses.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="mt-5 grid sm:grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-6 p-2">
            {visibleHouses.map((house, index) => (
              <div
                key={house.id}
                className={cn(
                  'transition-transform duration-500 ease-in-out transform hover:scale-[1.01] border border-[#00092926] rounded-lg shadow-md',
                  `animate-${animationDirection}`
                )}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <HouseListingCard
                  id={house.id}
                  name={house.name}
                  address={house.address}
                  mainImage={house.mainImage}
                  beds={house.beds}
                  bathrooms={house.bathrooms}
                  landSize={house.landSize}
                  price={house.price}
                  popular={house.popular}
                  description={house.description}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {(visibleHouses.length > 0 || !loading) && (
        <Link
          href="/property-listing"
          aria-label="View more listings"
          className={cn(
            'flex items-center justify-center text-white bg-black hover:bg-opacity-85 transition-colors duration-100 ease-in-out px-6 py-3 h-[72px] text-xl mt-10 w-[299px] mx-auto capitalize rounded-[40px]'
          )}
        >
          View more <ArrowRight size={32} className="h-8 w-8" />
        </Link>
      )}
    </section>
  );
}
