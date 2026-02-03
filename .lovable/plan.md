
# Améliorations de la Vue Semaine

## Changements demandés

1. **Réorganiser les colonnes** : Matin → Fin de matin → Midi → Après-midi → Fin d'après-midi
2. **Rendre les jours cliquables** : Cliquer sur un jour ouvre la vue timeline avec ce jour sélectionné

---

## Modifications à apporter

### Fichier `src/components/diary/WeekView.tsx`

**1. Réorganiser la grille des colonnes**

Actuellement les périodes sont affichées dans l'ordre, puis Midi à la fin :
```text
Matin | Fin de matin | Après-midi | Fin d'après-midi | Midi
```

Nouveau layout avec Midi au milieu :
```text
Matin | Fin de matin | Midi | Après-midi | Fin d'après-midi
```

**2. Ajouter le callback de sélection**

- Accepter une prop `onDayClick: (date: Date) => void`
- Ajouter un style `cursor-pointer` et effet `hover` sur chaque jour
- Appeler `onDayClick` avec la date du jour cliqué

### Fichier `src/pages/Index.tsx`

**3. Gérer la navigation depuis WeekView**

Quand un jour est cliqué dans WeekView :
- Mettre à jour `selectedDate` avec la date cliquée
- Changer la vue vers `timeline`

---

## Aperçu du résultat

```text
┌──────────────────────────────────────────────────────────────────┐
│ LUNDI 3 FÉVRIER                                      → Cliquable │
├──────────┬──────────┬──────────┬──────────┬──────────────────────┤
│  Matin   │ Fin mat. │   Midi   │  Après   │  Fin d'après-midi    │
│ 📝 Écrit │ 📖 Lect. │ 🍕 Pizza │ 🎨 Dessin│  📚 Histoire         │
└──────────┴──────────┴──────────┴──────────┴──────────────────────┘
```

Au clic sur ce bloc → Vue "Aujourd'hui" avec Lundi 3 Février sélectionné

---

## Détails techniques

### WeekView.tsx - Nouvelle structure de la grille

```typescript
// Ordre des colonnes : Matin, Fin de matin, Midi, Après-midi, Fin d'après-midi
<div className="grid grid-cols-5 divide-x">
  {/* Matin */}
  <PeriodColumn period="morning" ... />
  
  {/* Fin de matin */}
  <PeriodColumn period="late-morning" ... />
  
  {/* Midi - au milieu maintenant */}
  <LunchColumn ... />
  
  {/* Après-midi */}
  <PeriodColumn period="afternoon" ... />
  
  {/* Fin d'après-midi */}
  <PeriodColumn period="late-afternoon" ... />
</div>
```

### Index.tsx - Gestion du clic

```typescript
const handleDayClick = (date: Date) => {
  setSelectedDate(date);
  setView('timeline');
};

// Dans le JSX
<WeekView onDayClick={handleDayClick} />
```
