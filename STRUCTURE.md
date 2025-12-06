# Structure du Projet BOOMKŒUR.EXE

## Organisation des fichiers

```
Slider/
├── index.html                 # Page d'accueil (Dashboard)
├── pages/                     # Pages du site
│   ├── template.html          # Template de base pour nouvelles pages
│   ├── gouvernance.html       # Page Gouvernance
│   ├── membres.html           # Page Membres & Rôles
│   ├── projets.html           # Page Projets
│   ├── documents.html         # Page Documents
│   ├── communication.html     # Page Communication
│   ├── principes.html         # Page Principes
│   └── analyses.html          # Page Analyses
├── assets/                    # Ressources statiques
│   ├── css/
│   │   └── styles.css         # Styles principaux
│   ├── js/
│   │   ├── script.js          # Script principal (slider)
│   │   └── navigation.js      # Gestion de la navigation
│   └── images/                # Images du site
├── components/                 # Composants réutilisables
│   ├── header.html             # Composant Header
│   └── sidebar.html            # Composant Sidebar
├── package.json                # Configuration npm/pnpm
├── vercel.json                 # Configuration Vercel
└── README.md                   # Documentation principale
```

## Chemins relatifs

### Depuis la racine (index.html)
- CSS: `assets/css/styles.css`
- JS: `assets/js/script.js`
- Pages: `pages/nom-page.html`

### Depuis une page dans `pages/`
- CSS: `../assets/css/styles.css`
- JS: `../assets/js/script.js`
- Accueil: `../index.html`
- Autres pages: `nom-page.html`

## Structure des pages

Chaque page doit inclure :
1. Header (identique sur toutes les pages)
2. Sidebar (identique, avec l'item actif marqué)
3. Contenu principal dans `<main class="main-content">`

## Navigation

La sidebar utilise l'attribut `data-page` pour identifier la page active.
Le script `navigation.js` gère automatiquement l'état actif.

## Ajout d'une nouvelle page

1. Copier `pages/template.html`
2. Renommer avec le nom de la page
3. Mettre à jour :
   - Le `<title>`
   - L'attribut `data-page` dans la sidebar
   - Ajouter `class="active"` sur l'item de sidebar correspondant
4. Ajouter le lien dans la sidebar de toutes les autres pages

