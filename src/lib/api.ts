import { DayEntry } from '@/types/diary';

const API_URL = import.meta.env.VITE_API_URL as string | undefined;
const API_TOKEN = import.meta.env.VITE_API_TOKEN as string | undefined;

function headers(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  };
}

function isConfigured(): boolean {
  return Boolean(API_URL && API_TOKEN);
}

export async function fetchAllEntries(): Promise<Record<string, DayEntry> | null> {
  if (!isConfigured()) return null;
  try {
    const res = await fetch(`${API_URL}/api/entries`, { headers: headers() });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchEntry(date: string): Promise<DayEntry | null> {
  if (!isConfigured()) return null;
  try {
    const res = await fetch(`${API_URL}/api/entries/${date}`, { headers: headers() });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function saveEntry(date: string, entry: DayEntry): Promise<void> {
  if (!isConfigured()) return;
  try {
    await fetch(`${API_URL}/api/entries/${date}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(entry),
    });
  } catch {
    // Fire & forget — localStorage is the source of truth for immediate UX
  }
}
