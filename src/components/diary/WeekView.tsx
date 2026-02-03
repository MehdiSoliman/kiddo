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
  onClick: () => void;
}

const DayRow = ({ date, entry, isToday, onClick }: DayRowProps) => {
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
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left bg-card rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer",
        isToday && "ring-2 ring-primary"
      )}
    >
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

      {/* Periods grid: Matin | Fin de matin | Midi | Après-midi | Fin d'après-midi */}
      <div className="grid grid-cols-5 divide-x">
        {/* Matin */}
        <div className={cn("p-3 min-h-[80px]", periodColors['morning'])}>
          <div className="text-xs font-medium text-muted-foreground mb-2">
            {PERIODS.find(p => p.id === 'morning')?.labelFr}
          </div>
          {getActivityDisplay('morning') || (
            <div className="text-xs text-muted-foreground/50 italic">—</div>
          )}
        </div>

        {/* Fin de matin */}
        <div className={cn("p-3 min-h-[80px]", periodColors['late-morning'])}>
          <div className="text-xs font-medium text-muted-foreground mb-2">
            {PERIODS.find(p => p.id === 'late-morning')?.labelFr}
          </div>
          {getActivityDisplay('late-morning') || (
            <div className="text-xs text-muted-foreground/50 italic">—</div>
          )}
        </div>

        {/* Midi */}
        <div className="p-3 min-h-[80px] bg-peach/30">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            🍽️ Midi
          </div>
          {entry?.lunchMenu ? (
            <div className="text-xs">{entry.lunchMenu}</div>
          ) : (
            <div className="text-xs text-muted-foreground/50 italic">—</div>
          )}
        </div>

        {/* Après-midi */}
        <div className={cn("p-3 min-h-[80px]", periodColors['afternoon'])}>
          <div className="text-xs font-medium text-muted-foreground mb-2">
            {PERIODS.find(p => p.id === 'afternoon')?.labelFr}
          </div>
          {getActivityDisplay('afternoon') || (
            <div className="text-xs text-muted-foreground/50 italic">—</div>
          )}
        </div>

        {/* Fin d'après-midi */}
        <div className={cn("p-3 min-h-[80px]", periodColors['late-afternoon'])}>
          <div className="text-xs font-medium text-muted-foreground mb-2">
            {PERIODS.find(p => p.id === 'late-afternoon')?.labelFr}
          </div>
          {getActivityDisplay('late-afternoon') || (
            <div className="text-xs text-muted-foreground/50 italic">—</div>
          )}
        </div>
      </div>
    </button>
  );
};

interface WeekViewProps {
  onDayClick?: (date: Date) => void;
}

export const WeekView = ({ onDayClick }: WeekViewProps) => {
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
            onClick={() => onDayClick?.(day)}
          />
        );
      })}
    </div>
  );
};
