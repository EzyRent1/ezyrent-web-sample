import { Button } from '@/components/ui/button';

interface SelectionButtonProps {
  label: string;
  selected: boolean;
  isSubmitting: boolean;
  onClick: () => void;
  className?: string;
}

export default function SelectionButton({
  label,
  selected,
  isSubmitting,
  onClick,
  className = ''
}: SelectionButtonProps) {
  return (
    <Button
      variant="outline"
      type="button"
      disabled={isSubmitting}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`capitalize flex items-center px-2 rounded-lg border border-gray-400 w-24 transition-all duration-200 ${selected ? 'bg-[#7065f0] text-white' : 'hover:bg-[#7065f0]/10'} ${className}`}
    >
      <span className="truncate">{label}</span>
    </Button>
  );
}
