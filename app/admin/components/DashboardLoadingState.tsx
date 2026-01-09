import { LoadingSkeleton } from './LoadingSkeleton';

interface DashboardLoadingStateProps {
  grid1Cols?: number;
  grid2Cols?: number;
}

export const DashboardLoadingState = ({
  grid1Cols,
  grid2Cols
}: DashboardLoadingStateProps) => {
  return (
    <div className="flex flex-col gap-3 px-4 md:px-10 py-5">
      <div
        className={`grid w-full grid-cols-2 bg-white p-5 md:grid-cols-${grid1Cols || 4} gap-4`}
      >
        {Array.from({ length: grid1Cols || 4 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
      <div
        className={`w-full grid grid-cols-1 p-5 md:grid-cols-${grid2Cols || 2} gap-4  bg-white `}
      >
        {Array.from({ length: grid2Cols || 2 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
