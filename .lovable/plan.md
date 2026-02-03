

# Restructure: Checkpoints + Activity Periods

## Understanding the Change

**Current (incorrect):**
Each of the 5 moments is a card where you can add activities.

**Desired (correct):**
- The 5 moments are **checkpoints/markers** on a visual timeline
- Activities are recorded for the **4 periods between checkpoints**
- Only **lunch** has a special input for the menu

## New Timeline Structure

```text
  [Checkpoint]              [Period]                   [Checkpoint]
  
  🌅 Début ──────────► 📚 MATIN (activities) ──────────► ☕ Récré AM
                                                              │
                                                              ▼
                      📚 FIN DE MATIN (activities) ◄──────────┘
                                │
                                ▼
                          🍽️ Déjeuner
                          (menu input)
                                │
                                ▼
                      📚 APRÈS-MIDI (activities) ──────────► 🎈 Récré PM
                                                                  │
                                                                  ▼
                      📚 FIN D'APRÈS-MIDI (activities) ◄──────────┘
                                │
                                ▼
                          🏠 Retour
```

## Implementation Plan

### 1. Update Data Types (`src/types/diary.ts`)

**Rename concepts:**
- `TimeSlotId` becomes two types:
  - `CheckpointId` for the 5 markers (start, morning-break, lunch, afternoon-break, home)
  - `PeriodId` for the 4 activity periods (morning, late-morning, afternoon, late-afternoon)

**New period definitions:**
- `morning` → Between Start and Morning Break (classroom activities)
- `late-morning` → Between Morning Break and Lunch (classroom activities)  
- `afternoon` → Between Lunch and Afternoon Break (classroom activities)
- `late-afternoon` → Between Afternoon Break and Home (classroom activities)

**Update `DayEntry`:**
- `periods: Record<PeriodId, PeriodEntry>` for activities
- `lunchMenu?: string` as a separate field

### 2. Create New Timeline Layout (`src/components/diary/Timeline.tsx`)

**Visual structure:**
- Show checkpoints as small circular markers with emojis
- Show periods as larger tappable cards between checkpoints
- Use connecting lines to create the timeline feel
- Lunch checkpoint is special: shows menu input inline or in a simple popover

**Desktop layout (horizontal):**
```text
🌅 ─── [Morning Card] ─── ☕ ─── [Late Morning Card] ─── 🍽️ ─── [Afternoon Card] ─── 🎈 ─── [Late Afternoon Card] ─── 🏠
```

**Tablet layout (can be vertical or horizontal based on space)**

### 3. Update Components

**TimeSlotCard.tsx → PeriodCard.tsx:**
- Rename to reflect it represents a period between checkpoints
- Update to receive period data instead of slot data
- Show the "between" context (e.g., "Entre le début et la récré")

**ActivityPicker.tsx:**
- Remove lunch menu handling (moved to inline)
- Simplify to just handle activity selection for a period

**CheckpointMarker.tsx (new):**
- Simple circular marker with emoji
- Special handling for lunch: tap to add/edit menu

**LunchMenu.tsx (new):**
- Simple popover or inline input for the lunch menu text

### 4. Update Hook (`src/hooks/useDiary.ts`)

- Change slot-based functions to period-based
- Add separate `updateLunchMenu` that's not tied to a slot
- Update storage structure

### 5. Update Summary Components

- `DaySummary.tsx` and `CalendarView.tsx` to work with new period structure

---

## Technical Details

### New Type Definitions

```typescript
export type CheckpointId = 'start' | 'morning-break' | 'lunch' | 'afternoon-break' | 'home';

export type PeriodId = 'morning' | 'late-morning' | 'afternoon' | 'late-afternoon';

export interface PeriodEntry {
  activities: string[];
  customActivities: CustomActivity[];
}

export interface DayEntry {
  date: string;
  periods: Record<PeriodId, PeriodEntry>;
  lunchMenu?: string;
}

export const PERIODS: PeriodConfig[] = [
  { id: 'morning', labelFr: 'Matin', startCheckpoint: 'start', endCheckpoint: 'morning-break', color: 'lavender' },
  { id: 'late-morning', labelFr: 'Fin de matin', startCheckpoint: 'morning-break', endCheckpoint: 'lunch', color: 'mint' },
  { id: 'afternoon', labelFr: 'Après-midi', startCheckpoint: 'lunch', endCheckpoint: 'afternoon-break', color: 'sky' },
  { id: 'late-afternoon', labelFr: 'Fin d\'après-midi', startCheckpoint: 'afternoon-break', endCheckpoint: 'home', color: 'rose' },
];

export const CHECKPOINTS: CheckpointConfig[] = [
  { id: 'start', emoji: '🌅', labelFr: 'Début' },
  { id: 'morning-break', emoji: '☕', labelFr: 'Récré' },
  { id: 'lunch', emoji: '🍽️', labelFr: 'Déjeuner' },
  { id: 'afternoon-break', emoji: '🎈', labelFr: 'Récré' },
  { id: 'home', emoji: '🏠', labelFr: 'Retour' },
];
```

### Files to Modify

1. `src/types/diary.ts` - New type structure
2. `src/hooks/useDiary.ts` - Update to period-based logic
3. `src/components/diary/Timeline.tsx` - New layout with checkpoints + periods
4. `src/components/diary/TimeSlotCard.tsx` → Rename to `PeriodCard.tsx`
5. `src/components/diary/ActivityPicker.tsx` - Simplify (remove lunch handling)
6. `src/components/diary/DaySummary.tsx` - Update for new structure
7. `src/components/diary/CalendarView.tsx` - Update if needed

### New Components

1. `src/components/diary/CheckpointMarker.tsx` - Small emoji markers
2. `src/components/diary/LunchInput.tsx` - Menu text input popover

