import { TimeSlotConfig, TimeSlotEntry, ACTIVITIES } from '@/types/diary';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface TimeSlotCardProps {
  config: TimeSlotConfig;
  entry: TimeSlotEntry;
  onClick: () => void;
}

const colorClasses: Record<string, string> = {
  lavender: 'bg-lavender hover:bg-lavender/80',
  mint: 'bg-mint hover:bg-mint/80',
  peach: 'bg-peach hover:bg-peach/80',
  sky: 'bg-sky hover:bg-sky/80',
  rose: 'bg-rose hover:bg-rose/80',
};

export const TimeSlotCard = ({ config, entry, onClick }: TimeSlotCardProps) => {
  const hasContent = entry.activities.length > 0 || 
    entry.customActivities.length > 0 || 
    (config.id === 'lunch' && entry.lunchMenu);

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
        'w-full p-6 rounded-2xl transition-all duration-200 shadow-sm',
        'flex flex-col items-center gap-3 min-h-[140px]',
        'hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        colorClasses[config.color]
      )}
    >
      {/* Time slot emoji and title */}
      <div className="flex items-center gap-2">
        <span className="text-3xl">{config.emoji}</span>
        <h3 className="text-lg font-semibold text-foreground/90">
          {config.labelFr}
        </h3>
      </div>

      {/* Content preview or add prompt */}
      <div className="flex-1 flex items-center justify-center">
        {hasContent ? (
          <div className="flex flex-wrap gap-2 justify-center">
            {allEmojis.slice(0, 6).map((emoji, idx) => (
              <span key={idx} className="text-2xl">{emoji}</span>
            ))}
            {allEmojis.length > 6 && (
              <span className="text-sm text-muted-foreground font-medium">
                +{allEmojis.length - 6}
              </span>
            )}
            {config.id === 'lunch' && entry.lunchMenu && (
              <span className="text-sm text-muted-foreground truncate max-w-[120px]">
                🍽️ {entry.lunchMenu}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Ajouter</span>
          </div>
        )}
      </div>
    </button>
  );
};