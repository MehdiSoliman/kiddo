import { useState } from 'react';
import { TIME_SLOTS, TimeSlotId } from '@/types/diary';
import { useDiary } from '@/hooks/useDiary';
import { TimeSlotCard } from './TimeSlotCard';
import { ActivityPicker } from './ActivityPicker';

export const Timeline = () => {
  const { 
    currentEntry, 
    toggleActivity, 
    addCustomActivity, 
    removeCustomActivity,
    updateLunchMenu 
  } = useDiary();
  
  const [activeSlot, setActiveSlot] = useState<TimeSlotId | null>(null);

  const activeConfig = activeSlot 
    ? TIME_SLOTS.find(s => s.id === activeSlot) 
    : null;

  return (
    <div className="w-full">
      {/* Timeline cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {TIME_SLOTS.map((slot) => (
          <TimeSlotCard
            key={slot.id}
            config={slot}
            entry={currentEntry.slots[slot.id]}
            onClick={() => setActiveSlot(slot.id)}
          />
        ))}
      </div>

      {/* Activity picker dialog */}
      {activeConfig && (
        <ActivityPicker
          open={!!activeSlot}
          onOpenChange={(open) => !open && setActiveSlot(null)}
          config={activeConfig}
          entry={currentEntry.slots[activeSlot!]}
          onToggleActivity={(activityId) => toggleActivity(activeSlot!, activityId)}
          onAddCustomActivity={(emoji, text) => addCustomActivity(activeSlot!, emoji, text)}
          onRemoveCustomActivity={(id) => removeCustomActivity(activeSlot!, id)}
          onUpdateLunchMenu={activeSlot === 'lunch' ? updateLunchMenu : undefined}
        />
      )}
    </div>
  );
};