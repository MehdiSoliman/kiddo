

# Enhance Activity Selection & Editing

## Overview

Two improvements to the activity picker:
1. Expand the emoji selection for custom activities
2. Add the ability to edit existing custom activities

---

## Changes

### 1. Expanded Emoji Picker

**Current state:** 12 emojis to choose from
```
⭐ ❤️ 🌟 ✨ 🎁 🎯 🌈 🦋 🐶 🐱 🎪 🎭
```

**New design:** Organized emoji categories with 50+ options

| Category | Emojis |
|----------|--------|
| School | 📝 📖 📚 ✏️ 🖍️ 📐 🎒 🏫 |
| Sports | ⚽ 🏀 🎾 🏃 🤸 🚴 🏊 ⛹️ |
| Arts | 🎨 🎭 🎪 🎵 🎤 🎹 🎸 🎬 |
| Nature | 🌳 🌸 🌻 🐦 🦋 🐶 🐱 🐰 |
| Food | 🍎 🍕 🍦 🧁 🍪 🥤 🍩 🍫 |
| Fun | ⭐ ❤️ 🌈 ✨ 🎁 🎯 🎮 🧩 |
| People | 👋 🤝 💬 👨‍👩‍👧 👩‍🏫 👫 🙋 💪 |

The emoji picker will show categories as tabs or scrollable sections within the custom activity form.

### 2. Edit Custom Activities

**Current behavior:** 
- Click X to delete a custom activity
- No way to edit

**New behavior:**
- Click on a custom activity to edit it
- Opens inline edit form with:
  - Emoji selector (same expanded picker)
  - Text input pre-filled with current text
  - Save button
  - Cancel button
- X button still available for quick delete

---

## Files to Modify

### `src/components/diary/ActivityPicker.tsx`

1. **Expand emoji list** - Replace the 12 emojis with categorized groups
2. **Add EmojiPicker component** (inline or separate) - Shows categories, allows scrolling/browsing
3. **Add edit mode for custom activities** - When clicking a custom activity, switch to edit mode
4. **Add state management** - Track which activity is being edited

### `src/hooks/useDiary.ts`

1. **Add `updateCustomActivity` function** - Update an existing custom activity by ID

### `src/types/diary.ts`

No changes needed - CustomActivity type already has `id`, `emoji`, `text`

---

## Technical Details

### New function in useDiary hook

```typescript
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
```

### UI Flow for Editing

1. User sees custom activity pill: `[⭐ Mon activité] [X]`
2. User clicks on the pill (not the X)
3. Pill transforms into edit form inline:
   - Emoji selector appears
   - Text input with current value
   - Save/Cancel buttons
4. User makes changes and clicks Save
5. Form closes, updated activity shown

### Emoji Categories Data Structure

```typescript
const EMOJI_CATEGORIES = [
  { 
    id: 'school', 
    label: 'École', 
    emojis: ['📝', '📖', '📚', '✏️', '🖍️', '📐', '🎒', '🏫'] 
  },
  { 
    id: 'sports', 
    label: 'Sports', 
    emojis: ['⚽', '🏀', '🎾', '🏃', '🤸', '🚴', '🏊', '⛹️'] 
  },
  // ... more categories
];
```

