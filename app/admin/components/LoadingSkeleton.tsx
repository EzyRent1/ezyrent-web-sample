export function LoadingSkeleton({
  isWithDetails = false,
  height = 192
}: {
  isWithDetails?: boolean;
  height?: number;
}) {
  return (
    <div className="animate-pulse">
      <div style={{ height }} className={`bg-gray-300 rounded-lg  mb-3`}></div>
      {isWithDetails && (
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      )}
    </div>
  );
}
