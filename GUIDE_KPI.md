# 📊 Guide d'utilisation : Système de gestion des KPIs Marketing

## 🎯 Vue d'ensemble

Le système de gestion des KPIs permet de **suivre et mettre à jour** les indicateurs marketing globaux lors de chaque réunion, avec un **historique complet** et des **graphiques d'évolution**.

---

## 🚀 Comment utiliser

### 1️⃣ **Ouvrir un KPI**
- Sur la page **Projets**, dans la section **"INDICATEURS MARKETING GLOBAUX"**
- **Cliquez sur n'importe quelle carte KPI** (Revenus, Audience, Engagement, etc.)
- Une modal s'ouvre avec le formulaire de saisie

### 2️⃣ **Mettre à jour les données**

#### Option A : Calculer avant d'enregistrer (recommandé)
1. Remplissez les champs du formulaire
2. Cliquez sur **"CALCULER"** pour voir un aperçu
3. Le système affiche :
   - ✅ La nouvelle valeur calculée
   - ✅ La variation en % par rapport à la dernière saisie
   - ✅ Indication positive (vert ↗) ou négative (rouge ↘)
4. Si le résultat est correct, cliquez sur **"ENREGISTRER"**

#### Option B : Enregistrer directement
1. Remplissez les champs
2. Cliquez sur **"ENREGISTRER"**
3. Les données sont sauvegardées et l'affichage est mis à jour

#### ℹ️ Après enregistrement
- ✅ La carte KPI sur la page principale se met à jour automatiquement
- ✅ Le pourcentage d'amélioration est recalculé (ex: "+12% vs mois dernier")
- ✅ La barre de progression s'ajuste
- ✅ Une notification de succès s'affiche

### 3️⃣ **Consulter l'historique**
- Scrollez dans la modal pour voir **l'historique complet**
- Chaque entrée montre :
  - Date et heure de modification
  - Valeur calculée
  - Détails des données saisies
  
### 4️⃣ **Voir l'évolution graphique**
- Si vous avez **2 entrées ou plus**, un graphique apparaît automatiquement
- Le graphique montre :
  - Courbe d'évolution dans le temps
  - Ligne objectif (en jaune pointillé)
  - Statistiques : Tendance, Min, Max, Moyenne

### 5️⃣ **Comprendre les variations automatiques**

#### Sur la page principale (cartes KPI)
Après chaque enregistrement, la section **"kpi-trend"** se met à jour automatiquement :
- **Flèche verte ↗** : Amélioration par rapport à la dernière saisie
- **Flèche rouge ↘** : Baisse par rapport à la dernière saisie
- **Pourcentage** : Variation calculée automatiquement
- **Période** : "vs semaine dernière", "vs mois dernier", etc.

#### Dans la modal
- **Section "Valeur actuelle"** : Affiche la variation vs dernière saisie
- **Section "Statistiques"** : Évolution totale, Min, Max, Nb de saisies
- **Graphique** : Visualisation de toute l'évolution
- **Historique** : Détails de chaque saisie

#### Calcul intelligent de la période
Le système détecte automatiquement l'intervalle entre deux saisies :
- ≤ 7 jours → "vs semaine dernière"
- ≤ 31 jours → "vs mois dernier"
- ≤ 92 jours → "vs trimestre dernier"
- > 92 jours → "vs il y a X mois"

### 6️⃣ **Exporter les données**
- Cliquez sur **"EXPORTER CSV"** dans la section historique
- Un fichier CSV est téléchargé avec toutes les données
- Utilisable dans Excel, Google Sheets, etc.

### 7️⃣ **Réinitialiser un KPI**
- Bouton **"RÉINITIALISER"** disponible dans la modal (si données existent)
- Supprime toutes les données et l'historique de ce KPI
- ⚠️ **Action irréversible** - Confirmation demandée

---

## 📋 KPIs disponibles

### 1. **REVENUS ANNUELS** 💰
**Champs à remplir :**
- Revenus événements
- Revenus merchandising
- Revenus partenariats
- Autres revenus

**Calcul :** Somme de tous les revenus

---

### 2. **AUDIENCE TOTALE** 👥
**Champs à remplir :**
- Followers Instagram
- Followers TikTok
- Abonnés Newsletter

**Calcul :** Somme de toutes les audiences

---

### 3. **ENGAGEMENT MOYEN** ❤️
**Champs à remplir :**
- Total interactions (likes + comments + shares)
- Nombre de followers
- Nombre de posts publiés

**Calcul :** (Interactions / (Followers × Posts)) × 100

---

### 4. **TAUX DE CONVERSION** 🎯
**Champs à remplir :**
- Vues pages Shotgun
- Tickets vendus

**Calcul :** (Tickets vendus / Vues Shotgun) × 100

---

### 5. **ROI GLOBAL** 📊
**Champs à remplir :**
- Revenus totaux générés
- Investissements marketing totaux

**Calcul :** Revenus / Investissements

---

### 6. **CROISSANCE REVENUS** 🚀
**Champs à remplir :**
- CA année actuelle
- CA année précédente

**Calcul :** ((CA actuel - CA précédent) / CA précédent) × 100

---

## 💾 Stockage des données

- **Stockage local** : Les données sont sauvegardées dans le navigateur (localStorage)
- **Persistance** : Les données restent même après fermeture du navigateur
- **Historique illimité** : Toutes les modifications sont conservées
- **Pas de serveur** : Tout fonctionne en local (pas besoin de connexion)

---

## 🔄 Workflow recommandé

### Lors d'une réunion mensuelle :

1. **Préparer les données** avant la réunion
   - Collecter les chiffres Instagram, Shotgun, comptabilité
   
2. **Ouvrir chaque KPI** et mettre à jour
   - Revenus Annuels → Saisir les nouveaux revenus
   - Audience Totale → Mettre à jour followers
   - Engagement → Saisir interactions du mois
   - Etc.

3. **Analyser les tendances**
   - Consulter les graphiques d'évolution
   - Comparer avec les objectifs
   - Identifier les KPIs en retard

4. **Exporter si besoin**
   - Exporter CSV pour rapport mensuel
   - Partager avec l'équipe

5. **Prendre des décisions**
   - Ajuster la stratégie selon les résultats
   - Documenter dans le Registre des décisions

---

## 🎨 Personnalisation

Pour ajouter un nouveau KPI, modifier le fichier `assets/js/kpis-manager.js` :

```javascript
'nouveau-kpi': {
    name: 'NOM DU KPI',
    icon: 'fa-icon-name',
    unit: '€',
    type: 'currency',
    fields: [
        { id: 'champ1', label: 'Label', placeholder: '0', type: 'number' }
    ],
    calculation: (data) => {
        return parseInt(data.champ1 || 0);
    },
    target: 10000,
    formatValue: (val) => `${val}€`
}
```

---

## 🐛 Dépannage

**Les données ne se sauvegardent pas ?**
- Vérifiez que le localStorage n'est pas désactivé dans votre navigateur
- Essayez en navigation privée pour tester

**Le graphique ne s'affiche pas ?**
- Il faut au moins 2 entrées dans l'historique
- Rafraîchissez la page

**Je veux réinitialiser toutes les données ?**
- Ouvrez la console développeur (F12)
- Tapez : `localStorage.clear()` puis Entrée
- Rafraîchissez la page

---

## 📞 Support

Pour toute question ou amélioration, contactez l'équipe technique.

