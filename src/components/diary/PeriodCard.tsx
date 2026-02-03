import { PeriodConfig, PeriodEntry, ACTIVITIES } from '@/types/diary';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface PeriodCardProps {
  config: PeriodConfig;
  entry: PeriodEntry;
  onClick: () => void;
}

const colorClasses: Record<string, string> = {
  lavender: 'bg-lavender hover:bg-lavender/80',
  mint: 'bg-mint hover:bg-mint/80',
  peach: 'bg-peach hover:bg-peach/80',
  sky: 'bg-sky hover:bg-sky/80',
  rose: 'bg-rose hover:bg-rose/80',
};

export const PeriodCard = ({ config, entry, onClick }: PeriodCardProps) => {
  const hasContent = entry.activities.length > 0 || entry.customActivities.length > 0;

  // Get activity emojis for display
  const activityEmojis = entry.activities
    .map(id => ACTIVITIES.find(a => a.id === id)?.emoji)
    .filter(Boolean);
  
  const customEmojis = entry.customActivities.map(ca => ca.emoji);
  const allEmojis = [...activityEmojis, ...customEmojis];

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-2xl transition-all duration-200 shadow-sm',
        'flex flex-col items-center gap-2 min-h-[100px]',
        'hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        colorClasses[config.color]
      )}
    >
      {/* Period title */}
      <h3 className="text-sm font-semibold text-foreground/90">
        {config.labelFr}
      </h3>

      {/* Content preview or add prompt */}
      <div className="flex-1 flex items-center justify-center">
        {hasContent ? (
          <div className="flex flex-wrap gap-1.5 justify-center">
            {allEmojis.slice(0, 4).map((emoji, idx) => (
              <span key={idx} className="text-xl">{emoji}</span>
            ))}
            {allEmojis.length > 4 && (
              <span className="text-xs text-muted-foreground font-medium">
                +{allEmojis.length - 4}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Plus className="w-4 h-4" />
            <span className="text-xs font-medium">Ajouter</span>
          </div>
        )}
      </div>
    </button>
  );
};
