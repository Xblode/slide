# Slider Présentation

Une application de présentation slider moderne, similaire à Google Slides, prête pour le déploiement sur Vercel.

## Fonctionnalités

- Navigation entre les slides avec les boutons précédent/suivant
- Navigation au clavier (flèches gauche/droite, Home, End)
- Navigation tactile (swipe) pour mobile
- Indicateurs de slide cliquables
- Compteur de slide
- Transitions fluides
- Design responsive

## Développement local

```bash
npm install
npm run dev
```

## Déploiement sur Vercel

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement la configuration
3. Le site sera déployé automatiquement

Ou via la CLI :

```bash
npm i -g vercel
vercel
```

## Ajout de slides

Les slides peuvent être ajoutées directement dans le fichier `index.html` ou via JavaScript en utilisant la méthode `addSlide()` du slider.

