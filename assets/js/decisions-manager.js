// Gestionnaire des décisions
class DecisionsManager {
    constructor() {
        this.storageKey = 'boomkoeur_decisions';
        this.decisions = this.loadDecisions();
        this.decisionTypes = {
            strategique: {
                label: 'STRATÉGIQUE',
                color: '#ef4444',
                decider: 'Président',
                delay: '7-14 jours',
                proposer: 'Directeurs'
            },
            directionnel: {
                label: 'DIRECTIONNEL',
                color: '#FF5500',
                decider: 'Directeurs',
                delay: '7 jours',
                proposer: 'Niveau 3/4'
            },
            coordination: {
                label: 'COORDINATION',
                color: '#fbbf24',
                decider: 'Niveau 3',
                delay: '3-5 jours',
                proposer: 'Niveau 4'
            },
            operationnelle: {
                label: 'OPÉRATIONNELLE',
                color: '#4ade80',
                decider: 'Niveau 4',
                delay: 'Immédiat',
                proposer: 'Niveau 4'
            }
        };
        this.init();
    }

    init() {
        // Initialiser avec des décisions par défaut si aucune n'existe
        if (this.decisions.length === 0) {
            this.createDefaultDecisions();
        }

        // Afficher les 10 dernières décisions
        this.displayRecentDecisions();

        // Événements
        this.setupEventListeners();
    }

    createDefaultDecisions() {
        const defaultDecisions = [
            {
                id: Date.now() - 2,
                title: 'Adoption de la nouvelle gouvernance',
                date: '2025-11-29',
                type: 'strategique',
                proposer: 'Directeurs',
                decider: 'Président',
                context: 'Réunion de structuration',
                description: 'Validation du nouveau cadre d\'organisation avec structure par pôles et niveaux de responsabilité. Mise en place d\'une gouvernance claire avec autorité fonctionnelle.',
                archived: false
            },
            {
                id: Date.now() - 1,
                title: 'Mise en place du système de documentation',
                date: '2025-11-29',
                type: 'directionnel',
                proposer: 'Directeur Stratégique',
                decider: 'Directeurs',
                context: 'Réunion de structuration',
                description: 'Création de la plateforme BOOMKŒUR.EXE pour centraliser toutes les informations et décisions. Outil stratégique pour la mémoire institutionnelle.',
                archived: false
            },
            {
                id: Date.now(),
                title: 'Définition des rôles et responsabilités',
                date: '2025-11-29',
                type: 'strategique',
                proposer: 'Directeurs',
                decider: 'Président',
                context: 'Réunion de structuration',
                description: 'Clarification des fonctions de chaque membre avec niveaux de pouvoir et implications définis. Création des fiches de poste types.',
                archived: false
            }
        ];

        this.decisions = defaultDecisions;
        this.saveDecisions();
    }

    loadDecisions() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Erreur lors du chargement des décisions:', e);
            return [];
        }
    }

    saveDecisions() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.decisions));
        } catch (e) {
            console.error('Erreur lors de la sauvegarde des décisions:', e);
        }
    }

    getRecentDecisions(limit = 10) {
        return this.decisions
            .filter(d => !d.archived)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }

    displayRecentDecisions() {
        const recentDecisions = this.getRecentDecisions(10);
        const container = document.getElementById('decision-scroll-container');
        container.innerHTML = '';

        if (recentDecisions.length === 0) {
            container.innerHTML = '<p class="decision-empty">Aucune décision enregistrée.</p>';
            return;
        }

        recentDecisions.forEach(decision => {
            const typeInfo = this.decisionTypes[decision.type];
            const dateObj = new Date(decision.date);
            const formattedDate = dateObj.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            const decisionEl = document.createElement('div');
            decisionEl.className = 'decision-item';
            decisionEl.innerHTML = `
                <div class="decision-icon" style="background: rgba(${this.hexToRgb(typeInfo.color)}, 0.1); border-color: ${typeInfo.color};">
                    <i class="fas fa-check-circle" style="color: ${typeInfo.color};"></i>
                </div>
                <div class="decision-content">
                    <div class="decision-header">
                        <h3 class="decision-title">${decision.title}</h3>
                        <span class="decision-type-badge" style="background: rgba(${this.hexToRgb(typeInfo.color)}, 0.1); color: ${typeInfo.color}; border-color: ${typeInfo.color};">
                            ${typeInfo.label}
                        </span>
                    </div>
                    <div class="decision-meta">
                        <span class="decision-date">${formattedDate}</span>
                        <span class="decision-separator">•</span>
                        <span class="decision-context">${decision.context}</span>
                    </div>
                    <div class="decision-details">
                        <div class="decision-detail-item">
                            <i class="fas fa-user" style="color: ${typeInfo.color};"></i>
                            <span>Proposé par: <strong>${decision.proposer}</strong></span>
                        </div>
                        <div class="decision-detail-item">
                            <i class="fas fa-gavel" style="color: ${typeInfo.color};"></i>
                            <span>Décidé par: <strong>${decision.decider}</strong></span>
                        </div>
                        <div class="decision-detail-item">
                            <i class="fas fa-clock" style="color: ${typeInfo.color};"></i>
                            <span>Délai: <strong>${typeInfo.delay}</strong></span>
                        </div>
                    </div>
                    <p class="decision-description">${decision.description}</p>
                </div>
            `;
            container.appendChild(decisionEl);
        });
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
            '255, 85, 0';
    }

    setupEventListeners() {
        // Bouton nouvelle décision
        document.getElementById('btn-new-decision').addEventListener('click', () => {
            this.openNewDecisionModal();
        });

        // Bouton historique
        document.getElementById('btn-show-decision-history').addEventListener('click', () => {
            this.openHistoryModal();
        });

        // Fermer modals
        document.getElementById('close-new-decision').addEventListener('click', () => {
            this.closeNewDecisionModal();
        });
        document.getElementById('close-decision-history').addEventListener('click', () => {
            this.closeHistoryModal();
        });
        document.getElementById('cancel-new-decision').addEventListener('click', () => {
            this.closeNewDecisionModal();
        });

        // Sauvegarder nouvelle décision
        document.getElementById('save-new-decision').addEventListener('click', () => {
            this.saveNewDecision();
        });

        // Mettre à jour les champs selon le type
        document.getElementById('decision-type-input').addEventListener('change', (e) => {
            this.updateDecisionFields(e.target.value);
        });

        // Fermer modals en cliquant sur l'overlay
        document.getElementById('modal-new-decision').addEventListener('click', (e) => {
            if (e.target.id === 'modal-new-decision') {
                this.closeNewDecisionModal();
            }
        });
        document.getElementById('modal-decision-history').addEventListener('click', (e) => {
            if (e.target.id === 'modal-decision-history') {
                this.closeHistoryModal();
            }
        });
    }

    updateDecisionFields(type) {
        const typeInfo = this.decisionTypes[type];
        const proposerInput = document.getElementById('decision-proposer-input');
        const deciderInput = document.getElementById('decision-decider-input');

        // Mettre à jour les valeurs par défaut selon le type
        if (type === 'strategique') {
            proposerInput.placeholder = 'Ex: Directeurs';
            deciderInput.placeholder = 'Ex: Président';
        } else if (type === 'directionnel') {
            proposerInput.placeholder = 'Ex: Niveau 3/4';
            deciderInput.placeholder = 'Ex: Directeur Marketing';
        } else if (type === 'coordination') {
            proposerInput.placeholder = 'Ex: Niveau 4';
            deciderInput.placeholder = 'Ex: Secrétaire, RH';
        } else if (type === 'operationnelle') {
            proposerInput.placeholder = 'Ex: Niveau 4';
            deciderInput.placeholder = 'Ex: Graphiste, Technicien';
        }
    }

    openNewDecisionModal() {
        const modal = document.getElementById('modal-new-decision');
        modal.style.display = 'flex';

        // Réinitialiser le formulaire
        document.getElementById('decision-title-input').value = '';
        document.getElementById('decision-date-input').value = new Date().toISOString().split('T')[0];
        document.getElementById('decision-type-input').value = 'strategique';
        document.getElementById('decision-proposer-input').value = '';
        document.getElementById('decision-decider-input').value = '';
        document.getElementById('decision-context-input').value = '';
        document.getElementById('decision-description-input').value = '';

        // Mettre à jour les champs selon le type par défaut
        this.updateDecisionFields('strategique');
    }

    closeNewDecisionModal() {
        document.getElementById('modal-new-decision').style.display = 'none';
    }

    saveNewDecision() {
        const title = document.getElementById('decision-title-input').value.trim();
        const date = document.getElementById('decision-date-input').value;
        const type = document.getElementById('decision-type-input').value;
        const proposer = document.getElementById('decision-proposer-input').value.trim();
        const decider = document.getElementById('decision-decider-input').value.trim();
        const context = document.getElementById('decision-context-input').value.trim();
        const description = document.getElementById('decision-description-input').value.trim();

        if (!title || !date || !proposer || !decider || !description) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        const newDecision = {
            id: Date.now(),
            title: title,
            date: date,
            type: type,
            proposer: proposer,
            decider: decider,
            context: context || 'Décision individuelle',
            description: description,
            archived: false
        };

        this.decisions.push(newDecision);
        this.saveDecisions();
        this.displayRecentDecisions();
        this.closeNewDecisionModal();
    }

    openHistoryModal() {
        const modal = document.getElementById('modal-decision-history');
        modal.style.display = 'flex';

        const historyList = document.getElementById('decision-history-list');
        historyList.innerHTML = '';

        const allDecisions = this.decisions
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        if (allDecisions.length === 0) {
            historyList.innerHTML = '<p class="history-empty">Aucune décision enregistrée.</p>';
            return;
        }

        allDecisions.forEach(decision => {
            const typeInfo = this.decisionTypes[decision.type];
            const dateObj = new Date(decision.date);
            const formattedDate = dateObj.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-item-header">
                    <div>
                        <h3 class="history-item-title">${decision.title}</h3>
                        <span class="decision-type-badge" style="background: rgba(${this.hexToRgb(typeInfo.color)}, 0.1); color: ${typeInfo.color}; border-color: ${typeInfo.color};">
                            ${typeInfo.label}
                        </span>
                    </div>
                    <span class="history-item-date">${formattedDate}</span>
                </div>
                <div class="history-item-content">
                    <div class="decision-details">
                        <div class="decision-detail-item">
                            <i class="fas fa-user" style="color: ${typeInfo.color};"></i>
                            <span>Proposé par: <strong>${decision.proposer}</strong></span>
                        </div>
                        <div class="decision-detail-item">
                            <i class="fas fa-gavel" style="color: ${typeInfo.color};"></i>
                            <span>Décidé par: <strong>${decision.decider}</strong></span>
                        </div>
                        <div class="decision-detail-item">
                            <i class="fas fa-clock" style="color: ${typeInfo.color};"></i>
                            <span>Délai: <strong>${typeInfo.delay}</strong></span>
                        </div>
                        <div class="decision-detail-item">
                            <i class="fas fa-calendar-alt" style="color: ${typeInfo.color};"></i>
                            <span>Contexte: <strong>${decision.context}</strong></span>
                        </div>
                    </div>
                    <p class="history-item-description">${decision.description}</p>
                </div>
            `;
            historyList.appendChild(historyItem);
        });
    }

    closeHistoryModal() {
        document.getElementById('modal-decision-history').style.display = 'none';
    }
}

// Initialiser le gestionnaire de décisions
let decisionsManager;
document.addEventListener('DOMContentLoaded', () => {
    decisionsManager = new DecisionsManager();
});

