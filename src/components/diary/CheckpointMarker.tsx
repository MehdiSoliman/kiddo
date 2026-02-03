import { CheckpointConfig } from '@/types/diary';
import { cn } from '@/lib/utils';

interface CheckpointMarkerProps {
  config: CheckpointConfig;
  isLunch?: boolean;
  lunchMenu?: string;
  onClick?: () => void;
}

export const CheckpointMarker = ({ config, isLunch, lunchMenu, onClick }: CheckpointMarkerProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={onClick}
        disabled={!isLunch}
        className={cn(
          'flex items-center justify-center w-14 h-14 rounded-full',
          'bg-card border-2 border-muted shadow-sm',
          'transition-all duration-200',
          isLunch && 'hover:scale-110 hover:shadow-md hover:border-peach cursor-pointer',
          !isLunch && 'cursor-default'
        )}
      >
        <span className="text-2xl">{config.emoji}</span>
      </button>
      <span className="text-xs font-medium text-muted-foreground">
        {config.labelFr}
      </span>
      {isLunch && lunchMenu && (
        <span className="text-xs text-muted-foreground truncate max-w-[80px]">
          {lunchMenu}
        </span>
      )}
    </div>
  );
};
