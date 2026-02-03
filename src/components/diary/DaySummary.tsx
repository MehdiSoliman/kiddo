import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DayEntry, PERIODS, ACTIVITIES } from '@/types/diary';
import { cn } from '@/lib/utils';

interface DaySummaryProps {
  entry: DayEntry;
  date: Date;
}

const colorClasses: Record<string, string> = {
  lavender: 'bg-lavender/50',
  mint: 'bg-mint/50',
  peach: 'bg-peach/50',
  sky: 'bg-sky/50',
  rose: 'bg-rose/50',
};

export const DaySummary = ({ entry, date }: DaySummaryProps) => {
  const formattedDate = format(date, "EEEE d MMMM yyyy", { locale: fr });

  // Check if there's any content
  const hasPeriodsContent = Object.values(entry.periods).some(period => 
    period.activities.length > 0 || 
    period.customActivities.length > 0
  );
  const hasLunch = entry.lunchMenu && entry.lunchMenu.trim() !== '';
  const hasAnyContent = hasPeriodsContent || hasLunch;

  if (!hasAnyContent) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl mb-2">📝</p>
        <p className="text-muted-foreground">
          Aucune activité enregistrée pour ce jour
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold capitalize text-center">
        {formattedDate}
      </h2>

      <div className="grid gap-3">
        {PERIODS.map((period) => {
          const periodEntry = entry.periods[period.id];
          const activities = periodEntry.activities
            .map(id => ACTIVITIES.find(a => a.id === id))
            .filter(Boolean);
          
          const hasContent = activities.length > 0 || periodEntry.customActivities.length > 0;

          if (!hasContent) return null;

          return (
            <div
              key={period.id}
              className={cn(
                'p-4 rounded-xl',
                colorClasses[period.color]
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">📚</span>
                <h3 className="font-medium">{period.labelFr}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {activities.map((activity) => (
                  <span
                    key={activity!.id}
                    className="inline-flex items-center gap-1 bg-background/60 rounded-full px-3 py-1 text-sm"
                  >
                    <span>{activity!.emoji}</span>
                    <span>{activity!.labelFr}</span>
                  </span>
                ))}
                
                {periodEntry.customActivities.map((ca) => (
                  <span
                    key={ca.id}
                    className="inline-flex items-center gap-1 bg-background/60 rounded-full px-3 py-1 text-sm"
                  >
                    <span>{ca.emoji}</span>
                    <span>{ca.text}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {/* Lunch menu section */}
        {hasLunch && (
          <div className="p-4 rounded-xl bg-peach/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🍽️</span>
              <h3 className="font-medium">Déjeuner</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {entry.lunchMenu}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
