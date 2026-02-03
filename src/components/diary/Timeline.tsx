import { useState } from 'react';
import { CHECKPOINTS, PERIODS, PeriodId } from '@/types/diary';
import { useDiary } from '@/hooks/useDiary';
import { CheckpointMarker } from './CheckpointMarker';
import { PeriodCard } from './PeriodCard';
import { ActivityPicker } from './ActivityPicker';
import { LunchInput } from './LunchInput';

interface TimelineProps {
  selectedDate?: Date;
}

export const Timeline = ({ selectedDate }: TimelineProps) => {
  const { 
    currentEntry, 
    toggleActivity, 
    addCustomActivity, 
    updateCustomActivity,
    removeCustomActivity,
    updateLunchMenu 
  } = useDiary(selectedDate);
  
  const [activePeriod, setActivePeriod] = useState<PeriodId | null>(null);
  const [showLunchInput, setShowLunchInput] = useState(false);

  const activeConfig = activePeriod 
    ? PERIODS.find(p => p.id === activePeriod) 
    : null;

  // Get checkpoint by ID
  const getCheckpoint = (id: string) => CHECKPOINTS.find(c => c.id === id)!;

  return (
    <div className="w-full">
      {/* Desktop/Tablet horizontal timeline */}
      <div className="hidden md:flex items-center justify-between gap-2">
        {/* Start checkpoint */}
        <CheckpointMarker config={getCheckpoint('start')} />
        
        {/* Morning period */}
        <div className="flex-1 max-w-[140px]">
          <PeriodCard
            config={PERIODS[0]}
            entry={currentEntry.periods['morning']}
            onClick={() => setActivePeriod('morning')}
          />
        </div>
        
        {/* Morning break checkpoint */}
        <CheckpointMarker config={getCheckpoint('morning-break')} />
        
        {/* Late morning period */}
        <div className="flex-1 max-w-[140px]">
          <PeriodCard
            config={PERIODS[1]}
            entry={currentEntry.periods['late-morning']}
            onClick={() => setActivePeriod('late-morning')}
          />
        </div>
        
        {/* Lunch checkpoint (clickable) */}
        <CheckpointMarker 
          config={getCheckpoint('lunch')} 
          isLunch 
          lunchMenu={currentEntry.lunchMenu}
          onClick={() => setShowLunchInput(true)}
        />
        
        {/* Afternoon period */}
        <div className="flex-1 max-w-[140px]">
          <PeriodCard
            config={PERIODS[2]}
            entry={currentEntry.periods['afternoon']}
            onClick={() => setActivePeriod('afternoon')}
          />
        </div>
        
        {/* Afternoon break checkpoint */}
        <CheckpointMarker config={getCheckpoint('afternoon-break')} />
        
        {/* Late afternoon period */}
        <div className="flex-1 max-w-[140px]">
          <PeriodCard
            config={PERIODS[3]}
            entry={currentEntry.periods['late-afternoon']}
            onClick={() => setActivePeriod('late-afternoon')}
          />
        </div>
        
        {/* Home checkpoint */}
        <CheckpointMarker config={getCheckpoint('home')} />
      </div>

      {/* Mobile vertical timeline */}
      <div className="md:hidden space-y-3">
        {/* Start */}
        <div className="flex items-center gap-3">
          <CheckpointMarker config={getCheckpoint('start')} />
          <div className="h-px flex-1 bg-muted" />
        </div>
        
        {/* Morning */}
        <PeriodCard
          config={PERIODS[0]}
          entry={currentEntry.periods['morning']}
          onClick={() => setActivePeriod('morning')}
        />
        
        {/* Morning break */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-muted" />
          <CheckpointMarker config={getCheckpoint('morning-break')} />
          <div className="h-px flex-1 bg-muted" />
        </div>
        
        {/* Late morning */}
        <PeriodCard
          config={PERIODS[1]}
          entry={currentEntry.periods['late-morning']}
          onClick={() => setActivePeriod('late-morning')}
        />
        
        {/* Lunch */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-muted" />
          <CheckpointMarker 
            config={getCheckpoint('lunch')} 
            isLunch 
            lunchMenu={currentEntry.lunchMenu}
            onClick={() => setShowLunchInput(true)}
          />
          <div className="h-px flex-1 bg-muted" />
        </div>
        
        {/* Afternoon */}
        <PeriodCard
          config={PERIODS[2]}
          entry={currentEntry.periods['afternoon']}
          onClick={() => setActivePeriod('afternoon')}
        />
        
        {/* Afternoon break */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-muted" />
          <CheckpointMarker config={getCheckpoint('afternoon-break')} />
          <div className="h-px flex-1 bg-muted" />
        </div>
        
        {/* Late afternoon */}
        <PeriodCard
          config={PERIODS[3]}
          entry={currentEntry.periods['late-afternoon']}
          onClick={() => setActivePeriod('late-afternoon')}
        />
        
        {/* Home */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-muted" />
          <CheckpointMarker config={getCheckpoint('home')} />
        </div>
      </div>

      {/* Activity picker dialog */}
      {activeConfig && (
        <ActivityPicker
          open={!!activePeriod}
          onOpenChange={(open) => !open && setActivePeriod(null)}
          config={activeConfig}
          entry={currentEntry.periods[activePeriod!]}
          onToggleActivity={(activityId) => toggleActivity(activePeriod!, activityId)}
          onAddCustomActivity={(emoji, text) => addCustomActivity(activePeriod!, emoji, text)}
          onUpdateCustomActivity={(id, emoji, text) => updateCustomActivity(activePeriod!, id, emoji, text)}
          onRemoveCustomActivity={(id) => removeCustomActivity(activePeriod!, id)}
        />
      )}

      {/* Lunch menu input dialog */}
      <LunchInput
        open={showLunchInput}
        onOpenChange={setShowLunchInput}
        lunchMenu={currentEntry.lunchMenu || ''}
        onUpdateLunchMenu={updateLunchMenu}
      />
    </div>
  );
};
