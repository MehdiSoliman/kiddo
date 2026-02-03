import { useState } from 'react';
import { useDiary } from '@/hooks/useDiary';
import { Header } from '@/components/diary/Header';
import { Timeline } from '@/components/diary/Timeline';
import { CalendarView } from '@/components/diary/CalendarView';
import { WeekView } from '@/components/diary/WeekView';
import { DaySummary } from '@/components/diary/DaySummary';
import { format } from 'date-fns';

const Index = () => {
  const [view, setView] = useState<'timeline' | 'week' | 'calendar'>('timeline');
  const { selectedDate, setSelectedDate, currentEntry } = useDiary();

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleViewChange = (newView: 'timeline' | 'week' | 'calendar') => {
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
        ) : view === 'week' ? (
          <WeekView onDayClick={(date) => {
            setSelectedDate(date);
            setView('timeline');
          }} />
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
