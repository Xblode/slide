// Système de gestion des KPIs Marketing
document.addEventListener('DOMContentLoaded', () => {
    const kpiCards = document.querySelectorAll('.kpi-card');
    
    // Configuration des KPIs
    const KPI_CONFIG = {
        'revenue': {
            name: 'REVENUS ANNUELS',
            icon: 'fa-euro-sign',
            unit: '€',
            type: 'currency',
            description: 'Mesure la santé financière globale du collectif. Cet indicateur additionne tous les flux de revenus (événements, merchandising, partenariats) pour suivre la progression vers l\'objectif annuel de 120K€. Un bon suivi permet d\'anticiper les besoins de trésorerie et d\'ajuster la stratégie commerciale.',
            fields: [
                { id: 'revenus_evenements', label: 'Revenus événements', placeholder: '45000', type: 'number' },
                { id: 'revenus_merchandising', label: 'Revenus merchandising', placeholder: '2100', type: 'number' },
                { id: 'revenus_partenariats', label: 'Revenus partenariats', placeholder: '8500', type: 'number' },
                { id: 'autres_revenus', label: 'Autres revenus', placeholder: '0', type: 'number' }
            ],
            calculation: (data) => {
                return parseInt(data.revenus_evenements || 0) + 
                       parseInt(data.revenus_merchandising || 0) + 
                       parseInt(data.revenus_partenariats || 0) + 
                       parseInt(data.autres_revenus || 0);
            },
            target: 120000,
            formatValue: (val) => `${(val/1000).toFixed(0)}K€`
        },
        'audience': {
            name: 'AUDIENCE TOTALE',
            icon: 'fa-users',
            unit: '',
            type: 'number',
            description: 'Représente notre portée totale sur tous les canaux digitaux. Plus l\'audience est large, plus notre capacité à remplir les événements et vendre du merchandising est élevée. Objectif 50K pour devenir un acteur majeur de la scène techno régionale.',
            fields: [
                { id: 'followers_instagram', label: 'Followers Instagram', placeholder: '18234', type: 'number' },
                { id: 'followers_tiktok', label: 'Followers TikTok', placeholder: '0', type: 'number' },
                { id: 'subscribers_newsletter', label: 'Abonnés Newsletter', placeholder: '0', type: 'number' }
            ],
            calculation: (data) => {
                return parseInt(data.followers_instagram || 0) + 
                       parseInt(data.followers_tiktok || 0) + 
                       parseInt(data.subscribers_newsletter || 0);
            },
            target: 50000,
            formatValue: (val) => `${(val/1000).toFixed(0)}K`
        },
        'engagement': {
            name: 'ENGAGEMENT MOYEN',
            icon: 'fa-heart',
            unit: '%',
            type: 'percentage',
            description: 'Mesure la qualité de notre relation avec la communauté. Un taux d\'engagement élevé (>6%) signifie que notre contenu résonne vraiment avec notre audience. C\'est l\'indicateur clé de la fidélité : des followers engagés deviennent des participants et des ambassadeurs.',
            fields: [
                { id: 'total_interactions', label: 'Total interactions (likes + comments + shares)', placeholder: '8750', type: 'number' },
                { id: 'total_followers', label: 'Nombre de followers', placeholder: '18234', type: 'number' },
                { id: 'nb_posts', label: 'Nombre de posts publiés', placeholder: '187', type: 'number' }
            ],
            calculation: (data) => {
                const followers = parseInt(data.total_followers || 0);
                const posts = parseInt(data.nb_posts || 0);
                const interactions = parseInt(data.total_interactions || 0);
                if (followers === 0 || posts === 0) return 0;
                return ((interactions / (followers * posts)) * 100).toFixed(1);
            },
            target: 6,
            formatValue: (val) => `${val}%`
        },
        'conversion': {
            name: 'TAUX DE CONVERSION',
            icon: 'fa-bullseye',
            unit: '%',
            type: 'percentage',
            description: 'Mesure l\'efficacité de notre tunnel de vente événementiel. Ce ratio (tickets vendus / vues Shotgun) montre combien de visiteurs passent à l\'achat. Un taux >15% est excellent. Améliorer ce KPI = augmenter les revenus sans augmenter le trafic.',
            fields: [
                { id: 'vues_shotgun', label: 'Vues pages Shotgun', placeholder: '38276', type: 'number' },
                { id: 'tickets_vendus', label: 'Tickets vendus', placeholder: '4287', type: 'number' }
            ],
            calculation: (data) => {
                const vues = parseInt(data.vues_shotgun || 0);
                const tickets = parseInt(data.tickets_vendus || 0);
                if (vues === 0) return 0;
                return ((tickets / vues) * 100).toFixed(1);
            },
            target: 5,
            formatValue: (val) => `${val}%`
        },
        'roi': {
            name: 'ROI GLOBAL',
            icon: 'fa-chart-pie',
            unit: 'x',
            type: 'multiplier',
            description: 'Retour sur investissement marketing. Indique combien chaque euro investi en marketing rapporte en revenus. Un ROI de 3x signifie que chaque 1€ investi génère 3€ de revenus. Permet d\'optimiser l\'allocation du budget marketing et de justifier les investissements.',
            fields: [
                { id: 'revenus_totaux', label: 'Revenus totaux générés', placeholder: '64000', type: 'number' },
                { id: 'investissements_totaux', label: 'Investissements marketing totaux', placeholder: '25600', type: 'number' }
            ],
            calculation: (data) => {
                const revenus = parseInt(data.revenus_totaux || 0);
                const investissements = parseInt(data.investissements_totaux || 0);
                if (investissements === 0) return 0;
                return (revenus / investissements).toFixed(1);
            },
            target: 3,
            formatValue: (val) => `${val}x`
        },
        'revenue-growth': {
            name: 'CROISSANCE REVENUS',
            icon: 'fa-rocket',
            unit: '%',
            type: 'percentage',
            description: 'Mesure la dynamique de croissance du collectif année après année. Un taux de +40% démontre une croissance saine et soutenue. Cet indicateur rassure les partenaires potentiels et valide la stratégie de développement. C\'est notre "vitesse de croisière".',
            fields: [
                { id: 'ca_annee_actuelle', label: 'CA année actuelle', placeholder: '64000', type: 'number' },
                { id: 'ca_annee_precedente', label: 'CA année précédente', placeholder: '50000', type: 'number' }
            ],
            calculation: (data) => {
                const actuel = parseInt(data.ca_annee_actuelle || 0);
                const precedent = parseInt(data.ca_annee_precedente || 0);
                if (precedent === 0) return 0;
                return (((actuel - precedent) / precedent) * 100).toFixed(0);
            },
            target: 40,
            formatValue: (val) => `+${val}%`
        }
    };
    
    // Initialiser le stockage
    function initStorage() {
        if (!localStorage.getItem('kpis_data')) {
            localStorage.setItem('kpis_data', JSON.stringify({}));
        }
        if (!localStorage.getItem('kpis_history')) {
            localStorage.setItem('kpis_history', JSON.stringify([]));
        }
    }
    
    // Récupérer les données KPI
    function getKPIData(kpiId) {
        const data = JSON.parse(localStorage.getItem('kpis_data') || '{}');
        return data[kpiId] || {};
    }
    
    // Sauvegarder les données KPI
    function saveKPIData(kpiId, data) {
        const allData = JSON.parse(localStorage.getItem('kpis_data') || '{}');
        allData[kpiId] = data;
        localStorage.setItem('kpis_data', JSON.stringify(allData));
        
        // Ajouter à l'historique
        addToHistory(kpiId, data);
        
        // Mettre à jour l'affichage
        updateKPIDisplay(kpiId);
    }
    
    // Ajouter une entrée à l'historique
    function addToHistory(kpiId, data) {
        const history = JSON.parse(localStorage.getItem('kpis_history') || '[]');
        const config = KPI_CONFIG[kpiId];
        const calculatedValue = config.calculation(data);
        
        history.push({
            kpiId: kpiId,
            kpiName: config.name,
            timestamp: new Date().toISOString(),
            data: data,
            calculatedValue: calculatedValue,
            user: 'Direction' // Peut être dynamique
        });
        
        localStorage.setItem('kpis_history', JSON.stringify(history));
    }
    
    // Récupérer l'historique d'un KPI
    function getKPIHistory(kpiId) {
        const history = JSON.parse(localStorage.getItem('kpis_history') || '[]');
        return history.filter(entry => entry.kpiId === kpiId);
    }
    
    // Mettre à jour l'affichage du KPI sur la page
    function updateKPIDisplay(kpiId) {
        const config = KPI_CONFIG[kpiId];
        const data = getKPIData(kpiId);
        const value = config.calculation(data);
        const percentage = Math.round((value / config.target) * 100);
        
        // Trouver la carte KPI
        const kpiCard = document.querySelector(`.kpi-card.${kpiId}`);
        if (!kpiCard) return;
        
        // Mettre à jour la valeur actuelle
        const currentValue = kpiCard.querySelector('.kpi-current');
        if (currentValue) {
            currentValue.textContent = config.formatValue(value);
        }
        
        // Mettre à jour la barre de progression
        const progressFill = kpiCard.querySelector('.kpi-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${Math.min(percentage, 100)}%`;
        }
        
        // Mettre à jour le pourcentage
        const percentageElement = kpiCard.querySelector('.kpi-percentage');
        if (percentageElement) {
            percentageElement.textContent = `${percentage}%`;
        }
        
        // Calculer et afficher la variation (trend)
        const history = getKPIHistory(kpiId);
        const trendElement = kpiCard.querySelector('.kpi-trend');
        
        if (trendElement && history.length >= 2) {
            // Comparer avec l'avant-dernière valeur
            const currentEntry = history[history.length - 1];
            const previousEntry = history[history.length - 2];
            
            const currentVal = parseFloat(currentEntry.calculatedValue);
            const previousVal = parseFloat(previousEntry.calculatedValue);
            
            if (previousVal !== 0) {
                const variation = ((currentVal - previousVal) / previousVal) * 100;
                const isPositive = variation > 0;
                const absVariation = Math.abs(variation).toFixed(1);
                
                // Calculer le temps écoulé
                const currentDate = new Date(currentEntry.timestamp);
                const previousDate = new Date(previousEntry.timestamp);
                const daysDiff = Math.round((currentDate - previousDate) / (1000 * 60 * 60 * 24));
                
                let timeLabel = 'vs dernière mise à jour';
                if (daysDiff <= 7) {
                    timeLabel = 'vs semaine dernière';
                } else if (daysDiff <= 31) {
                    timeLabel = 'vs mois dernier';
                } else if (daysDiff <= 92) {
                    timeLabel = 'vs trimestre dernier';
                } else {
                    timeLabel = `vs il y a ${Math.round(daysDiff / 30)} mois`;
                }
                
                // Mettre à jour l'affichage
                trendElement.innerHTML = `
                    <i class="fas fa-arrow-${isPositive ? 'up' : 'down'}"></i>
                    <span>${isPositive ? '+' : ''}${absVariation}% ${timeLabel}</span>
                `;
                
                // Changer la couleur si négatif
                if (!isPositive) {
                    trendElement.style.color = '#ef4444';
                } else {
                    trendElement.style.color = ''; // Reset to default
                }
            }
        } else if (trendElement && history.length === 1) {
            // Première saisie
            trendElement.innerHTML = `
                <i class="fas fa-star"></i>
                <span>Première donnée enregistrée</span>
            `;
        }
    }
    
    // Créer la modal KPI
    const kpiModal = document.createElement('div');
    kpiModal.className = 'kpi-modal';
    kpiModal.id = 'kpiModal';
    kpiModal.innerHTML = `
        <div class="kpi-modal-overlay"></div>
        <div class="kpi-modal-container">
            <button class="kpi-modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="kpi-modal-content" id="kpiModalContent">
                <!-- Le contenu sera injecté ici -->
            </div>
        </div>
    `;
    document.body.appendChild(kpiModal);
    
    const kpiModalOverlay = kpiModal.querySelector('.kpi-modal-overlay');
    const kpiModalClose = kpiModal.querySelector('.kpi-modal-close');
    const kpiModalContent = kpiModal.querySelector('.kpi-modal-content');
    
    // Fonction pour ouvrir la modal KPI
    function openKPIModal(kpiId) {
        const config = KPI_CONFIG[kpiId];
        if (!config) return;
        
        const currentData = getKPIData(kpiId);
        const history = getKPIHistory(kpiId);
        const currentValue = config.calculation(currentData);
        const percentage = Math.round((currentValue / config.target) * 100);
        
        // Générer le HTML de la modal
        const modalHTML = `
            <div class="kpi-modal-header">
                <div class="kpi-modal-icon">
                    <i class="fas ${config.icon}"></i>
                </div>
                <div>
                    <h2 class="kpi-modal-title">${config.name}</h2>
                    <p class="kpi-modal-subtitle">Gestion et suivi des données</p>
                </div>
            </div>
            
            <!-- Description de l'indicateur -->
            <div class="kpi-description-section">
                <div class="kpi-description-icon">
                    <i class="fas fa-info-circle"></i>
                </div>
                <div class="kpi-description-content">
                    <h4 class="kpi-description-title">Pourquoi suivre cet indicateur ?</h4>
                    <p class="kpi-description-text">${config.description}</p>
                </div>
            </div>
            
            <div class="kpi-modal-body">
                <!-- Valeur actuelle -->
                <div class="kpi-current-section">
                    <div class="kpi-current-card">
                        <p class="kpi-current-label">Valeur actuelle</p>
                        <p class="kpi-current-value" id="currentValue">${config.formatValue(currentValue)}</p>
                        <div class="kpi-progress-bar">
                            <div class="kpi-progress-fill" style="width: ${Math.min(percentage, 100)}%"></div>
                        </div>
                        <p class="kpi-progress-text">${percentage}% de l'objectif (${config.formatValue(config.target)})</p>
                        
                        ${history.length >= 2 ? (() => {
                            const currentEntry = history[history.length - 1];
                            const previousEntry = history[history.length - 2];
                            const currentVal = parseFloat(currentEntry.calculatedValue);
                            const previousVal = parseFloat(previousEntry.calculatedValue);
                            const variation = ((currentVal - previousVal) / previousVal) * 100;
                            const isPositive = variation > 0;
                            
                            return `
                                <div class="kpi-variation ${isPositive ? 'positive' : 'negative'}">
                                    <i class="fas fa-arrow-${isPositive ? 'up' : 'down'}"></i>
                                    <span>${isPositive ? '+' : ''}${variation.toFixed(1)}% vs dernière saisie</span>
                                </div>
                            `;
                        })() : ''}
                    </div>
                    
                    ${history.length >= 2 ? `
                    <div class="kpi-stats-grid">
                        <div class="kpi-stat-card">
                            <i class="fas fa-chart-line"></i>
                            <div>
                                <p class="stat-label">Évolution totale</p>
                                <p class="stat-value ${history[history.length - 1].calculatedValue > history[0].calculatedValue ? 'positive' : 'negative'}">
                                    ${((history[history.length - 1].calculatedValue - history[0].calculatedValue) / history[0].calculatedValue * 100).toFixed(1)}%
                                </p>
                            </div>
                        </div>
                        <div class="kpi-stat-card">
                            <i class="fas fa-arrow-up"></i>
                            <div>
                                <p class="stat-label">Valeur max</p>
                                <p class="stat-value">${config.formatValue(Math.max(...history.map(h => h.calculatedValue)))}</p>
                            </div>
                        </div>
                        <div class="kpi-stat-card">
                            <i class="fas fa-arrow-down"></i>
                            <div>
                                <p class="stat-label">Valeur min</p>
                                <p class="stat-value">${config.formatValue(Math.min(...history.map(h => h.calculatedValue)))}</p>
                            </div>
                        </div>
                        <div class="kpi-stat-card">
                            <i class="fas fa-calendar"></i>
                            <div>
                                <p class="stat-label">Nb de saisies</p>
                                <p class="stat-value">${history.length}</p>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                </div>
                
                <!-- Formulaire de mise à jour -->
                <div class="kpi-form-section">
                    <h3 class="kpi-section-title">
                        <i class="fas fa-edit"></i>
                        METTRE À JOUR LES DONNÉES
                    </h3>
                    <form id="kpiForm" class="kpi-form">
                        ${config.fields.map(field => `
                            <div class="kpi-form-group">
                                <label for="${field.id}" class="kpi-form-label">${field.label}</label>
                                <input 
                                    type="${field.type}" 
                                    id="${field.id}" 
                                    name="${field.id}"
                                    class="kpi-form-input" 
                                    placeholder="${field.placeholder}"
                                    value="${currentData[field.id] || ''}"
                                    required
                                />
                            </div>
                        `).join('')}
                        
                        <div class="kpi-form-actions">
                            <button type="submit" class="kpi-btn-save">
                                <i class="fas fa-save"></i>
                                Enregistrer
                            </button>
                            <button type="button" class="kpi-btn-calculate" id="calculateBtn">
                                <i class="fas fa-calculator"></i>
                                Calculer
                            </button>
                        </div>
                        
                        <div class="kpi-preview" id="kpiPreview" style="display: none;">
                            <p class="kpi-preview-label">Nouvelle valeur calculée :</p>
                            <p class="kpi-preview-value" id="previewValue"></p>
                        </div>
                    </form>
                </div>
                
                <!-- Graphique d'évolution -->
                ${history.length > 1 ? `
                <div class="kpi-chart-section">
                    <h3 class="kpi-section-title">
                        <i class="fas fa-chart-line"></i>
                        ÉVOLUTION DANS LE TEMPS
                    </h3>
                    <div class="kpi-chart-container">
                        <canvas id="kpiChart" width="400" height="200"></canvas>
                    </div>
                    <div class="kpi-chart-stats">
                        <div class="chart-stat">
                            <span class="chart-stat-label">Tendance</span>
                            <span class="chart-stat-value ${history[history.length - 1].calculatedValue > history[0].calculatedValue ? 'positive' : 'negative'}">
                                ${history[history.length - 1].calculatedValue > history[0].calculatedValue ? '↗' : '↘'}
                                ${Math.abs(((history[history.length - 1].calculatedValue - history[0].calculatedValue) / history[0].calculatedValue) * 100).toFixed(1)}%
                            </span>
                        </div>
                        <div class="chart-stat">
                            <span class="chart-stat-label">Min</span>
                            <span class="chart-stat-value">${config.formatValue(Math.min(...history.map(h => h.calculatedValue)))}</span>
                        </div>
                        <div class="chart-stat">
                            <span class="chart-stat-label">Max</span>
                            <span class="chart-stat-value">${config.formatValue(Math.max(...history.map(h => h.calculatedValue)))}</span>
                        </div>
                        <div class="chart-stat">
                            <span class="chart-stat-label">Moyenne</span>
                            <span class="chart-stat-value">${config.formatValue((history.reduce((sum, h) => sum + parseFloat(h.calculatedValue), 0) / history.length).toFixed(1))}</span>
                        </div>
                    </div>
                </div>
                ` : ''}
                
                <!-- Historique -->
                <div class="kpi-history-section">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                        <h3 class="kpi-section-title" style="margin: 0;">
                            <i class="fas fa-history"></i>
                            HISTORIQUE DES MODIFICATIONS
                        </h3>
                        <div style="display: flex; gap: 8px;">
                            <button class="kpi-btn-export" onclick="exportKPIHistory('${kpiId}')">
                                <i class="fas fa-download"></i>
                                Exporter CSV
                            </button>
                            ${history.length > 0 ? `
                            <button class="kpi-btn-reset" onclick="resetKPIData('${kpiId}')">
                                <i class="fas fa-trash"></i>
                                Réinitialiser
                            </button>
                            ` : ''}
                        </div>
                    </div>
                    <div class="kpi-history-list" id="historyList">
                        ${history.length === 0 ? `
                            <div class="kpi-history-empty">
                                <i class="fas fa-inbox"></i>
                                <p>Aucune donnée enregistrée</p>
                            </div>
                        ` : history.reverse().map(entry => {
                            const date = new Date(entry.timestamp);
                            const formattedDate = date.toLocaleDateString('fr-FR', { 
                                day: '2-digit', 
                                month: 'short', 
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                            return `
                                <div class="kpi-history-item">
                                    <div class="kpi-history-header">
                                        <span class="kpi-history-date">${formattedDate}</span>
                                        <span class="kpi-history-value">${config.formatValue(entry.calculatedValue)}</span>
                                    </div>
                                    <div class="kpi-history-details">
                                        ${Object.entries(entry.data).map(([key, value]) => {
                                            const field = config.fields.find(f => f.id === key);
                                            return field ? `<span>${field.label}: ${value}</span>` : '';
                                        }).join(' • ')}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
        
        kpiModalContent.innerHTML = modalHTML;
        
        // Afficher la modal
        requestAnimationFrame(() => {
            kpiModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Ajouter les événements du formulaire
        setupFormEvents(kpiId);
        
        // Dessiner le graphique si historique
        if (history.length > 1) {
            setTimeout(() => drawChart(kpiId, history, config), 100);
        }
    }
    
    // Dessiner le graphique d'évolution
    function drawChart(kpiId, history, config) {
        const canvas = document.getElementById('kpiChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const padding = 40;
        
        // Préparer les données
        const values = history.map(h => parseFloat(h.calculatedValue));
        const maxValue = Math.max(...values, config.target);
        const minValue = Math.min(...values, 0);
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Fond
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, width, height);
        
        // Grille horizontale
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (height - 2 * padding) * (i / 5);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Ligne objectif
        const targetY = padding + (height - 2 * padding) * (1 - (config.target - minValue) / (maxValue - minValue));
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(padding, targetY);
        ctx.lineTo(width - padding, targetY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Label objectif
        ctx.fillStyle = '#fbbf24';
        ctx.font = '11px Space Mono';
        ctx.fillText(`Objectif: ${config.formatValue(config.target)}`, width - padding + 5, targetY + 4);
        
        // Dessiner la courbe
        const stepX = (width - 2 * padding) / (values.length - 1);
        
        ctx.strokeStyle = '#FF5500';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        values.forEach((value, index) => {
            const x = padding + index * stepX;
            const y = padding + (height - 2 * padding) * (1 - (value - minValue) / (maxValue - minValue));
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Dessiner les points
        ctx.fillStyle = '#FF5500';
        values.forEach((value, index) => {
            const x = padding + index * stepX;
            const y = padding + (height - 2 * padding) * (1 - (value - minValue) / (maxValue - minValue));
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Point actif (dernier)
            if (index === values.length - 1) {
                ctx.strokeStyle = '#4ade80';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.stroke();
            }
        });
        
        // Labels axes
        ctx.fillStyle = '#999';
        ctx.font = '11px Inter';
        ctx.fillText(config.formatValue(maxValue), 5, padding + 5);
        ctx.fillText(config.formatValue(minValue), 5, height - padding + 5);
    }
    
    // Configurer les événements du formulaire
    function setupFormEvents(kpiId) {
        const config = KPI_CONFIG[kpiId];
        const form = document.getElementById('kpiForm');
        const calculateBtn = document.getElementById('calculateBtn');
        const previewDiv = document.getElementById('kpiPreview');
        const previewValue = document.getElementById('previewValue');
        const currentValueDisplay = document.getElementById('currentValue');
        
        // Bouton calculer (preview)
        calculateBtn.addEventListener('click', () => {
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            const calculatedValue = config.calculation(data);
            const history = getKPIHistory(kpiId);
            
            // Afficher la valeur calculée
            let previewHTML = `
                <p class="kpi-preview-label">Nouvelle valeur calculée :</p>
                <p class="kpi-preview-value">${config.formatValue(calculatedValue)}</p>
            `;
            
            // Si historique existe, afficher la comparaison
            if (history.length > 0) {
                const lastValue = parseFloat(history[history.length - 1].calculatedValue);
                const variation = ((calculatedValue - lastValue) / lastValue) * 100;
                const isPositive = variation > 0;
                
                previewHTML += `
                    <div class="kpi-preview-comparison ${isPositive ? 'positive' : 'negative'}">
                        <i class="fas fa-arrow-${isPositive ? 'up' : 'down'}"></i>
                        <span>${isPositive ? '+' : ''}${variation.toFixed(1)}% vs dernière saisie (${config.formatValue(lastValue)})</span>
                    </div>
                `;
            }
            
            previewValue.parentElement.innerHTML = previewHTML;
            previewDiv.style.display = 'block';
        });
        
        // Soumission du formulaire
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Sauvegarder
            saveKPIData(kpiId, data);
            
            // Mettre à jour l'affichage dans la modal
            const newValue = config.calculation(data);
            currentValueDisplay.textContent = config.formatValue(newValue);
            
            // Mettre à jour la barre de progression
            const percentage = Math.round((newValue / config.target) * 100);
            const progressBar = document.querySelector('.kpi-current-section .kpi-progress-fill');
            if (progressBar) {
                progressBar.style.width = `${Math.min(percentage, 100)}%`;
            }
            const progressText = document.querySelector('.kpi-progress-text');
            if (progressText) {
                progressText.textContent = `${percentage}% de l'objectif (${config.formatValue(config.target)})`;
            }
            
            // Recharger l'historique
            const historyList = document.getElementById('historyList');
            const history = getKPIHistory(kpiId);
            historyList.innerHTML = history.reverse().map(entry => {
                const date = new Date(entry.timestamp);
                const formattedDate = date.toLocaleDateString('fr-FR', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                return `
                    <div class="kpi-history-item">
                        <div class="kpi-history-header">
                            <span class="kpi-history-date">${formattedDate}</span>
                            <span class="kpi-history-value">${config.formatValue(entry.calculatedValue)}</span>
                        </div>
                        <div class="kpi-history-details">
                            ${Object.entries(entry.data).map(([key, value]) => {
                                const field = config.fields.find(f => f.id === key);
                                return field ? `<span>${field.label}: ${value}</span>` : '';
                            }).join(' • ')}
                        </div>
                    </div>
                `;
            }).join('');
            
            // Notification succès
            showNotification('✓ Données enregistrées avec succès', 'success');
            
            // Masquer le preview
            previewDiv.style.display = 'none';
        });
    }
    
    // Fermer la modal KPI
    function closeKPIModal() {
        requestAnimationFrame(() => {
            kpiModal.classList.remove('active');
        });
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 250);
    }
    
    // Notification toast
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `kpi-notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Ajouter les événements de clic sur les cartes KPI
    kpiCards.forEach(card => {
        // Extraire l'ID du KPI depuis les classes
        const kpiId = Array.from(card.classList).find(cls => 
            cls !== 'kpi-card' && Object.keys(KPI_CONFIG).includes(cls)
        );
        
        if (kpiId && KPI_CONFIG[kpiId]) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                openKPIModal(kpiId);
            });
            
            // Ajouter un effet hover
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
                card.style.transition = 'transform 0.2s ease';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        }
    });
    
    // Événements de fermeture
    kpiModalClose.addEventListener('click', closeKPIModal);
    kpiModalOverlay.addEventListener('click', closeKPIModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && kpiModal.classList.contains('active')) {
            closeKPIModal();
        }
    });
    
    // Initialiser
    initStorage();
    
    // Charger et afficher les données au démarrage
    Object.keys(KPI_CONFIG).forEach(kpiId => {
        updateKPIDisplay(kpiId);
    });
    
    // Fonction de réinitialisation
    window.resetKPIData = function(kpiId) {
        const config = KPI_CONFIG[kpiId];
        
        if (!confirm(`Êtes-vous sûr de vouloir réinitialiser toutes les données de "${config.name}" ?\n\nCette action est irréversible et supprimera tout l'historique.`)) {
            return;
        }
        
        // Supprimer les données du KPI
        const allData = JSON.parse(localStorage.getItem('kpis_data') || '{}');
        delete allData[kpiId];
        localStorage.setItem('kpis_data', JSON.stringify(allData));
        
        // Supprimer l'historique du KPI
        const history = JSON.parse(localStorage.getItem('kpis_history') || '[]');
        const filteredHistory = history.filter(entry => entry.kpiId !== kpiId);
        localStorage.setItem('kpis_history', JSON.stringify(filteredHistory));
        
        // Mettre à jour l'affichage
        updateKPIDisplay(kpiId);
        
        // Fermer et réouvrir la modal pour rafraîchir
        closeKPIModal();
        setTimeout(() => {
            openKPIModal(kpiId);
        }, 300);
        
        showNotification('Données réinitialisées avec succès', 'success');
    };
    
    // Rendre la fonction d'export disponible globalement
    window.exportKPIHistory = function(kpiId) {
        const config = KPI_CONFIG[kpiId];
        const history = getKPIHistory(kpiId);
        
        if (history.length === 0) {
            showNotification('Aucune donnée à exporter', 'error');
            return;
        }
        
        // Préparer le CSV
        let csv = `Date,Heure,${config.fields.map(f => f.label).join(',')},Valeur Calculée\n`;
        
        history.forEach(entry => {
            const date = new Date(entry.timestamp);
            const dateStr = date.toLocaleDateString('fr-FR');
            const timeStr = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            
            const values = config.fields.map(f => entry.data[f.id] || '0').join(',');
            csv += `${dateStr},${timeStr},${values},${entry.calculatedValue}\n`;
        });
        
        // Télécharger
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `KPI_${config.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Export CSV réussi', 'success');
    };
});

