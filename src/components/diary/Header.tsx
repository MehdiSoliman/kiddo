import { format, startOfWeek, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarDays, BookOpen, CalendarRange } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  selectedDate: Date;
  view: 'timeline' | 'week' | 'calendar';
  onViewChange: (view: 'timeline' | 'week' | 'calendar') => void;
}

export const Header = ({ selectedDate, view, onViewChange }: HeaderProps) => {
  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  const formattedDate = format(selectedDate, "EEEE d MMMM", { locale: fr });

  // Get week range for week view subtitle
  const getWeekRange = () => {
    const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
    const friday = addDays(monday, 4);
    return `Semaine du ${format(monday, 'd', { locale: fr })} au ${format(friday, 'd MMMM', { locale: fr })}`;
  };

  const getSubtitle = () => {
    if (view === 'week') return getWeekRange();
    if (isToday) return "Aujourd'hui";
    return formattedDate;
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
          <span className="text-4xl">📚</span>
          Ma Journée d'École
        </h1>
        <p className="text-lg text-muted-foreground mt-1 capitalize">
          {getSubtitle()}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={view === 'timeline' ? 'default' : 'outline'}
          onClick={() => onViewChange('timeline')}
          className="rounded-xl gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Aujourd'hui
        </Button>
        <Button
          variant={view === 'week' ? 'default' : 'outline'}
          onClick={() => onViewChange('week')}
          className="rounded-xl gap-2"
        >
          <CalendarRange className="w-4 h-4" />
          Semaine
        </Button>
        <Button
          variant={view === 'calendar' ? 'default' : 'outline'}
          onClick={() => onViewChange('calendar')}
          className="rounded-xl gap-2"
        >
          <CalendarDays className="w-4 h-4" />
          Calendrier
        </Button>
      </div>
    </header>
  );
};
