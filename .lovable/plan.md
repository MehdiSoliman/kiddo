
# Amélioration UX des PeriodCards

## Problèmes identifiés

1. **Limite de 3 activités** : Le code actuel n'affiche que 3 activités puis "+X autre(s)" pour le reste
2. **Alignement centré verticalement** : `justify-center` centre le contenu, ce qui désaligne les cartes entre elles

## Modifications à apporter

### Fichier `src/components/diary/PeriodCard.tsx`

**1. Afficher toutes les activités (supprimer la limite)**

Changements :
- Supprimer les variables `displayCount`, `visibleActivities`, et `remainingCount`
- Afficher directement `allActivities` (toutes les activités)
- Supprimer le bloc qui affiche "+X autre(s)"

**2. Aligner les cartes par le haut**

Changements :
- Remplacer `justify-center` par `justify-start` dans le conteneur de contenu
- Garder le `min-h-[100px]` pour maintenir une hauteur minimale
- Les cartes seront ainsi alignées par le haut, et seul le bas grandira avec le contenu

---

## Avant / Après

**Avant :**
```text
┌─────────┐  ┌─────────┐  ┌─────────┐
│  Matin  │  │Fin mat. │  │  Après  │
│         │  │         │  │ 📖 Lect │
│ 📝 Écrit│  │ 📖 Lect │  │ 🎨 Dessin│
│ 🔢 Maths│  │         │  │ 🧩 Puzzle│
│ +2 autres│ │         │  │         │
└─────────┘  └─────────┘  └─────────┘
   ↑ centré    ↑ centré    ↑ centré
```

**Après :**
```text
┌─────────┐  ┌─────────┐  ┌─────────┐
│  Matin  │  │Fin mat. │  │  Après  │
│ 📝 Écrit│  │ 📖 Lect │  │ 📖 Lect │
│ 🔢 Maths│  │         │  │ 🎨 Dessin│
│ 🎵 Musiq│  │         │  │ 🧩 Puzzle│
│ 📖 Lect │  │         │  │ 🎵 Musiq│
│ 🎨 Dessin│ │         │  │         │
└─────────┘  └─────────┘  └─────────┘
   ↑ toutes    ↑ aligné    ↑ toutes
     visibles    en haut     visibles
```

---

## Détails techniques

### Code modifié dans PeriodCard.tsx

```typescript
// Avant
const displayCount = 3;
const visibleActivities = allActivities.slice(0, displayCount);
const remainingCount = allActivities.length - displayCount;

// Après : supprimé - on utilise directement allActivities
```

```typescript
// Avant
<div className="flex-1 flex flex-col justify-center">

// Après
<div className="flex-1 flex flex-col justify-start">
```

```typescript
// Supprimer ce bloc
{remainingCount > 0 && (
  <p className="text-xs text-muted-foreground font-medium pl-6">
    +{remainingCount} autre{remainingCount > 1 ? 's' : ''}
  </p>
)}
```

### Alignement dans Timeline.tsx (desktop)

Le layout horizontal desktop utilise `items-center`. Pour aligner les cartes par le haut, il faudra aussi modifier la ligne 36 :

```typescript
// Avant
<div className="hidden md:flex items-center justify-between gap-2">

// Après
<div className="hidden md:flex items-start justify-between gap-2">
```

Cela garantit que les cartes s'alignent par le haut dans la vue desktop.
