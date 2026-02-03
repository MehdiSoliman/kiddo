import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { 
  DayEntry, 
  PeriodId, 
  PeriodEntry, 
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

export const useDiary = (externalDate?: Date) => {
  const [entries, setEntries] = useState<Record<string, DayEntry>>({});
  const [internalDate, setInternalDate] = useState<Date>(new Date());
  
  // Use external date if provided, otherwise use internal state
  const selectedDate = externalDate ?? internalDate;
  const setSelectedDate = setInternalDate;

  // Load entries on mount
  useEffect(() => {
    setEntries(loadAllEntries());
  }, []);

  // Get formatted date key
  const dateKey = format(selectedDate, 'yyyy-MM-dd');

  // Get current day's entry (or create empty one)
  const currentEntry: DayEntry = entries[dateKey] || createEmptyDayEntry(dateKey);

  // Update a specific period
  const updatePeriod = useCallback((periodId: PeriodId, periodEntry: PeriodEntry) => {
    setEntries(prev => {
      const existingEntry = prev[dateKey] || createEmptyDayEntry(dateKey);
      const newEntries = {
        ...prev,
        [dateKey]: {
          ...existingEntry,
          periods: {
            ...existingEntry.periods,
            [periodId]: periodEntry,
          },
        },
      };
      saveAllEntries(newEntries);
      return newEntries;
    });
  }, [dateKey]);

  // Toggle an activity for a period
  const toggleActivity = useCallback((periodId: PeriodId, activityId: string) => {
    const period = currentEntry.periods[periodId];
    const newActivities = period.activities.includes(activityId)
      ? period.activities.filter(id => id !== activityId)
      : [...period.activities, activityId];
    
    updatePeriod(periodId, { ...period, activities: newActivities });
  }, [currentEntry, updatePeriod]);

  // Add a custom activity
  const addCustomActivity = useCallback((periodId: PeriodId, emoji: string, text: string) => {
    const period = currentEntry.periods[periodId];
    const newCustomActivity: CustomActivity = {
      id: `custom-${Date.now()}`,
      emoji,
      text,
    };
    
    updatePeriod(periodId, {
      ...period,
      customActivities: [...period.customActivities, newCustomActivity],
    });
  }, [currentEntry, updatePeriod]);

  // Update an existing custom activity
  const updateCustomActivity = useCallback((
    periodId: PeriodId, 
    customActivityId: string, 
    emoji: string, 
    text: string
  ) => {
    const period = currentEntry.periods[periodId];
    updatePeriod(periodId, {
      ...period,
      customActivities: period.customActivities.map(ca =>
        ca.id === customActivityId 
          ? { ...ca, emoji, text } 
          : ca
      ),
    });
  }, [currentEntry, updatePeriod]);

  // Remove a custom activity
  const removeCustomActivity = useCallback((periodId: PeriodId, customActivityId: string) => {
    const period = currentEntry.periods[periodId];
    updatePeriod(periodId, {
      ...period,
      customActivities: period.customActivities.filter(ca => ca.id !== customActivityId),
    });
  }, [currentEntry, updatePeriod]);

  // Update lunch menu (separate from periods)
  const updateLunchMenu = useCallback((menu: string) => {
    setEntries(prev => {
      const existingEntry = prev[dateKey] || createEmptyDayEntry(dateKey);
      const newEntries = {
        ...prev,
        [dateKey]: {
          ...existingEntry,
          lunchMenu: menu,
        },
      };
      saveAllEntries(newEntries);
      return newEntries;
    });
  }, [dateKey]);

  // Check if a date has any entries
  const hasEntries = useCallback((date: Date): boolean => {
    const key = format(date, 'yyyy-MM-dd');
    const entry = entries[key];
    if (!entry) return false;
    
    const hasPeriodsContent = Object.values(entry.periods).some(period => 
      period.activities.length > 0 || 
      period.customActivities.length > 0
    );
    
    const hasLunch = entry.lunchMenu && entry.lunchMenu.trim() !== '';
    
    return hasPeriodsContent || hasLunch;
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
    updateCustomActivity,
    removeCustomActivity,
    updateLunchMenu,
    hasEntries,
    getEntry,
  };
};
