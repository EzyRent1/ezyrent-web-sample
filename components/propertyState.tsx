import { Button } from '@/components/ui/button';

export const LoadingState = () => (
  <div className="text-center py-20">
    <div className="text-lg font-semibold">
      Fetching properties<span className="animate-pulse">...</span>
    </div>
  </div>
);

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <div className="text-center py-20">
    <p className="text-red-500 font-semibold mb-4">{message}</p>
    <Button onClick={onRetry}>Retry</Button>
  </div>
);

export const EmptyState = ({
  message = 'No properties found'
}: {
  message?: string;
}) => (
  <div className="text-center py-20">
    <p className="text-gray-500 font-semibold mb-4">{message}</p>
  </div>
);

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange
}: PaginationProps) => (
  <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm py-4 mt-auto">
    <div className="flex justify-center gap-2">
      <Button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        variant="outline"
        className="!px-2 md:!px-6"
      >
        Previous
      </Button>
      <span className="text-xs md:text-sm py-2 px-4">
        Page {page} of {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        variant="outline"
        className="!px-2 md:!px-6"
      >
        Next
      </Button>
    </div>
  </div>
);
