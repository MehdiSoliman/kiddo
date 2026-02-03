import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DayEntry, TIME_SLOTS, ACTIVITIES } from '@/types/diary';
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
  const hasAnyContent = Object.values(entry.slots).some(slot => 
    slot.activities.length > 0 || 
    slot.customActivities.length > 0 || 
    (slot.lunchMenu && slot.lunchMenu.trim() !== '')
  );

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
        {TIME_SLOTS.map((slot) => {
          const slotEntry = entry.slots[slot.id];
          const activities = slotEntry.activities
            .map(id => ACTIVITIES.find(a => a.id === id))
            .filter(Boolean);
          
          const hasContent = activities.length > 0 || 
            slotEntry.customActivities.length > 0 ||
            (slot.id === 'lunch' && slotEntry.lunchMenu);

          if (!hasContent) return null;

          return (
            <div
              key={slot.id}
              className={cn(
                'p-4 rounded-xl',
                colorClasses[slot.color]
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{slot.emoji}</span>
                <h3 className="font-medium">{slot.labelFr}</h3>
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
                
                {slotEntry.customActivities.map((ca) => (
                  <span
                    key={ca.id}
                    className="inline-flex items-center gap-1 bg-background/60 rounded-full px-3 py-1 text-sm"
                  >
                    <span>{ca.emoji}</span>
                    <span>{ca.text}</span>
                  </span>
                ))}
              </div>

              {slot.id === 'lunch' && slotEntry.lunchMenu && (
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium">Menu:</span> {slotEntry.lunchMenu}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};