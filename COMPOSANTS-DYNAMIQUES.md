# 🎯 Système de Composants Dynamiques

## 📋 Vue d'ensemble

Le projet utilise maintenant un système de **composants dynamiques** pour le header et la sidebar. Cela signifie qu'au lieu de dupliquer le code dans chaque page HTML, les composants sont chargés dynamiquement depuis des fichiers uniques.

## ✅ Avantages

- **🔧 Maintenance simplifiée** : Une seule modification met à jour toutes les pages
- **📉 Moins de duplication** : Le code du header et de la sidebar n'existe qu'une fois
- **🚀 Cohérence garantie** : Impossible d'avoir des versions différentes entre les pages
- **⚡ Mises à jour instantanées** : Changez une fois, c'est appliqué partout

## 📁 Architecture

```
Slider/
├── components/
│   ├── header.html          # ← Header unique pour toutes les pages
│   ├── sidebar.html         # ← Sidebar unique pour toutes les pages
│   └── page-template.html   # Template pour créer de nouvelles pages
├── assets/
│   └── js/
│       └── load-components.js  # ← Script qui charge les composants
├── index.html               # Page d'accueil
└── pages/
    ├── analyses.html
    ├── gouvernance.html
    └── ...                  # Toutes les autres pages
```

## 🛠️ Comment ça fonctionne ?

### 1. Structure d'une page

Chaque page HTML contient simplement des **conteneurs vides** :

```html
<body>
    <!-- Header Container (chargé dynamiquement) -->
    <div id="header-container"></div>

    <!-- Sidebar Container (chargé dynamiquement) -->
    <div id="sidebar-container"></div>

    <!-- Votre contenu ici -->
    <main class="main-content">
        ...
    </main>

    <!-- Scripts -->
    <script src="../assets/js/load-components.js"></script>
    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/navigation.js"></script>
</body>
```

### 2. Chargement automatique

Le script `load-components.js` :
- ✅ Charge `components/header.html` dans `#header-container`
- ✅ Charge `components/sidebar.html` dans `#sidebar-container`
- ✅ Détecte automatiquement la page courante
- ✅ Active l'élément de menu correspondant
- ✅ Corrige les liens relatifs
- ✅ Initialise le toggle de la sidebar

### 3. Détection automatique de la page active

Le script détecte automatiquement quelle page est affichée et applique la classe `active` au bon élément de menu :

```javascript
// Exemples de détection
index.html          → data-page="dashboard"
pages/analyses.html → data-page="analyses"
pages/projets.html  → data-page="projets"
```

## 🎨 Modifier le Header ou la Sidebar

### Pour modifier le Header :

1. Ouvrir `components/header.html`
2. Faire vos modifications
3. **C'est tout !** Toutes les pages seront mises à jour automatiquement

### Pour modifier la Sidebar :

1. Ouvrir `components/sidebar.html`
2. Modifier la structure des menus
3. **C'est tout !** Toutes les pages utilisent ce composant

## 📝 Créer une nouvelle page

1. Copier `components/page-template.html`
2. Renommer le fichier
3. Modifier uniquement le contenu principal
4. Le header et la sidebar se chargeront automatiquement

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ma Nouvelle Page - BOOMKŒUR.EXE</title>
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <!-- Header (chargé auto) -->
    <div id="header-container"></div>

    <!-- Sidebar (chargée auto) -->
    <div id="sidebar-container"></div>

    <!-- Votre contenu unique ici -->
    <main class="main-content">
        <h1>Ma Nouvelle Page</h1>
    </main>
    
    <script src="../assets/js/load-components.js"></script>
    <script src="../assets/js/script.js"></script>
</body>
</html>
```

## 🔧 Ajouter un nouvel élément de menu

1. Ouvrir `components/sidebar.html`
2. Ajouter votre nouvel élément dans la bonne section :

```html
<li class="sidebar-item" data-page="ma-page">
    <a href="ma-page.html" class="sidebar-link">
        <i class="fas fa-star sidebar-icon"></i>
        <span class="sidebar-text">Ma Page</span>
    </a>
</li>
```

3. **Important** : L'attribut `data-page` doit correspondre au nom du fichier (sans `.html`)

## ⚠️ Points importants

### Chemins relatifs

- **À la racine** (`index.html`) : `components/header.html`
- **Dans pages/** : `../components/header.html`

Le script `load-components.js` gère automatiquement ces différences.

### Classe "active"

Ne pas ajouter manuellement la classe `active` dans `components/sidebar.html`.
Elle est ajoutée automatiquement par le script selon la page courante.

### Compatibilité

Ce système fonctionne avec tous les navigateurs modernes qui supportent :
- `fetch()` API
- `async/await`
- ES6+

## 🐛 Dépannage

### Le header ou la sidebar ne s'affiche pas

1. Vérifier la console du navigateur (F12)
2. Vérifier que les chemins vers `load-components.js` sont corrects
3. Vérifier que les fichiers `components/header.html` et `components/sidebar.html` existent

### La mauvaise page est active dans le menu

Vérifier que l'attribut `data-page` dans la sidebar correspond exactement au nom du fichier HTML (sans l'extension).

### Le toggle de la sidebar ne fonctionne pas

Le script `load-components.js` initialise automatiquement le toggle après le chargement.
Pas besoin de `sidebar-toggle.js` supplémentaire.

## 📊 Comparaison Avant/Après

### ❌ Avant (10 fichiers à modifier)
```
Changer le menu → Modifier 10 fichiers HTML
                  (index.html + 9 pages)
```

### ✅ Après (1 seul fichier)
```
Changer le menu → Modifier components/sidebar.html
                  ↓
                  Toutes les pages mises à jour automatiquement
```

## 🚀 Performance

- **Temps de chargement** : ~50-100ms pour charger les composants
- **Mise en cache** : Les composants sont mis en cache par le navigateur
- **SEO** : Aucun impact (le contenu est chargé côté client)

## 📚 Ressources

- `assets/js/load-components.js` - Code source du système
- `components/page-template.html` - Template pour nouvelles pages
- `components/sidebar.html` - Menu de navigation
- `components/header.html` - En-tête du site

---

**💡 Astuce** : Utilisez le template `components/page-template.html` comme point de départ pour toute nouvelle page !

