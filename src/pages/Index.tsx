import { useState } from 'react';
import { useDiary } from '@/hooks/useDiary';
import { Header } from '@/components/diary/Header';
import { Timeline } from '@/components/diary/Timeline';
import { CalendarView } from '@/components/diary/CalendarView';
import { DaySummary } from '@/components/diary/DaySummary';
import { format } from 'date-fns';

const Index = () => {
  const [view, setView] = useState<'timeline' | 'calendar'>('timeline');
  const { selectedDate, setSelectedDate, currentEntry, getEntry } = useDiary();

  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    // If selecting today, show timeline; otherwise show calendar with summary
  };

  const handleViewChange = (newView: 'timeline' | 'calendar') => {
    if (newView === 'timeline') {
      setSelectedDate(new Date());
    }
    setView(newView);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        <Header 
          selectedDate={selectedDate}
          view={view}
          onViewChange={handleViewChange}
        />

        {view === 'timeline' ? (
          <Timeline />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CalendarView onSelectDate={handleSelectDate} />
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <DaySummary 
                entry={currentEntry} 
                date={selectedDate} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;