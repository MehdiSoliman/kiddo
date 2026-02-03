import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { 
  DayEntry, 
  TimeSlotId, 
  TimeSlotEntry, 
  CustomActivity,
  createEmptyDayEntry 
} from '@/types/diary';

const STORAGE_KEY = 'ma-journee-diary';

// Get all entries from localStorage
const loadAllEntries = (): Record<string, DayEntry> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Save all entries to localStorage
const saveAllEntries = (entries: Record<string, DayEntry>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const useDiary = () => {
  const [entries, setEntries] = useState<Record<string, DayEntry>>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Load entries on mount
  useEffect(() => {
    setEntries(loadAllEntries());
  }, []);

  // Get formatted date key
  const dateKey = format(selectedDate, 'yyyy-MM-dd');

  // Get current day's entry (or create empty one)
  const currentEntry: DayEntry = entries[dateKey] || createEmptyDayEntry(dateKey);

  // Update a specific time slot
  const updateSlot = useCallback((slotId: TimeSlotId, slotEntry: TimeSlotEntry) => {
    setEntries(prev => {
      const existingEntry = prev[dateKey] || createEmptyDayEntry(dateKey);
      const newEntries = {
        ...prev,
        [dateKey]: {
          ...existingEntry,
          slots: {
            ...existingEntry.slots,
            [slotId]: slotEntry,
          },
        },
      };
      saveAllEntries(newEntries);
      return newEntries;
    });
  }, [dateKey]);

  // Toggle an activity for a slot
  const toggleActivity = useCallback((slotId: TimeSlotId, activityId: string) => {
    const slot = currentEntry.slots[slotId];
    const newActivities = slot.activities.includes(activityId)
      ? slot.activities.filter(id => id !== activityId)
      : [...slot.activities, activityId];
    
    updateSlot(slotId, { ...slot, activities: newActivities });
  }, [currentEntry, updateSlot]);

  // Add a custom activity
  const addCustomActivity = useCallback((slotId: TimeSlotId, emoji: string, text: string) => {
    const slot = currentEntry.slots[slotId];
    const newCustomActivity: CustomActivity = {
      id: `custom-${Date.now()}`,
      emoji,
      text,
    };
    
    updateSlot(slotId, {
      ...slot,
      customActivities: [...slot.customActivities, newCustomActivity],
    });
  }, [currentEntry, updateSlot]);

  // Remove a custom activity
  const removeCustomActivity = useCallback((slotId: TimeSlotId, customActivityId: string) => {
    const slot = currentEntry.slots[slotId];
    updateSlot(slotId, {
      ...slot,
      customActivities: slot.customActivities.filter(ca => ca.id !== customActivityId),
    });
  }, [currentEntry, updateSlot]);

  // Update lunch menu
  const updateLunchMenu = useCallback((menu: string) => {
    const slot = currentEntry.slots['lunch'];
    updateSlot('lunch', { ...slot, lunchMenu: menu });
  }, [currentEntry, updateSlot]);

  // Check if a date has any entries
  const hasEntries = useCallback((date: Date): boolean => {
    const key = format(date, 'yyyy-MM-dd');
    const entry = entries[key];
    if (!entry) return false;
    
    return Object.values(entry.slots).some(slot => 
      slot.activities.length > 0 || 
      slot.customActivities.length > 0 || 
      (slot.lunchMenu && slot.lunchMenu.trim() !== '')
    );
  }, [entries]);

  // Get entry for a specific date
  const getEntry = useCallback((date: Date): DayEntry | null => {
    const key = format(date, 'yyyy-MM-dd');
    return entries[key] || null;
  }, [entries]);

  return {
    selectedDate,
    setSelectedDate,
    currentEntry,
    toggleActivity,
    addCustomActivity,
    removeCustomActivity,
    updateLunchMenu,
    hasEntries,
    getEntry,
  };
};