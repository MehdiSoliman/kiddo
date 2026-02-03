export type TimeSlotId = 
  | 'start' 
  | 'morning-break' 
  | 'lunch' 
  | 'afternoon-break' 
  | 'home';

export interface Activity {
  id: string;
  emoji: string;
  label: string;
  labelFr: string;
}

export interface CustomActivity {
  id: string;
  emoji: string;
  text: string;
}

export interface TimeSlotEntry {
  activities: string[]; // Activity IDs
  customActivities: CustomActivity[];
  lunchMenu?: string; // Only for lunch slot
}

export interface DayEntry {
  date: string; // ISO date string YYYY-MM-DD
  slots: Record<TimeSlotId, TimeSlotEntry>;
}

export interface TimeSlotConfig {
  id: TimeSlotId;
  emoji: string;
  label: string;
  labelFr: string;
  color: 'lavender' | 'mint' | 'peach' | 'sky' | 'rose';
}

export const TIME_SLOTS: TimeSlotConfig[] = [
  { id: 'start', emoji: '🌅', label: 'Start of school', labelFr: 'Début d\'école', color: 'lavender' },
  { id: 'morning-break', emoji: '☕', label: 'Morning break', labelFr: 'Récréation du matin', color: 'mint' },
  { id: 'lunch', emoji: '🍽️', label: 'Lunch', labelFr: 'Déjeuner', color: 'peach' },
  { id: 'afternoon-break', emoji: '🎈', label: 'Afternoon break', labelFr: 'Récréation de l\'après-midi', color: 'sky' },
  { id: 'home', emoji: '🏠', label: 'Back home', labelFr: 'Retour à la maison', color: 'rose' },
];

export const ACTIVITIES: Activity[] = [
  { id: 'writing', emoji: '📝', label: 'Writing', labelFr: 'Écriture' },
  { id: 'reading', emoji: '📖', label: 'Reading', labelFr: 'Lecture' },
  { id: 'math', emoji: '🔢', label: 'Math', labelFr: 'Mathématiques' },
  { id: 'art', emoji: '🎨', label: 'Art', labelFr: 'Dessin' },
  { id: 'music', emoji: '🎵', label: 'Music', labelFr: 'Musique' },
  { id: 'sports', emoji: '🤸', label: 'Sports', labelFr: 'Gym' },
  { id: 'outside', emoji: '🌳', label: 'Outside play', labelFr: 'Jeux dehors' },
  { id: 'puzzles', emoji: '🧩', label: 'Games/Puzzles', labelFr: 'Jeux/Puzzles' },
  { id: 'friends', emoji: '💬', label: 'Talking with friends', labelFr: 'Discuter avec les amis' },
  { id: 'science', emoji: '🔬', label: 'Science', labelFr: 'Sciences' },
  { id: 'computer', emoji: '💻', label: 'Computer', labelFr: 'Ordinateur' },
  { id: 'crafts', emoji: '✂️', label: 'Crafts', labelFr: 'Bricolage' },
  { id: 'story', emoji: '📚', label: 'Story time', labelFr: 'Histoire' },
  { id: 'singing', emoji: '🎤', label: 'Singing', labelFr: 'Chanter' },
  { id: 'dance', emoji: '💃', label: 'Dance', labelFr: 'Danse' },
  { id: 'rest', emoji: '😴', label: 'Rest', labelFr: 'Repos' },
];

export const createEmptySlotEntry = (): TimeSlotEntry => ({
  activities: [],
  customActivities: [],
});

export const createEmptyDayEntry = (date: string): DayEntry => ({
  date,
  slots: {
    'start': createEmptySlotEntry(),
    'morning-break': createEmptySlotEntry(),
    'lunch': createEmptySlotEntry(),
    'afternoon-break': createEmptySlotEntry(),
    'home': createEmptySlotEntry(),
  },
});