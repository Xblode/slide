// Système de gestion Marketing - BOOMKŒUR.EXE
// Gère : Dashboard, KPIs, Objectifs SMART, Personas, Analyse Concurrentielle, Matrice, Timeline

class MarketingManager {
    constructor() {
        this.marketingObjectives = [];
        this.personas = [];
        this.competitors = [];
        this.init();
    }

    init() {
        this.loadMarketingData();
        this.initKPIs();
        this.initMarketingObjectives();
        this.initPersonas();
        this.initCompetitors();
    }

    // ============================================
    // CHARGEMENT DES DONNÉES
    // ============================================

    loadMarketingData() {
        // Charger depuis localStorage
        const savedObjectives = localStorage.getItem('marketing_objectives');
        const savedPersonas = localStorage.getItem('marketing_personas');
        const savedCompetitors = localStorage.getItem('marketing_competitors');

        if (savedObjectives) {
            this.marketingObjectives = JSON.parse(savedObjectives);
        }

        if (savedPersonas) {
            this.personas = JSON.parse(savedPersonas);
        }

        if (savedCompetitors) {
            this.competitors = JSON.parse(savedCompetitors);
        }
    }

    saveMarketingData() {
        localStorage.setItem('marketing_objectives', JSON.stringify(this.marketingObjectives));
        localStorage.setItem('marketing_personas', JSON.stringify(this.personas));
        localStorage.setItem('marketing_competitors', JSON.stringify(this.competitors));
    }

    // ============================================
    // KPIs MARKETING
    // ============================================

    initKPIs() {
        // Les KPIs sont gérés par kpis-manager.js
        // On réutilise les KPIs de la page Projets
        const kpisGrid = document.getElementById('marketing-kpis-grid');
        if (!kpisGrid) return;

        // Copier les KPIs depuis la page Projets (si disponibles)
        // Sinon, on les crée ici
        this.renderKPIs();
    }

    renderKPIs() {
        const kpisGrid = document.getElementById('marketing-kpis-grid');
        if (!kpisGrid) return;

        const kpis = [
            { id: 'revenue', label: 'REVENUS ANNUELS', icon: 'fa-euro-sign', current: '45K€', target: '/ 120K€', progress: 37.5, trend: '+12% vs mois dernier' },
            { id: 'audience', label: 'AUDIENCE TOTALE', icon: 'fa-users', current: '18K', target: '/ 50K', progress: 36, trend: '+2.5K ce trimestre' },
            { id: 'engagement', label: 'ENGAGEMENT MOYEN', icon: 'fa-heart', current: '4.8%', target: '/ 6%', progress: 80, trend: '+0.5% ce mois' },
            { id: 'conversion', label: 'TAUX DE CONVERSION', icon: 'fa-bullseye', current: '3.2%', target: '/ 5%', progress: 64, trend: '+0.8% ce trimestre' },
            { id: 'roi', label: 'ROI GLOBAL', icon: 'fa-chart-pie', current: '2.5x', target: '/ 3x', progress: 83, trend: '+0.3x ce semestre' },
            { id: 'revenue-growth', label: 'CROISSANCE REVENUS', icon: 'fa-rocket', current: '+28%', target: '/ +40%', progress: 70, trend: 'vs année précédente' }
        ];

        kpisGrid.innerHTML = kpis.map(kpi => `
            <div class="kpi-card ${kpi.id}" onclick="window.openKpiModal && window.openKpiModal('${kpi.id}')" style="cursor: pointer;">
                <div class="kpi-header">
                    <i class="fas ${kpi.icon}"></i>
                    <span class="kpi-label">${kpi.label}</span>
                </div>
                <div class="kpi-value">
                    <span class="kpi-current">${kpi.current}</span>
                    <span class="kpi-target">${kpi.target}</span>
                </div>
                <div class="kpi-progress">
                    <div class="kpi-progress-bar">
                        <div class="kpi-progress-fill" style="width: ${kpi.progress}%"></div>
                    </div>
                    <span class="kpi-percentage">${kpi.progress}%</span>
                </div>
                <div class="kpi-trend">
                    <i class="fas fa-arrow-up"></i>
                    <span>${kpi.trend}</span>
                </div>
            </div>
        `).join('');
    }

    // ============================================
    // OBJECTIFS MARKETING
    // ============================================

    initMarketingObjectives() {
        // Identifier les objectifs marketing depuis la page Projets
        const marketingObjectiveIds = [
            'bilan-marketing-2025',
            'strategie-reseaux-sociaux',
            'developpement-merchandising',
            'partenariats-&-sponsors'
        ];

        this.marketingObjectives = marketingObjectiveIds.map(id => ({
            id: id,
            title: this.getObjectiveTitle(id),
            category: 'Marketing',
            status: 'active',
            progress: this.getObjectiveProgress(id)
        }));

        this.renderMarketingObjectives();
        this.updateObjectivesCount();
    }

    getObjectiveTitle(id) {
        const titles = {
            'bilan-marketing-2025': 'Bilan Marketing 2025',
            'strategie-reseaux-sociaux': 'Stratégie Réseaux Sociaux',
            'developpement-merchandising': 'Développement Merchandising',
            'partenariats-&-sponsors': 'Partenariats & Sponsors'
        };
        return titles[id] || id;
    }

    getObjectiveProgress(id) {
        const progress = {
            'bilan-marketing-2025': 72,
            'strategie-reseaux-sociaux': 58,
            'developpement-merchandising': 42,
            'partenariats-&-sponsors': 8
        };
        return progress[id] || 0;
    }

    renderMarketingObjectives() {
        const container = document.getElementById('marketing-objectives-list');
        if (!container) return;

        if (this.marketingObjectives.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-bullseye" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                    <p>Aucun objectif marketing actif</p>
                    <p style="font-size: 12px; margin-top: 8px;">Créez votre premier objectif avec le générateur SMART</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.marketingObjectives.map(obj => `
            <div class="objective-item-compact" style="background: #111; border: 2px solid #333; padding: 16px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; transition: all 0.3s ease;" 
                 onmouseover="this.style.borderColor='#FF5500'; this.style.background='#161616';" 
                 onmouseout="this.style.borderColor='#333'; this.style.background='#111';">
                <div style="flex: 1;">
                    <h4 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 8px 0; text-transform: uppercase;">
                        ${obj.title}
                    </h4>
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <span style="font-size: 12px; color: #999; text-transform: uppercase;">${obj.category}</span>
                        <div style="flex: 1; max-width: 200px;">
                            <div style="background: #333; height: 4px; border-radius: 2px; overflow: hidden;">
                                <div style="background: #FF5500; height: 100%; width: ${obj.progress}%; transition: width 0.3s ease;"></div>
                            </div>
                        </div>
                        <span style="font-size: 12px; color: #FF5500; font-weight: 600;">${obj.progress}%</span>
                    </div>
                </div>
                <button onclick="window.openObjectiveDetail && window.openObjectiveDetail('${obj.id}')" 
                        style="background: transparent; border: 2px solid #FF5500; color: #FF5500; padding: 8px 16px; font-size: 11px; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease;"
                        onmouseover="this.style.background='#FF5500'; this.style.color='white';"
                        onmouseout="this.style.background='transparent'; this.style.color='#FF5500';">
                    Voir détails
                </button>
            </div>
        `).join('');
    }

    updateObjectivesCount() {
        const countEl = document.getElementById('marketing-objectives-count');
        if (countEl) {
            countEl.textContent = this.marketingObjectives.length;
        }
    }

    // ============================================
    // FRAMEWORK SMART
    // ============================================

    renderSmartForm() {
        const container = document.getElementById('smart-form-container');
        if (!container) return;

        container.innerHTML = `
            <div style="margin-bottom: 24px; padding: 20px; background: rgba(255, 85, 0, 0.05); border: 2px solid rgba(255, 85, 0, 0.3); border-radius: 4px;">
                <h3 style="font-family: 'Oswald', sans-serif; font-size: 18px; color: #FF5500; margin: 0 0 12px 0; text-transform: uppercase;">
                    <i class="fas fa-info-circle"></i> Qu'est-ce qu'un objectif SMART ?
                </h3>
                <p style="font-size: 13px; color: #ccc; line-height: 1.6; margin: 0;">
                    Un objectif SMART est <strong>Spécifique</strong>, <strong>Mesurable</strong>, <strong>Atteignable</strong>, 
                    <strong>Réaliste</strong> et <strong>Temporel</strong>. Ce formulaire vous guide pour créer un objectif marketing structuré et actionnable.
                </p>
            </div>

            <form id="smart-objective-form">
                <div class="form-group" style="margin-bottom: 24px;">
                    <label class="form-label">Titre de l'objectif</label>
                    <input type="text" class="form-input" id="smart-title" placeholder="Ex: Atteindre 50K followers Instagram" required>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-bullseye" style="color: #4ade80;"></i> SPÉCIFIQUE
                        </label>
                        <textarea class="form-textarea" id="smart-specific" rows="3" placeholder="Quel est l'objectif précis ? Que veut-on accomplir exactement ?" required></textarea>
                        <p style="font-size: 11px; color: #999; margin-top: 4px;">Ex: Augmenter le nombre de followers Instagram de 18K à 50K</p>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-chart-line" style="color: #4ade80;"></i> MESURABLE
                        </label>
                        <textarea class="form-textarea" id="smart-measurable" rows="3" placeholder="Comment mesurer le succès ? Quels KPIs ou métriques ?" required></textarea>
                        <p style="font-size: 11px; color: #999; margin-top: 4px;">Ex: Nombre de followers, taux d'engagement, portée moyenne</p>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-check-circle" style="color: #4ade80;"></i> ATTEIGNABLE
                        </label>
                        <textarea class="form-textarea" id="smart-achievable" rows="3" placeholder="Est-ce réaliste avec nos ressources actuelles ?" required></textarea>
                        <p style="font-size: 11px; color: #999; margin-top: 4px;">Ex: Oui, avec une stratégie contenu structurée et un budget ads</p>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-balance-scale" style="color: #4ade80;"></i> RÉALISTE
                        </label>
                        <textarea class="form-textarea" id="smart-relevant" rows="3" placeholder="Est-ce aligné avec notre stratégie marketing globale ?" required></textarea>
                        <p style="font-size: 11px; color: #999; margin-top: 4px;">Ex: Oui, cela renforce notre présence digitale et notre capacité à remplir les événements</p>
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 24px;">
                    <label class="form-label">
                        <i class="fas fa-calendar-alt" style="color: #FF5500;"></i> TEMPOREL
                    </label>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div>
                            <input type="date" class="form-input" id="smart-start-date" required>
                            <p style="font-size: 11px; color: #999; margin-top: 4px;">Date de début</p>
                        </div>
                        <div>
                            <input type="date" class="form-input" id="smart-end-date" required>
                            <p style="font-size: 11px; color: #999; margin-top: 4px;">Date d'échéance</p>
                        </div>
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 24px;">
                    <label class="form-label">KPI(s) associé(s)</label>
                    <select class="form-input" id="smart-kpis" multiple style="height: 100px;">
                        <option value="revenue">Revenus Annuels</option>
                        <option value="audience">Audience Totale</option>
                        <option value="engagement">Engagement Moyen</option>
                        <option value="conversion">Taux de Conversion</option>
                        <option value="roi">ROI Global</option>
                        <option value="revenue-growth">Croissance Revenus</option>
                    </select>
                    <p style="font-size: 11px; color: #999; margin-top: 4px;">Maintenez Ctrl (Cmd sur Mac) pour sélectionner plusieurs KPIs</p>
                </div>

                <div class="form-group" style="margin-bottom: 24px;">
                    <label class="form-label">Responsable</label>
                    <input type="text" class="form-input" id="smart-responsible" placeholder="Ex: Benjamin (Dir. Marketing)">
                </div>

                <div class="form-group" style="margin-bottom: 24px;">
                    <label class="form-label">Description complète (optionnel)</label>
                    <textarea class="form-textarea" id="smart-description" rows="4" placeholder="Décrivez l'objectif en détail, le contexte, les enjeux..."></textarea>
                </div>

                <div style="padding: 20px; background: #111; border: 2px solid #333; border-radius: 4px; margin-bottom: 24px;">
                    <h4 style="font-family: 'Oswald', sans-serif; font-size: 14px; color: #FF5500; margin: 0 0 12px 0; text-transform: uppercase;">
                        Aperçu de l'objectif SMART
                    </h4>
                    <div id="smart-preview" style="font-size: 13px; color: #ccc; line-height: 1.8;">
                        Remplissez le formulaire pour voir l'aperçu...
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-cancel" onclick="closeSmartModal()">Annuler</button>
                    <button type="submit" class="btn-save">Créer l'objectif</button>
                </div>
            </form>
        `;

        // Écouter les changements pour mettre à jour l'aperçu
        const form = document.getElementById('smart-objective-form');
        if (form) {
            form.addEventListener('input', () => this.updateSmartPreview());
            form.addEventListener('submit', (e) => this.saveSmartObjective(e));
        }
    }

    updateSmartPreview() {
        const preview = document.getElementById('smart-preview');
        if (!preview) return;

        const title = document.getElementById('smart-title')?.value || '';
        const specific = document.getElementById('smart-specific')?.value || '';
        const measurable = document.getElementById('smart-measurable')?.value || '';
        const achievable = document.getElementById('smart-achievable')?.value || '';
        const relevant = document.getElementById('smart-relevant')?.value || '';
        const startDate = document.getElementById('smart-start-date')?.value || '';
        const endDate = document.getElementById('smart-end-date')?.value || '';

        if (!title) {
            preview.innerHTML = 'Remplissez le formulaire pour voir l\'aperçu...';
            return;
        }

        preview.innerHTML = `
            <div style="margin-bottom: 16px;">
                <strong style="color: #FF5500;">${title}</strong>
            </div>
            <div style="margin-bottom: 12px;">
                <strong style="color: #4ade80;">Spécifique:</strong> ${specific || 'Non renseigné'}
            </div>
            <div style="margin-bottom: 12px;">
                <strong style="color: #4ade80;">Mesurable:</strong> ${measurable || 'Non renseigné'}
            </div>
            <div style="margin-bottom: 12px;">
                <strong style="color: #4ade80;">Atteignable:</strong> ${achievable || 'Non renseigné'}
            </div>
            <div style="margin-bottom: 12px;">
                <strong style="color: #4ade80;">Réaliste:</strong> ${relevant || 'Non renseigné'}
            </div>
            <div>
                <strong style="color: #FF5500;">Temporel:</strong> ${startDate ? new Date(startDate).toLocaleDateString('fr-FR') : ''} → ${endDate ? new Date(endDate).toLocaleDateString('fr-FR') : ''}
            </div>
        `;
    }

    saveSmartObjective(e) {
        e.preventDefault();

        const objective = {
            id: 'smart-' + Date.now(),
            title: document.getElementById('smart-title').value,
            specific: document.getElementById('smart-specific').value,
            measurable: document.getElementById('smart-measurable').value,
            achievable: document.getElementById('smart-achievable').value,
            relevant: document.getElementById('smart-relevant').value,
            startDate: document.getElementById('smart-start-date').value,
            endDate: document.getElementById('smart-end-date').value,
            kpis: Array.from(document.getElementById('smart-kpis').selectedOptions).map(opt => opt.value),
            responsible: document.getElementById('smart-responsible').value,
            description: document.getElementById('smart-description').value,
            status: 'active',
            progress: 0,
            createdAt: new Date().toISOString()
        };

        this.marketingObjectives.push({
            id: objective.id,
            title: objective.title,
            category: 'Marketing',
            status: 'active',
            progress: 0
        });

        // Sauvegarder dans localStorage
        localStorage.setItem('smart_objective_' + objective.id, JSON.stringify(objective));
        this.saveMarketingData();

        this.renderMarketingObjectives();
        this.updateObjectivesCount();
        closeSmartModal();

        alert('Objectif SMART créé avec succès !');
    }

    // ============================================
    // PERSONAS
    // ============================================

    initPersonas() {
        this.renderPersonasList();
    }

    renderPersonasList() {
        const container = document.getElementById('personas-list-container');
        if (!container) return;

        if (this.personas.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-user-friends" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                    <p>Aucun persona défini</p>
                    <p style="font-size: 12px; margin-top: 8px;">Créez votre premier persona pour mieux comprendre votre audience</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.personas.map((persona, index) => `
            <div class="persona-card" style="background: #0a0a0a; border: 2px solid #333; padding: 20px; margin-bottom: 16px; transition: all 0.3s ease;"
                 onmouseover="this.style.borderColor='#4ade80'; this.style.background='#111';" 
                 onmouseout="this.style.borderColor='#333'; this.style.background='#0a0a0a';">
                <div style="display: flex; align-items: start; justify-content: space-between;">
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                            <div style="width: 48px; height: 48px; background: rgba(74, 222, 128, 0.1); border: 2px solid #4ade80; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                                <i class="fas fa-user" style="color: #4ade80;"></i>
                            </div>
                            <div>
                                <h3 style="font-family: 'Oswald', sans-serif; font-size: 20px; color: white; margin: 0; text-transform: uppercase;">
                                    ${persona.name}
                                </h3>
                                <p style="font-size: 12px; color: #999; margin: 4px 0 0 0;">${persona.title || ''}</p>
                            </div>
                        </div>
                        <div style="margin-top: 16px;">
                            <p style="font-size: 13px; color: #ccc; line-height: 1.6; margin: 0 0 12px 0;">
                                <strong style="color: #4ade80;">Profil:</strong> ${persona.age || 'N/A'} ans, ${persona.location || 'N/A'}
                            </p>
                            <p style="font-size: 13px; color: #ccc; line-height: 1.6; margin: 0 0 12px 0;">
                                <strong style="color: #4ade80;">Intérêts:</strong> ${persona.interests || 'Non renseigné'}
                            </p>
                            <p style="font-size: 13px; color: #ccc; line-height: 1.6; margin: 0;">
                                <strong style="color: #4ade80;">Objectifs:</strong> ${persona.goals || 'Non renseigné'}
                            </p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="marketingManager.editPersona(${index})" 
                                style="background: transparent; border: 2px solid #4ade80; color: #4ade80; padding: 8px 16px; font-size: 11px; text-transform: uppercase; cursor: pointer;">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="marketingManager.deletePersona(${index})" 
                                style="background: transparent; border: 2px solid #ef4444; color: #ef4444; padding: 8px 16px; font-size: 11px; text-transform: uppercase; cursor: pointer;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderPersonaForm(persona = null) {
        const container = document.getElementById('persona-form-container');
        const listContainer = document.getElementById('personas-list-container');
        if (!container) return;

        container.style.display = 'block';
        if (listContainer) listContainer.style.display = 'none';

        container.innerHTML = `
            <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; margin-bottom: 24px;">
                <h3 style="font-family: 'Oswald', sans-serif; font-size: 18px; color: white; margin: 0 0 20px 0; text-transform: uppercase;">
                    ${persona ? 'Modifier le persona' : 'Créer un nouveau persona'}
                </h3>
                <form id="persona-form">
                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Nom du persona *</label>
                        <input type="text" class="form-input" id="persona-name" value="${persona?.name || ''}" placeholder="Ex: Techno Enthusiast" required>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div class="form-group">
                            <label class="form-label">Titre / Rôle</label>
                            <input type="text" class="form-input" id="persona-title" value="${persona?.title || ''}" placeholder="Ex: Étudiant, DJ amateur, etc.">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Âge</label>
                            <input type="number" class="form-input" id="persona-age" value="${persona?.age || ''}" placeholder="Ex: 25">
                        </div>
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Localisation</label>
                        <input type="text" class="form-input" id="persona-location" value="${persona?.location || ''}" placeholder="Ex: Le Havre, Normandie">
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Intérêts & Passions</label>
                        <textarea class="form-textarea" id="persona-interests" rows="3" placeholder="Ex: Musique techno, événements nocturnes, culture underground...">${persona?.interests || ''}</textarea>
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Objectifs & Motivations</label>
                        <textarea class="form-textarea" id="persona-goals" rows="3" placeholder="Ex: Découvrir de nouveaux artistes, rencontrer des personnes partageant les mêmes passions...">${persona?.goals || ''}</textarea>
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Défis & Frustrations</label>
                        <textarea class="form-textarea" id="persona-challenges" rows="3" placeholder="Ex: Difficulté à trouver des événements de qualité, manque d'informations...">${persona?.challenges || ''}</textarea>
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Canaux de communication préférés</label>
                        <input type="text" class="form-input" id="persona-channels" value="${persona?.channels || ''}" placeholder="Ex: Instagram, Shotgun, bouche-à-oreille">
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Budget moyen par événement</label>
                        <input type="text" class="form-input" id="persona-budget" value="${persona?.budget || ''}" placeholder="Ex: 15-25€">
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Citation / Phrase caractéristique</label>
                        <input type="text" class="form-input" id="persona-quote" value="${persona?.quote || ''}" placeholder="Ex: 'Je cherche toujours les meilleures soirées techno de la région'">
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn-cancel" onclick="marketingManager.cancelPersonaForm()">Annuler</button>
                        <button type="submit" class="btn-save">${persona ? 'Modifier' : 'Créer'} le persona</button>
                    </div>
                </form>
            </div>
        `;

        const form = document.getElementById('persona-form');
        if (form) {
            form.addEventListener('submit', (e) => this.savePersona(e, persona ? this.personas.indexOf(persona) : null));
        }
    }

    savePersona(e, index) {
        e.preventDefault();

        const persona = {
            name: document.getElementById('persona-name').value,
            title: document.getElementById('persona-title').value,
            age: document.getElementById('persona-age').value,
            location: document.getElementById('persona-location').value,
            interests: document.getElementById('persona-interests').value,
            goals: document.getElementById('persona-goals').value,
            challenges: document.getElementById('persona-challenges').value,
            channels: document.getElementById('persona-channels').value,
            budget: document.getElementById('persona-budget').value,
            quote: document.getElementById('persona-quote').value,
            createdAt: new Date().toISOString()
        };

        if (index !== null) {
            this.personas[index] = persona;
        } else {
            this.personas.push(persona);
        }

        this.saveMarketingData();
        this.renderPersonasList();
        this.cancelPersonaForm();
    }

    editPersona(index) {
        this.renderPersonaForm(this.personas[index]);
    }

    deletePersona(index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce persona ?')) {
            this.personas.splice(index, 1);
            this.saveMarketingData();
            this.renderPersonasList();
        }
    }

    cancelPersonaForm() {
        const container = document.getElementById('persona-form-container');
        const listContainer = document.getElementById('personas-list-container');
        if (container) container.style.display = 'none';
        if (listContainer) listContainer.style.display = 'block';
    }

    // ============================================
    // ANALYSE CONCURRENTIELLE
    // ============================================

    initCompetitors() {
        this.renderCompetitorsList();
        this.renderCompetitiveChart();
    }

    renderCompetitorsList() {
        const container = document.getElementById('competitors-list-container');
        if (!container) return;

        if (this.competitors.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-chart-scatter" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                    <p>Aucun concurrent analysé</p>
                    <p style="font-size: 12px; margin-top: 8px;">Ajoutez vos concurrents pour visualiser votre positionnement</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; margin-bottom: 24px;">
                ${this.competitors.map((competitor, index) => `
                    <div class="competitor-card" style="background: #0a0a0a; border: 2px solid #333; padding: 20px; transition: all 0.3s ease;"
                         onmouseover="this.style.borderColor='#60a5fa'; this.style.background='#111';" 
                         onmouseout="this.style.borderColor='#333'; this.style.background='#0a0a0a';">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                            <h3 style="font-family: 'Oswald', sans-serif; font-size: 18px; color: white; margin: 0; text-transform: uppercase;">
                                ${competitor.name}
                            </h3>
                            <div style="display: flex; gap: 8px;">
                                <button onclick="marketingManager.editCompetitor(${index})" 
                                        style="background: transparent; border: 2px solid #60a5fa; color: #60a5fa; padding: 6px 12px; font-size: 11px; cursor: pointer;">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="marketingManager.deleteCompetitor(${index})" 
                                        style="background: transparent; border: 2px solid #ef4444; color: #ef4444; padding: 6px 12px; font-size: 11px; cursor: pointer;">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div style="font-size: 12px; color: #999; line-height: 1.8;">
                            <p><strong style="color: #60a5fa;">Followers:</strong> ${competitor.followers || 'N/A'}</p>
                            <p><strong style="color: #60a5fa;">Événements/an:</strong> ${competitor.eventsPerYear || 'N/A'}</p>
                            <p><strong style="color: #60a5fa;">Notoriété:</strong> ${competitor.notoriety || 'N/A'}/10</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderCompetitorForm(competitor = null) {
        const container = document.getElementById('competitor-form-container');
        const listContainer = document.getElementById('competitors-list-container');
        if (!container) return;

        container.style.display = 'block';
        if (listContainer) listContainer.style.display = 'none';

        container.innerHTML = `
            <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; margin-bottom: 24px;">
                <h3 style="font-family: 'Oswald', sans-serif; font-size: 18px; color: white; margin: 0 0 20px 0; text-transform: uppercase;">
                    ${competitor ? 'Modifier le concurrent' : 'Ajouter un nouveau concurrent'}
                </h3>
                <form id="competitor-form">
                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Nom du concurrent *</label>
                        <input type="text" class="form-input" id="competitor-name" value="${competitor?.name || ''}" placeholder="Ex: Techno Collective Paris" required>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div class="form-group">
                            <label class="form-label">Nombre de followers (Instagram)</label>
                            <input type="number" class="form-input" id="competitor-followers" value="${competitor?.followers || ''}" placeholder="Ex: 25000">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Événements par an</label>
                            <input type="number" class="form-input" id="competitor-events" value="${competitor?.eventsPerYear || ''}" placeholder="Ex: 20">
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div class="form-group">
                            <label class="form-label">Notoriété (0-10)</label>
                            <input type="number" class="form-input" id="competitor-notoriety" value="${competitor?.notoriety || ''}" min="0" max="10" placeholder="Ex: 7">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Qualité événements (0-10)</label>
                            <input type="number" class="form-input" id="competitor-quality" value="${competitor?.quality || ''}" min="0" max="10" placeholder="Ex: 8">
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div class="form-group">
                            <label class="form-label">Engagement moyen (%)</label>
                            <input type="number" class="form-input" id="competitor-engagement" value="${competitor?.engagement || ''}" step="0.1" placeholder="Ex: 5.2">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Prix moyen ticket (€)</label>
                            <input type="number" class="form-input" id="competitor-price" value="${competitor?.price || ''}" placeholder="Ex: 18">
                        </div>
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Zone géographique</label>
                        <input type="text" class="form-input" id="competitor-location" value="${competitor?.location || ''}" placeholder="Ex: Paris, Normandie, France">
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Points forts</label>
                        <textarea class="form-textarea" id="competitor-strengths" rows="3" placeholder="Ex: Très bonne communication, artistes reconnus...">${competitor?.strengths || ''}</textarea>
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Points faibles</label>
                        <textarea class="form-textarea" id="competitor-weaknesses" rows="3" placeholder="Ex: Prix élevés, peu d'événements...">${competitor?.weaknesses || ''}</textarea>
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label class="form-label">Site web / Instagram</label>
                        <input type="url" class="form-input" id="competitor-url" value="${competitor?.url || ''}" placeholder="Ex: https://instagram.com/...">
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn-cancel" onclick="marketingManager.cancelCompetitorForm()">Annuler</button>
                        <button type="submit" class="btn-save">${competitor ? 'Modifier' : 'Ajouter'} le concurrent</button>
                    </div>
                </form>
            </div>
        `;

        const form = document.getElementById('competitor-form');
        if (form) {
            form.addEventListener('submit', (e) => this.saveCompetitor(e, competitor ? this.competitors.indexOf(competitor) : null));
        }
    }

    saveCompetitor(e, index) {
        e.preventDefault();

        const competitor = {
            name: document.getElementById('competitor-name').value,
            followers: parseInt(document.getElementById('competitor-followers').value) || 0,
            eventsPerYear: parseInt(document.getElementById('competitor-events').value) || 0,
            notoriety: parseFloat(document.getElementById('competitor-notoriety').value) || 0,
            quality: parseFloat(document.getElementById('competitor-quality').value) || 0,
            engagement: parseFloat(document.getElementById('competitor-engagement').value) || 0,
            price: parseFloat(document.getElementById('competitor-price').value) || 0,
            location: document.getElementById('competitor-location').value,
            strengths: document.getElementById('competitor-strengths').value,
            weaknesses: document.getElementById('competitor-weaknesses').value,
            url: document.getElementById('competitor-url').value,
            createdAt: new Date().toISOString()
        };

        if (index !== null) {
            this.competitors[index] = competitor;
        } else {
            this.competitors.push(competitor);
        }

        this.saveMarketingData();
        this.renderCompetitorsList();
        this.renderCompetitiveChart();
        this.cancelCompetitorForm();
    }

    editCompetitor(index) {
        this.renderCompetitorForm(this.competitors[index]);
    }

    deleteCompetitor(index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce concurrent ?')) {
            this.competitors.splice(index, 1);
            this.saveMarketingData();
            this.renderCompetitorsList();
            this.renderCompetitiveChart();
        }
    }

    cancelCompetitorForm() {
        const container = document.getElementById('competitor-form-container');
        const listContainer = document.getElementById('competitors-list-container');
        if (container) container.style.display = 'none';
        if (listContainer) listContainer.style.display = 'block';
    }

    renderCompetitiveChart() {
        const container = document.getElementById('competitive-chart');
        if (!container) return;

        if (this.competitors.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px; color: #666;">
                    <i class="fas fa-chart-scatter" style="font-size: 64px; margin-bottom: 16px; opacity: 0.2;"></i>
                    <p>Ajoutez des concurrents pour visualiser le graphique de positionnement</p>
                </div>
            `;
            return;
        }

        // Données pour le graphique
        // Axe X: Notoriété (0-10)
        // Axe Y: Qualité (0-10)
        // Taille: Followers (normalisé)
        // Couleur: Engagement

        const maxFollowers = Math.max(...this.competitors.map(c => c.followers || 0), 1);
        const maxEngagement = Math.max(...this.competitors.map(c => c.engagement || 0), 1);

        // Ajouter Boomkœur (nous)
        const boomkoeur = {
            name: 'BOOMKŒUR',
            notoriety: 6,
            quality: 8,
            followers: 18000,
            engagement: 4.8,
            color: '#FF5500'
        };

        const allData = [boomkoeur, ...this.competitors];

        const chartWidth = container.offsetWidth || 800;
        const chartHeight = 500;
        const padding = 60;
        const plotWidth = chartWidth - 2 * padding;
        const plotHeight = chartHeight - 2 * padding;

        // Créer le SVG
        container.innerHTML = `
            <svg width="${chartWidth}" height="${chartHeight}" style="background: #0a0a0a;">
                <!-- Grille -->
                ${Array.from({length: 11}, (_, i) => `
                    <line x1="${padding}" y1="${padding + (i * plotHeight / 10)}" 
                          x2="${padding + plotWidth}" y2="${padding + (i * plotHeight / 10)}" 
                          stroke="#333" stroke-width="1" opacity="0.3"/>
                    <line x1="${padding + (i * plotWidth / 10)}" y1="${padding}" 
                          x2="${padding + (i * plotWidth / 10)}" y2="${padding + plotHeight}" 
                          stroke="#333" stroke-width="1" opacity="0.3"/>
                `).join('')}

                <!-- Axes -->
                <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${padding + plotHeight}" stroke="#666" stroke-width="2"/>
                <line x1="${padding}" y1="${padding + plotHeight}" x2="${padding + plotWidth}" y2="${padding + plotHeight}" stroke="#666" stroke-width="2"/>

                <!-- Labels axes -->
                <text x="${padding - 10}" y="${padding + plotHeight / 2}" fill="#999" font-size="12" text-anchor="end" transform="rotate(-90 ${padding - 10} ${padding + plotHeight / 2})">QUALITÉ (0-10)</text>
                <text x="${padding + plotWidth / 2}" y="${padding + plotHeight + 40}" fill="#999" font-size="12" text-anchor="middle">NOTORIÉTÉ (0-10)</text>

                <!-- Points -->
                ${allData.map((item, index) => {
                    const x = padding + (item.notoriety / 10) * plotWidth;
                    const y = padding + plotHeight - (item.quality / 10) * plotHeight;
                    const radius = 8 + (item.followers / maxFollowers) * 12;
                    const color = item.color || `hsl(${200 + (item.engagement / maxEngagement) * 60}, 70%, 50%)`;
                    
                    return `
                        <circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" opacity="0.7" stroke="white" stroke-width="2">
                            <title>${item.name}\nNotoriété: ${item.notoriety}/10\nQualité: ${item.quality}/10\nFollowers: ${item.followers}</title>
                        </circle>
                        <text x="${x}" y="${y - radius - 8}" fill="white" font-size="11" font-weight="600" text-anchor="middle">${item.name}</text>
                    `;
                }).join('')}

                <!-- Légende -->
                <g transform="translate(${chartWidth - 200}, 20)">
                    <rect x="0" y="0" width="180" height="120" fill="#0a0a0a" stroke="#333" stroke-width="2" opacity="0.9"/>
                    <text x="90" y="20" fill="white" font-size="12" font-weight="600" text-anchor="middle">LÉGENDE</text>
                    <circle cx="20" cy="40" r="6" fill="#FF5500"/>
                    <text x="35" y="45" fill="#ccc" font-size="11">Boomkœur</text>
                    <circle cx="20" cy="60" r="8" fill="#60a5fa" opacity="0.7"/>
                    <text x="35" y="65" fill="#ccc" font-size="11">Concurrents</text>
                    <text x="10" y="85" fill="#999" font-size="10">Taille = Followers</text>
                    <text x="10" y="100" fill="#999" font-size="10">Couleur = Engagement</text>
                </g>
            </svg>
        `;
    }

    // ============================================
    // MATRICE OBJECTIFS / KPIs
    // ============================================

    renderObjectivesKPIsMatrix() {
        const container = document.getElementById('objectives-kpis-matrix');
        if (!container) return;

        const objectives = this.marketingObjectives;
        const kpis = ['revenue', 'audience', 'engagement', 'conversion', 'roi', 'revenue-growth'];
        const kpiNames = {
            'revenue': 'Revenus',
            'audience': 'Audience',
            'engagement': 'Engagement',
            'conversion': 'Conversion',
            'roi': 'ROI',
            'revenue-growth': 'Croissance'
        };

        // Matrice de correspondance (objectif -> KPIs impactés)
        const matrix = {
            'bilan-marketing-2025': ['audience', 'engagement', 'conversion'],
            'strategie-reseaux-sociaux': ['audience', 'engagement'],
            'developpement-merchandising': ['revenue', 'revenue-growth'],
            'partenariats-&-sponsors': ['revenue', 'roi']
        };

        container.innerHTML = `
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; background: #0a0a0a;">
                    <thead>
                        <tr style="background: #111; border-bottom: 2px solid #333;">
                            <th style="padding: 16px; text-align: left; color: white; font-family: 'Oswald', sans-serif; text-transform: uppercase; font-size: 14px;">Objectif</th>
                            ${kpis.map(kpi => `
                                <th style="padding: 16px; text-align: center; color: #FF5500; font-family: 'Oswald', sans-serif; text-transform: uppercase; font-size: 12px; min-width: 100px;">
                                    ${kpiNames[kpi]}
                                </th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${objectives.map(obj => {
                            const impactedKPIs = matrix[obj.id] || [];
                            return `
                                <tr style="border-bottom: 1px solid #333;">
                                    <td style="padding: 16px; color: white; font-size: 13px;">${obj.title}</td>
                                    ${kpis.map(kpi => {
                                        const isImpacted = impactedKPIs.includes(kpi);
                                        return `
                                            <td style="padding: 16px; text-align: center;">
                                                ${isImpacted ? '<i class="fas fa-check-circle" style="color: #4ade80; font-size: 18px;"></i>' : '<span style="color: #666;">-</span>'}
                                            </td>
                                        `;
                                    }).join('')}
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            <div style="margin-top: 24px; padding: 20px; background: rgba(74, 222, 128, 0.05); border: 2px solid rgba(74, 222, 128, 0.3); border-radius: 4px;">
                <p style="font-size: 13px; color: #ccc; line-height: 1.6; margin: 0;">
                    <i class="fas fa-info-circle" style="color: #4ade80;"></i> 
                    Cette matrice montre quels KPIs sont impactés par quels objectifs marketing. 
                    Un objectif peut impacter plusieurs KPIs, et un KPI peut être impacté par plusieurs objectifs.
                </p>
            </div>
        `;
    }

    // ============================================
    // TIMELINE MARKETING
    // ============================================

    renderTimeline() {
        const container = document.getElementById('marketing-timeline-container');
        if (!container) return;

        // Récupérer les objectifs avec leurs dates
        const timelineEvents = this.getTimelineEvents();
        
        if (timelineEvents.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px; color: #666;">
                    <i class="fas fa-calendar-alt" style="font-size: 64px; margin-bottom: 16px; opacity: 0.2;"></i>
                    <p>Aucun événement à afficher sur la timeline</p>
                    <p style="font-size: 12px; margin-top: 8px;">Créez des objectifs avec des dates pour les voir apparaître ici</p>
                </div>
            `;
            return;
        }

        // Trier par date
        timelineEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Calculer les positions sur la timeline avec gestion des chevauchements
        const currentDate = new Date();
        const startDate = new Date('2026-01-01');
        const endDate = new Date('2026-12-31');
        const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
        
        // Calculer les positions de base et détecter les chevauchements
        const eventPositions = timelineEvents.map((event, index) => {
            const eventDate = new Date(event.date);
            const daysFromStart = (eventDate - startDate) / (1000 * 60 * 60 * 24);
            const positionPercent = (daysFromStart / totalDays) * 100;
            const baseTop = 20 + (positionPercent * 0.75); // 75% de la hauteur utilisée
            
            return {
                event: event,
                index: index,
                baseTop: baseTop,
                finalTop: baseTop,
                isPast: eventDate < currentDate,
                isCurrent: eventDate.toDateString() === currentDate.toDateString()
            };
        });
        
        // Détecter et corriger les chevauchements (espacement minimum de 8% entre les événements)
        const minSpacing = 8; // Pourcentage minimum entre deux événements
        for (let i = 1; i < eventPositions.length; i++) {
            const prev = eventPositions[i - 1];
            const current = eventPositions[i];
            
            // Si les événements sont trop proches, décaler le suivant
            if (current.finalTop - prev.finalTop < minSpacing) {
                current.finalTop = prev.finalTop + minSpacing;
            }
        }
        
        // Ajuster si le dernier événement dépasse 95% (garder une marge)
        const maxTop = 95;
        if (eventPositions.length > 0 && eventPositions[eventPositions.length - 1].finalTop > maxTop) {
            // Réduire proportionnellement tous les espacements
            const scale = maxTop / eventPositions[eventPositions.length - 1].finalTop;
            eventPositions.forEach(pos => {
                pos.finalTop = 20 + (pos.finalTop - 20) * scale;
            });
        }

        container.innerHTML = `
            <div style="position: relative; padding: 20px 0 40px 0; min-height: ${Math.max(800, eventPositions.length * 120)}px;">
                <!-- Ligne de temps verticale -->
                <div style="position: absolute; left: 120px; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, #FF5500 0%, #FF5500 20%, #333 80%, #333 100%); border-radius: 2px; z-index: 1;"></div>
                
                <!-- Événements sur la timeline -->
                ${eventPositions.map((pos, index) => {
                    const event = pos.event;
                    const isPast = pos.isPast;
                    const isCurrent = pos.isCurrent;
                    const topPosition = pos.finalTop;
                    
                    // Alterner gauche/droite
                    const isLeft = index % 2 === 0;
                    
                    return `
                        <div style="position: absolute; top: ${topPosition}%; ${isLeft ? 'left' : 'right'}: 0; width: 240px; transform: translateY(-50%); z-index: ${10 + index};">
                            <!-- Point sur la ligne -->
                            <div style="position: absolute; ${isLeft ? 'right' : 'left'}: -120px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; background: ${isPast ? '#4ade80' : isCurrent ? '#FF5500' : '#666'}; border: 3px solid #0a0a0a; border-radius: 50%; z-index: 2; box-shadow: 0 0 0 2px ${isPast ? '#4ade80' : isCurrent ? '#FF5500' : '#666'};"></div>
                            
                            <!-- Ligne de connexion -->
                            <div style="position: absolute; ${isLeft ? 'right' : 'left'}: -120px; top: 50%; width: 120px; height: 2px; background: ${isPast ? '#4ade80' : isCurrent ? '#FF5500' : '#666'}; transform: translateY(-50%); opacity: 0.5;"></div>
                            
                            <!-- Carte événement -->
                            <div style="background: ${isPast ? 'rgba(74, 222, 128, 0.1)' : isCurrent ? 'rgba(255, 85, 0, 0.1)' : '#0a0a0a'}; border: 2px solid ${isPast ? '#4ade80' : isCurrent ? '#FF5500' : '#333'}; padding: 16px; border-radius: 4px; transition: all 0.3s ease;"
                                 onmouseover="this.style.transform='translateY(-50%) scale(1.02)'; this.style.borderColor='${isPast ? '#4ade80' : isCurrent ? '#FF5500' : '#FF5500'}';"
                                 onmouseout="this.style.transform='translateY(-50%) scale(1)'; this.style.borderColor='${isPast ? '#4ade80' : isCurrent ? '#FF5500' : '#333'}';">
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                    <div style="width: 32px; height: 32px; background: ${isPast ? 'rgba(74, 222, 128, 0.2)' : isCurrent ? 'rgba(255, 85, 0, 0.2)' : 'rgba(102, 102, 102, 0.2)'}; border: 2px solid ${isPast ? '#4ade80' : isCurrent ? '#FF5500' : '#666'}; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                                        <i class="fas ${event.icon || 'fa-bullseye'}" style="color: ${isPast ? '#4ade80' : isCurrent ? '#FF5500' : '#666'}; font-size: 14px;"></i>
                                    </div>
                                    <div style="flex: 1;">
                                        <h4 style="font-family: 'Oswald', sans-serif; font-size: 14px; color: white; margin: 0; text-transform: uppercase; line-height: 1.2;">
                                            ${event.title}
                                        </h4>
                                        <p style="font-size: 10px; color: #999; margin: 4px 0 0 0; font-family: 'Space Mono', monospace;">
                                            ${this.formatDate(event.date)}
                                        </p>
                                    </div>
                                </div>
                                ${event.description ? `
                                    <p style="font-size: 12px; color: #ccc; line-height: 1.5; margin: 8px 0 0 0;">
                                        ${event.description}
                                    </p>
                                ` : ''}
                                ${event.progress !== undefined ? `
                                    <div style="margin-top: 12px;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                            <span style="font-size: 10px; color: #999;">Progression</span>
                                            <span style="font-size: 10px; color: ${isPast ? '#4ade80' : '#FF5500'}; font-weight: 600;">${event.progress}%</span>
                                        </div>
                                        <div style="background: #333; height: 4px; border-radius: 2px; overflow: hidden;">
                                            <div style="background: ${isPast ? '#4ade80' : '#FF5500'}; height: 100%; width: ${event.progress}%; transition: width 0.3s ease;"></div>
                                        </div>
                                    </div>
                                ` : ''}
                                ${isCurrent ? `
                                    <div style="margin-top: 8px; padding: 6px 10px; background: rgba(255, 85, 0, 0.2); border: 1px solid #FF5500; border-radius: 4px;">
                                        <span style="font-size: 10px; color: #FF5500; font-weight: 600; text-transform: uppercase;">EN COURS</span>
                                    </div>
                                ` : isPast ? `
                                    <div style="margin-top: 8px; padding: 6px 10px; background: rgba(74, 222, 128, 0.2); border: 1px solid #4ade80; border-radius: 4px;">
                                        <span style="font-size: 10px; color: #4ade80; font-weight: 600; text-transform: uppercase;">TERMINÉ</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
                
                <!-- Labels de dates sur la ligne -->
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 100px;">
                    ${['Q1', 'Q2', 'Q3', 'Q4'].map((quarter, index) => {
                        const quarterTop = 20 + (index * 25);
                        return `
                            <div style="position: absolute; top: ${quarterTop}%; left: 0; transform: translateY(-50%);">
                                <div style="width: 80px; padding: 8px; background: #0a0a0a; border: 2px solid #333; border-radius: 4px; text-align: center;">
                                    <span style="font-family: 'Oswald', sans-serif; font-size: 16px; color: #FF5500; font-weight: 700;">${quarter}</span>
                                    <p style="font-size: 9px; color: #666; margin: 4px 0 0 0; font-family: 'Space Mono', monospace;">
                                        ${['Jan-Mar', 'Avr-Jun', 'Jul-Sep', 'Oct-Déc'][index]}
                                    </p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    getTimelineEvents() {
        // Récupérer les événements depuis les objectifs marketing
        const events = [];
        
        this.marketingObjectives.forEach(obj => {
            // Essayer de récupérer les dates depuis localStorage
            const savedObjective = localStorage.getItem('smart_objective_' + obj.id);
            if (savedObjective) {
                const objectiveData = JSON.parse(savedObjective);
                if (objectiveData.startDate) {
                    events.push({
                        title: obj.title,
                        date: objectiveData.startDate,
                        description: objectiveData.description || '',
                        progress: obj.progress,
                        icon: 'fa-bullseye',
                        type: 'objective'
                    });
                }
            } else {
                // Dates par défaut basées sur l'ID de l'objectif
                const defaultDates = {
                    'bilan-marketing-2025': '2025-11-01',
                    'strategie-reseaux-sociaux': '2025-10-01',
                    'developpement-merchandising': '2026-01-15',
                    'partenariats-&-sponsors': '2026-02-01'
                };
                
                if (defaultDates[obj.id]) {
                    events.push({
                        title: obj.title,
                        date: defaultDates[obj.id],
                        description: '',
                        progress: obj.progress,
                        icon: 'fa-bullseye',
                        type: 'objective'
                    });
                }
            }
        });

        // Ajouter des événements marketing importants
        events.push(
            {
                title: 'Lancement Membership',
                date: '2026-01-15',
                description: 'Lancement du programme d\'abonnement',
                progress: 0,
                icon: 'fa-id-card',
                type: 'milestone'
            },
            {
                title: 'Grande Soirée Printemps',
                date: '2026-05-20',
                description: 'Événement majeur - 500 participants visés',
                progress: 0,
                icon: 'fa-calendar-star',
                type: 'event'
            },
            {
                title: 'Anniversary 2 Ans',
                date: '2026-12-10',
                description: 'Célébration des 2 ans du collectif - 600 participants visés',
                progress: 0,
                icon: 'fa-birthday-cake',
                type: 'event'
            }
        );

        return events;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    // ============================================
    // ANALYSE SWOT MARKETING
    // ============================================

    renderSWOT() {
        const container = document.getElementById('swot-container');
        if (!container) return;

        // Charger l'analyse SWOT depuis localStorage
        let swot = JSON.parse(localStorage.getItem('marketing_swot')) || {
            strengths: [],
            weaknesses: [],
            opportunities: [],
            threats: []
        };

        container.innerHTML = `
            <div style="margin-bottom: 24px; padding: 20px; background: rgba(236, 72, 153, 0.05); border: 2px solid rgba(236, 72, 153, 0.3); border-radius: 4px;">
                <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: #ec4899; margin: 0 0 12px 0; text-transform: uppercase;">
                    <i class="fas fa-info-circle"></i> Qu'est-ce qu'une analyse SWOT ?
                </h3>
                <p style="font-size: 13px; color: #ccc; line-height: 1.6; margin: 0;">
                    L'analyse SWOT vous aide à identifier vos <strong>Forces</strong> (ce que vous faites bien), 
                    vos <strong>Faiblesses</strong> (ce qu'il faut améliorer), vos <strong>Opportunités</strong> (tendances, nouveaux canaux) 
                    et vos <strong>Menaces</strong> (concurrence, changements). Utilisez ces insights pour générer de nouveaux objectifs marketing.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
                <!-- Forces -->
                <div style="background: rgba(34, 197, 94, 0.05); border: 2px solid rgba(34, 197, 94, 0.3); padding: 20px; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                        <div style="width: 40px; height: 40px; background: rgba(34, 197, 94, 0.2); border: 2px solid #22c55e; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                            <i class="fas fa-check-circle" style="color: #22c55e;"></i>
                        </div>
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 18px; color: #22c55e; margin: 0; text-transform: uppercase;">
                            FORCES
                        </h3>
                    </div>
                    <div id="swot-strengths-list" style="margin-bottom: 12px;">
                        ${swot.strengths.map((item, index) => `
                            <div style="background: #0a0a0a; border: 1px solid #333; padding: 12px; margin-bottom: 8px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 13px; color: #ccc;">${item}</span>
                                <button onclick="marketingManager.removeSWOTItem('strengths', ${index})" style="background: transparent; border: none; color: #ef4444; cursor: pointer;">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <input type="text" id="swot-strength-input" placeholder="Ajouter une force..." 
                               style="flex: 1; background: #0a0a0a; border: 2px solid #333; padding: 10px; color: white; font-size: 13px;"
                               onkeypress="if(event.key === 'Enter') marketingManager.addSWOTItem('strengths')">
                        <button onclick="marketingManager.addSWOTItem('strengths')" 
                                style="background: #22c55e; color: white; border: none; padding: 10px 16px; cursor: pointer; font-size: 12px; text-transform: uppercase; font-weight: 600;">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>

                <!-- Faiblesses -->
                <div style="background: rgba(239, 68, 68, 0.05); border: 2px solid rgba(239, 68, 68, 0.3); padding: 20px; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                        <div style="width: 40px; height: 40px; background: rgba(239, 68, 68, 0.2); border: 2px solid #ef4444; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                            <i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>
                        </div>
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 18px; color: #ef4444; margin: 0; text-transform: uppercase;">
                            FAIBLESSES
                        </h3>
                    </div>
                    <div id="swot-weaknesses-list" style="margin-bottom: 12px;">
                        ${swot.weaknesses.map((item, index) => `
                            <div style="background: #0a0a0a; border: 1px solid #333; padding: 12px; margin-bottom: 8px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 13px; color: #ccc;">${item}</span>
                                <button onclick="marketingManager.removeSWOTItem('weaknesses', ${index})" style="background: transparent; border: none; color: #ef4444; cursor: pointer;">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <input type="text" id="swot-weakness-input" placeholder="Ajouter une faiblesse..." 
                               style="flex: 1; background: #0a0a0a; border: 2px solid #333; padding: 10px; color: white; font-size: 13px;"
                               onkeypress="if(event.key === 'Enter') marketingManager.addSWOTItem('weaknesses')">
                        <button onclick="marketingManager.addSWOTItem('weaknesses')" 
                                style="background: #ef4444; color: white; border: none; padding: 10px 16px; cursor: pointer; font-size: 12px; text-transform: uppercase; font-weight: 600;">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>

                <!-- Opportunités -->
                <div style="background: rgba(59, 130, 246, 0.05); border: 2px solid rgba(59, 130, 246, 0.3); padding: 20px; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                        <div style="width: 40px; height: 40px; background: rgba(59, 130, 246, 0.2); border: 2px solid #3b82f6; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                            <i class="fas fa-lightbulb" style="color: #3b82f6;"></i>
                        </div>
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 18px; color: #3b82f6; margin: 0; text-transform: uppercase;">
                            OPPORTUNITÉS
                        </h3>
                    </div>
                    <div id="swot-opportunities-list" style="margin-bottom: 12px;">
                        ${swot.opportunities.map((item, index) => `
                            <div style="background: #0a0a0a; border: 1px solid #333; padding: 12px; margin-bottom: 8px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 13px; color: #ccc;">${item}</span>
                                <button onclick="marketingManager.removeSWOTItem('opportunities', ${index})" style="background: transparent; border: none; color: #ef4444; cursor: pointer;">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <input type="text" id="swot-opportunity-input" placeholder="Ajouter une opportunité..." 
                               style="flex: 1; background: #0a0a0a; border: 2px solid #333; padding: 10px; color: white; font-size: 13px;"
                               onkeypress="if(event.key === 'Enter') marketingManager.addSWOTItem('opportunities')">
                        <button onclick="marketingManager.addSWOTItem('opportunities')" 
                                style="background: #3b82f6; color: white; border: none; padding: 10px 16px; cursor: pointer; font-size: 12px; text-transform: uppercase; font-weight: 600;">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>

                <!-- Menaces -->
                <div style="background: rgba(251, 191, 36, 0.05); border: 2px solid rgba(251, 191, 36, 0.3); padding: 20px; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                        <div style="width: 40px; height: 40px; background: rgba(251, 191, 36, 0.2); border: 2px solid #fbbf24; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                            <i class="fas fa-shield-alt" style="color: #fbbf24;"></i>
                        </div>
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 18px; color: #fbbf24; margin: 0; text-transform: uppercase;">
                            MENACES
                        </h3>
                    </div>
                    <div id="swot-threats-list" style="margin-bottom: 12px;">
                        ${swot.threats.map((item, index) => `
                            <div style="background: #0a0a0a; border: 1px solid #333; padding: 12px; margin-bottom: 8px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 13px; color: #ccc;">${item}</span>
                                <button onclick="marketingManager.removeSWOTItem('threats', ${index})" style="background: transparent; border: none; color: #ef4444; cursor: pointer;">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <input type="text" id="swot-threat-input" placeholder="Ajouter une menace..." 
                               style="flex: 1; background: #0a0a0a; border: 2px solid #333; padding: 10px; color: white; font-size: 13px;"
                               onkeypress="if(event.key === 'Enter') marketingManager.addSWOTItem('threats')">
                        <button onclick="marketingManager.addSWOTItem('threats')" 
                                style="background: #fbbf24; color: #0a0a0a; border: none; padding: 10px 16px; cursor: pointer; font-size: 12px; text-transform: uppercase; font-weight: 600;">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div style="padding: 20px; background: rgba(236, 72, 153, 0.05); border: 2px solid rgba(236, 72, 153, 0.3); border-radius: 4px;">
                <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: #ec4899; margin: 0 0 16px 0; text-transform: uppercase;">
                    <i class="fas fa-magic"></i> GÉNÉRER DES OBJECTIFS À PARTIR DE L'ANALYSE SWOT
                </h3>
                <button onclick="marketingManager.generateObjectivesFromSWOT()" 
                        style="background: #ec4899; color: white; border: none; padding: 12px 24px; font-size: 13px; text-transform: uppercase; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-bullseye"></i> Générer des objectifs SMART
                </button>
            </div>
        `;
    }

    addSWOTItem(category) {
        const input = document.getElementById(`swot-${category}-input`);
        if (!input || !input.value.trim()) return;

        let swot = JSON.parse(localStorage.getItem('marketing_swot')) || {
            strengths: [],
            weaknesses: [],
            opportunities: [],
            threats: []
        };

        swot[category].push(input.value.trim());
        localStorage.setItem('marketing_swot', JSON.stringify(swot));
        input.value = '';
        this.renderSWOT();
    }

    removeSWOTItem(category, index) {
        let swot = JSON.parse(localStorage.getItem('marketing_swot')) || {
            strengths: [],
            weaknesses: [],
            opportunities: [],
            threats: []
        };

        swot[category].splice(index, 1);
        localStorage.setItem('marketing_swot', JSON.stringify(swot));
        this.renderSWOT();
    }

    generateObjectivesFromSWOT() {
        const swot = JSON.parse(localStorage.getItem('marketing_swot')) || {
            strengths: [],
            weaknesses: [],
            opportunities: [],
            threats: []
        };

        const suggestions = [];
        
        // Générer des suggestions basées sur les opportunités
        swot.opportunities.forEach(opp => {
            suggestions.push({
                title: `Capitaliser sur: ${opp}`,
                description: `Objectif basé sur l'opportunité: ${opp}`,
                type: 'opportunity'
            });
        });

        // Générer des suggestions basées sur les faiblesses
        swot.weaknesses.forEach(weak => {
            suggestions.push({
                title: `Améliorer: ${weak}`,
                description: `Objectif pour combler la faiblesse: ${weak}`,
                type: 'weakness'
            });
        });

        if (suggestions.length === 0) {
            alert('Ajoutez des éléments dans votre analyse SWOT pour générer des objectifs.');
            return;
        }

        // Afficher les suggestions
        const suggestionsHTML = suggestions.map((sug, index) => `
            <div style="background: #0a0a0a; border: 2px solid #333; padding: 16px; margin-bottom: 12px; border-radius: 4px;">
                <h4 style="font-family: 'Oswald', sans-serif; font-size: 14px; color: white; margin: 0 0 8px 0; text-transform: uppercase;">
                    ${sug.title}
                </h4>
                <p style="font-size: 12px; color: #999; margin: 0 0 12px 0;">${sug.description}</p>
                <button onclick="marketingManager.createObjectiveFromSuggestion(${index})" 
                        style="background: #FF5500; color: white; border: none; padding: 8px 16px; font-size: 11px; text-transform: uppercase; cursor: pointer; font-weight: 600;">
                    Créer cet objectif
                </button>
            </div>
        `).join('');

        const container = document.getElementById('swot-container');
        if (container) {
            container.innerHTML += `
                <div style="margin-top: 24px; padding: 20px; background: rgba(255, 85, 0, 0.05); border: 2px solid rgba(255, 85, 0, 0.3); border-radius: 4px;">
                    <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: #FF5500; margin: 0 0 16px 0; text-transform: uppercase;">
                        OBJECTIFS SUGGÉRÉS
                    </h3>
                    ${suggestionsHTML}
                </div>
            `;
        }
    }

    // ============================================
    // ANALYSE DES GAPS
    // ============================================

    renderGapsAnalysis() {
        const container = document.getElementById('gaps-analysis-container');
        if (!container) return;

        // Données actuelles vs objectifs
        const gaps = [
            { kpi: 'Audience Totale', current: 18000, target: 50000, gap: 32000, unit: 'followers' },
            { kpi: 'Engagement Moyen', current: 4.8, target: 6, gap: 1.2, unit: '%' },
            { kpi: 'Revenus Annuels', current: 45000, target: 120000, gap: 75000, unit: '€' },
            { kpi: 'Taux de Conversion', current: 3.2, target: 5, gap: 1.8, unit: '%' }
        ];

        container.innerHTML = `
            <div style="margin-bottom: 24px; padding: 20px; background: rgba(34, 197, 94, 0.05); border: 2px solid rgba(34, 197, 94, 0.3); border-radius: 4px;">
                <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: #22c55e; margin: 0 0 12px 0; text-transform: uppercase;">
                    <i class="fas fa-info-circle"></i> Analyse des Écarts
                </h3>
                <p style="font-size: 13px; color: #ccc; line-height: 1.6; margin: 0;">
                    Cette analyse compare votre situation actuelle avec vos objectifs pour identifier les écarts à combler. 
                    Utilisez ces informations pour créer des plans d'action ciblés.
                </p>
            </div>

            <div style="display: grid; gap: 16px;">
                ${gaps.map(gap => {
                    const gapPercent = ((gap.gap / gap.target) * 100).toFixed(1);
                    const progressPercent = ((gap.current / gap.target) * 100).toFixed(1);
                    
                    return `
                        <div style="background: #0a0a0a; border: 2px solid #333; padding: 20px; border-radius: 4px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <h4 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0; text-transform: uppercase;">
                                    ${gap.kpi}
                                </h4>
                                <span style="font-size: 12px; color: #22c55e; font-weight: 600;">Écart: ${gap.gap.toLocaleString()} ${gap.unit}</span>
                            </div>
                            
                            <div style="margin-bottom: 12px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="font-size: 12px; color: #999;">Actuel: ${gap.current.toLocaleString()} ${gap.unit}</span>
                                    <span style="font-size: 12px; color: #999;">Objectif: ${gap.target.toLocaleString()} ${gap.unit}</span>
                                </div>
                                <div style="background: #333; height: 8px; border-radius: 4px; overflow: hidden;">
                                    <div style="background: linear-gradient(to right, #22c55e, #FF5500); height: 100%; width: ${Math.min(progressPercent, 100)}%; transition: width 0.3s ease;"></div>
                                </div>
                                <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                                    <span style="font-size: 10px; color: #666;">${progressPercent}% atteint</span>
                                    <span style="font-size: 10px; color: #666;">${gapPercent}% restant</span>
                                </div>
                            </div>

                            <div style="padding: 12px; background: rgba(34, 197, 94, 0.05); border-left: 3px solid #22c55e; border-radius: 4px;">
                                <p style="font-size: 12px; color: #ccc; margin: 0 0 8px 0;">
                                    <strong style="color: #22c55e;">Action suggérée:</strong> Pour combler cet écart, vous devriez...
                                </p>
                                <button onclick="marketingManager.generateActionPlan('${gap.kpi}')" 
                                        style="background: #22c55e; color: white; border: none; padding: 8px 16px; font-size: 11px; text-transform: uppercase; cursor: pointer; font-weight: 600;">
                                    Générer un plan d'action
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    generateActionPlan(kpi) {
        const actionPlans = {
            'Audience Totale': [
                'Lancer une campagne de croissance Instagram ciblée',
                'Augmenter la fréquence de publication (5-7 posts/semaine)',
                'Collaborer avec des influenceurs locaux',
                'Optimiser les hashtags et le SEO Instagram'
            ],
            'Engagement Moyen': [
                'Créer plus de contenu interactif (polls, questions)',
                'Répondre systématiquement aux commentaires',
                'Organiser des concours et jeux concours',
                'Partager du contenu user-generated'
            ],
            'Revenus Annuels': [
                'Diversifier les sources de revenus (merch, partenariats)',
                'Augmenter le nombre d\'événements',
                'Optimiser les prix des tickets',
                'Développer le programme membership'
            ],
            'Taux de Conversion': [
                'Améliorer la landing page Shotgun',
                'Simplifier le processus d\'achat',
                'Ajouter des témoignages et preuves sociales',
                'Créer un sentiment d\'urgence (early bird, sold out)'
            ]
        };

        const plans = actionPlans[kpi] || ['Analyser les données pour identifier les leviers d\'amélioration'];
        
        alert(`Plan d'action pour ${kpi}:\n\n${plans.map((p, i) => `${i + 1}. ${p}`).join('\n')}`);
    }

    // ============================================
    // PERFORMANCE PAR CANAL
    // ============================================

    renderChannelPerformance() {
        const container = document.getElementById('channel-performance-container');
        if (!container) return;

        const channels = [
            { name: 'Instagram', followers: 18234, engagement: 4.8, reach: 45000, conversions: 320, roi: 2.5, color: '#E4405F' },
            { name: 'Shotgun', views: 38276, conversions: 4287, conversionRate: 11.2, roi: 3.2, color: '#FF5500' },
            { name: 'Newsletter', subscribers: 0, openRate: 0, clickRate: 0, roi: 0, color: '#60a5fa' }
        ];

        container.innerHTML = `
            <div style="margin-bottom: 24px; padding: 20px; background: rgba(59, 130, 246, 0.05); border: 2px solid rgba(59, 130, 246, 0.3); border-radius: 4px;">
                <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: #3b82f6; margin: 0 0 12px 0; text-transform: uppercase;">
                    <i class="fas fa-info-circle"></i> Performance par Canal
                </h3>
                <p style="font-size: 13px; color: #ccc; line-height: 1.6; margin: 0;">
                    Comparez les performances de vos différents canaux marketing pour optimiser l'allocation de votre budget et de vos efforts.
                </p>
            </div>

            <div style="display: grid; gap: 20px; margin-bottom: 24px;">
                ${channels.map(channel => `
                    <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px; border-left: 4px solid ${channel.color};">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                            <h4 style="font-family: 'Oswald', sans-serif; font-size: 20px; color: white; margin: 0; text-transform: uppercase;">
                                ${channel.name}
                            </h4>
                            <div style="padding: 8px 16px; background: rgba(59, 130, 246, 0.1); border: 2px solid ${channel.color}; border-radius: 4px;">
                                <span style="font-size: 14px; color: ${channel.color}; font-weight: 700;">ROI: ${channel.roi}x</span>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px;">
                            ${channel.followers !== undefined ? `
                                <div style="text-align: center; padding: 16px; background: #111; border: 1px solid #333; border-radius: 4px;">
                                    <p style="font-size: 11px; color: #999; margin: 0 0 8px 0; text-transform: uppercase;">Followers</p>
                                    <p style="font-size: 24px; color: ${channel.color}; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${channel.followers.toLocaleString()}
                                    </p>
                                </div>
                            ` : ''}
                            ${channel.views !== undefined ? `
                                <div style="text-align: center; padding: 16px; background: #111; border: 1px solid #333; border-radius: 4px;">
                                    <p style="font-size: 11px; color: #999; margin: 0 0 8px 0; text-transform: uppercase;">Vues</p>
                                    <p style="font-size: 24px; color: ${channel.color}; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${channel.views.toLocaleString()}
                                    </p>
                                </div>
                            ` : ''}
                            ${channel.engagement !== undefined ? `
                                <div style="text-align: center; padding: 16px; background: #111; border: 1px solid #333; border-radius: 4px;">
                                    <p style="font-size: 11px; color: #999; margin: 0 0 8px 0; text-transform: uppercase;">Engagement</p>
                                    <p style="font-size: 24px; color: ${channel.color}; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${channel.engagement}%
                                    </p>
                                </div>
                            ` : ''}
                            ${channel.conversions !== undefined ? `
                                <div style="text-align: center; padding: 16px; background: #111; border: 1px solid #333; border-radius: 4px;">
                                    <p style="font-size: 11px; color: #999; margin: 0 0 8px 0; text-transform: uppercase;">Conversions</p>
                                    <p style="font-size: 24px; color: ${channel.color}; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${channel.conversions.toLocaleString()}
                                    </p>
                                </div>
                            ` : ''}
                            ${channel.conversionRate !== undefined ? `
                                <div style="text-align: center; padding: 16px; background: #111; border: 1px solid #333; border-radius: 4px;">
                                    <p style="font-size: 11px; color: #999; margin: 0 0 8px 0; text-transform: uppercase;">Taux Conversion</p>
                                    <p style="font-size: 24px; color: ${channel.color}; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${channel.conversionRate}%
                                    </p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div style="padding: 20px; background: rgba(59, 130, 246, 0.05); border: 2px solid rgba(59, 130, 246, 0.3); border-radius: 4px;">
                <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: #3b82f6; margin: 0 0 12px 0; text-transform: uppercase;">
                    <i class="fas fa-lightbulb"></i> Recommandations
                </h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="padding: 8px 0; font-size: 13px; color: #ccc; border-bottom: 1px solid #333;">
                        <i class="fas fa-check-circle" style="color: #3b82f6; margin-right: 8px;"></i>
                        Instagram génère le meilleur ROI - investissez plus dans ce canal
                    </li>
                    <li style="padding: 8px 0; font-size: 13px; color: #ccc; border-bottom: 1px solid #333;">
                        <i class="fas fa-check-circle" style="color: #3b82f6; margin-right: 8px;"></i>
                        Shotgun a un excellent taux de conversion - optimisez le trafic vers ce canal
                    </li>
                    <li style="padding: 8px 0; font-size: 13px; color: #ccc;">
                        <i class="fas fa-exclamation-triangle" style="color: #fbbf24; margin-right: 8px;"></i>
                        Newsletter non exploitée - potentiel de croissance important
                    </li>
                </ul>
            </div>
        `;
    }

    // ============================================
    // CALENDRIER ÉDITORIAL
    // ============================================

    renderEditorialCalendar() {
        const container = document.getElementById('editorial-calendar-container');
        if (!container) return;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Générer le calendrier pour les 3 prochains mois
        const months = [];
        for (let i = 0; i < 3; i++) {
            const monthDate = new Date(currentYear, currentMonth + i, 1);
            months.push({
                name: monthDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
                days: new Date(currentYear, currentMonth + i + 1, 0).getDate(),
                firstDay: new Date(currentYear, currentMonth + i, 1).getDay()
            });
        }

        container.innerHTML = `
            <div style="margin-bottom: 24px; padding: 20px; background: rgba(168, 85, 247, 0.05); border: 2px solid rgba(168, 85, 247, 0.3); border-radius: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: #a855f7; margin: 0 0 8px 0; text-transform: uppercase;">
                            <i class="fas fa-info-circle"></i> Calendrier Éditorial
                        </h3>
                        <p style="font-size: 13px; color: #ccc; line-height: 1.6; margin: 0;">
                            Planifiez vos contenus marketing avec un calendrier éditorial structuré. 
                            Organisez vos publications par type de contenu et canal.
                        </p>
                    </div>
                    <button onclick="marketingManager.addEditorialEvent()" 
                            style="background: #a855f7; color: white; border: none; padding: 12px 24px; font-size: 13px; text-transform: uppercase; cursor: pointer; font-weight: 600;">
                        <i class="fas fa-plus"></i> Ajouter un événement
                    </button>
                </div>
            </div>

            <div style="display: grid; gap: 24px;">
                ${months.map((month, monthIndex) => {
                    const days = [];
                    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
                    
                    // Ajouter les jours vides au début
                    for (let i = 0; i < month.firstDay; i++) {
                        days.push(null);
                    }
                    
                    // Ajouter les jours du mois
                    for (let day = 1; day <= month.days; day++) {
                        days.push(day);
                    }

                    return `
                        <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px;">
                            <h4 style="font-family: 'Oswald', sans-serif; font-size: 20px; color: white; margin: 0 0 20px 0; text-transform: uppercase;">
                                ${month.name}
                            </h4>
                            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px;">
                                ${dayNames.map(dayName => `
                                    <div style="text-align: center; padding: 8px; background: #111; border: 1px solid #333; font-size: 11px; color: #999; text-transform: uppercase; font-weight: 600;">
                                        ${dayName}
                                    </div>
                                `).join('')}
                                ${days.map((day, dayIndex) => {
                                    if (day === null) {
                                        return '<div style="padding: 12px; background: #0a0a0a;"></div>';
                                    }
                                    
                                    const isToday = day === currentDate.getDate() && monthIndex === 0;
                                    const hasEvent = Math.random() > 0.7; // Exemple
                                    
                                    return `
                                        <div style="padding: 12px; background: ${isToday ? 'rgba(168, 85, 247, 0.1)' : '#0a0a0a'}; border: 2px solid ${isToday ? '#a855f7' : '#333'}; border-radius: 4px; min-height: 60px; cursor: pointer; transition: all 0.3s ease;"
                                             onmouseover="this.style.borderColor='#a855f7'; this.style.background='#111';"
                                             onmouseout="this.style.borderColor='${isToday ? '#a855f7' : '#333'}'; this.style.background='${isToday ? 'rgba(168, 85, 247, 0.1)' : '#0a0a0a'}'"
                                             onclick="marketingManager.openDayEditor(${day}, ${monthIndex})">
                                            <div style="font-size: 12px; color: ${isToday ? '#a855f7' : '#fff'}; font-weight: 600; margin-bottom: 4px;">
                                                ${day}
                                            </div>
                                            ${hasEvent ? `
                                                <div style="font-size: 10px; color: #a855f7; padding: 4px; background: rgba(168, 85, 247, 0.2); border-radius: 2px; margin-top: 4px;">
                                                    <i class="fas fa-image"></i> Post Instagram
                                                </div>
                                            ` : ''}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    addEditorialEvent() {
        alert('Fonctionnalité d\'ajout d\'événement éditorial - À implémenter');
    }

    openDayEditor(day, monthIndex) {
        alert(`Éditer le ${day} - Fonctionnalité à implémenter`);
    }
}

// ============================================
// FONCTIONS GLOBALES POUR LES MODALS
// ============================================

function openSmartModal() {
    const modal = document.getElementById('modal-smart');
    if (modal) {
        modal.style.display = 'flex';
        marketingManager.renderSmartForm();
    }
}

function closeSmartModal() {
    const modal = document.getElementById('modal-smart');
    if (modal) modal.style.display = 'none';
}

function openPersonasModal() {
    const modal = document.getElementById('modal-personas');
    if (modal) {
        modal.style.display = 'flex';
        marketingManager.renderPersonasList();
    }
}

function closePersonasModal() {
    const modal = document.getElementById('modal-personas');
    if (modal) modal.style.display = 'none';
}

function openNewPersonaForm() {
    marketingManager.renderPersonaForm();
}

function openCompetitiveAnalysisModal() {
    const modal = document.getElementById('modal-competitive');
    if (modal) {
        modal.style.display = 'flex';
        marketingManager.renderCompetitorsList();
        marketingManager.renderCompetitiveChart();
    }
}

function closeCompetitiveAnalysisModal() {
    const modal = document.getElementById('modal-competitive');
    if (modal) modal.style.display = 'none';
}

function openNewCompetitorForm() {
    marketingManager.renderCompetitorForm();
}

function openObjectivesKPIsMatrix() {
    const modal = document.getElementById('modal-matrix');
    if (modal) {
        modal.style.display = 'flex';
        marketingManager.renderObjectivesKPIsMatrix();
    }
}

function closeMatrixModal() {
    const modal = document.getElementById('modal-matrix');
    if (modal) modal.style.display = 'none';
}

function openTimelineModal() {
    const modal = document.getElementById('modal-timeline');
    if (modal) {
        modal.style.display = 'flex';
        marketingManager.renderTimeline();
    }
}

function closeTimelineModal() {
    const modal = document.getElementById('modal-timeline');
    if (modal) modal.style.display = 'none';
}

// ============================================
// NOUVELLES FONCTIONNALITÉS MARKETING
// ============================================

// Analyse SWOT
function openSWOTModal() {
    const modal = document.getElementById('modal-swot');
    if (modal) {
        modal.style.display = 'flex';
        marketingManager.renderSWOT();
    }
}

function closeSWOTModal() {
    const modal = document.getElementById('modal-swot');
    if (modal) modal.style.display = 'none';
}

// Analyse des Gaps
function openGapsAnalysisModal() {
    const modal = document.getElementById('modal-gaps');
    if (modal) {
        modal.style.display = 'flex';
        marketingManager.renderGapsAnalysis();
    }
}

function closeGapsAnalysisModal() {
    const modal = document.getElementById('modal-gaps');
    if (modal) modal.style.display = 'none';
}

// Performance par Canal
function openChannelPerformanceModal() {
    const modal = document.getElementById('modal-channel-performance');
    if (modal) {
        modal.style.display = 'flex';
        marketingManager.renderChannelPerformance();
    }
}

function closeChannelPerformanceModal() {
    const modal = document.getElementById('modal-channel-performance');
    if (modal) modal.style.display = 'none';
}

// Calendrier Éditorial
function openEditorialCalendarModal() {
    const modal = document.getElementById('modal-editorial-calendar');
    if (modal) {
        modal.style.display = 'flex';
        marketingManager.renderEditorialCalendar();
    }
}

function closeEditorialCalendarModal() {
    const modal = document.getElementById('modal-editorial-calendar');
    if (modal) modal.style.display = 'none';
}

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

// Initialiser le gestionnaire marketing
let marketingManager;
document.addEventListener('DOMContentLoaded', () => {
    marketingManager = new MarketingManager();
    
    // Rendre accessible globalement
    window.marketingManager = marketingManager;
});

