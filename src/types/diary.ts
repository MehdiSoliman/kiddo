// Checkpoint markers on the timeline (visual anchors)
export type CheckpointId = 
  | 'start' 
  | 'morning-break' 
  | 'lunch' 
  | 'afternoon-break' 
  | 'home';

// Periods between checkpoints (where activities happen)
export type PeriodId = 
  | 'morning' 
  | 'late-morning' 
  | 'afternoon' 
  | 'late-afternoon';

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

export interface PeriodEntry {
  activities: string[]; // Activity IDs
  customActivities: CustomActivity[];
}

export interface DayEntry {
  date: string; // ISO date string YYYY-MM-DD
  periods: Record<PeriodId, PeriodEntry>;
  lunchMenu?: string;
}

export interface CheckpointConfig {
  id: CheckpointId;
  emoji: string;
  labelFr: string;
}

export interface PeriodConfig {
  id: PeriodId;
  labelFr: string;
  startCheckpoint: CheckpointId;
  endCheckpoint: CheckpointId;
  color: 'lavender' | 'mint' | 'peach' | 'sky' | 'rose';
}

export const CHECKPOINTS: CheckpointConfig[] = [
  { id: 'start', emoji: '🌅', labelFr: 'Début' },
  { id: 'morning-break', emoji: '☕', labelFr: 'Récré' },
  { id: 'lunch', emoji: '🍽️', labelFr: 'Déjeuner' },
  { id: 'afternoon-break', emoji: '🎈', labelFr: 'Récré' },
  { id: 'home', emoji: '🏠', labelFr: 'Retour' },
];

export const PERIODS: PeriodConfig[] = [
  { id: 'morning', labelFr: 'Matin', startCheckpoint: 'start', endCheckpoint: 'morning-break', color: 'lavender' },
  { id: 'late-morning', labelFr: 'Fin de matin', startCheckpoint: 'morning-break', endCheckpoint: 'lunch', color: 'mint' },
  { id: 'afternoon', labelFr: 'Après-midi', startCheckpoint: 'lunch', endCheckpoint: 'afternoon-break', color: 'sky' },
  { id: 'late-afternoon', labelFr: 'Fin d\'après-midi', startCheckpoint: 'afternoon-break', endCheckpoint: 'home', color: 'rose' },
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

export const createEmptyPeriodEntry = (): PeriodEntry => ({
  activities: [],
  customActivities: [],
});

export const createEmptyDayEntry = (date: string): DayEntry => ({
  date,
  periods: {
    'morning': createEmptyPeriodEntry(),
    'late-morning': createEmptyPeriodEntry(),
    'afternoon': createEmptyPeriodEntry(),
    'late-afternoon': createEmptyPeriodEntry(),
  },
  lunchMenu: '',
});
