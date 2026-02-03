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

interface ActivityDisplay {
  emoji: string;
  label: string;
}

export const PeriodCard = ({ config, entry, onClick }: PeriodCardProps) => {
  const hasContent = entry.activities.length > 0 || entry.customActivities.length > 0;

  // Get activity display info (emoji + label)
  const predefinedActivities: ActivityDisplay[] = entry.activities
    .map(id => {
      const activity = ACTIVITIES.find(a => a.id === id);
      return activity ? { emoji: activity.emoji, label: activity.labelFr } : null;
    })
    .filter((a): a is ActivityDisplay => a !== null);
  
  const customActivitiesDisplay: ActivityDisplay[] = entry.customActivities.map(ca => ({
    emoji: ca.emoji,
    label: ca.text,
  }));

  const allActivities = [...predefinedActivities, ...customActivitiesDisplay];
  const displayCount = 3;
  const visibleActivities = allActivities.slice(0, displayCount);
  const remainingCount = allActivities.length - displayCount;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-2xl transition-all duration-200 shadow-sm',
        'flex flex-col gap-2 min-h-[100px]',
        'hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        colorClasses[config.color]
      )}
    >
      {/* Period title */}
      <h3 className="text-sm font-semibold text-foreground/90 text-center">
        {config.labelFr}
      </h3>

      {/* Content preview or add prompt */}
      <div className="flex-1 flex flex-col justify-center">
        {hasContent ? (
          <div className="space-y-1">
            {visibleActivities.map((activity, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-1.5 text-left"
              >
                <span className="text-base flex-shrink-0">{activity.emoji}</span>
                <span className="text-xs font-medium text-foreground/80 truncate">
                  {activity.label}
                </span>
              </div>
            ))}
            {remainingCount > 0 && (
              <p className="text-xs text-muted-foreground font-medium pl-6">
                +{remainingCount} autre{remainingCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <Plus className="w-4 h-4" />
            <span className="text-xs font-medium">Ajouter</span>
          </div>
        )}
      </div>
    </button>
  );
};
