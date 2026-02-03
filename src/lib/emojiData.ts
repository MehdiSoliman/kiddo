// Extended emoji data with search keywords for the full emoji picker
export interface EmojiItem {
  emoji: string;
  keywords: string[];
}

export interface EmojiCategory {
  id: string;
  label: string;
  emojis: EmojiItem[];
}

export const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    id: 'school',
    label: 'École',
    emojis: [
      { emoji: '📝', keywords: ['écriture', 'writing', 'note', 'cahier'] },
      { emoji: '📖', keywords: ['livre', 'book', 'lecture', 'reading'] },
      { emoji: '📚', keywords: ['livres', 'books', 'bibliothèque', 'library'] },
      { emoji: '✏️', keywords: ['crayon', 'pencil', 'écrire', 'write'] },
      { emoji: '🖍️', keywords: ['crayon', 'crayola', 'colorier', 'coloring'] },
      { emoji: '📐', keywords: ['équerre', 'géométrie', 'geometry', 'ruler'] },
      { emoji: '🎒', keywords: ['sac', 'bag', 'école', 'school', 'cartable'] },
      { emoji: '🏫', keywords: ['école', 'school', 'bâtiment', 'building'] },
      { emoji: '📏', keywords: ['règle', 'ruler', 'mesurer', 'measure'] },
      { emoji: '✂️', keywords: ['ciseaux', 'scissors', 'découper', 'cut'] },
      { emoji: '🔬', keywords: ['science', 'microscope', 'laboratoire', 'lab'] },
      { emoji: '🧪', keywords: ['chimie', 'chemistry', 'expérience', 'experiment'] },
      { emoji: '🔢', keywords: ['mathématiques', 'math', 'chiffres', 'numbers'] },
      { emoji: '🧮', keywords: ['calculer', 'calculate', 'abaque', 'abacus'] },
      { emoji: '💻', keywords: ['ordinateur', 'computer', 'informatique'] },
    ],
  },
  {
    id: 'sports',
    label: 'Sports',
    emojis: [
      { emoji: '⚽', keywords: ['football', 'soccer', 'ballon', 'ball'] },
      { emoji: '🏀', keywords: ['basket', 'basketball', 'ballon'] },
      { emoji: '🎾', keywords: ['tennis', 'raquette', 'racket'] },
      { emoji: '🏃', keywords: ['course', 'running', 'courir', 'run'] },
      { emoji: '🤸', keywords: ['gymnastique', 'gymnastics', 'gym', 'acrobatie'] },
      { emoji: '🚴', keywords: ['vélo', 'bike', 'cycling', 'bicycle'] },
      { emoji: '🏊', keywords: ['natation', 'swimming', 'nager', 'piscine'] },
      { emoji: '⛹️', keywords: ['basket', 'basketball', 'jouer'] },
      { emoji: '🏐', keywords: ['volleyball', 'volley', 'ballon'] },
      { emoji: '🥅', keywords: ['but', 'goal', 'hockey', 'foot'] },
      { emoji: '🏆', keywords: ['trophée', 'trophy', 'gagner', 'win', 'victoire'] },
      { emoji: '🥇', keywords: ['médaille', 'medal', 'premier', 'first', 'gold'] },
      { emoji: '⚾', keywords: ['baseball', 'balle', 'ball'] },
      { emoji: '🎿', keywords: ['ski', 'neige', 'snow', 'winter'] },
      { emoji: '🛹', keywords: ['skateboard', 'skate', 'planche'] },
    ],
  },
  {
    id: 'arts',
    label: 'Arts',
    emojis: [
      { emoji: '🎨', keywords: ['peinture', 'painting', 'art', 'dessin', 'palette'] },
      { emoji: '🎭', keywords: ['théâtre', 'theater', 'masque', 'mask', 'drama'] },
      { emoji: '🎪', keywords: ['cirque', 'circus', 'spectacle', 'show'] },
      { emoji: '🎵', keywords: ['musique', 'music', 'note', 'chanson', 'song'] },
      { emoji: '🎤', keywords: ['chanter', 'singing', 'micro', 'microphone', 'karaoke'] },
      { emoji: '🎹', keywords: ['piano', 'clavier', 'keyboard', 'musique'] },
      { emoji: '🎸', keywords: ['guitare', 'guitar', 'musique', 'rock'] },
      { emoji: '🎬', keywords: ['cinéma', 'cinema', 'film', 'movie', 'vidéo'] },
      { emoji: '🎻', keywords: ['violon', 'violin', 'musique', 'classique'] },
      { emoji: '🥁', keywords: ['tambour', 'drums', 'batterie', 'percussion'] },
      { emoji: '🎷', keywords: ['saxophone', 'jazz', 'musique'] },
      { emoji: '🎺', keywords: ['trompette', 'trumpet', 'musique'] },
      { emoji: '💃', keywords: ['danse', 'dance', 'danser', 'dancing'] },
      { emoji: '🩰', keywords: ['ballet', 'danse', 'dance', 'classique'] },
      { emoji: '🖼️', keywords: ['tableau', 'painting', 'art', 'cadre', 'frame'] },
    ],
  },
  {
    id: 'nature',
    label: 'Nature',
    emojis: [
      { emoji: '🌳', keywords: ['arbre', 'tree', 'forêt', 'forest', 'nature'] },
      { emoji: '🌸', keywords: ['fleur', 'flower', 'cerisier', 'cherry', 'printemps'] },
      { emoji: '🌻', keywords: ['tournesol', 'sunflower', 'fleur', 'flower'] },
      { emoji: '🐦', keywords: ['oiseau', 'bird', 'voler', 'fly'] },
      { emoji: '🦋', keywords: ['papillon', 'butterfly', 'insecte'] },
      { emoji: '🐶', keywords: ['chien', 'dog', 'animal', 'pet'] },
      { emoji: '🐱', keywords: ['chat', 'cat', 'animal', 'pet'] },
      { emoji: '🐰', keywords: ['lapin', 'rabbit', 'bunny', 'animal'] },
      { emoji: '🌈', keywords: ['arc-en-ciel', 'rainbow', 'couleurs', 'colors'] },
      { emoji: '☀️', keywords: ['soleil', 'sun', 'été', 'summer', 'beau'] },
      { emoji: '🌙', keywords: ['lune', 'moon', 'nuit', 'night'] },
      { emoji: '⭐', keywords: ['étoile', 'star', 'nuit', 'briller'] },
      { emoji: '🌊', keywords: ['vague', 'wave', 'mer', 'sea', 'océan'] },
      { emoji: '🐢', keywords: ['tortue', 'turtle', 'lent', 'slow'] },
      { emoji: '🦆', keywords: ['canard', 'duck', 'oiseau', 'bird'] },
    ],
  },
  {
    id: 'food',
    label: 'Nourriture',
    emojis: [
      { emoji: '🍎', keywords: ['pomme', 'apple', 'fruit', 'rouge'] },
      { emoji: '🍕', keywords: ['pizza', 'repas', 'meal', 'italien'] },
      { emoji: '🍦', keywords: ['glace', 'ice cream', 'dessert', 'été'] },
      { emoji: '🧁', keywords: ['cupcake', 'gâteau', 'cake', 'dessert'] },
      { emoji: '🍪', keywords: ['cookie', 'biscuit', 'goûter', 'snack'] },
      { emoji: '🥤', keywords: ['boisson', 'drink', 'jus', 'juice'] },
      { emoji: '🍩', keywords: ['donut', 'beignet', 'dessert', 'sucré'] },
      { emoji: '🍫', keywords: ['chocolat', 'chocolate', 'bonbon', 'candy'] },
      { emoji: '🥪', keywords: ['sandwich', 'pain', 'bread', 'déjeuner'] },
      { emoji: '🍔', keywords: ['hamburger', 'burger', 'repas', 'meal'] },
      { emoji: '🍟', keywords: ['frites', 'fries', 'patates', 'potatoes'] },
      { emoji: '🍝', keywords: ['pâtes', 'pasta', 'spaghetti', 'italien'] },
      { emoji: '🥗', keywords: ['salade', 'salad', 'légumes', 'vegetables'] },
      { emoji: '🍰', keywords: ['gâteau', 'cake', 'dessert', 'anniversaire'] },
      { emoji: '🍓', keywords: ['fraise', 'strawberry', 'fruit', 'rouge'] },
    ],
  },
  {
    id: 'time',
    label: 'Temps',
    emojis: [
      { emoji: '📅', keywords: ['calendrier', 'calendar', 'date', 'jour', 'day'] },
      { emoji: '📆', keywords: ['calendrier', 'calendar', 'date', 'planning'] },
      { emoji: '🗓️', keywords: ['calendrier', 'calendar', 'spiral', 'planning'] },
      { emoji: '⏰', keywords: ['réveil', 'alarm', 'clock', 'heure', 'time'] },
      { emoji: '🕐', keywords: ['horloge', 'clock', 'heure', 'time', 'one'] },
      { emoji: '⏱️', keywords: ['chronomètre', 'stopwatch', 'timer', 'temps'] },
      { emoji: '⌚', keywords: ['montre', 'watch', 'heure', 'time'] },
      { emoji: '🌅', keywords: ['matin', 'morning', 'lever', 'sunrise'] },
      { emoji: '🌇', keywords: ['soir', 'evening', 'coucher', 'sunset'] },
      { emoji: '🌃', keywords: ['nuit', 'night', 'ville', 'city'] },
      { emoji: '🔔', keywords: ['cloche', 'bell', 'sonnerie', 'ring'] },
      { emoji: '📣', keywords: ['annonce', 'announcement', 'appel'] },
    ],
  },
  {
    id: 'fun',
    label: 'Divertissement',
    emojis: [
      { emoji: '⭐', keywords: ['étoile', 'star', 'spécial', 'special'] },
      { emoji: '❤️', keywords: ['coeur', 'heart', 'amour', 'love'] },
      { emoji: '✨', keywords: ['étincelle', 'sparkle', 'magie', 'magic'] },
      { emoji: '🎁', keywords: ['cadeau', 'gift', 'present', 'anniversaire'] },
      { emoji: '🎯', keywords: ['cible', 'target', 'objectif', 'goal'] },
      { emoji: '🎮', keywords: ['jeu vidéo', 'video game', 'gaming', 'jouer'] },
      { emoji: '🧩', keywords: ['puzzle', 'jeu', 'game', 'réflexion'] },
      { emoji: '🎲', keywords: ['dé', 'dice', 'jeu', 'game', 'chance'] },
      { emoji: '🎉', keywords: ['fête', 'party', 'célébration', 'celebration'] },
      { emoji: '🎈', keywords: ['ballon', 'balloon', 'fête', 'party'] },
      { emoji: '🎊', keywords: ['confetti', 'fête', 'party', 'célébration'] },
      { emoji: '🏅', keywords: ['médaille', 'medal', 'récompense', 'reward'] },
      { emoji: '🎠', keywords: ['manège', 'carousel', 'fête foraine', 'fair'] },
      { emoji: '🎡', keywords: ['grande roue', 'ferris wheel', 'fête foraine'] },
      { emoji: '🌟', keywords: ['étoile', 'star', 'brillant', 'shiny'] },
    ],
  },
  {
    id: 'people',
    label: 'Personnes',
    emojis: [
      { emoji: '👋', keywords: ['salut', 'hello', 'bonjour', 'wave', 'main'] },
      { emoji: '🤝', keywords: ['poignée de main', 'handshake', 'accord', 'deal'] },
      { emoji: '💬', keywords: ['parler', 'talk', 'discussion', 'chat', 'message'] },
      { emoji: '👨‍👩‍👧', keywords: ['famille', 'family', 'parents', 'enfant'] },
      { emoji: '👩‍🏫', keywords: ['maîtresse', 'teacher', 'professeur', 'école'] },
      { emoji: '👫', keywords: ['amis', 'friends', 'couple', 'ensemble'] },
      { emoji: '🙋', keywords: ['lever la main', 'raise hand', 'question', 'réponse'] },
      { emoji: '💪', keywords: ['force', 'strength', 'muscle', 'fort', 'strong'] },
      { emoji: '🤗', keywords: ['câlin', 'hug', 'bisou', 'amour'] },
      { emoji: '😊', keywords: ['sourire', 'smile', 'content', 'happy'] },
      { emoji: '😂', keywords: ['rire', 'laugh', 'drôle', 'funny'] },
      { emoji: '🥰', keywords: ['amour', 'love', 'coeur', 'heart'] },
      { emoji: '🤔', keywords: ['réfléchir', 'think', 'question', 'hmm'] },
      { emoji: '😴', keywords: ['dormir', 'sleep', 'fatigue', 'tired', 'repos'] },
      { emoji: '🤩', keywords: ['wow', 'incroyable', 'amazing', 'étoiles'] },
    ],
  },
  {
    id: 'places',
    label: 'Lieux',
    emojis: [
      { emoji: '🏠', keywords: ['maison', 'home', 'house', 'domicile'] },
      { emoji: '🏫', keywords: ['école', 'school', 'bâtiment'] },
      { emoji: '🏛️', keywords: ['musée', 'museum', 'monument', 'culture'] },
      { emoji: '🏟️', keywords: ['stade', 'stadium', 'sport', 'match'] },
      { emoji: '🏥', keywords: ['hôpital', 'hospital', 'docteur', 'doctor'] },
      { emoji: '🏪', keywords: ['magasin', 'shop', 'store', 'courses'] },
      { emoji: '🏖️', keywords: ['plage', 'beach', 'vacances', 'été'] },
      { emoji: '🏕️', keywords: ['camping', 'tente', 'tent', 'nature'] },
      { emoji: '⛪', keywords: ['église', 'church', 'religion'] },
      { emoji: '🚌', keywords: ['bus', 'transport', 'école', 'school bus'] },
      { emoji: '🚗', keywords: ['voiture', 'car', 'auto', 'transport'] },
      { emoji: '✈️', keywords: ['avion', 'plane', 'voyage', 'travel'] },
    ],
  },
  {
    id: 'weather',
    label: 'Météo',
    emojis: [
      { emoji: '☀️', keywords: ['soleil', 'sun', 'beau', 'sunny'] },
      { emoji: '🌤️', keywords: ['nuageux', 'cloudy', 'soleil', 'sun'] },
      { emoji: '⛅', keywords: ['nuage', 'cloud', 'soleil', 'sun'] },
      { emoji: '🌧️', keywords: ['pluie', 'rain', 'pleuvoir', 'rainy'] },
      { emoji: '⛈️', keywords: ['orage', 'storm', 'tonnerre', 'thunder'] },
      { emoji: '❄️', keywords: ['neige', 'snow', 'froid', 'cold', 'hiver'] },
      { emoji: '🌨️', keywords: ['neige', 'snow', 'flocon', 'snowflake'] },
      { emoji: '💨', keywords: ['vent', 'wind', 'souffle', 'blow'] },
      { emoji: '🌬️', keywords: ['vent', 'wind', 'souffle', 'blow'] },
      { emoji: '🌡️', keywords: ['température', 'temperature', 'chaud', 'froid'] },
    ],
  },
];

// Flatten all emojis for search
export const ALL_EMOJIS: EmojiItem[] = EMOJI_CATEGORIES.flatMap(cat => cat.emojis);

// Search function
export const searchEmojis = (query: string): EmojiItem[] => {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return ALL_EMOJIS.filter(item =>
    item.keywords.some(keyword => 
      keyword.toLowerCase().includes(normalizedQuery)
    ) || item.emoji.includes(normalizedQuery)
  );
};
