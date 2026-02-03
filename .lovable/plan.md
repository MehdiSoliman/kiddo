
# Correction : Afficher les données du jour sélectionné

## Problème identifié

Le composant `Timeline` appelle `useDiary()` de manière indépendante, créant son propre état `selectedDate` initialisé à aujourd'hui. Quand tu cliques sur un autre jour dans la vue Semaine :

1. `Index.tsx` met à jour sa propre `selectedDate`
2. `Timeline` ignore cette date et utilise toujours sa propre date (aujourd'hui)
3. Résultat : tu vois toujours les activités d'aujourd'hui

## Solution

Passer la `selectedDate` en prop à `Timeline` et modifier `useDiary` pour qu'il accepte une date externe.

---

## Fichiers à modifier

### 1. `src/hooks/useDiary.ts`

Modifier le hook pour accepter une date optionnelle en paramètre :

```typescript
export const useDiary = (externalDate?: Date) => {
  const [entries, setEntries] = useState<Record<string, DayEntry>>({});
  const [internalDate, setInternalDate] = useState<Date>(new Date());
  
  // Utiliser la date externe si fournie, sinon la date interne
  const selectedDate = externalDate ?? internalDate;
  const setSelectedDate = setInternalDate;
  
  // ... reste du code inchangé
}
```

### 2. `src/components/diary/Timeline.tsx`

Accepter une prop `selectedDate` et la passer à `useDiary` :

```typescript
interface TimelineProps {
  selectedDate?: Date;
}

export const Timeline = ({ selectedDate }: TimelineProps) => {
  const { 
    currentEntry, 
    toggleActivity, 
    // ...
  } = useDiary(selectedDate);
  
  // ... reste inchangé
};
```

### 3. `src/pages/Index.tsx`

Passer la date sélectionnée à `Timeline` :

```typescript
{view === 'timeline' ? (
  <Timeline selectedDate={selectedDate} />
) : ...}
```

---

## Comportement après correction

| Action | Résultat |
|--------|----------|
| Clic sur Lundi dans vue Semaine | Timeline affiche les activités de Lundi |
| Ajout d'une activité | Sauvegardée pour le jour affiché (pas aujourd'hui) |
| Navigation vers un jour futur | Possibilité d'éditer ce jour à l'avance |

---

## Détails techniques

Le `dateKey` utilisé pour sauvegarder/charger les données sera automatiquement basé sur la bonne date grâce à cette modification. Toutes les fonctions (`toggleActivity`, `addCustomActivity`, etc.) utiliseront le bon `dateKey` correspondant à la date affichée.
