import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarDays, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  selectedDate: Date;
  view: 'timeline' | 'calendar';
  onViewChange: (view: 'timeline' | 'calendar') => void;
}

export const Header = ({ selectedDate, view, onViewChange }: HeaderProps) => {
  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  const formattedDate = format(selectedDate, "EEEE d MMMM", { locale: fr });

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
          <span className="text-4xl">📚</span>
          Ma Journée d'École
        </h1>
        <p className="text-lg text-muted-foreground mt-1 capitalize">
          {isToday ? "Aujourd'hui" : formattedDate}
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