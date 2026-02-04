# Kiddo — Ma Journée d'École

Journal scolaire quotidien pour enfants. L'enfant sélectionne les activités faites pendant chaque période de sa journée d'école.

## Fonctionnalités

- 4 périodes de la journée : matin, fin de matin, après-midi, fin d'après-midi
- 16 activités prédéfinies + activités personnalisées avec emoji
- Menu du déjeuner
- 3 vues : timeline, semaine, calendrier
- Sauvegarde locale (localStorage) + backup distant optionnel (Cloudflare KV)

## Stack technique

- React + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Cloudflare Workers + KV (backup distant)

## Démarrage rapide

```bash
npm install
npm run dev
```

L'app tourne sur `http://localhost:8080`.

### Backup distant (optionnel)

Pour activer la synchronisation avec Cloudflare KV :

1. Copier `.env.example` vers `.env.local`
2. Renseigner `VITE_API_URL` et `VITE_API_TOKEN`
3. Déployer le worker :

```bash
cd worker
npm install
npm run deploy
```

Sans ces variables d'environnement, l'app fonctionne en mode localStorage uniquement.

## Scripts

```bash
npm run dev          # Serveur de dev (port 8080)
npm run build        # Build de production
npm run test         # Tests (Vitest)
npm run lint         # ESLint
```
