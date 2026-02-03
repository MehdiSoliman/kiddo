import { format, startOfWeek, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useDiary } from '@/hooks/useDiary';
import { PERIODS, ACTIVITIES, DayEntry, PeriodId } from '@/types/diary';
import { cn } from '@/lib/utils';

// Get weekdays (Monday to Friday) for a given date
const getWeekDays = (date: Date): Date[] => {
  const monday = startOfWeek(date, { weekStartsOn: 1 });
  return Array.from({ length: 5 }, (_, i) => addDays(monday, i));
};

interface DayRowProps {
  date: Date;
  entry: DayEntry | null;
  isToday: boolean;
}

const DayRow = ({ date, entry, isToday }: DayRowProps) => {
  const dayName = format(date, 'EEEE', { locale: fr });
  const dayDate = format(date, 'd MMMM', { locale: fr });

  const getActivityDisplay = (periodId: PeriodId) => {
    if (!entry) return null;
    const period = entry.periods[periodId];
    if (!period) return null;

    const activities = [
      ...period.activities.map(id => {
        const activity = ACTIVITIES.find(a => a.id === id);
        return activity ? `${activity.emoji} ${activity.labelFr}` : null;
      }).filter(Boolean),
      ...period.customActivities.map(ca => `${ca.emoji} ${ca.text}`),
    ];

    if (activities.length === 0) return null;

    return (
      <div className="space-y-1">
        {activities.map((activity, idx) => (
          <div key={idx} className="text-xs truncate">
            {activity}
          </div>
        ))}
      </div>
    );
  };

  const periodColors: Record<string, string> = {
    'morning': 'bg-lavender/30',
    'late-morning': 'bg-mint/30',
    'afternoon': 'bg-sky/30',
    'late-afternoon': 'bg-rose/30',
  };

  return (
    <div className={cn(
      "bg-card rounded-2xl shadow-sm overflow-hidden",
      isToday && "ring-2 ring-primary"
    )}>
      {/* Day header */}
      <div className={cn(
        "px-4 py-3 border-b",
        isToday ? "bg-primary/10" : "bg-muted/50"
      )}>
        <h3 className="font-semibold text-foreground capitalize">
          {dayName} <span className="font-normal text-muted-foreground">{dayDate}</span>
          {isToday && <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Aujourd'hui</span>}
        </h3>
      </div>

      {/* Periods grid */}
      <div className="grid grid-cols-5 divide-x">
        {PERIODS.map((period) => (
          <div
            key={period.id}
            className={cn(
              "p-3 min-h-[80px]",
              periodColors[period.id]
            )}
          >
            <div className="text-xs font-medium text-muted-foreground mb-2">
              {period.labelFr}
            </div>
            {getActivityDisplay(period.id) || (
              <div className="text-xs text-muted-foreground/50 italic">
                —
              </div>
            )}
          </div>
        ))}

        {/* Lunch column */}
        <div className="p-3 min-h-[80px] bg-peach/30">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            🍽️ Midi
          </div>
          {entry?.lunchMenu ? (
            <div className="text-xs">
              {entry.lunchMenu}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground/50 italic">
              —
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const WeekView = () => {
  const { getEntry } = useDiary();
  const weekDays = getWeekDays(new Date());
  const todayKey = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-muted-foreground">
          Semaine du {format(weekDays[0], 'd MMMM', { locale: fr })} au {format(weekDays[4], 'd MMMM yyyy', { locale: fr })}
        </p>
      </div>

      {weekDays.map((day) => {
        const isToday = format(day, 'yyyy-MM-dd') === todayKey;
        return (
          <DayRow
            key={format(day, 'yyyy-MM-dd')}
            date={day}
            entry={getEntry(day)}
            isToday={isToday}
          />
        );
      })}
    </div>
  );
};
