// Données détaillées des biais psycho-sociologiques
const biasData = {
    'social-loafing': {
        icon: 'fa-couch',
        title: 'PARESSE SOCIALE',
        subtitle: 'SOCIAL LOAFING',
        type: 'COLLECTIF',
        reference: 'Latané, Williams & Harkins, 1979',
        description: 'Plus le groupe est large, moins chacun se sent responsable individuellement. Les efforts diminuent quand la contribution personnelle n\'est ni mesurable ni indispensable.',
        symptoms: [
            'Certaines tâches restent en attente car "quelqu\'un d\'autre va le faire"',
            'Les tâches sont jugées non prioritaires par ceux qui n\'en perçoivent pas l\'impact direct',
            'Les rappels au cadre sont perçus comme de l\'autoritarisme',
            'Peu de traçabilité du travail individuel'
        ],
        consequences: [
            'Perte d\'efficacité collective',
            'Fatigue et frustration des plus investis',
            'Érosion de la confiance mutuelle',
            'Décalage entre vision stratégique et perception individuelle'
        ],
        solutions: [
            'Une tâche = un responsable identifié',
            'Suivi et validation via ClickUp',
            'Traçabilité claire du travail fourni (description, livrables, notes)',
            'Expliquer le "pourquoi" derrière chaque tâche pour donner du sens'
        ]
    },
    'statu-quo': {
        icon: 'fa-anchor',
        title: 'BIAIS DU STATU QUO',
        subtitle: 'RÉSISTANCE AU CHANGEMENT',
        type: 'COGNITIF',
        reference: 'Samuelson & Zeckhauser, 1988',
        description: 'On préfère garder une organisation dysfonctionnelle plutôt que d\'en tester une nouvelle. La peur du changement dépasse la logique de l\'amélioration.',
        symptoms: [
            '"On faisait déjà comme ça"',
            '"Pas besoin de tout formaliser"',
            'Résistance aux outils ou aux process',
            'Refus de tester de nouvelles méthodes'
        ],
        consequences: [
            'Blocage de l\'évolution du collectif',
            'Décalage entre ambition et moyens réels',
            'Rigidité déguisée en "simplicité"',
            'Maintien des dysfonctionnements connus'
        ],
        solutions: [
            'Cadrage collectif : tester de nouvelles méthodes sur 2 mois, puis évaluer',
            'Formation et explication avant toute mise en place d\'un nouvel outil',
            'Légitimer les changements en expliquant leurs bénéfices concrets',
            'Documenter les problèmes actuels pour justifier le changement'
        ]
    },
    'groupthink': {
        icon: 'fa-users',
        title: 'GROUPTHINK',
        subtitle: 'PENSÉE DE GROUPE',
        type: 'DYNAMIQUE',
        reference: 'Janis, 1972',
        description: 'Le groupe cherche l\'harmonie au détriment de la réflexion critique. Le consensus devient plus important que la qualité de la décision.',
        symptoms: [
            'Les désaccords sont perçus comme des attaques personnelles',
            'Les discussions tournent court pour éviter les "embrouilles"',
            'Le consensus prime sur la qualité de la décision',
            'Auto-censure des idées novatrices'
        ],
        consequences: [
            'Décisions molles ou incohérentes',
            'Innovation étouffée',
            'Accumulation de tensions cachées',
            'Stagnation créative du collectif'
        ],
        solutions: [
            'Nommer un "devil\'s advocate" à chaque réunion (personne qui doit challenger les idées)',
            'Créer un cadre de désaccord sain : "on critique les idées, pas les personnes"',
            'Valoriser la confrontation constructive comme moteur créatif',
            'Écrire les décisions pour éviter les malentendus'
        ]
    },
    'conformity': {
        icon: 'fa-copy',
        title: 'EFFET DE CONFORMITÉ',
        subtitle: 'ASCH EFFECT',
        type: 'SOCIAL',
        reference: 'Asch, 1951',
        description: 'Les individus alignent leur opinion sur celle de la majorité apparente, même si elle va contre leur propre jugement. Personne ne veut être "celui qui dérange".',
        symptoms: [
            'Silence des membres hésitants',
            'Peur d\'aller "contre le groupe"',
            'Validation implicite d\'idées non partagées',
            'Décisions faussement consensuelles'
        ],
        consequences: [
            'Perte de diversité dans les opinions',
            'Étouffement des idées minoritaires mais pertinentes',
            'Faux sentiment d\'unanimité',
            'Frustration silencieuse des membres'
        ],
        solutions: [
            '"Round-robin" : chaque membre doit s\'exprimer une fois avant toute validation',
            'Règle du 48h : toute objection ou proposition doit être écrite dans les deux jours',
            'Valoriser la diversité d\'opinion, pas la conformité',
            'Créer un espace sécurisé pour exprimer les désaccords'
        ]
    },
    'hidden-profile': {
        icon: 'fa-eye-slash',
        title: 'HIDDEN PROFILE EFFECT',
        subtitle: 'INFORMATION CACHÉE',
        type: 'DYNAMIQUE',
        reference: 'Stasser & Titus, 1985',
        description: 'Les groupes négligent les informations détenues par un expert minoritaire. Les décisions techniques se prennent à la majorité non compétente.',
        symptoms: [
            'L\'expertise (DA, communication) est contredite par "ressenti collectif"',
            'Les décisions techniques se prennent à la majorité non compétente',
            'L\'expert devient frustré, isolé ou désengagé',
            'Les compétences spécifiques ne sont pas reconnues'
        ],
        consequences: [
            'Décisions de mauvaise qualité dans les domaines techniques',
            'Démotivation des experts',
            'Perte de cohérence artistique ou stratégique',
            'Départ des membres compétents'
        ],
        solutions: [
            'Décision finale par rôle : DA = artistique, Trésorier = financier, Président = stratégique',
            'Discussion collective, mais validation technique par la personne compétente',
            'Reconnaissance symbolique des compétences (communication interne)',
            'Former les membres pour comprendre les enjeux techniques'
        ]
    },
    'cognitive-dissonance': {
        icon: 'fa-brain',
        title: 'DISSONANCE COGNITIVE',
        subtitle: 'JUSTIFICATION',
        type: 'COGNITIF',
        reference: 'Festinger, 1957',
        description: 'Quand on agit à l\'encontre de ses valeurs, on se justifie plutôt que de se remettre en question. Le cerveau préfère minimiser l\'incohérence.',
        symptoms: [
            '"Ce n\'est pas grave si ce n\'est pas fait"',
            '"Tu stresses trop, on verra plus tard"',
            'Justifications de retards ou de désorganisation',
            'Minimisation des problèmes organisationnels'
        ],
        consequences: [
            'Maintien de l\'inefficacité',
            'Frustrations et conflits répétés',
            'Déresponsabilisation inconsciente',
            'Détérioration progressive de la qualité'
        ],
        solutions: [
            '"Règle des 48h" : annoncer à l\'avance tout retard ou empêchement',
            'Éviter les excuses subjectives ("je n\'ai pas le temps"), préférer les faits',
            'Valoriser la transparence plutôt que la justification',
            'Créer une culture de la responsabilité bienveillante'
        ]
    },
    'conflict-avoidance': {
        icon: 'fa-handshake-slash',
        title: 'ÉVITEMENT DU CONFLIT',
        subtitle: 'CONFLICT AVOIDANCE',
        type: 'ÉMOTIONNEL',
        reference: 'Kahn, 1990',
        description: 'Par peur de la tension, les membres évitent le désaccord, jusqu\'à l\'explosion. Le conflit de tâche (sur les idées) est sain, le conflit de personne est destructeur.',
        symptoms: [
            'Silence face aux problèmes manifestes',
            'Discussions étouffées, puis crises soudaines',
            'Déni collectif des dysfonctionnements',
            'Accumulation de non-dits'
        ],
        consequences: [
            'Explosions émotionnelles imprévisibles',
            'Crises de confiance brutales',
            'Départs soudains de membres',
            'Résolution impossible des vrais problèmes'
        ],
        solutions: [
            'Intégrer un "temps de tension" dans chaque réunion (10 minutes max)',
            'Nommer un médiateur neutre (rôle RH)',
            'Encourager la parole vraie, même si elle dérange',
            'Distinguer critique constructive et attaque personnelle'
        ]
    },
    'task-significance': {
        icon: 'fa-tasks',
        title: 'PERCEPTION D\'UTILITÉ',
        subtitle: 'TASK SIGNIFICANCE',
        type: 'MOTIVATION',
        reference: 'Hackman & Oldham, 1976',
        description: 'Les individus s\'engagent davantage dans une tâche lorsqu\'ils perçoivent clairement son importance et son impact sur le résultat global. Sinon, ils la négligent.',
        symptoms: [
            'Démotivation sur les "petites tâches invisibles"',
            'Seuls les livrables visibles (affiches, soirées) sont valorisés',
            'Tâches jugées "pas urgentes" systématiquement reportées',
            'Incompréhension du rôle des tâches dans la stratégie'
        ],
        consequences: [
            'Abandon des tâches de fond',
            'Déséquilibre entre visible et invisible',
            'Perte de cohérence stratégique',
            'Frustration des coordinateurs'
        ],
        solutions: [
            'Toujours associer une tâche à un objectif concret : "Cette action sert à ___ pour ___"',
            'Rendre visible le chemin entre micro-tâches et impact collectif',
            'Valoriser les efforts "de fond" autant que les résultats visibles',
            'Expliquer la stratégie globale régulièrement'
        ]
    },
    'over-commitment': {
        icon: 'fa-fire',
        title: 'SUR-ENGAGEMENT',
        subtitle: 'EFFORT JUSTIFICATION',
        type: 'LEADERSHIP',
        reference: 'Festinger, 1957',
        description: 'Ce biais pousse un individu à valoriser excessivement un projet dans lequel il a investi beaucoup d\'efforts. Plus il s\'implique, plus il devient intolérant à la négligence perçue chez les autres.',
        symptoms: [
            'Frustration quand les autres ne respectent pas les deadlines',
            'Tendance à accentuer les rappels à l\'ordre (ton plus dur)',
            'Sentiment d\'être "le seul à se battre"',
            'Confusion entre implication émotionnelle et efficacité'
        ],
        consequences: [
            'Risque d\'épuisement (burnout)',
            'Perte de patience face à la désorganisation',
            'Création d\'un "écart perçu" avec le groupe',
            'Détérioration des relations'
        ],
        solutions: [
            'Extérioriser la charge cognitive : utiliser ClickUp pour "déposer" les frustrations dans des faits',
            'Mettre en place un compteur de progression collectif visible',
            'Valoriser la progression du groupe, non seulement son propre effort',
            'Se rappeler que la rigueur s\'enseigne et s\'incarne, elle n\'est pas innée'
        ],
        warning: 'ÉPUISEMENT / CONFLIT'
    },
    'perfectionism': {
        icon: 'fa-shield-alt',
        title: 'GARDIEN DE LA QUALITÉ',
        subtitle: 'PERFECTIONNISME NORMATIF',
        type: 'LEADERSHIP',
        reference: 'Flett & Hewitt, 2002',
        description: 'Les leaders perfectionnistes visent un niveau d\'exigence élevé, voire absolu. Ils associent la qualité du travail à la valeur morale des membres. La moindre incohérence est vécue comme une trahison du projet.',
        symptoms: [
            'Refus des compromis esthétiques ou des "solutions par défaut"',
            'Colère déclenchée par une dissonance entre vision et exécution',
            'Impression d\'être seul à "voir le tableau global"',
            'Difficulté à valider un travail "acceptable mais pas parfait"'
        ],
        consequences: [
            'Tensions avec les membres moins sensibles à l\'exigence esthétique',
            'Risque de burnout artistique (sur-investissement mental)',
            'Découragement du collectif si les efforts sont jugés insuffisants',
            'Blocage des projets par excès de standards'
        ],
        solutions: [
            'Distinguer les zones non-négociables (cohérence visuelle DA) des zones adaptables',
            'Créer un système de validation visuelle partagé : moodboard, charte DA',
            'Rendre la qualité objective et partagée, non subjective',
            'Apprendre à "lâcher prise contrôlé" : si 80% de la qualité est atteinte, valider'
        ],
        warning: 'BLOCAGE / RIGIDITÉ'
    },
    'frustrated-leadership': {
        icon: 'fa-bomb',
        title: 'LEADERSHIP FRUSTRÉ',
        subtitle: 'CONTROL ILLUSION',
        type: 'LEADERSHIP',
        reference: 'Langer, 1975',
        description: 'Quand un leader sent que son cadre n\'est pas respecté, il peut sur-compenser par le contrôle ou la colère. Ce mécanisme est renforcé dans un milieu horizontal sans relais hiérarchique.',
        symptoms: [
            'Explosion émotionnelle après accumulation de micro-désordres',
            'Tentative de reprendre le contrôle total (DA, com, planning)',
            'Usage du ton directif quand la fatigue s\'installe',
            'Sentiment de perte de légitimité'
        ],
        consequences: [
            'Augmentation de la résistance passive du groupe',
            'Discrédit temporaire du message, malgré sa pertinence',
            'Rupture de confiance momentanée',
            'Isolement du leader'
        ],
        solutions: [
            'Créer un cadre structurel qui soutient l\'autorité (workflow validé, rôles écrits)',
            'Déléguer certaines validations mineures pour libérer la charge mentale',
            'Introduire une zone tampon émotionnelle : ne jamais répondre à chaud',
            'Écrire, attendre 15 min, reformuler avant d\'envoyer'
        ],
        warning: 'RUPTURE DE CONFIANCE'
    },
    'selective-memory': {
        icon: 'fa-memory',
        title: 'MÉMOIRE SÉLECTIVE',
        subtitle: 'RECONSTRUCTION COGNITIVE',
        type: 'COGNITIF',
        description: 'Chaque membre retient ce qui l\'arrange ou ce qu\'il a compris de la discussion. Dans les groupes non structurés, la mémoire collective devient une somme de souvenirs individuels déformés.',
        symptoms: [
            '"Mais on avait dit que c\'était annulé !"',
            '"Non, on avait dit qu\'on en reparlerait !"',
            'Désaccords sur ce qui a été validé en vocal',
            'Reconstructions contradictoires du passé'
        ],
        consequences: [
            'Retours en arrière permanents',
            'Perte de temps en re-discussions',
            'Frustration des membres impliqués',
            'Impression que "rien n\'avance"'
        ],
        solutions: [
            'Créer un "registre des décisions" (Decision Log)',
            'Toujours noter : Date / Sujet / Décision / Responsable / Statut',
            'Désigner un "scribe" de réunion qui prend 5 lignes de notes',
            'Poster les comptes-rendus dans un canal dédié'
        ]
    },
    'presentism': {
        icon: 'fa-clock',
        title: 'PRÉSENTISME',
        subtitle: 'BIAIS TEMPOREL',
        type: 'TEMPOREL',
        description: 'On accorde plus d\'importance à ce qu\'on est en train de faire maintenant qu\'à ce qui a été décidé avant. Une nouvelle idée ou urgence efface mentalement les décisions précédentes.',
        symptoms: [
            '"Faut gérer les visuels avant vendredi, on verra le reste plus tard"',
            'Les projets de fond restent toujours en suspens',
            'Chaque urgence efface les résolutions précédentes',
            'Priorité systématique au court terme'
        ],
        consequences: [
            'Abandon des projets stratégiques',
            'Réactivité au détriment de la constance',
            'Accumulation de "dette organisationnelle"',
            'Perte de vision à long terme'
        ],
        solutions: [
            'Distinguer clairement : Discussion / Décision / Exécution',
            'Règle : "Une fois acté, on ne redébat pas sans nouvel élément"',
            'Planifier des créneaux dédiés aux projets de fond',
            'Protéger certaines tâches stratégiques des urgences'
        ]
    },
    'false-agreement': {
        icon: 'fa-handshake',
        title: 'FAUX ACCORD',
        subtitle: 'CONSENSUS ILLUSOIRE',
        type: 'DYNAMIQUE',
        description: 'Dans un groupe, on confond souvent absence de contradiction avec consensus réel. Le silence est perçu comme un "oui", alors qu\'il signifie fatigue, désintérêt ou non-compréhension.',
        symptoms: [
            '"Bon, on est tous d\'accord alors ?" (personne ne répond)',
            'Trois jours après : "j\'étais pas d\'accord, j\'ai juste pas voulu relancer"',
            'Accords apparents mais non assumés',
            'Validations par silence'
        ],
        consequences: [
            'Remise en question tardive des décisions',
            'Frustration des porteurs de projet',
            'Instabilité des orientations',
            'Perte de crédibilité du processus décisionnel'
        ],
        solutions: [
            'Demander explicitement l\'avis de chaque membre',
            'Validation écrite obligatoire des décisions importantes',
            'Différencier : silence = neutre, pas d\'accord',
            'Créer un système de vote clair (pour/contre/abstention)'
        ]
    },
    'coordination-illusion': {
        icon: 'fa-project-diagram',
        title: 'ILLUSION DE COORDINATION',
        subtitle: 'DILUTION RESPONSABILITÉ',
        type: 'ORGANISATIONNEL',
        description: 'Les membres croient que les autres ont compris et vont faire leur part, sans vérification réelle. Chacun pense que quelqu\'un d\'autre a pris le relais. C\'est l\'effet spectateur (bystander effect) appliqué au travail collectif.',
        symptoms: [
            '"C\'est bon, quelqu\'un s\'en occupe ?" "Ouais ouais" (personne ne fait)',
            'Tâches en suspens sans responsable clair',
            'Confusion sur "qui fait quoi"',
            'Découverte tardive que personne n\'a agi'
        ],
        consequences: [
            'Trous dans l\'exécution',
            'Échéances manquées',
            'Perte de confiance mutuelle',
            'Sentiment d\'inefficacité collective'
        ],
        solutions: [
            'Toujours désigner un responsable explicite pour chaque tâche',
            'Utiliser un outil de suivi partagé (ClickUp)',
            'Règle : "Pas de tâche sans nom"',
            'Points de suivi réguliers : "Qui a fait quoi ?"'
        ]
    }
};

// Fonction pour ouvrir la modal avec le contenu du biais
function openBiasModal(biasId) {
    const modal = document.getElementById('biasModal');
    const modalBody = document.getElementById('biasModalBody');
    const data = biasData[biasId];
    
    if (!data) return;
    
    let content = `
        <div class="bias-modal-header">
            <div class="bias-modal-icon">
                <i class="fas ${data.icon}"></i>
            </div>
            <div class="bias-modal-title-section">
                <p class="bias-modal-subtitle">${data.subtitle}</p>
                <h2>${data.title}</h2>
                <p class="bias-modal-type">TYPE: ${data.type}${data.reference ? ' // ' + data.reference : ''}</p>
            </div>
        </div>
    `;
    
    // Description
    content += `
        <div class="bias-modal-section">
            <h3><i class="fas fa-info-circle"></i> Description</h3>
            <p>${data.description}</p>
        </div>
    `;
    
    // Symptômes
    if (data.symptoms) {
        content += `
            <div class="bias-modal-section">
                <h3><i class="fas fa-stethoscope"></i> Symptômes observés</h3>
                <ul class="bias-modal-list">
                    ${data.symptoms.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Conséquences
    if (data.consequences) {
        content += `
            <div class="bias-modal-section">
                <h3><i class="fas fa-exclamation-triangle"></i> Conséquences</h3>
                <ul class="bias-modal-list">
                    ${data.consequences.map(c => `<li>${c}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Warning spécial pour les biais de leadership
    if (data.warning) {
        content += `
            <div class="bias-modal-warning">
                <h4><i class="fas fa-exclamation-circle"></i> Risque majeur</h4>
                <p>${data.warning}</p>
            </div>
        `;
    }
    
    // Solutions
    if (data.solutions) {
        content += `
            <div class="bias-modal-section">
                <h3><i class="fas fa-lightbulb"></i> Solutions</h3>
                <ul class="bias-modal-list">
                    ${data.solutions.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fonction pour fermer la modal
function closeBiasModal() {
    const modal = document.getElementById('biasModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter les event listeners sur toutes les cartes de biais
    const biasCards = document.querySelectorAll('.bias-card-detailed[data-bias]');
    biasCards.forEach(card => {
        card.addEventListener('click', function() {
            const biasId = this.getAttribute('data-bias');
            openBiasModal(biasId);
        });
    });
    
    // Fermer la modal en cliquant en dehors
    const modal = document.getElementById('biasModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBiasModal();
            }
        });
    }
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeBiasModal();
        }
    });
});

