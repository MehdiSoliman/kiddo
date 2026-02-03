
# Vue Semaine & Vérification de la Sauvegarde

## Analyse

### Sauvegarde des données
L'app utilise déjà localStorage pour sauvegarder les données (dans `useDiary.ts`). Chaque modification est automatiquement sauvegardée. Si tu perds les données, c'est peut-être lié à :
- Navigation privée (les données ne persistent pas)
- Nettoyage du navigateur

Je vais vérifier le bon fonctionnement de la sauvegarde.

### Vue semaine
Tu veux voir toute la semaine d'un coup pour comparer les jours - super idée pour un journal d'école !

---

## Nouvelle vue : Ma Semaine

```text
┌─────────────────────────────────────────────────────────────────┐
│  📚 Ma Journée d'École                                          │
│  Semaine du 3 février 2025                                      │
│                                                                 │
│  [Aujourd'hui] [Semaine] [Calendrier]    ← Nouveau bouton       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ LUNDI 3 FÉVRIER                                                  │
├──────────┬──────────┬──────────┬──────────┬──────────────────────┤
│  Matin   │ Fin mat. │   Midi   │  Après   │  Fin d'après-midi    │
│ 📝 Écrit │ 📖 Lect. │ 🍕 Pizza │ 🎨 Dessin│  📚 Histoire         │
│ 🔢 Maths │          │          │          │                      │
└──────────┴──────────┴──────────┴──────────┴──────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ MARDI 4 FÉVRIER                                                  │
├──────────┬──────────┬──────────┬──────────┬──────────────────────┤
│  Matin   │ Fin mat. │   Midi   │  Après   │  Fin d'après-midi    │
│ 📖 Lect. │ 🎵 Musiq │ 🥗 Salade│ 🤸 Gym   │  🧩 Puzzles          │
└──────────┴──────────┴──────────┴──────────┴──────────────────────┘

... (Mercredi, Jeudi, Vendredi)
```

---

## Fichiers à modifier/créer

### 1. Nouveau composant `WeekView.tsx`
Affiche les 5 jours de la semaine (Lundi → Vendredi) avec :
- En-tête avec le jour et la date
- 4 colonnes pour les périodes + 1 pour le déjeuner
- Activités affichées avec emoji + texte
- Jours empilés verticalement pour comparaison facile

### 2. Modifier `Header.tsx`
Ajouter un 3ème bouton "Semaine" entre "Aujourd'hui" et "Calendrier"

### 3. Modifier `Index.tsx`
Gérer la nouvelle vue "week" en plus de "timeline" et "calendar"

### 4. Modifier `useDiary.ts`
Ajouter une fonction `getWeekEntries()` pour récupérer tous les jours de la semaine courante

---

## Détails techniques

### Calcul de la semaine
Utiliser `date-fns` pour :
- `startOfWeek(date, { weekStartsOn: 1 })` → Obtenir le lundi
- `eachDayOfInterval` → Générer les 5 jours (Lun-Ven)

### Structure du composant WeekView

```typescript
const WeekView = () => {
  const { getEntry } = useDiary();
  const weekDays = getWeekDays(new Date()); // [Lundi, Mardi, ...]
  
  return (
    <div className="space-y-4">
      {weekDays.map(day => (
        <DayRow key={day} date={day} entry={getEntry(day)} />
      ))}
    </div>
  );
};
```

### DayRow - Une ligne par jour

```typescript
const DayRow = ({ date, entry }) => (
  <div className="bg-card rounded-xl p-4">
    <h3>LUNDI 3 FÉVRIER</h3>
    <div className="grid grid-cols-5 gap-2">
      {PERIODS.map(period => (
        <PeriodColumn period={period} entry={entry?.periods[period.id]} />
      ))}
      <LunchColumn menu={entry?.lunchMenu} />
    </div>
  </div>
);
```
