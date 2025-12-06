// Système de gestion Commerciale & CRM - BOOMKŒUR.EXE
// Gère : Contacts, Pipeline, Deals, KPIs

class CommercialManager {
    constructor() {
        this.contacts = [];
        this.opportunities = [];
        this.deals = [];
        this.currentTab = 'pipeline';
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadCommercialData();
        this.renderDashboard();
        this.renderPipeline();
        this.renderContacts();
        this.renderDeals();
        this.updateStats();
    }

    // ============================================
    // CHARGEMENT DES DONNÉES
    // ============================================

    loadCommercialData() {
        const savedContacts = localStorage.getItem('commercial_contacts');
        const savedOpportunities = localStorage.getItem('commercial_opportunities');
        const savedDeals = localStorage.getItem('commercial_deals');

        if (savedContacts) {
            this.contacts = JSON.parse(savedContacts);
        } else {
            // Données d'exemple
            this.contacts = [
                {
                    id: 'contact-1',
                    name: 'Techno Club Le Havre',
                    type: 'lieu',
                    email: 'contact@technoclub.fr',
                    phone: '02 35 XX XX XX',
                    address: 'Le Havre, Normandie',
                    status: 'actif',
                    notes: 'Lieu principal pour nos événements',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'contact-2',
                    name: 'Red Bull France',
                    type: 'sponsor',
                    email: 'partenariats@redbull.fr',
                    phone: '01 XX XX XX XX',
                    status: 'prospect',
                    notes: 'Intéressé par un partenariat événementiel',
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveCommercialData();
        }

        if (savedOpportunities) {
            this.opportunities = JSON.parse(savedOpportunities);
        } else {
            // Données d'exemple
            this.opportunities = [
                {
                    id: 'opp-1',
                    title: 'Partenariat Red Bull',
                    contactId: 'contact-2',
                    stage: 'négociation',
                    amount: 15000,
                    probability: 70,
                    expectedCloseDate: '2026-03-15',
                    responsible: 'Eddie',
                    notes: 'Négociation en cours sur les modalités',
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveCommercialData();
        }

        if (savedDeals) {
            this.deals = JSON.parse(savedDeals);
        }
    }

    saveCommercialData() {
        localStorage.setItem('commercial_contacts', JSON.stringify(this.contacts));
        localStorage.setItem('commercial_opportunities', JSON.stringify(this.opportunities));
        localStorage.setItem('commercial_deals', JSON.stringify(this.deals));
    }

    // ============================================
    // DASHBOARD COMMERCIAL
    // ============================================

    renderDashboard() {
        this.updateKPIs();
    }

    updateKPIs() {
        const dealsSigned = this.deals.length;
        const revenuePartnerships = this.deals
            .filter(d => d.type === 'partenariat')
            .reduce((sum, d) => sum + (d.amount || 0), 0);
        
        const newVenues = this.deals
            .filter(d => d.type === 'lieu')
            .length;
        
        const revenueMerch = this.deals
            .filter(d => d.type === 'merchandising')
            .reduce((sum, d) => sum + (d.amount || 0), 0);

        const totalOpportunities = this.opportunities.length;
        const closedOpportunities = this.deals.length;
        const conversionRate = totalOpportunities > 0 
            ? ((closedOpportunities / totalOpportunities) * 100).toFixed(1)
            : 0;

        document.getElementById('kpi-deals-signed').textContent = dealsSigned;
        document.getElementById('kpi-revenue-partnerships').textContent = this.formatCurrency(revenuePartnerships);
        document.getElementById('kpi-new-venues').textContent = newVenues;
        document.getElementById('kpi-revenue-merch').textContent = this.formatCurrency(revenueMerch);
        document.getElementById('kpi-conversion-rate').textContent = conversionRate + '%';
    }

    formatCurrency(amount) {
        if (amount >= 1000) {
            return (amount / 1000).toFixed(0) + 'K€';
        }
        return amount + '€';
    }

    // ============================================
    // NAVIGATION PAR ONGLETS
    // ============================================

    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Masquer tous les onglets
        document.querySelectorAll('.commercial-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Afficher l'onglet sélectionné
        document.getElementById(`tab-${tabName}`).style.display = 'block';
        
        // Mettre à jour les boutons
        document.querySelectorAll('.commercial-tab').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
                btn.style.color = '#FF5500';
                btn.style.borderBottomColor = '#FF5500';
            } else {
                btn.style.color = '#999';
                btn.style.borderBottomColor = 'transparent';
            }
        });
    }

    // ============================================
    // PIPELINE COMMERCIAL
    // ============================================

    renderPipeline() {
        const container = document.getElementById('pipeline-kanban');
        if (!container) return;

        const stages = [
            { id: 'prospection', name: 'PROSPECTION', color: '#666', icon: 'fa-search' },
            { id: 'contact-initial', name: 'CONTACT INITIAL', color: '#fbbf24', icon: 'fa-phone' },
            { id: 'négociation', name: 'NÉGOCIATION', color: '#FF5500', icon: 'fa-handshake' },
            { id: 'closing', name: 'CLOSING', color: '#4ade80', icon: 'fa-file-signature' },
            { id: 'signés', name: 'SIGNÉS', color: '#4ade80', icon: 'fa-check-circle' }
        ];

        container.innerHTML = stages.map(stage => {
            const stageOpportunities = this.opportunities.filter(opp => opp.stage === stage.id);
            const stageValue = stageOpportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0);
            
            return `
                <div class="pipeline-column" data-stage="${stage.id}" style="background: #0a0a0a; border: 2px solid #333; border-radius: 4px; padding: 16px; min-height: 400px;">
                    <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #333;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <i class="fas ${stage.icon}" style="color: ${stage.color}; font-size: 16px;"></i>
                            <h3 style="font-family: 'Oswald', sans-serif; font-size: 14px; color: white; margin: 0; text-transform: uppercase;">
                                ${stage.name}
                            </h3>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 24px; color: ${stage.color}; font-weight: 700; font-family: 'Oswald', sans-serif;">
                                ${stageOpportunities.length}
                            </span>
                            ${stageValue > 0 ? `
                                <span style="font-size: 12px; color: #999;">
                                    ${this.formatCurrency(stageValue)}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                    <div class="pipeline-opportunities" data-stage="${stage.id}" style="min-height: 300px;">
                        ${stageOpportunities.map(opp => this.renderOpportunityCard(opp)).join('')}
                    </div>
                </div>
            `;
        }).join('');

        // Initialiser le drag & drop
        this.initDragAndDrop();
    }

    renderOpportunityCard(opportunity) {
        const contact = this.contacts.find(c => c.id === opportunity.contactId);
        const contactName = contact ? contact.name : 'Contact inconnu';
        
        return `
            <div class="opportunity-card" 
                 draggable="true" 
                 data-opportunity-id="${opportunity.id}"
                 style="background: #111; border: 2px solid #333; padding: 16px; margin-bottom: 12px; border-radius: 4px; cursor: move; transition: all 0.3s ease;"
                 onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateY(-2px)';"
                 onmouseout="this.style.borderColor='#333'; this.style.transform='translateY(0)';"
                 onclick="commercialManager.openOpportunityDetail('${opportunity.id}')">
                <h4 style="font-family: 'Oswald', sans-serif; font-size: 14px; color: white; margin: 0 0 8px 0; text-transform: uppercase;">
                    ${opportunity.title}
                </h4>
                <p style="font-size: 11px; color: #999; margin: 0 0 8px 0;">
                    <i class="fas fa-user" style="margin-right: 4px;"></i>${contactName}
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 18px; color: #FF5500; font-weight: 700;">
                        ${this.formatCurrency(opportunity.amount || 0)}
                    </span>
                    <span style="font-size: 11px; color: #666; background: #0a0a0a; padding: 4px 8px; border-radius: 4px;">
                        ${opportunity.probability || 0}%
                    </span>
                </div>
                ${opportunity.expectedCloseDate ? `
                    <p style="font-size: 10px; color: #666; margin: 0;">
                        <i class="fas fa-calendar" style="margin-right: 4px;"></i>
                        ${new Date(opportunity.expectedCloseDate).toLocaleDateString('fr-FR')}
                    </p>
                ` : ''}
            </div>
        `;
    }

    initDragAndDrop() {
        const opportunityCards = document.querySelectorAll('.opportunity-card');
        const pipelineColumns = document.querySelectorAll('.pipeline-column');

        opportunityCards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('opportunity-id', card.dataset.opportunityId);
                card.style.opacity = '0.5';
            });

            card.addEventListener('dragend', (e) => {
                card.style.opacity = '1';
            });
        });

        pipelineColumns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                const opportunitiesContainer = column.querySelector('.pipeline-opportunities');
                if (opportunitiesContainer) {
                    opportunitiesContainer.style.background = 'rgba(255, 85, 0, 0.1)';
                }
            });

            column.addEventListener('dragleave', (e) => {
                const opportunitiesContainer = column.querySelector('.pipeline-opportunities');
                if (opportunitiesContainer) {
                    opportunitiesContainer.style.background = 'transparent';
                }
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                const opportunitiesContainer = column.querySelector('.pipeline-opportunities');
                if (opportunitiesContainer) {
                    opportunitiesContainer.style.background = 'transparent';
                }

                const opportunityId = e.dataTransfer.getData('opportunity-id');
                const newStage = column.dataset.stage;
                
                this.moveOpportunityToStage(opportunityId, newStage);
            });
        });
    }

    moveOpportunityToStage(opportunityId, newStage) {
        const opportunity = this.opportunities.find(opp => opp.id === opportunityId);
        if (opportunity) {
            opportunity.stage = newStage;
            this.saveCommercialData();
            this.renderPipeline();
            this.updateStats();
        }
    }

    // ============================================
    // GESTION DES OPPORTUNITÉS
    // ============================================

    openNewOpportunityModal() {
        const modal = document.getElementById('modal-new-opportunity');
        if (modal) {
            modal.style.display = 'flex';
            this.renderOpportunityForm();
        }
    }

    closeNewOpportunityModal() {
        const modal = document.getElementById('modal-new-opportunity');
        if (modal) modal.style.display = 'none';
    }

    renderOpportunityForm(opportunity = null) {
        const container = document.getElementById('opportunity-form-container');
        if (!container) return;

        container.innerHTML = `
            <form id="opportunity-form">
                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Titre de l'opportunité *</label>
                    <input type="text" class="form-input" id="opp-title" value="${opportunity?.title || ''}" placeholder="Ex: Partenariat Red Bull" required>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Contact associé *</label>
                    <select class="form-input" id="opp-contact" required>
                        <option value="">Sélectionner un contact</option>
                        ${this.contacts.map(contact => `
                            <option value="${contact.id}" ${opportunity?.contactId === contact.id ? 'selected' : ''}>
                                ${contact.name} (${contact.type})
                            </option>
                        `).join('')}
                    </select>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Étape du pipeline *</label>
                        <select class="form-input" id="opp-stage" required>
                            <option value="prospection" ${opportunity?.stage === 'prospection' ? 'selected' : ''}>Prospection</option>
                            <option value="contact-initial" ${opportunity?.stage === 'contact-initial' ? 'selected' : ''}>Contact initial</option>
                            <option value="négociation" ${opportunity?.stage === 'négociation' ? 'selected' : ''}>Négociation</option>
                            <option value="closing" ${opportunity?.stage === 'closing' ? 'selected' : ''}>Closing</option>
                            <option value="signés" ${opportunity?.stage === 'signés' ? 'selected' : ''}>Signés</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Montant estimé (€)</label>
                        <input type="number" class="form-input" id="opp-amount" value="${opportunity?.amount || ''}" placeholder="Ex: 15000">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Probabilité de closing (%)</label>
                        <input type="number" class="form-input" id="opp-probability" value="${opportunity?.probability || ''}" min="0" max="100" placeholder="Ex: 70">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Date de closing prévue</label>
                        <input type="date" class="form-input" id="opp-close-date" value="${opportunity?.expectedCloseDate || ''}">
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Responsable</label>
                    <input type="text" class="form-input" id="opp-responsible" value="${opportunity?.responsible || 'Eddie'}" placeholder="Ex: Eddie">
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Notes</label>
                    <textarea class="form-textarea" id="opp-notes" rows="4" placeholder="Notes sur l'opportunité...">${opportunity?.notes || ''}</textarea>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-cancel" onclick="commercialManager.closeNewOpportunityModal()">Annuler</button>
                    <button type="submit" class="btn-save">${opportunity ? 'Modifier' : 'Créer'} l'opportunité</button>
                </div>
            </form>
        `;

        const form = document.getElementById('opportunity-form');
        if (form) {
            form.addEventListener('submit', (e) => this.saveOpportunity(e, opportunity));
        }
    }

    saveOpportunity(e, opportunity) {
        e.preventDefault();

        const opp = {
            id: opportunity?.id || 'opp-' + Date.now(),
            title: document.getElementById('opp-title').value,
            contactId: document.getElementById('opp-contact').value,
            stage: document.getElementById('opp-stage').value,
            amount: parseInt(document.getElementById('opp-amount').value) || 0,
            probability: parseInt(document.getElementById('opp-probability').value) || 0,
            expectedCloseDate: document.getElementById('opp-close-date').value,
            responsible: document.getElementById('opp-responsible').value,
            notes: document.getElementById('opp-notes').value,
            createdAt: opportunity?.createdAt || new Date().toISOString()
        };

        if (opportunity) {
            const index = this.opportunities.findIndex(o => o.id === opportunity.id);
            if (index !== -1) {
                this.opportunities[index] = opp;
            }
        } else {
            this.opportunities.push(opp);
        }

        this.saveCommercialData();
        this.renderPipeline();
        this.updateStats();
        this.closeNewOpportunityModal();
    }

    openOpportunityDetail(opportunityId) {
        const opportunity = this.opportunities.find(o => o.id === opportunityId);
        if (opportunity) {
            this.renderOpportunityForm(opportunity);
            this.openNewOpportunityModal();
        }
    }

    // ============================================
    // GESTION DES CONTACTS (CRM)
    // ============================================

    renderContacts() {
        this.filterContactsByType(this.currentFilter);
    }

    filterContactsByType(type) {
        this.currentFilter = type;
        
        // Mettre à jour les boutons de filtre
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === type) {
                btn.classList.add('active');
                btn.style.borderColor = '#4ade80';
                btn.style.color = '#4ade80';
            } else {
                btn.style.borderColor = '#333';
                btn.style.color = 'white';
            }
        });

        const container = document.getElementById('contacts-list');
        if (!container) return;

        let filteredContacts = this.contacts;
        if (type !== 'all') {
            filteredContacts = this.contacts.filter(c => c.type === type);
        }

        if (filteredContacts.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: #666;">
                    <i class="fas fa-address-book" style="font-size: 64px; margin-bottom: 16px; opacity: 0.2;"></i>
                    <p>Aucun contact trouvé</p>
                    <p style="font-size: 12px; margin-top: 8px;">Créez votre premier contact</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredContacts.map(contact => `
            <div class="contact-card" 
                 style="background: #0a0a0a; border: 2px solid #333; padding: 20px; border-radius: 4px; transition: all 0.3s ease; cursor: pointer;"
                 onmouseover="this.style.borderColor='#4ade80'; this.style.background='#111';"
                 onmouseout="this.style.borderColor='#333'; this.style.background='#0a0a0a';"
                 onclick="commercialManager.openContactDetail('${contact.id}')">
                <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 12px;">
                    <div style="flex: 1;">
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 18px; color: white; margin: 0 0 8px 0; text-transform: uppercase;">
                            ${contact.name}
                        </h3>
                        <span style="font-size: 11px; color: #4ade80; text-transform: uppercase; background: rgba(74, 222, 128, 0.1); padding: 4px 8px; border-radius: 4px; border: 1px solid #4ade80;">
                            ${this.getContactTypeLabel(contact.type)}
                        </span>
                    </div>
                    <div style="width: 40px; height: 40px; background: rgba(74, 222, 128, 0.1); border: 2px solid #4ade80; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas ${this.getContactTypeIcon(contact.type)}" style="color: #4ade80;"></i>
                    </div>
                </div>
                ${contact.email ? `
                    <p style="font-size: 12px; color: #999; margin: 8px 0 4px 0;">
                        <i class="fas fa-envelope" style="margin-right: 6px;"></i>${contact.email}
                    </p>
                ` : ''}
                ${contact.phone ? `
                    <p style="font-size: 12px; color: #999; margin: 4px 0;">
                        <i class="fas fa-phone" style="margin-right: 6px;"></i>${contact.phone}
                    </p>
                ` : ''}
                ${contact.address ? `
                    <p style="font-size: 12px; color: #999; margin: 4px 0;">
                        <i class="fas fa-map-marker-alt" style="margin-right: 6px;"></i>${contact.address}
                    </p>
                ` : ''}
            </div>
        `).join('');
    }

    getContactTypeLabel(type) {
        const labels = {
            'sponsor': 'Sponsor',
            'lieu': 'Lieu',
            'fournisseur': 'Fournisseur',
            'artiste': 'Artiste',
            'partenaire': 'Partenaire',
            'institution': 'Institution'
        };
        return labels[type] || type;
    }

    getContactTypeIcon(type) {
        const icons = {
            'sponsor': 'fa-handshake',
            'lieu': 'fa-building',
            'fournisseur': 'fa-truck',
            'artiste': 'fa-music',
            'partenaire': 'fa-users',
            'institution': 'fa-landmark'
        };
        return icons[type] || 'fa-user';
    }

    searchContacts() {
        const searchTerm = document.getElementById('contacts-search').value.toLowerCase();
        const container = document.getElementById('contacts-list');
        if (!container) return;

        let filteredContacts = this.contacts;
        if (this.currentFilter !== 'all') {
            filteredContacts = filteredContacts.filter(c => c.type === this.currentFilter);
        }

        if (searchTerm) {
            filteredContacts = filteredContacts.filter(c => 
                c.name.toLowerCase().includes(searchTerm) ||
                (c.email && c.email.toLowerCase().includes(searchTerm)) ||
                (c.phone && c.phone.includes(searchTerm))
            );
        }

        if (filteredContacts.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: #666;">
                    <i class="fas fa-search" style="font-size: 64px; margin-bottom: 16px; opacity: 0.2;"></i>
                    <p>Aucun contact ne correspond à votre recherche</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredContacts.map(contact => `
            <div class="contact-card" 
                 style="background: #0a0a0a; border: 2px solid #333; padding: 20px; border-radius: 4px; transition: all 0.3s ease; cursor: pointer;"
                 onmouseover="this.style.borderColor='#4ade80'; this.style.background='#111';"
                 onmouseout="this.style.borderColor='#333'; this.style.background='#0a0a0a';"
                 onclick="commercialManager.openContactDetail('${contact.id}')">
                <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 12px;">
                    <div style="flex: 1;">
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 18px; color: white; margin: 0 0 8px 0; text-transform: uppercase;">
                            ${contact.name}
                        </h3>
                        <span style="font-size: 11px; color: #4ade80; text-transform: uppercase; background: rgba(74, 222, 128, 0.1); padding: 4px 8px; border-radius: 4px; border: 1px solid #4ade80;">
                            ${this.getContactTypeLabel(contact.type)}
                        </span>
                    </div>
                    <div style="width: 40px; height: 40px; background: rgba(74, 222, 128, 0.1); border: 2px solid #4ade80; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas ${this.getContactTypeIcon(contact.type)}" style="color: #4ade80;"></i>
                    </div>
                </div>
                ${contact.email ? `
                    <p style="font-size: 12px; color: #999; margin: 8px 0 4px 0;">
                        <i class="fas fa-envelope" style="margin-right: 6px;"></i>${contact.email}
                    </p>
                ` : ''}
                ${contact.phone ? `
                    <p style="font-size: 12px; color: #999; margin: 4px 0;">
                        <i class="fas fa-phone" style="margin-right: 6px;"></i>${contact.phone}
                    </p>
                ` : ''}
                ${contact.address ? `
                    <p style="font-size: 12px; color: #999; margin: 4px 0;">
                        <i class="fas fa-map-marker-alt" style="margin-right: 6px;"></i>${contact.address}
                    </p>
                ` : ''}
            </div>
        `).join('');
    }

    openNewContactModal() {
        const modal = document.getElementById('modal-new-contact');
        if (modal) {
            modal.style.display = 'flex';
            this.renderContactForm();
        }
    }

    closeNewContactModal() {
        const modal = document.getElementById('modal-new-contact');
        if (modal) modal.style.display = 'none';
    }

    renderContactForm(contact = null) {
        const container = document.getElementById('contact-form-container');
        if (!container) return;

        container.innerHTML = `
            <form id="contact-form">
                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Nom du contact *</label>
                    <input type="text" class="form-input" id="contact-name" value="${contact?.name || ''}" placeholder="Ex: Techno Club Le Havre" required>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Type de contact *</label>
                    <select class="form-input" id="contact-type" required>
                        <option value="sponsor" ${contact?.type === 'sponsor' ? 'selected' : ''}>Sponsor</option>
                        <option value="lieu" ${contact?.type === 'lieu' ? 'selected' : ''}>Lieu</option>
                        <option value="fournisseur" ${contact?.type === 'fournisseur' ? 'selected' : ''}>Fournisseur</option>
                        <option value="artiste" ${contact?.type === 'artiste' ? 'selected' : ''}>Artiste</option>
                        <option value="partenaire" ${contact?.type === 'partenaire' ? 'selected' : ''}>Partenaire</option>
                        <option value="institution" ${contact?.type === 'institution' ? 'selected' : ''}>Institution</option>
                    </select>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" id="contact-email" value="${contact?.email || ''}" placeholder="contact@example.com">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Téléphone</label>
                        <input type="tel" class="form-input" id="contact-phone" value="${contact?.phone || ''}" placeholder="02 35 XX XX XX">
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Adresse</label>
                    <input type="text" class="form-input" id="contact-address" value="${contact?.address || ''}" placeholder="Ex: Le Havre, Normandie">
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Statut</label>
                    <select class="form-input" id="contact-status">
                        <option value="actif" ${contact?.status === 'actif' ? 'selected' : ''}>Actif</option>
                        <option value="prospect" ${contact?.status === 'prospect' ? 'selected' : ''}>Prospect</option>
                        <option value="inactif" ${contact?.status === 'inactif' ? 'selected' : ''}>Inactif</option>
                    </select>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Notes</label>
                    <textarea class="form-textarea" id="contact-notes" rows="4" placeholder="Notes sur le contact...">${contact?.notes || ''}</textarea>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-cancel" onclick="commercialManager.closeNewContactModal()">Annuler</button>
                    <button type="submit" class="btn-save">${contact ? 'Modifier' : 'Créer'} le contact</button>
                </div>
            </form>
        `;

        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => this.saveContact(e, contact));
        }
    }

    saveContact(e, contact) {
        e.preventDefault();

        const newContact = {
            id: contact?.id || 'contact-' + Date.now(),
            name: document.getElementById('contact-name').value,
            type: document.getElementById('contact-type').value,
            email: document.getElementById('contact-email').value,
            phone: document.getElementById('contact-phone').value,
            address: document.getElementById('contact-address').value,
            status: document.getElementById('contact-status').value,
            notes: document.getElementById('contact-notes').value,
            createdAt: contact?.createdAt || new Date().toISOString()
        };

        if (contact) {
            const index = this.contacts.findIndex(c => c.id === contact.id);
            if (index !== -1) {
                this.contacts[index] = newContact;
            }
        } else {
            this.contacts.push(newContact);
        }

        this.saveCommercialData();
        this.renderContacts();
        this.updateStats();
        this.closeNewContactModal();
    }

    openContactDetail(contactId) {
        const contact = this.contacts.find(c => c.id === contactId);
        if (!contact) return;

        const modal = document.getElementById('modal-contact-detail');
        const container = document.getElementById('contact-detail-container');
        const title = document.getElementById('contact-detail-title');
        
        if (!modal || !container) return;

        title.textContent = contact.name;
        
        // Récupérer les opportunités liées
        const relatedOpportunities = this.opportunities.filter(o => o.contactId === contactId);
        const relatedDeals = this.deals.filter(d => d.contactId === contactId);

        container.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px;">
                    <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 16px 0; text-transform: uppercase;">
                        Informations
                    </h3>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Type</p>
                            <p style="font-size: 14px; color: white; margin: 0;">${this.getContactTypeLabel(contact.type)}</p>
                        </div>
                        ${contact.email ? `
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Email</p>
                                <p style="font-size: 14px; color: white; margin: 0;">${contact.email}</p>
                            </div>
                        ` : ''}
                        ${contact.phone ? `
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Téléphone</p>
                                <p style="font-size: 14px; color: white; margin: 0;">${contact.phone}</p>
                            </div>
                        ` : ''}
                        ${contact.address ? `
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Adresse</p>
                                <p style="font-size: 14px; color: white; margin: 0;">${contact.address}</p>
                            </div>
                        ` : ''}
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Statut</p>
                            <span style="font-size: 12px; color: ${contact.status === 'actif' ? '#4ade80' : contact.status === 'prospect' ? '#fbbf24' : '#666'}; text-transform: uppercase; background: rgba(74, 222, 128, 0.1); padding: 4px 8px; border-radius: 4px; border: 1px solid ${contact.status === 'actif' ? '#4ade80' : contact.status === 'prospect' ? '#fbbf24' : '#666'};">
                                ${contact.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px;">
                    <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 16px 0; text-transform: uppercase;">
                        Statistiques
                    </h3>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Opportunités</p>
                            <p style="font-size: 24px; color: #FF5500; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                ${relatedOpportunities.length}
                            </p>
                        </div>
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Deals signés</p>
                            <p style="font-size: 24px; color: #4ade80; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                ${relatedDeals.length}
                            </p>
                        </div>
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Valeur totale</p>
                            <p style="font-size: 24px; color: #60a5fa; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                ${this.formatCurrency(relatedDeals.reduce((sum, d) => sum + (d.amount || 0), 0))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            ${contact.notes ? `
                <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px; margin-bottom: 24px;">
                    <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 12px 0; text-transform: uppercase;">
                        Notes
                    </h3>
                    <p style="font-size: 13px; color: #ccc; line-height: 1.6; margin: 0;">${contact.notes}</p>
                </div>
            ` : ''}

            <div style="display: flex; gap: 12px;">
                <button onclick="commercialManager.editContact('${contactId}')" 
                        style="background: #FF5500; color: white; border: none; padding: 12px 24px; font-size: 13px; text-transform: uppercase; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-edit"></i> Modifier
                </button>
            </div>
        `;

        modal.style.display = 'flex';
    }

    closeContactDetailModal() {
        const modal = document.getElementById('modal-contact-detail');
        if (modal) modal.style.display = 'none';
    }

    editContact(contactId) {
        const contact = this.contacts.find(c => c.id === contactId);
        if (contact) {
            this.closeContactDetailModal();
            this.openNewContactModal();
            this.renderContactForm(contact);
        }
    }

    // ============================================
    // GESTION DES DEALS
    // ============================================

    renderDeals() {
        const container = document.getElementById('deals-list');
        if (!container) return;

        if (this.deals.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px; color: #666;">
                    <i class="fas fa-handshake" style="font-size: 64px; margin-bottom: 16px; opacity: 0.2;"></i>
                    <p>Aucun deal signé</p>
                    <p style="font-size: 12px; margin-top: 8px;">Créez votre premier deal</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.deals.map(deal => {
            const contact = this.contacts.find(c => c.id === deal.contactId);
            const contactName = contact ? contact.name : 'Contact inconnu';
            
            return `
                <div class="deal-card" 
                     style="background: #0a0a0a; border: 2px solid #333; padding: 24px; margin-bottom: 16px; border-radius: 4px; transition: all 0.3s ease; cursor: pointer;"
                     onmouseover="this.style.borderColor='#4ade80'; this.style.background='#111';"
                     onmouseout="this.style.borderColor='#333'; this.style.background='#0a0a0a';"
                     onclick="commercialManager.openDealDetail('${deal.id}')">
                    <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 16px;">
                        <div style="flex: 1;">
                            <h3 style="font-family: 'Oswald', sans-serif; font-size: 20px; color: white; margin: 0 0 8px 0; text-transform: uppercase;">
                                ${deal.title}
                            </h3>
                            <p style="font-size: 13px; color: #999; margin: 0;">
                                <i class="fas fa-user" style="margin-right: 6px;"></i>${contactName}
                            </p>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 28px; color: #4ade80; font-weight: 700; font-family: 'Oswald', sans-serif;">
                                ${this.formatCurrency(deal.amount || 0)}
                            </div>
                            <span style="font-size: 11px; color: #666; text-transform: uppercase;">
                                ${this.getDealTypeLabel(deal.type)}
                            </span>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #333;">
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Date de signature</p>
                            <p style="font-size: 13px; color: white; margin: 0;">
                                ${deal.signatureDate ? new Date(deal.signatureDate).toLocaleDateString('fr-FR') : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Statut</p>
                            <span style="font-size: 12px; color: ${deal.status === 'actif' ? '#4ade80' : '#666'}; text-transform: uppercase; background: rgba(74, 222, 128, 0.1); padding: 4px 8px; border-radius: 4px; border: 1px solid ${deal.status === 'actif' ? '#4ade80' : '#666'};">
                                ${deal.status || 'actif'}
                            </span>
                        </div>
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Durée</p>
                            <p style="font-size: 13px; color: white; margin: 0;">
                                ${deal.duration || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    getDealTypeLabel(type) {
        const labels = {
            'partenariat': 'Partenariat',
            'lieu': 'Location Lieu',
            'merchandising': 'Merchandising',
            'fournisseur': 'Fournisseur'
        };
        return labels[type] || type;
    }

    openNewDealModal() {
        const modal = document.getElementById('modal-new-deal');
        if (modal) {
            modal.style.display = 'flex';
            this.renderDealForm();
        }
    }

    closeNewDealModal() {
        const modal = document.getElementById('modal-new-deal');
        if (modal) modal.style.display = 'none';
    }

    renderDealForm(deal = null) {
        const container = document.getElementById('deal-form-container');
        if (!container) return;

        container.innerHTML = `
            <form id="deal-form">
                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Titre du deal *</label>
                    <input type="text" class="form-input" id="deal-title" value="${deal?.title || ''}" placeholder="Ex: Partenariat Red Bull 2026" required>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Contact associé *</label>
                    <select class="form-input" id="deal-contact" required>
                        <option value="">Sélectionner un contact</option>
                        ${this.contacts.map(contact => `
                            <option value="${contact.id}" ${deal?.contactId === contact.id ? 'selected' : ''}>
                                ${contact.name} (${contact.type})
                            </option>
                        `).join('')}
                    </select>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Type de deal *</label>
                        <select class="form-input" id="deal-type" required>
                            <option value="partenariat" ${deal?.type === 'partenariat' ? 'selected' : ''}>Partenariat</option>
                            <option value="lieu" ${deal?.type === 'lieu' ? 'selected' : ''}>Location Lieu</option>
                            <option value="merchandising" ${deal?.type === 'merchandising' ? 'selected' : ''}>Merchandising</option>
                            <option value="fournisseur" ${deal?.type === 'fournisseur' ? 'selected' : ''}>Fournisseur</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Montant (€) *</label>
                        <input type="number" class="form-input" id="deal-amount" value="${deal?.amount || ''}" placeholder="Ex: 15000" required>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Date de signature *</label>
                        <input type="date" class="form-input" id="deal-signature-date" value="${deal?.signatureDate || ''}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Durée du contrat</label>
                        <input type="text" class="form-input" id="deal-duration" value="${deal?.duration || ''}" placeholder="Ex: 12 mois, 1 an">
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Statut</label>
                    <select class="form-input" id="deal-status">
                        <option value="actif" ${deal?.status === 'actif' ? 'selected' : ''}>Actif</option>
                        <option value="terminé" ${deal?.status === 'terminé' ? 'selected' : ''}>Terminé</option>
                        <option value="en-litige" ${deal?.status === 'en-litige' ? 'selected' : ''}>En litige</option>
                    </select>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Notes</label>
                    <textarea class="form-textarea" id="deal-notes" rows="4" placeholder="Notes sur le deal...">${deal?.notes || ''}</textarea>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-cancel" onclick="commercialManager.closeNewDealModal()">Annuler</button>
                    <button type="submit" class="btn-save">${deal ? 'Modifier' : 'Créer'} le deal</button>
                </div>
            </form>
        `;

        const form = document.getElementById('deal-form');
        if (form) {
            form.addEventListener('submit', (e) => this.saveDeal(e, deal));
        }
    }

    saveDeal(e, deal) {
        e.preventDefault();

        const newDeal = {
            id: deal?.id || 'deal-' + Date.now(),
            title: document.getElementById('deal-title').value,
            contactId: document.getElementById('deal-contact').value,
            type: document.getElementById('deal-type').value,
            amount: parseInt(document.getElementById('deal-amount').value) || 0,
            signatureDate: document.getElementById('deal-signature-date').value,
            duration: document.getElementById('deal-duration').value,
            status: document.getElementById('deal-status').value,
            notes: document.getElementById('deal-notes').value,
            createdAt: deal?.createdAt || new Date().toISOString()
        };

        if (deal) {
            const index = this.deals.findIndex(d => d.id === deal.id);
            if (index !== -1) {
                this.deals[index] = newDeal;
            }
        } else {
            this.deals.push(newDeal);
        }

        this.saveCommercialData();
        this.renderDeals();
        this.updateStats();
        this.closeNewDealModal();
    }

    openDealDetail(dealId) {
        const deal = this.deals.find(d => d.id === dealId);
        if (deal) {
            this.renderDealForm(deal);
            this.openNewDealModal();
        }
    }

    editDeal(dealId) {
        const deal = this.deals.find(d => d.id === dealId);
        if (deal) {
            this.openNewDealModal();
            this.renderDealForm(deal);
        }
    }

    closeDealDetailModal() {
        const modal = document.getElementById('modal-deal-detail');
        if (modal) modal.style.display = 'none';
    }

    // ============================================
    // STATISTIQUES
    // ============================================

    updateStats() {
        document.getElementById('contacts-count').textContent = this.contacts.length;
        document.getElementById('opportunities-count').textContent = this.opportunities.length;
        document.getElementById('deals-count').textContent = this.deals.length;
        this.updateKPIs();
    }
}

// Initialiser le gestionnaire commercial
let commercialManager;
document.addEventListener('DOMContentLoaded', () => {
    commercialManager = new CommercialManager();
    
    // Rendre accessible globalement
    window.commercialManager = commercialManager;
});

// Fermer les modals en cliquant sur l'overlay
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    });
});

