

# Améliorations de l'UX des Activités

## Problèmes identifiés

1. **Bouton d'ajout caché** - Le formulaire d'ajout personnalisé prend beaucoup d'espace et peut cacher le bouton "Ajouter une activité personnalisée"
2. **Emoji picker limité** - Seulement ~56 emojis disponibles, mais tu veux des emojis spécifiques comme 📅 (calendrier)
3. **Affichage incomplet** - Sur la carte de période, seuls les emojis apparaissent sans le texte

---

## Solutions proposées

### 1. Corriger le bouton d'ajout caché

**Changements dans `ActivityPicker.tsx`:**
- Déplacer le bouton "Ajouter une activité personnalisée" AVANT la grille d'activités prédéfinies (ainsi il est toujours visible en haut)
- OU le mettre en sticky en bas du dialog, toujours visible
- Réduire la hauteur du formulaire d'emoji quand il est ouvert

### 2. Emoji Picker complet avec recherche

**Ajouter une bibliothèque d'emoji ou un système de recherche:**
- Intégrer `emoji-picker-react` ou créer un picker avec toutes les catégories Unicode
- Ajouter un champ de recherche pour trouver rapidement un emoji par mot-clé (ex: "calendar" → 📅)
- Garder les catégories actuelles comme raccourcis rapides

```text
┌────────────────────────────────────┐
│ 🔍 Rechercher un emoji...          │
├────────────────────────────────────┤
│ École | Sports | Arts | ... | Tous │
├────────────────────────────────────┤
│ 📅 📆 🗓️ 📝 📖 📚 ✏️ 🖍️ ...       │
└────────────────────────────────────┘
```

### 3. Afficher emoji + texte sur les cartes de période

**Changements dans `PeriodCard.tsx`:**
- Afficher l'emoji ET le label pour chaque activité
- Format compact: `📝 Écriture` au lieu de juste `📝`
- Pour les activités personnalisées: `📅 Date` avec le texte saisi

**Avant:**
```text
┌─────────────────┐
│     Matin       │
│  📝 📖 🔢 📚    │
└─────────────────┘
```

**Après:**
```text
┌─────────────────────┐
│       Matin         │
│ 📝 Écriture         │
│ 📖 Lecture          │
│ 📅 Date importante  │
└─────────────────────┘
```

---

## Détails techniques

### Fichiers à modifier

1. **`src/components/diary/ActivityPicker.tsx`**
   - Ajouter un composant `FullEmojiPicker` avec recherche
   - Réorganiser le layout pour que le bouton d'ajout soit toujours visible
   - Utiliser un dataset d'emojis plus complet

2. **`src/components/diary/PeriodCard.tsx`**
   - Modifier l'affichage pour montrer emoji + texte
   - Adapter le layout pour accommoder plus de contenu

3. **Nouvelle dépendance potentielle**
   - Option A: Créer notre propre dataset d'emojis (~200 emojis organisés)
   - Option B: Utiliser `emoji-picker-react` pour un picker complet avec recherche

### Exemple de données emoji étendues

```typescript
const EMOJI_DATA = {
  search: [
    { emoji: '📅', keywords: ['calendar', 'date', 'calendrier', 'jour'] },
    { emoji: '📆', keywords: ['calendar', 'date', 'calendrier'] },
    { emoji: '🗓️', keywords: ['calendar', 'spiral', 'calendrier'] },
    // ... beaucoup plus
  ],
  categories: {
    school: ['📝', '📖', '📚', ...],
    time: ['📅', '📆', '🗓️', '⏰', '🕐', ...],
    // ...
  }
};
```

### Nouveau layout du dialog

```text
┌──────────────────────────────────────┐
│ 📚 Matin                        [X]  │
├──────────────────────────────────────┤
│ ┌──────────────────────────────────┐ │
│ │ + Ajouter une activité perso     │ │ ← Toujours visible
│ └──────────────────────────────────┘ │
├──────────────────────────────────────┤
│ Activités                            │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│ │ 📝  │ │ 📖  │ │ 🔢  │ │ 🎨  │     │
│ │Écri.│ │Lect.│ │Math │ │Dessin│     │
│ └─────┘ └─────┘ └─────┘ └─────┘     │
│                ...                   │
├──────────────────────────────────────┤
│ Mes activités                        │
│ [📅 Date importante] [⭐ Special]    │
├──────────────────────────────────────┤
│                          [Terminé]   │
└──────────────────────────────────────┘
```

