// Membres page - Member cards interactions with detailed role sheets
document.addEventListener('DOMContentLoaded', function() {
    const memberCards = document.querySelectorAll('.member-card.clickable');
    const modal = document.getElementById('memberModal');
    const closeModal = document.getElementById('closeMemberModal');
    const modalTitle = document.getElementById('memberModalTitle');
    const modalRoles = document.getElementById('memberModalRoles');
    const modalIcon = document.getElementById('memberModalIcon');
    const modalBody = document.getElementById('memberModalBody');

    // Données complètes des membres avec fiches de rôle détaillées
    const membersData = {
        'matthieu': {
            icon: '<i class="fas fa-hat-cowboy"></i>',
            name: 'Matthieu',
            roles: [
                {
                    title: 'Président',
                    level: 'NIVEAU 1',
                    icon: 'fa-hat-cowboy',
                    responsibilities: [
                        'Garant du cadre légal, éthique et stratégique de l\'association.',
                        'Porte la vision globale du projet sur le long terme : développement, positionnement et cohérence des grandes orientations.',
                        'Représente officiellement Boomkœur auprès des institutions, des partenaires et des médias.',
                        'Supervise la conformité des décisions avec les statuts, les valeurs et les obligations légales de l\'association.',
                        'Soutient et coordonne les pôles stratégiques (Direction Artistique, Stratégie & Développement, Trésorerie, Communication).',
                        'Valide les budgets, les partenariats, et les projets majeurs avant exécution en lien avec le trésorier.',
                        'Fait le lien entre la sphère créative (vision) et la sphère administrative (réalité).'
                    ],
                    implication: 'En moyenne 3 à 4h/semaine (variable selon les périodes d\'événement). Suivi hebdomadaire du fonctionnement global. Présence aux réunions de direction, bilans et prises de décision importantes.',
                    pouvoir: [
                        'Décision finale sur toutes les orientations structurelles, légales et stratégiques.',
                        'Peut trancher en cas de conflit majeur entre pôles, en privilégiant le dialogue et la médiation.',
                        'Détient le droit de veto sur toute action mettant en cause : la sécurité juridique, morale ou financière du collectif, les valeurs fondamentales, ou la cohérence globale du projet associatif.',
                        'Peut autoriser des dépenses urgentes (sécurité, obligations légales, engagements externes) même sans validation du Trésorier, avec justification écrite.',
                        'Ne s\'implique pas dans la microgestion des pôles : délègue les décisions opérationnelles aux responsables respectifs.'
                    ],
                    equilibre: 'Le Président n\'est ni un chef autoritaire, ni un simple représentant symbolique : il agit comme gardien du cadre et catalyseur de cohérence. Son rôle est d\'assurer que chaque pôle puisse exercer ses fonctions librement, dans le respect de la vision commune et du cadre collectif.'
                },
                {
                    title: 'Médiateur / Modérateur interne',
                    level: 'NIVEAU 1',
                    icon: 'fa-comments',
                    responsibilities: [
                        'Gère la communication en cas de tension.',
                        'Garant du respect du cadre émotionnel et des règles de communication interne.'
                    ],
                    implication: 'Intervention ponctuelle selon les besoins.',
                    pouvoir: [
                        'Peut intervenir pour faciliter la résolution de conflits internes.',
                        'Assure le respect des règles de communication et du cadre émotionnel du collectif.'
                    ]
                }
            ]
        },
        'benjamin': {
            icon: '<i class="fas fa-palette"></i>',
            name: 'Benjamin',
            roles: [
                {
                    title: 'Directeur Artistique',
                    level: 'NIVEAU 1',
                    icon: 'fa-palette',
                    responsibilities: [
                        'Garant de l\'identité visuelle, sonore (style de soirée lié à un style de musique) et émotionnelle (ressentis liés au visuels) de Boomkœur.',
                        'Supervise la création des visuels, la cohérence du branding, la direction photo/vidéo, le storytelling.',
                        'Définit la stratégie de communication visuelle et le calendrier de diffusion.',
                        'Collabore avec le CM, le Manager, les DJs et le Responsable technique pour harmoniser l\'expérience.',
                        'Propose des innovations visuelles : nouveaux concepts, formats créatifs, collaborations externes.',
                        'Fait vivre la marque Boomkœur sur le long terme à travers un univers identifiable et évolutif.',
                        'Valide l\'ensemble des créations avant publication ou diffusion (print, digital, décor).'
                    ],
                    implication: 'Investissement élevé : 20 à 30h/mois minimum, variable selon les périodes de production. Présence continue sur les sujets visuels, stratégiques et créatifs. Forte implication avant chaque événement.',
                    pouvoir: [
                        'Dispose de la décision finale sur tout ce qui relève de l\'image, du branding, du contenu visuel et de la direction artistique.',
                        'Les consultations collectives sont encouragées, mais non opposables : le DA écoute, mais tranche.',
                        'Toute création visuelle ou élément de décoration doit être validé par le DA avant diffusion ou mise en place.',
                        'Peut refuser un contenu, une idée ou une décoration s\'il juge qu\'elle nuit à la cohérence artistique du projet.',
                        'Travaille en lien direct avec le Président et le Directeur Stratégie, qui peuvent appuyer ses décisions.'
                    ],
                    equilibre: 'Le DA agit comme un chef d\'orchestre créatif, garantissant la cohérence entre les pôles et l\'unité du projet. Sa légitimité ne repose pas sur l\'autorité, mais sur la compétence, la vision et la constance. Il incarne le lien entre l\'art et la stratégie, entre l\'émotion et la méthode.'
                },
                {
                    title: 'Directeur Marketing',
                    level: 'NIVEAU 1',
                    icon: 'fa-bullhorn',
                    responsibilities: [
                        'Développe la stratégie marketing globale de Boomkœur (positionnement, public cible, image perçue).',
                        'Travaille en collaboration avec le DA, le CM, le DS et le Responsable commercial pour garantir la cohérence entre communication, contenu et stratégie de marque.',
                        'Analyse les retombées des actions (ventes, engagement, notoriété) et ajuste la stratégie en conséquence.',
                        'Supervise les campagnes de lancement d\'événements, les partenariats médias et la valorisation du merch.',
                        'Définit les indicateurs de performance marketing (KPI) et assure leur suivi sur ClickUp.'
                    ],
                    implication: 'Forte implication continue (suivi des performances, plan de com, stratégie d\'image). Présence obligatoire lors des réunions de planification, de communication et de développement stratégique.',
                    pouvoir: [
                        'Décision finale sur la stratégie marketing, les ciblages et les actions de communication externe.',
                        'Pouvoir de validation sur les campagnes publicitaires, les collaborations d\'image et la mise en avant des produits (billetterie, merch, etc.).',
                        'Collabore étroitement avec le Président et le Trésorier pour garantir la viabilité économique et la cohérence d\'image du projet.'
                    ]
                },
                {
                    title: 'Photographe',
                    level: 'NIVEAU 3',
                    icon: 'fa-camera',
                    responsibilities: [
                        'Gère la production d\'images (photo) et la cohérence visuelle.'
                    ],
                    implication: 'Variable selon les événements.',
                    pouvoir: [
                        'Exécution technique, validation artistique par le DA.'
                    ]
                },
                {
                    title: 'Responsable Web / Digital',
                    level: 'NIVEAU 2',
                    icon: 'fa-globe',
                    responsibilities: [
                        'Gère le site web, les mails, les outils numériques.',
                        'Coordonne avec le DA et le CM.'
                    ],
                    implication: 'Variable selon les besoins.',
                    pouvoir: [
                        'Technique uniquement.'
                    ]
                }
            ]
        },
        'hugo-milan': {
            icon: '<i class="fas fa-cogs"></i>',
            name: 'Hugo / Milan',
            roles: [
                {
                    title: 'Gestionnaire de Projets',
                    level: 'NIVEAU 1',
                    icon: 'fa-cogs',
                    responsibilities: [
                        'Centralise, planifie et supervise l\'ensemble des tâches opérationnelles de Boomkœur.exe.',
                        'Gère l\'outil de pilotage (ClickUp, Notion, etc.) : création, attribution et suivi des tâches.',
                        'Assure la cohérence du planning global, en prenant en compte les dépendances entre pôles (DA, CM, Technique, RH, etc.).',
                        'Vérifie la progression des livrables et s\'assure du respect des deadlines et des priorités.',
                        'Organise des points d\'avancement hebdomadaires avec les responsables de pôle.',
                        'Identifie et signale les blocages en amont pour éviter les retards ou les doublons.',
                        'Facilite la communication transversale entre les pôles, pour que chacun ait une vision claire des échéances et responsabilités.',
                        'Peut proposer des ajustements de planning, mais toujours en concertation avec les pôles concernés.',
                        'Garantit que les décisions validées (DA, Président, Stratégie, etc.) soient traduites en actions concrètes et suivies jusqu\'à leur réalisation.'
                    ],
                    implication: 'Rôle à forte implication : environ 4 à 6h/semaine minimum, plus en période de production événementielle. Présence continue dans les échanges inter-pôles et lors des réunions d\'avancement. Mobilisation renforcée la semaine précédant un événement.',
                    pouvoir: [
                        'Dispose d\'un pouvoir opérationnel sur l\'organisation, la planification et la priorisation des tâches.',
                        'Ne décide pas quoi faire (domaine du DA, du Président ou du Directeur Stratégie), mais quand et comment le faire.',
                        'Peut exiger un report de deadline uniquement avec validation du pôle concerné (ex. : DA pour un visuel, CM pour un post).',
                        'Peut interrompre ou réorganiser une tâche en cas d\'incohérence entre pôles, avec obligation d\'en référer à la direction.',
                        'A autorité sur le respect du workflow défini collectivement : personne ne publie, ne produit, ni ne modifie une tâche hors du cadre établi sans concertation.'
                    ],
                    equilibre: 'Le Gestionnaire de projets est le garant du tempo collectif. Il ne prend pas les décisions créatives ou politiques, mais assure que les décisions prennent forme dans les temps. C\'est le rôle le plus transversal : un lien constant entre la direction (vision) et le terrain (exécution).'
                },
                {
                    title: 'Directeur Stratégie & Développement',
                    level: 'NIVEAU 1',
                    icon: 'fa-bullseye',
                    responsibilities: [
                        'Définit la vision globale de développement du collectif (croissance, positionnement, rayonnement culturel).',
                        'Supervise la stratégie marketing et artistique pour assurer la cohérence entre image, offre et public.',
                        'Met en place les outils d\'analyse (suivi d\'audience, bilans post-événements, retombées presse, partenariats).',
                        'Anticipe les opportunités à moyen et long terme (nouveaux formats, collaborations, résidences, label…).',
                        'Identifie de nouvelles opportunités (résidences, projets culturels, aides institutionnelles, scènes extérieures).',
                        'Défend et valorise Boomkœur comme acteur culturel du Havre et non simple organisateur de soirées.'
                    ],
                    implication: 'En moyenne 10 à 15h/mois, avec des pics d\'activité avant les événements ou lancements de campagne. Présence obligatoire aux réunions de direction et aux bilans post-événements. Collaboration constante avec le DA, le CM et le Commercial pour assurer une exécution fluide des stratégies. Travaille en binôme stratégique avec le Président : il pense la direction globale du projet.',
                    pouvoir: [
                        'Décision finale sur la stratégie globale (positionnement, image publique, évolution du projet).',
                        'Validation obligatoire des plans de développement avant exécution.',
                        'Dispose d\'un pouvoir d\'arbitrage entre les pôles marketing, communication et artistique pour garantir la cohérence de marque.',
                        'Peut proposer la création de nouvelles activités (label, contenus, collaborations) soumises à validation du Président.'
                    ],
                    equilibre: 'Le Président garantit la structure légale et la vision "macro", le DA fait ressentir, le Directeur Stratégie fait comprendre. Le DA crée l\'univers, le Stratège le fait vivre et grandir. Ensemble, ils forment le cœur artistique et identitaire de Boomkœur, garantissant que chaque action serve à la fois le public, la marque et la vision à long terme.'
                }
            ]
        },
        'sofiane': {
            icon: '<i class="fas fa-coins"></i>',
            name: 'Sofiane',
            roles: [
                {
                    title: 'Trésorier',
                    level: 'NIVEAU 1',
                    icon: 'fa-coins',
                    responsibilities: [
                        'Gère la trésorerie, les budgets, les achats et les ventes.',
                        'Supervise la comptabilité et les justificatifs (factures, notes de frais).',
                        'Anticipe les besoins de financement (subventions, billetterie, partenariats).',
                        'Collabore avec le Président et le Responsable commercial pour aligner la stratégie financière.',
                        'Garantit la transparence des flux financiers auprès des membres du bureau.'
                    ],
                    implication: 'Implication régulière (1 à 2h/semaine minimum). Présence obligatoire lors des réunions budgétaires, bilans et validations de projet.',
                    pouvoir: [
                        'Détient le droit de validation sur les budgets prévisionnels et les dépenses planifiées.',
                        'Peut refuser une dépense uniquement si elle n\'est pas inscrite dans le budget ou menace la stabilité financière.',
                        'Ne peut pas remettre en cause le sens, l\'utilité ou la cohérence d\'un achat approuvé par le Président, le DA ou le Responsable commercial.',
                        'Ne fixe pas les tarifs commerciaux (merch, boissons, billetterie) : ces décisions relèvent du Responsable commercial et du Directeur marketing, sous validation du Président.',
                        'Ne peut pas bloquer un paiement jugé nécessaire par le Président lorsqu\'il s\'agit d\'une obligation légale, d\'un impératif éthique, ou d\'un cas d\'urgence opérationnelle validé en réunion de direction.',
                        'En cas de désaccord sur une dépense urgente, il peut émettre une réserve écrite mais le Président a le dernier mot.'
                    ],
                    equilibre: 'Le Trésorier contrôle les moyens, pas la stratégie. Il garantit la viabilité financière du collectif, sans brider son fonctionnement artistique, légal ou moral.'
                }
            ]
        },
        'marie': {
            icon: '<i class="fas fa-folder-open"></i>',
            name: 'Marie',
            roles: [
                {
                    title: 'Secrétaire',
                    level: 'NIVEAU 2',
                    icon: 'fa-folder-open',
                    responsibilities: [
                        'Gère l\'ensemble de l\'administration interne de l\'association : convocations, procès-verbaux, adhésions, archivage des documents officiels et des bilans.',
                        'Organise les réunions (ordre du jour, invitations, relances) et rédige les comptes rendus clairs et structurés, diffusés sur ClickUp.',
                        'Assure la circulation fluide et fiable de l\'information entre les pôles et les membres du bureau.',
                        'Garantit la traçabilité des décisions : chaque réunion, chaque vote, chaque validation est consignée.',
                        'Centralise les documents de référence (statuts, règlements, contrats, chartes, bilans) et veille à leur mise à jour.',
                        'Coordonne avec le Président et le Gestionnaire de projets pour que les informations administratives soutiennent la planification opérationnelle.',
                        'Peut assister le pôle RH dans la rédaction de chartes, de formulaires ou d\'appels à bénévoles.'
                    ],
                    implication: 'Environ 1 à 2h/semaine hors période d\'événement, plus lors des bilans et assemblées. Travail régulier et en lien constant avec le Président, le DA et le Gestionnaire de projets. Présence obligatoire aux réunions de direction et lors des moments-clés.',
                    pouvoir: [
                        'Dispose d\'un pouvoir fonctionnel sur la gestion administrative et la documentation officielle.',
                        'Peut demander la suspension temporaire d\'une décision tant qu\'elle n\'est pas formalisée par écrit (sécurité juridique et cohérence interne).',
                        'N\'exerce aucune autorité artistique, financière ou opérationnelle, mais garantit la transparence, la traçabilité et la clarté des décisions.'
                    ],
                    equilibre: 'Le Secrétaire est la mémoire et la rigueur du collectif. Il/elle ne crée pas la stratégie, mais veille à ce qu\'elle soit documentée, comprise et suivie. C\'est un rôle de fiabilité et de clarté, essentiel à la stabilité administrative et à la cohésion interne de Boomkœur.'
                }
            ]
        },
        'moumou': {
            icon: '<i class="fas fa-users"></i>',
            name: 'Moumou',
            roles: [
                {
                    title: 'Responsable RH & Bénévolat',
                    level: 'NIVEAU 2',
                    icon: 'fa-users',
                    responsibilities: [
                        'Supervise l\'ensemble des ressources humaines actives du collectif : bénévoles, renforts, membres ponctuels.',
                        'Gère les plannings opérationnels lors des événements : répartition des postes, horaires, roulements, pauses, coordination avec les pôles (Technique, Bar, Entrée, Sécurité, etc.).',
                        'Assure le briefing et la formation des bénévoles avant chaque événement (posture, missions, sécurité, image du collectif).',
                        'Veille au bien-être des équipes pendant les événements : gestion du stress, relais d\'information, écoute des besoins individuels.',
                        'Centralise les candidatures de nouveaux bénévoles et organise leur intégration au collectif (présentation, charte, fonctionnement interne).',
                        'Travaille avec le Secrétaire pour assurer la traçabilité (contacts, disponibilités, rôles attribués).',
                        'Joue un rôle de régulateur humain entre les pôles en cas de tension, ou lorsque les plannings deviennent déséquilibrés.',
                        'Collabore avec le Président et le Gestionnaire de projets pour anticiper les besoins humains selon le calendrier annuel.',
                        'Peut animer ponctuellement des temps de cohésion (apéro d\'équipe, réunion "retour d\'expérience", mini debrief post-event).'
                    ],
                    implication: 'Environ 2 à 4h/semaine en phase de préparation, et forte présence pendant les événements (coordination terrain). Participation systématique aux réunions pré-événementielles pour valider les besoins humains. Présence obligatoire à la réunion post-événement pour faire un bilan bénévole.',
                    pouvoir: [
                        'Dispose d\'un pouvoir opérationnel sur la gestion humaine et les plannings de bénévoles.',
                        'Peut redistribuer ou réorganiser les missions sur le terrain pour assurer le bon déroulement de l\'événement.',
                        'Peut suspendre temporairement une tâche ou un poste en cas de problème humain, de fatigue ou de non-respect du cadre.',
                        'Collabore avec le Gestionnaire de projets pour que la logistique humaine s\'intègre harmonieusement au planning général.',
                        'N\'a pas de pouvoir décisionnel sur les choix artistiques, techniques ou financiers, mais peut alerter la direction en cas de surcharge ou déséquilibre humain.'
                    ],
                    equilibre: 'Le Responsable RH & Bénévolat est le chef d\'orchestre humain de Boomkœur. Il veille à ce que chaque membre ou bénévole trouve sa place, comprenne son rôle et puisse s\'impliquer sereinement. Il transforme le groupe en équipe, en donnant du sens et de la reconnaissance au travail de chacun.'
                }
            ]
        },
        'eddie': {
            icon: '<i class="fas fa-briefcase"></i>',
            name: 'Eddie',
            roles: [
                {
                    title: 'Responsable Commercial / Partenariats',
                    level: 'NIVEAU 2',
                    icon: 'fa-briefcase',
                    responsibilities: [
                        'Développe les partenariats financiers, sponsors, et collaborations locales.',
                        'Gère la billetterie, le merch, et les offres commerciales (abonnements, réductions, etc.).',
                        'Collabore avec le DA pour la cohérence de marque et le storytelling.'
                    ],
                    implication: 'Environ 2 à 3h/semaine hors événement. Prospection de partenaires, suivi des ventes, gestion du merch et de la billetterie. Collaboration avec le Trésorier et le Directeur Stratégie. Activité accrue en période de préparation d\'événement.',
                    pouvoir: [
                        'Décision autonome sur les propositions commerciales, sous validation du Président et du Trésorier.',
                        'Doit consulter le DA sur toute collaboration visuelle ou branding.'
                    ]
                }
            ]
        },
        'flow': {
            icon: '<i class="fas fa-wrench"></i>',
            name: 'Flow',
            roles: [
                {
                    title: 'Manager artistique / Programmateur',
                    level: 'NIVEAU 2',
                    icon: 'fa-headphones',
                    responsibilities: [
                        'Recherche, sélection et coordination des artistes invités.',
                        'Gère le contact entre DJs, labels et techniciens.',
                        'Collabore avec le DA pour aligner la programmation avec l\'univers visuel et émotionnel.'
                    ],
                    implication: 'Présence active sur chaque événement et en amont. Environ 3 à 5h/semaine. Coordination constante avec le DA et le Responsable technique.',
                    pouvoir: [
                        'Décision partagée avec le Président et le DA sur la programmation.',
                        'Décision autonome sur la logistique des artistes (transport, planning, accueil).'
                    ]
                },
                {
                    title: 'Directeur Technique et Logistique',
                    level: 'NIVEAU 2',
                    icon: 'fa-wrench',
                    responsibilities: [
                        'Supervise les besoins matériels : son, lumière, décor, sécurité.',
                        'Gère les équipes techniques et les prestataires.',
                        'Anticipe les contraintes des lieux (installation, démontage, timing).'
                    ],
                    implication: 'Travail intensif les semaines d\'événement. En moyenne 3 à 4h/semaine, avec pics intenses avant chaque événement. Coordination directe avec le DA et le Manager artistique.',
                    pouvoir: [
                        'Décision finale sur les questions techniques (faisabilité, sécurité, matériel).',
                        'Le DA a autorité sur le visuel, mais pas sur la logistique pure.'
                    ]
                },
                {
                    title: 'DJ / Artiste résident',
                    level: 'NIVEAU 4',
                    icon: 'fa-music',
                    responsibilities: [
                        'Participer aux événements de l\'association.',
                        'Contribuer à la construction artistique du collectif (sélection musicale, ambiance, playlists).',
                        'Soutenir la communication via les réseaux et la promotion.'
                    ],
                    implication: 'Variable selon l\'agenda, mais engagement attendu dans la vie du collectif.',
                    pouvoir: [
                        'Décision artistique individuelle sur ses sets et propositions musicales.',
                        'Peut contribuer à la réflexion artistique globale, mais n\'a pas de pouvoir exécutif.'
                    ]
                }
            ]
        },
        'blondy': {
            icon: '<i class="fas fa-comment-dots"></i>',
            name: 'Blondy',
            roles: [
                {
                    title: 'Community Manager',
                    level: 'NIVEAU 3',
                    icon: 'fa-comment-dots',
                    responsibilities: [
                        'Gère la communication digitale : Instagram, TikTok, Facebook, etc.',
                        'Planifie, rédige et publie les contenus selon le calendrier fixé par le DA.',
                        'Interagit avec la communauté (réponses, messages, reposts).',
                        'Analyse les performances (statistiques, engagement, portée).'
                    ],
                    implication: 'Travail hebdomadaire continu (au moins 2 à 3 sessions/semaine). En moyenne 4 à 6h/semaine. Coordination constante avec le DA et le Responsable commercial.',
                    pouvoir: [
                        'Décision opérationnelle sur la manière d\'exécuter la stratégie validée (format, horaire, wording).',
                        'Aucune autorité sur la direction artistique ou le planning de diffusion.'
                    ]
                }
            ]
        },
        'team-crea': {
            icon: '<i class="fas fa-pen-nib"></i>',
            name: 'Team Créa',
            roles: [
                {
                    title: 'Graphistes',
                    level: 'NIVEAU 3',
                    icon: 'fa-pen-nib',
                    responsibilities: [
                        'Création graphique et identité visuelle.',
                        'Production de supports de communication visuels.'
                    ],
                    implication: 'Variable selon les besoins de production.',
                    pouvoir: [
                        'Exécution créative sous validation du DA.'
                    ]
                }
            ]
        },
        'team-media': {
            icon: '<i class="fas fa-camera"></i>',
            name: 'Team Média',
            roles: [
                {
                    title: 'Média / Vidéo',
                    level: 'NIVEAU 3',
                    icon: 'fa-camera',
                    responsibilities: [
                        'Production de contenu vidéo et média.',
                        'Gestion de la communication visuelle et audiovisuelle.',
                        'Note : Vidéaste (Antoine) est externe à l\'association.'
                    ],
                    implication: 'Variable selon les événements.',
                    pouvoir: [
                        'Exécution technique, validation artistique par le DA.'
                    ]
                }
            ]
        },
        'residents': {
            icon: '<i class="fas fa-music"></i>',
            name: 'Résidents',
            roles: [
                {
                    title: 'DJs & Artistes',
                    level: 'NIVEAU 4',
                    icon: 'fa-music',
                    responsibilities: [
                        'Participer aux événements de l\'association.',
                        'Contribuer à la construction artistique du collectif (sélection musicale, ambiance, playlists).',
                        'Soutenir la communication via les réseaux et la promotion.'
                    ],
                    implication: 'Variable selon l\'agenda, mais engagement attendu dans la vie du collectif.',
                    pouvoir: [
                        'Décision artistique individuelle sur ses sets et propositions musicales.',
                        'Peut contribuer à la réflexion artistique globale, mais n\'a pas de pouvoir exécutif.'
                    ]
                }
            ]
        },
        'team-terrain': {
            icon: '<i class="fas fa-people-carry"></i>',
            name: 'Team Terrain',
            roles: [
                {
                    title: 'Bénévoles',
                    level: 'NIVEAU 4',
                    icon: 'fa-people-carry',
                    responsibilities: [
                        'Support opérationnel sur le terrain.',
                        'Participation aux événements et activités de l\'association.'
                    ],
                    implication: 'Variable selon les événements et disponibilités.',
                    pouvoir: [
                        'Exécution des missions assignées par le Responsable RH & Bénévolat.'
                    ]
                }
            ]
        },
        'team-montage': {
            icon: '<i class="fas fa-tools"></i>',
            name: 'Team Montage',
            roles: [
                {
                    title: 'Techniciens',
                    level: 'NIVEAU 4',
                    icon: 'fa-tools',
                    responsibilities: [
                        'Installation et maintenance technique.',
                        'Support logistique et technique lors des événements.'
                    ],
                    implication: 'Variable selon les événements.',
                    pouvoir: [
                        'Exécution technique sous supervision du Directeur Technique et Logistique.'
                    ]
                }
            ]
        }
    };

    // Fonction pour créer le HTML d'une fiche de rôle
    function createRoleSheet(role) {
        let html = `
            <div class="role-sheet">
                <div class="role-sheet-header">
                    <div class="role-sheet-title-section">
                        <i class="fas ${role.icon || 'fa-circle'} role-sheet-icon"></i>
                        <div>
                            <h3 class="role-sheet-title">${role.title}</h3>
                            <span class="role-sheet-level">${role.level}</span>
                        </div>
                    </div>
                </div>
        `;

        // Responsabilités
        if (role.responsibilities && role.responsibilities.length > 0) {
            html += `
                <div class="role-section">
                    <h4 class="role-section-title">
                        <i class="fas fa-tasks"></i>
                        RESPONSABILITÉS
                    </h4>
                    <ul class="role-list">
                        ${role.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Implication
        if (role.implication) {
            html += `
                <div class="role-section">
                    <h4 class="role-section-title">
                        <i class="fas fa-clock"></i>
                        IMPLICATION
                    </h4>
                    <p class="role-text">${role.implication}</p>
                </div>
            `;
        }

        // Pouvoir décisionnel
        if (role.pouvoir && role.pouvoir.length > 0) {
            html += `
                <div class="role-section">
                    <h4 class="role-section-title">
                        <i class="fas fa-gavel"></i>
                        POUVOIR DÉCISIONNEL
                    </h4>
                    <ul class="role-list">
                        ${role.pouvoir.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Rôle d'équilibre
        if (role.equilibre) {
            html += `
                <div class="role-section role-section-equilibre">
                    <h4 class="role-section-title">
                        <i class="fas fa-balance-scale"></i>
                        RÔLE D'ÉQUILIBRE
                    </h4>
                    <p class="role-text">${role.equilibre}</p>
                </div>
            `;
        }

        html += `</div>`;
        return html;
    }

    // Ouvrir le modal au clic sur une carte
    memberCards.forEach(card => {
        card.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            const memberData = membersData[memberId];

            if (memberData) {
                modalIcon.innerHTML = memberData.icon;
                modalTitle.textContent = memberData.name;
                
                // Afficher les rôles
                const rolesText = memberData.roles.map(r => r.title).join(' • ');
                modalRoles.textContent = rolesText;

                // Afficher les fiches de rôle détaillées
                modalBody.innerHTML = '';
                memberData.roles.forEach((role, index) => {
                    const roleSheet = document.createElement('div');
                    roleSheet.innerHTML = createRoleSheet(role);
                    modalBody.appendChild(roleSheet);
                    
                    // Ajouter un séparateur entre les rôles
                    if (index < memberData.roles.length - 1) {
                        const separator = document.createElement('div');
                        separator.className = 'role-sheet-separator';
                        modalBody.appendChild(separator);
                    }
                });

                modal.classList.add('active');
            }
        });
    });

    // Fermer le modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    // Fermer le modal en cliquant sur l'overlay
    if (modal) {
        modal.querySelector('.modal-overlay').addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    // Fermer le modal avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
});
