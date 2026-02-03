import { Calendar } from '@/components/ui/calendar';
import { format, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useDiary } from '@/hooks/useDiary';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  onSelectDate: (date: Date) => void;
}

export const CalendarView = ({ onSelectDate }: CalendarViewProps) => {
  const { selectedDate, setSelectedDate, hasEntries } = useDiary();

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onSelectDate(date);
    }
  };

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        locale={fr}
        className="rounded-xl"
        modifiers={{
          hasEntry: (date) => hasEntries(date),
          today: (date) => isSameDay(date, new Date()),
        }}
        modifiersClassNames={{
          hasEntry: 'relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full',
          today: 'bg-primary/20 font-bold',
        }}
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          month: 'space-y-4',
          caption: 'flex justify-center pt-1 relative items-center',
          caption_label: 'text-lg font-semibold capitalize',
          nav: 'space-x-1 flex items-center',
          nav_button: cn(
            'h-9 w-9 bg-transparent p-0 opacity-70 hover:opacity-100 rounded-full hover:bg-muted'
          ),
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex',
          head_cell: 'text-muted-foreground rounded-md w-10 font-medium text-[0.8rem] uppercase',
          row: 'flex w-full mt-2',
          cell: 'text-center text-sm relative p-0 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 h-10 w-10',
          day: cn(
            'h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-full',
            'hover:bg-muted transition-colors'
          ),
          day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
          day_outside: 'text-muted-foreground opacity-50',
          day_disabled: 'text-muted-foreground opacity-50',
          day_hidden: 'invisible',
        }}
      />
    </div>
  );
};