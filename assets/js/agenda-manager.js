// Gestionnaire des ordres du jour
class AgendaManager {
    constructor() {
        this.storageKey = 'boomkoeur_agendas';
        this.currentAgenda = null;
        this.agendas = this.loadAgendas();
        this.init();
    }

    init() {
        // Initialiser avec l'ordre du jour par défaut si aucun n'existe
        if (this.agendas.length === 0) {
            this.createDefaultAgenda();
        }

        // Afficher le dernier ordre du jour
        this.displayCurrentAgenda();

        // Événements
        this.setupEventListeners();
    }

    createDefaultAgenda() {
        const defaultAgenda = {
            id: Date.now(),
            title: 'Réunion de structuration',
            date: '2025-11-29',
            items: [
                {
                    number: 1,
                    title: 'Ouverture & cadre de la réunion',
                    description: 'Présentation des objectifs et du cadre général.'
                },
                {
                    number: 2,
                    title: 'Présentation de la synthèse globale',
                    description: 'Analyse complète des réponses au formulaire.\n\nObjectif : poser un socle commun de compréhension.'
                },
                {
                    number: 3,
                    title: 'Tour de table n°1 — Expression personnelle',
                    description: 'Chaque membre prend la parole 5 minutes. (15min pour ceux qui n\'ont pas rendu leur formulaire)\n\nObjectif : exprimer frustrations, envies, besoins.'
                },
                {
                    number: 4,
                    title: 'Pause',
                    description: 'Quelques minutes pour souffler.'
                },
                {
                    number: 5,
                    title: 'Présentation du document psycho-sociologique',
                    description: 'Comprendre les dynamiques naturelles d\'un collectif et les biais internes.'
                },
                {
                    number: 6,
                    title: 'Tour de table n°2 — Réactions réfléchies',
                    description: '3 minutes par personne : ce que chacun retient et comprend.'
                },
                {
                    number: 7,
                    title: 'Présentation du système de structuration',
                    description: 'Rôles, responsabilités, workflow, processus décisionnel.'
                },
                {
                    number: 8,
                    title: 'Tour de parole sur les rôles',
                    description: '5 minutes par membre pour définir son rôle souhaité et son engagement.'
                },
                {
                    number: 9,
                    title: 'Synthèse finale des points à décider',
                    description: 'Ce qui a été clarifié — ce qui reste à finaliser.'
                },
                {
                    number: 10,
                    title: 'Clôture',
                    description: 'Conclusion et prochaines étapes.'
                }
            ],
            archived: false
        };

        this.agendas.push(defaultAgenda);
        this.saveAgendas();
    }

    loadAgendas() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Erreur lors du chargement des agendas:', e);
            return [];
        }
    }

    saveAgendas() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.agendas));
        } catch (e) {
            console.error('Erreur lors de la sauvegarde des agendas:', e);
        }
    }

    getCurrentAgenda() {
        return this.agendas.find(a => !a.archived) || this.agendas[this.agendas.length - 1];
    }

    displayCurrentAgenda() {
        const agenda = this.getCurrentAgenda();
        if (!agenda) return;

        this.currentAgenda = agenda;

        // Mettre à jour le titre et la date
        document.getElementById('agenda-subtitle').textContent = agenda.title;
        const dateObj = new Date(agenda.date);
        const formattedDate = dateObj.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        document.getElementById('agenda-date').textContent = formattedDate.replace(/\//g, ' / ');

        // Afficher les items (4 visibles avec scroll)
        const container = document.getElementById('agenda-scroll-container');
        container.innerHTML = '';

        agenda.items.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'agenda-item';
            itemEl.innerHTML = `
                <div class="agenda-number">${String(item.number).padStart(2, '0')}</div>
                <div class="agenda-content">
                    <h3 class="agenda-title">${item.title}</h3>
                    <p class="agenda-description">${item.description.replace(/\n/g, '<br>')}</p>
                </div>
            `;
            container.appendChild(itemEl);
        });
    }

    setupEventListeners() {
        // Bouton nouveau ordre du jour
        document.getElementById('btn-new-agenda').addEventListener('click', () => {
            this.openNewAgendaModal();
        });

        // Bouton historique
        document.getElementById('btn-show-history').addEventListener('click', () => {
            this.openHistoryModal();
        });

        // Fermer modals
        document.getElementById('close-new-agenda').addEventListener('click', () => {
            this.closeNewAgendaModal();
        });
        document.getElementById('close-history').addEventListener('click', () => {
            this.closeHistoryModal();
        });
        document.getElementById('cancel-new-agenda').addEventListener('click', () => {
            this.closeNewAgendaModal();
        });

        // Sauvegarder nouveau ordre du jour
        document.getElementById('save-new-agenda').addEventListener('click', () => {
            this.saveNewAgenda();
        });

        // Ajouter un item
        document.getElementById('btn-add-agenda-item').addEventListener('click', () => {
            this.addAgendaItem();
        });

        // Fermer modals en cliquant sur l'overlay
        document.getElementById('modal-new-agenda').addEventListener('click', (e) => {
            if (e.target.id === 'modal-new-agenda') {
                this.closeNewAgendaModal();
            }
        });
        document.getElementById('modal-history').addEventListener('click', (e) => {
            if (e.target.id === 'modal-history') {
                this.closeHistoryModal();
            }
        });
    }

    openNewAgendaModal() {
        const modal = document.getElementById('modal-new-agenda');
        modal.style.display = 'flex';

        // Réinitialiser le formulaire
        document.getElementById('agenda-title-input').value = '';
        document.getElementById('agenda-date-input').value = new Date().toISOString().split('T')[0];
        document.getElementById('agenda-items-container').innerHTML = '';

        // Ajouter un premier item
        this.addAgendaItem();
    }

    closeNewAgendaModal() {
        document.getElementById('modal-new-agenda').style.display = 'none';
    }

    addAgendaItem() {
        const container = document.getElementById('agenda-items-container');
        const itemCount = container.children.length + 1;

        const itemEl = document.createElement('div');
        itemEl.className = 'agenda-item-form';
        itemEl.innerHTML = `
            <div class="agenda-item-form-header">
                <span class="agenda-item-number">${String(itemCount).padStart(2, '0')}</span>
                <button type="button" class="btn-remove-item" onclick="this.parentElement.parentElement.remove(); agendaManager.renumberItems();">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <input type="text" class="form-input" placeholder="Titre du point" data-item-title>
            <textarea class="form-textarea" placeholder="Description" rows="3" data-item-description></textarea>
        `;
        container.appendChild(itemEl);
    }

    renumberItems() {
        const container = document.getElementById('agenda-items-container');
        const items = container.querySelectorAll('.agenda-item-form');
        items.forEach((item, index) => {
            const numberEl = item.querySelector('.agenda-item-number');
            numberEl.textContent = String(index + 1).padStart(2, '0');
        });
    }

    saveNewAgenda() {
        // Archiver l'ancien ordre du jour
        const currentAgenda = this.getCurrentAgenda();
        if (currentAgenda) {
            currentAgenda.archived = true;
        }

        // Créer le nouvel ordre du jour
        const title = document.getElementById('agenda-title-input').value.trim();
        const date = document.getElementById('agenda-date-input').value;
        const itemsContainer = document.getElementById('agenda-items-container');
        const items = [];

        itemsContainer.querySelectorAll('.agenda-item-form').forEach((itemEl, index) => {
            const titleInput = itemEl.querySelector('[data-item-title]');
            const descInput = itemEl.querySelector('[data-item-description]');
            const itemTitle = titleInput.value.trim();
            const itemDesc = descInput.value.trim();

            if (itemTitle) {
                items.push({
                    number: index + 1,
                    title: itemTitle,
                    description: itemDesc
                });
            }
        });

        if (!title || items.length === 0) {
            alert('Veuillez remplir au moins le titre et un point de l\'ordre du jour.');
            return;
        }

        const newAgenda = {
            id: Date.now(),
            title: title,
            date: date,
            items: items,
            archived: false
        };

        this.agendas.push(newAgenda);
        this.saveAgendas();
        this.displayCurrentAgenda();
        this.closeNewAgendaModal();
    }

    openHistoryModal() {
        const modal = document.getElementById('modal-history');
        modal.style.display = 'flex';

        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';

        const archivedAgendas = this.agendas.filter(a => a.archived).reverse();

        if (archivedAgendas.length === 0) {
            historyList.innerHTML = '<p class="history-empty">Aucun ordre du jour archivé.</p>';
            return;
        }

        archivedAgendas.forEach(agenda => {
            const dateObj = new Date(agenda.date);
            const formattedDate = dateObj.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-item-header">
                    <h3 class="history-item-title">${agenda.title}</h3>
                    <span class="history-item-date">${formattedDate}</span>
                </div>
                <div class="history-item-content">
                    <div class="history-items-list">
                        ${agenda.items.map(item => `
                            <div class="history-item-point">
                                <span class="history-item-number">${String(item.number).padStart(2, '0')}</span>
                                <span class="history-item-point-title">${item.title}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            historyList.appendChild(historyItem);
        });
    }

    closeHistoryModal() {
        document.getElementById('modal-history').style.display = 'none';
    }
}

// Initialiser le gestionnaire d'agenda
let agendaManager;
document.addEventListener('DOMContentLoaded', () => {
    agendaManager = new AgendaManager();
});

