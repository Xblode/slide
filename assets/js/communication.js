// Système de gestion Communication & Contenus - BOOMKŒUR.EXE
// Gère : Contenus, Kanban, Calendrier, Historique, KPIs

class CommunicationManager {
    constructor() {
        this.contents = [];
        this.currentTab = 'list';
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.init();
    }

    init() {
        this.loadCommunicationData();
        this.checkAutoPublish();
        this.renderDashboard();
        this.renderList();
        this.renderKanban();
        this.renderCalendar();
        this.renderHistory();
        this.updateStats();
    }

    // Vérifier automatiquement si des contenus planifiés doivent passer en "publié"
    checkAutoPublish() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.contents.forEach(content => {
            // Si le contenu est "planifié" et que la date de publication est passée
            if (content.status === 'planifié' && content.scheduledDate) {
                const scheduledDate = new Date(content.scheduledDate);
                scheduledDate.setHours(0, 0, 0, 0);

                if (scheduledDate <= today) {
                    content.status = 'publié';
                    if (!content.publishedDate) {
                        content.publishedDate = content.scheduledDate;
                        content.publishedTime = content.scheduledTime || null;
                    }
                }
            }
        });

        this.saveCommunicationData();
    }

    // ============================================
    // CHARGEMENT DES DONNÉES
    // ============================================

    loadCommunicationData() {
        const savedContents = localStorage.getItem('communication_contents');

        if (savedContents) {
            this.contents = JSON.parse(savedContents);
        } else {
            // Données d'exemple
            this.contents = [
                {
                    id: 'content-1',
                    title: 'Annonce Événement Printemps 2026',
                    type: 'post',
                    channel: 'instagram',
                    pillar: 'evenements',
                    status: 'planifié',
                    caption: '🎪 GRANDE SOIRÉE PRINTEMPS 2026\n\nLine-up incroyable avec...',
                    hashtags: ['techno', 'rave', 'normandie', 'lehavre'],
                    scheduledDate: '2026-05-15',
                    scheduledTime: '19:00',
                    responsible: 'Blondy',
                    notes: 'Post principal pour l\'événement',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'content-2',
                    title: 'Reel Behind the Scenes',
                    type: 'reel',
                    channel: 'instagram',
                    pillar: 'behind-scenes',
                    status: 'design',
                    caption: 'Coulisses de notre dernier événement...',
                    hashtags: ['behindthescenes', 'techno'],
                    scheduledDate: null,
                    scheduledTime: null,
                    responsible: 'Blondy',
                    notes: 'En cours de montage',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'content-3',
                    title: 'Post Artiste Spotlight - DJ Flow',
                    type: 'post',
                    channel: 'instagram',
                    pillar: 'artistes',
                    status: 'écriture',
                    caption: '🎵 Découvrez notre artiste résident...',
                    hashtags: ['dj', 'techno', 'flow'],
                    scheduledDate: null,
                    scheduledTime: null,
                    responsible: 'Blondy',
                    notes: 'À rédiger',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'content-4',
                    title: 'Story Interactive - Sondage',
                    type: 'story',
                    channel: 'instagram',
                    pillar: 'communauté',
                    status: 'publié',
                    caption: 'Quel est votre style techno préféré ?',
                    hashtags: [],
                    publishedDate: '2025-12-10',
                    publishedTime: '18:00',
                    responsible: 'Blondy',
                    engagement: 450,
                    reach: 8500,
                    notes: 'Très bon engagement',
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveCommunicationData();
        }
    }

    saveCommunicationData() {
        localStorage.setItem('communication_contents', JSON.stringify(this.contents));
    }

    // ============================================
    // DASHBOARD COMMUNICATION
    // ============================================

    renderDashboard() {
        this.updateKPIs();
    }

    updateKPIs() {
        const today = new Date().toISOString().split('T')[0];
        const todayContents = this.contents.filter(c => 
            c.scheduledDate === today || c.publishedDate === today
        ).length;

        const publishedContents = this.contents.filter(c => c.status === 'publié');
        const avgEngagement = publishedContents.length > 0
            ? (publishedContents.reduce((sum, c) => sum + (c.engagement || 0), 0) / publishedContents.length / 100).toFixed(1) + '%'
            : '0%';

        const avgReach = publishedContents.length > 0
            ? Math.round(publishedContents.reduce((sum, c) => sum + (c.reach || 0), 0) / publishedContents.length / 1000) + 'K'
            : '0';

        const pendingValidation = this.contents.filter(c => 
            c.status === 'révision' || c.status === 'prêt'
        ).length;

        const totalPublished = publishedContents.length;
        const objectiveProgress = ((totalPublished / 500) * 100).toFixed(0);

        document.getElementById('kpi-today-publish').textContent = todayContents;
        document.getElementById('kpi-avg-engagement').textContent = avgEngagement;
        document.getElementById('kpi-avg-reach').textContent = avgReach;
        document.getElementById('kpi-pending-validation').textContent = pendingValidation;
        document.getElementById('kpi-objective-progress').textContent = objectiveProgress + '%';
    }

    // ============================================
    // NAVIGATION PAR ONGLETS
    // ============================================

    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Masquer tous les onglets
        document.querySelectorAll('.communication-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Afficher l'onglet sélectionné
        document.getElementById(`tab-${tabName}`).style.display = 'block';
        
        // Mettre à jour les boutons
        document.querySelectorAll('.communication-tab').forEach(btn => {
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

        // Re-render selon l'onglet
        if (tabName === 'list') this.renderList();
        else if (tabName === 'kanban') this.renderKanban();
        else if (tabName === 'calendar') this.renderCalendar();
        else if (tabName === 'history') this.renderHistory();
    }

    // ============================================
    // VUE LISTE DES CONTENUS
    // ============================================

    renderList() {
        const container = document.getElementById('contents-list');
        if (!container) return;

        let filteredContents = [...this.contents];

        // Filtre par statut (par défaut "idée")
        const statusFilter = document.getElementById('contents-list-filter-status')?.value || 'idée';
        if (statusFilter && statusFilter !== 'all') {
            filteredContents = filteredContents.filter(c => c.status === statusFilter);
        }

        // Tri par date de création (plus récent en premier)
        filteredContents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (filteredContents.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px; color: #666;">
                    <i class="fas fa-lightbulb" style="font-size: 64px; margin-bottom: 16px; opacity: 0.2;"></i>
                    <p>Aucun contenu trouvé</p>
                    <p style="font-size: 12px; margin-top: 8px;">Les contenus avec le statut sélectionné apparaîtront ici</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredContents.map(content => {
            const channelColors = {
                'instagram': '#E4405F',
                'tiktok': '#000000',
                'facebook': '#1877F2'
            };
            const channelColor = channelColors[content.channel] || '#666';
            
            const pillarLabels = {
                'evenements': 'Événements',
                'artistes': 'Artistes',
                'behind-scenes': 'BTS',
                'communauté': 'Communauté',
                'culture-rave': 'Culture'
            };
            const pillarLabel = pillarLabels[content.pillar] || content.pillar;

            const statusColors = {
                'idée': '#666',
                'écriture': '#fbbf24',
                'design': '#60a5fa',
                'révision': '#8b5cf6',
                'prêt': '#4ade80',
                'planifié': '#FF5500',
                'publié': '#4ade80',
                'analyse': '#a78bfa'
            };
            const statusColor = statusColors[content.status] || '#666';

            return `
                <div onclick="communicationManager.openContentDetail('${content.id}')" 
                     class="content-list-card"
                     style="background: #0a0a0a; border: 2px solid #333; padding: 24px; margin-bottom: 16px; border-radius: 4px; cursor: pointer; transition: all 0.3s ease; border-left: 4px solid ${statusColor};"
                     onmouseover="this.style.borderColor='${statusColor}'; this.style.background='#111';"
                     onmouseout="this.style.borderColor='#333'; this.style.background='#0a0a0a';">
                    <div style="display: flex; align-items: start; justify-content: space-between;">
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <h3 style="font-family: 'Oswald', sans-serif; font-size: 18px; color: white; margin: 0; text-transform: uppercase;">
                                    ${content.title}
                                </h3>
                                <span style="font-size: 11px; color: ${statusColor}; background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 4px; border: 1px solid ${statusColor}; text-transform: uppercase;">
                                    ${this.getStatusLabel(content.status)}
                                </span>
                                <span style="font-size: 11px; color: ${channelColor}; text-transform: uppercase;">
                                    <i class="fas ${this.getChannelIcon(content.channel)}" style="margin-right: 4px;"></i>${content.channel}
                                </span>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Type</p>
                                    <p style="font-size: 14px; color: white; margin: 0; text-transform: uppercase;">${content.type}</p>
                                </div>
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Pilier</p>
                                    <p style="font-size: 14px; color: white; margin: 0;">${pillarLabel}</p>
                                </div>
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">
                                        ${content.status === 'planifié' ? 'Date planifiée' : content.status === 'publié' ? 'Date publiée' : 'Date prévue'}
                                    </p>
                                    <p style="font-size: 14px; color: white; margin: 0;">
                                        ${content.status === 'publié' && content.publishedDate ? 
                                            new Date(content.publishedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) :
                                            content.scheduledDate ? 
                                                new Date(content.scheduledDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : 
                                                'Non planifié'}
                                        ${content.scheduledTime ? ' à ' + content.scheduledTime : ''}
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Responsable</p>
                                    <p style="font-size: 14px; color: white; margin: 0;">${content.responsible || 'N/A'}</p>
                                </div>
                            </div>
                            ${content.caption ? `
                                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #333;">
                                    <p style="font-size: 12px; color: #ccc; line-height: 1.6; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                        ${content.caption}
                                    </p>
                                </div>
                            ` : ''}
                            ${content.status === 'planifié' && content.scheduledDate ? `
                                <div style="margin-top: 12px; padding: 8px 12px; background: rgba(255, 85, 0, 0.1); border: 1px solid #FF5500; border-radius: 4px;">
                                    <span style="font-size: 11px; color: #FF5500;">
                                        <i class="fas fa-calendar-check" style="margin-right: 6px;"></i>
                                        Planifié le ${new Date(content.scheduledDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        ${content.scheduledTime ? ' à ' + content.scheduledTime : ''}
                                    </span>
                                </div>
                            ` : ''}
                            ${content.status === 'publié' && (content.publishedDate || content.scheduledDate) ? `
                                <div style="margin-top: 12px; padding: 8px 12px; background: rgba(74, 222, 128, 0.1); border: 1px solid #4ade80; border-radius: 4px;">
                                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: ${content.engagement || content.reach ? '8px' : '0'};">
                                        <span style="font-size: 11px; color: #4ade80;">
                                            <i class="fas fa-check-circle" style="margin-right: 6px;"></i>
                                            Publié le ${content.publishedDate ? 
                                                new Date(content.publishedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) :
                                                new Date(content.scheduledDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                    ${content.engagement || content.reach ? `
                                        <div style="display: flex; gap: 16px; padding-top: 8px; border-top: 1px solid rgba(74, 222, 128, 0.3);">
                                            ${content.engagement ? `
                                                <div>
                                                    <span style="font-size: 10px; color: #999; text-transform: uppercase;">Engagement</span>
                                                    <p style="font-size: 14px; color: #4ade80; font-weight: 700; margin: 2px 0 0 0; font-family: 'Oswald', sans-serif;">
                                                        ${content.engagement.toLocaleString()}
                                                    </p>
                                                </div>
                                            ` : ''}
                                            ${content.reach ? `
                                                <div>
                                                    <span style="font-size: 10px; color: #999; text-transform: uppercase;">Portée</span>
                                                    <p style="font-size: 14px; color: #60a5fa; font-weight: 700; margin: 2px 0 0 0; font-family: 'Oswald', sans-serif;">
                                                        ${content.reach.toLocaleString()}
                                                    </p>
                                                </div>
                                            ` : ''}
                                        </div>
                                    ` : ''}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    searchContentsList() {
        const searchTerm = document.getElementById('contents-list-search').value.toLowerCase();
        const allCards = document.querySelectorAll('.content-list-card');
        
        allCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            if (title.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterContentsList() {
        this.renderList();
    }

    // ============================================
    // TABLEAU KANBAN DES CONTENUS
    // ============================================

    renderKanban() {
        const container = document.getElementById('contents-kanban');
        if (!container) return;

        const stages = [
            { id: 'idée', name: '💡 IDÉE', color: '#666', icon: 'fa-lightbulb' },
            { id: 'écriture', name: '✍️ ÉCRITURE', color: '#fbbf24', icon: 'fa-pen' },
            { id: 'design', name: '🎨 DESIGN', color: '#60a5fa', icon: 'fa-palette' },
            { id: 'révision', name: '📝 RÉVISION', color: '#8b5cf6', icon: 'fa-eye' },
            { id: 'prêt', name: '✅ PRÊT', color: '#4ade80', icon: 'fa-check-circle' },
            { id: 'planifié', name: '📅 PLANIFIÉ', color: '#FF5500', icon: 'fa-calendar-check' },
            { id: 'publié', name: '🚀 PUBLIÉ', color: '#4ade80', icon: 'fa-rocket' },
            { id: 'analyse', name: '📊 ANALYSE', color: '#a78bfa', icon: 'fa-chart-bar' }
        ];

        container.innerHTML = stages.map(stage => {
            const stageContents = this.contents.filter(c => c.status === stage.id);
            
            return `
                <div class="kanban-column" data-stage="${stage.id}" style="background: #0a0a0a; border: 2px solid #333; border-radius: 4px; padding: 12px; min-height: 400px; min-width: 200px;">
                    <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #333;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <i class="fas ${stage.icon}" style="color: ${stage.color}; font-size: 14px;"></i>
                            <h3 style="font-family: 'Oswald', sans-serif; font-size: 12px; color: white; margin: 0; text-transform: uppercase;">
                                ${stage.name}
                            </h3>
                        </div>
                        <span style="font-size: 20px; color: ${stage.color}; font-weight: 700; font-family: 'Oswald', sans-serif;">
                            ${stageContents.length}
                        </span>
                    </div>
                    <div class="kanban-contents" data-stage="${stage.id}" style="min-height: 300px;">
                        ${stageContents.map(content => this.renderContentCard(content)).join('')}
                    </div>
                </div>
            `;
        }).join('');

        // Initialiser le drag & drop
        this.initDragAndDrop();
    }

    renderContentCard(content) {
        const channelColors = {
            'instagram': '#E4405F',
            'tiktok': '#000000',
            'facebook': '#1877F2'
        };
        const channelColor = channelColors[content.channel] || '#666';
        
        const pillarLabels = {
            'evenements': 'Événements',
            'artistes': 'Artistes',
            'behind-scenes': 'BTS',
            'communauté': 'Communauté',
            'culture-rave': 'Culture'
        };
        const pillarLabel = pillarLabels[content.pillar] || content.pillar;

        return `
            <div class="content-card" 
                 draggable="true" 
                 data-content-id="${content.id}"
                 style="background: #111; border: 2px solid #333; padding: 12px; margin-bottom: 8px; border-radius: 4px; cursor: move; transition: all 0.3s ease; border-left: 3px solid ${channelColor};"
                 onmouseover="this.style.borderColor='${channelColor}'; this.style.transform='translateY(-2px)';"
                 onmouseout="this.style.borderColor='#333'; this.style.transform='translateY(0)';"
                 onclick="communicationManager.openContentDetail('${content.id}')">
                <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 8px;">
                    <h4 style="font-family: 'Oswald', sans-serif; font-size: 12px; color: white; margin: 0; text-transform: uppercase; line-height: 1.2; flex: 1;">
                        ${content.title}
                    </h4>
                    <span style="font-size: 10px; color: ${channelColor}; background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 2px; text-transform: uppercase;">
                        ${content.type}
                    </span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                    <i class="fas ${this.getChannelIcon(content.channel)}" style="color: ${channelColor}; font-size: 10px;"></i>
                    <span style="font-size: 10px; color: #999; text-transform: uppercase;">${content.channel}</span>
                    <span style="font-size: 10px; color: #666;">•</span>
                    <span style="font-size: 10px; color: #999;">${pillarLabel}</span>
                </div>
                ${content.status === 'planifié' && content.scheduledDate ? `
                    <p style="font-size: 9px; color: #FF5500; margin: 4px 0 0 0;">
                        <i class="fas fa-calendar-check" style="margin-right: 4px;"></i>
                        Planifié le ${new Date(content.scheduledDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                        ${content.scheduledTime ? ' à ' + content.scheduledTime : ''}
                    </p>
                ` : ''}
                ${content.status === 'publié' && content.publishedDate ? `
                    <div style="margin-top: 6px; padding: 4px 8px; background: rgba(74, 222, 128, 0.1); border: 1px solid #4ade80; border-radius: 2px;">
                        <span style="font-size: 9px; color: #4ade80;">Publié le ${new Date(content.publishedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                ` : content.status === 'publié' && content.scheduledDate ? `
                    <div style="margin-top: 6px; padding: 4px 8px; background: rgba(74, 222, 128, 0.1); border: 1px solid #4ade80; border-radius: 2px;">
                        <span style="font-size: 9px; color: #4ade80;">Publié le ${new Date(content.scheduledDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                ` : ''}
            </div>
        `;
    }

    getChannelIcon(channel) {
        const icons = {
            'instagram': 'fa-instagram',
            'tiktok': 'fa-music',
            'facebook': 'fa-facebook'
        };
        return icons[channel] || 'fa-share-alt';
    }

    initDragAndDrop() {
        const contentCards = document.querySelectorAll('.content-card');
        const kanbanColumns = document.querySelectorAll('.kanban-column');

        contentCards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('content-id', card.dataset.contentId);
                card.style.opacity = '0.5';
            });

            card.addEventListener('dragend', (e) => {
                card.style.opacity = '1';
            });
        });

        kanbanColumns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                const contentsContainer = column.querySelector('.kanban-contents');
                if (contentsContainer) {
                    contentsContainer.style.background = 'rgba(255, 85, 0, 0.1)';
                }
            });

            column.addEventListener('dragleave', (e) => {
                const contentsContainer = column.querySelector('.kanban-contents');
                if (contentsContainer) {
                    contentsContainer.style.background = 'transparent';
                }
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                const contentsContainer = column.querySelector('.kanban-contents');
                if (contentsContainer) {
                    contentsContainer.style.background = 'transparent';
                }

                const contentId = e.dataTransfer.getData('content-id');
                const newStatus = column.dataset.stage;
                
                this.moveContentToStatus(contentId, newStatus);
            });
        });
    }

    moveContentToStatus(contentId, newStatus) {
        const content = this.contents.find(c => c.id === contentId);
        if (content) {
            content.status = newStatus;
            this.saveCommunicationData();
            this.renderKanban();
            this.updateStats();
        }
    }

    // ============================================
    // GESTION DES CONTENUS
    // ============================================

    openNewContentModal() {
        const modal = document.getElementById('modal-new-content');
        if (modal) {
            modal.style.display = 'flex';
            this.renderContentForm();
        }
    }

    closeNewContentModal() {
        const modal = document.getElementById('modal-new-content');
        if (modal) modal.style.display = 'none';
    }

    renderContentForm(content = null) {
        const container = document.getElementById('content-form-container');
        if (!container) return;

        container.innerHTML = `
            <form id="content-form">
                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Titre du contenu *</label>
                    <input type="text" class="form-input" id="content-title" value="${content?.title || ''}" placeholder="Ex: Annonce Événement Printemps 2026" required>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Type de contenu *</label>
                        <select class="form-input" id="content-type" required>
                            <option value="post" ${content?.type === 'post' ? 'selected' : ''}>Post</option>
                            <option value="story" ${content?.type === 'story' ? 'selected' : ''}>Story</option>
                            <option value="reel" ${content?.type === 'reel' ? 'selected' : ''}>Reel</option>
                            <option value="tiktok" ${content?.type === 'tiktok' ? 'selected' : ''}>TikTok</option>
                            <option value="carousel" ${content?.type === 'carousel' ? 'selected' : ''}>Carousel</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Canal *</label>
                        <select class="form-input" id="content-channel" required>
                            <option value="instagram" ${content?.channel === 'instagram' ? 'selected' : ''}>Instagram</option>
                            <option value="tiktok" ${content?.channel === 'tiktok' ? 'selected' : ''}>TikTok</option>
                            <option value="facebook" ${content?.channel === 'facebook' ? 'selected' : ''}>Facebook</option>
                        </select>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Pilier éditorial *</label>
                        <select class="form-input" id="content-pillar" required>
                            <option value="evenements" ${content?.pillar === 'evenements' ? 'selected' : ''}>Événements (40%)</option>
                            <option value="artistes" ${content?.pillar === 'artistes' ? 'selected' : ''}>Artistes (25%)</option>
                            <option value="behind-scenes" ${content?.pillar === 'behind-scenes' ? 'selected' : ''}>Behind the Scenes (15%)</option>
                            <option value="communauté" ${content?.pillar === 'communauté' ? 'selected' : ''}>Communauté (12%)</option>
                            <option value="culture-rave" ${content?.pillar === 'culture-rave' ? 'selected' : ''}>Culture Rave (8%)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Statut *</label>
                        <select class="form-input" id="content-status" required>
                            <option value="idée" ${content?.status === 'idée' ? 'selected' : ''}>💡 Idée</option>
                            <option value="écriture" ${content?.status === 'écriture' ? 'selected' : ''}>✍️ Écriture</option>
                            <option value="design" ${content?.status === 'design' ? 'selected' : ''}>🎨 Design</option>
                            <option value="révision" ${content?.status === 'révision' ? 'selected' : ''}>📝 Révision</option>
                            <option value="prêt" ${content?.status === 'prêt' ? 'selected' : ''}>✅ Prêt</option>
                            <option value="planifié" ${content?.status === 'planifié' ? 'selected' : ''}>📅 Planifié</option>
                            <option value="publié" ${content?.status === 'publié' ? 'selected' : ''}>🚀 Publié</option>
                            <option value="analyse" ${content?.status === 'analyse' ? 'selected' : ''}>📊 Analyse</option>
                        </select>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Date de publication prévue</label>
                        <input type="date" class="form-input" id="content-scheduled-date" value="${content?.scheduledDate || ''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Heure de publication</label>
                        <input type="time" class="form-input" id="content-scheduled-time" value="${content?.scheduledTime || ''}">
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Caption / Texte</label>
                    <textarea class="form-textarea" id="content-caption" rows="6" placeholder="Rédigez votre caption ici...">${content?.caption || ''}</textarea>
                    <p style="font-size: 11px; color: #999; margin-top: 4px;">Longueur optimale : 125-150 caractères pour Instagram</p>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Hashtags (séparés par des virgules)</label>
                    <input type="text" class="form-input" id="content-hashtags" value="${content?.hashtags ? content.hashtags.join(', ') : ''}" placeholder="techno, rave, normandie, lehavre">
                    <p style="font-size: 11px; color: #999; margin-top: 4px;">Recommandé : 5-10 hashtags par post</p>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Responsable</label>
                    <input type="text" class="form-input" id="content-responsible" value="${content?.responsible || 'Blondy'}" placeholder="Ex: Blondy">
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Notes</label>
                    <textarea class="form-textarea" id="content-notes" rows="3" placeholder="Notes internes sur le contenu...">${content?.notes || ''}</textarea>
                </div>

                <!-- Section Performance (visible uniquement si statut = publié ou analyse) -->
                <div id="performance-section" style="display: ${content?.status === 'publié' || content?.status === 'analyse' ? 'block' : 'none'}; margin-bottom: 20px; padding: 20px; background: rgba(255, 85, 0, 0.05); border: 2px solid rgba(255, 85, 0, 0.3); border-radius: 4px;">
                    <h3 style="font-family: 'Oswald', sans-serif; font-size: 14px; color: #FF5500; margin: 0 0 16px 0; text-transform: uppercase;">
                        <i class="fas fa-chart-line" style="margin-right: 8px;"></i>Performance Post-Publication
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="form-label">Engagement</label>
                            <input type="number" class="form-input" id="content-engagement" value="${content?.engagement || ''}" placeholder="Ex: 450" min="0">
                            <p style="font-size: 11px; color: #999; margin-top: 4px;">Nombre total d'interactions (likes, commentaires, partages)</p>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Portée</label>
                            <input type="number" class="form-input" id="content-reach" value="${content?.reach || ''}" placeholder="Ex: 8500" min="0">
                            <p style="font-size: 11px; color: #999; margin-top: 4px;">Nombre de personnes ayant vu le contenu</p>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-cancel" onclick="communicationManager.closeNewContentModal()">Annuler</button>
                    <button type="submit" class="btn-save">${content ? 'Modifier' : 'Créer'} le contenu</button>
                </div>
            </form>
        `;

        const form = document.getElementById('content-form');
        if (form) {
            form.addEventListener('submit', (e) => this.saveContent(e, content));
        }

        // Afficher/masquer la section performance selon le statut
        const statusSelect = document.getElementById('content-status');
        const performanceSection = document.getElementById('performance-section');
        
        if (statusSelect && performanceSection) {
            statusSelect.addEventListener('change', (e) => {
                const status = e.target.value;
                if (status === 'publié' || status === 'analyse') {
                    performanceSection.style.display = 'block';
                } else {
                    performanceSection.style.display = 'none';
                }
            });
        }
    }

    saveContent(e, content) {
        e.preventDefault();

        const hashtags = document.getElementById('content-hashtags').value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        const status = document.getElementById('content-status').value;
        const engagementInput = document.getElementById('content-engagement');
        const reachInput = document.getElementById('content-reach');

        const newContent = {
            id: content?.id || 'content-' + Date.now(),
            title: document.getElementById('content-title').value,
            type: document.getElementById('content-type').value,
            channel: document.getElementById('content-channel').value,
            pillar: document.getElementById('content-pillar').value,
            status: status,
            caption: document.getElementById('content-caption').value,
            hashtags: hashtags,
            scheduledDate: document.getElementById('content-scheduled-date').value || null,
            scheduledTime: document.getElementById('content-scheduled-time').value || null,
            responsible: document.getElementById('content-responsible').value,
            notes: document.getElementById('content-notes').value,
            createdAt: content?.createdAt || new Date().toISOString(),
            publishedDate: content?.publishedDate || null,
            publishedTime: content?.publishedTime || null,
            engagement: (status === 'publié' || status === 'analyse') && engagementInput?.value ? parseInt(engagementInput.value) : (content?.engagement || null),
            reach: (status === 'publié' || status === 'analyse') && reachInput?.value ? parseInt(reachInput.value) : (content?.reach || null)
        };

        // Si le statut passe à "publié" et qu'il n'y a pas de date de publication, utiliser la date planifiée
        if (status === 'publié' && !newContent.publishedDate && newContent.scheduledDate) {
            newContent.publishedDate = newContent.scheduledDate;
            newContent.publishedTime = newContent.scheduledTime;
        }

        if (content) {
            const index = this.contents.findIndex(c => c.id === content.id);
            if (index !== -1) {
                this.contents[index] = newContent;
            }
        } else {
            this.contents.push(newContent);
        }

        this.saveCommunicationData();
        this.renderList();
        this.renderKanban();
        this.renderCalendar();
        this.renderHistory();
        this.updateStats();
        this.closeNewContentModal();
    }

    openContentDetail(contentId) {
        const content = this.contents.find(c => c.id === contentId);
        if (!content) return;

        const modal = document.getElementById('modal-content-detail');
        const container = document.getElementById('content-detail-container');
        const title = document.getElementById('content-detail-title');
        
        if (!modal || !container) return;

        title.textContent = content.title;
        
        const channelColors = {
            'instagram': '#E4405F',
            'tiktok': '#000000',
            'facebook': '#1877F2'
        };
        const channelColor = channelColors[content.channel] || '#666';

        const pillarLabels = {
            'evenements': 'Événements',
            'artistes': 'Artistes',
            'behind-scenes': 'Behind the Scenes',
            'communauté': 'Communauté',
            'culture-rave': 'Culture Rave'
        };

        container.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px;">
                    <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 16px 0; text-transform: uppercase;">
                        Informations
                    </h3>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Type</p>
                            <p style="font-size: 14px; color: white; margin: 0; text-transform: uppercase;">${content.type}</p>
                        </div>
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Canal</p>
                            <p style="font-size: 14px; color: ${channelColor}; margin: 0; text-transform: uppercase;">
                                <i class="fas ${this.getChannelIcon(content.channel)}" style="margin-right: 6px;"></i>${content.channel}
                            </p>
                        </div>
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Pilier éditorial</p>
                            <p style="font-size: 14px; color: white; margin: 0;">${pillarLabels[content.pillar] || content.pillar}</p>
                        </div>
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Statut</p>
                            <span style="font-size: 12px; color: #FF5500; text-transform: uppercase; background: rgba(255, 85, 0, 0.1); padding: 4px 8px; border-radius: 4px; border: 1px solid #FF5500;">
                                ${this.getStatusLabel(content.status)}
                            </span>
                        </div>
                        <div>
                            <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Responsable</p>
                            <p style="font-size: 14px; color: white; margin: 0;">${content.responsible || 'N/A'}</p>
                        </div>
                        ${content.status === 'planifié' && content.scheduledDate ? `
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Date planifiée</p>
                                <p style="font-size: 14px; color: #FF5500; margin: 0;">
                                    ${new Date(content.scheduledDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    ${content.scheduledTime ? ' à ' + content.scheduledTime : ''}
                                </p>
                            </div>
                        ` : ''}
                        ${content.status === 'publié' && (content.publishedDate || content.scheduledDate) ? `
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Date publiée</p>
                                <p style="font-size: 14px; color: #4ade80; margin: 0;">
                                    ${content.publishedDate ? 
                                        new Date(content.publishedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) :
                                        new Date(content.scheduledDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    ${content.publishedTime || content.scheduledTime ? ' à ' + (content.publishedTime || content.scheduledTime) : ''}
                                </p>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0; text-transform: uppercase;">
                            Performance
                        </h3>
                        ${content.status === 'publié' || content.status === 'analyse' ? `
                            <button onclick="communicationManager.editPerformance('${contentId}')" 
                                    style="background: transparent; border: 1px solid #FF5500; color: #FF5500; padding: 8px 16px; font-size: 11px; text-transform: uppercase; cursor: pointer; font-weight: 600;">
                                <i class="fas fa-edit" style="margin-right: 6px;"></i>Modifier
                            </button>
                        ` : ''}
                    </div>
                    ${content.status === 'publié' || content.status === 'analyse' ? `
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Engagement</p>
                                <p style="font-size: 24px; color: #4ade80; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                    ${content.engagement ? content.engagement.toLocaleString() : 'Non renseigné'}
                                </p>
                            </div>
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Portée</p>
                                <p style="font-size: 24px; color: #60a5fa; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                    ${content.reach ? content.reach.toLocaleString() : 'Non renseigné'}
                                </p>
                            </div>
                        </div>
                        ${content.engagement && content.reach ? `
                            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #333;">
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Taux d'engagement</p>
                                <p style="font-size: 18px; color: #fbbf24; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                    ${((content.engagement / content.reach) * 100).toFixed(2)}%
                                </p>
                            </div>
                        ` : ''}
                    ` : `
                        <p style="font-size: 13px; color: #666; margin: 0;">Les performances seront disponibles après publication</p>
                    `}
                </div>
            </div>

            ${content.caption ? `
                <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px; margin-bottom: 24px;">
                    <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 12px 0; text-transform: uppercase;">
                        Caption
                    </h3>
                    <p style="font-size: 13px; color: #ccc; line-height: 1.8; margin: 0; white-space: pre-wrap;">${content.caption}</p>
                </div>
            ` : ''}

            ${content.hashtags && content.hashtags.length > 0 ? `
                <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px; margin-bottom: 24px;">
                    <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 12px 0; text-transform: uppercase;">
                        Hashtags
                    </h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${content.hashtags.map(tag => `
                            <span style="font-size: 12px; color: #FF5500; background: rgba(255, 85, 0, 0.1); padding: 6px 12px; border-radius: 4px; border: 1px solid #FF5500;">
                                #${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${content.notes ? `
                <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px; margin-bottom: 24px;">
                    <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 12px 0; text-transform: uppercase;">
                        Notes
                    </h3>
                    <p style="font-size: 13px; color: #ccc; line-height: 1.6; margin: 0;">${content.notes}</p>
                </div>
            ` : ''}

            <div style="display: flex; gap: 12px;">
                <button onclick="communicationManager.editContent('${contentId}')" 
                        style="background: #FF5500; color: white; border: none; padding: 12px 24px; font-size: 13px; text-transform: uppercase; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-edit"></i> Modifier
                </button>
                <button onclick="communicationManager.deleteContent('${contentId}')" 
                        style="background: transparent; border: 2px solid #ef4444; color: #ef4444; padding: 12px 24px; font-size: 13px; text-transform: uppercase; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-trash"></i> Supprimer
                </button>
            </div>
        `;

        modal.style.display = 'flex';
    }

    closeContentDetailModal() {
        const modal = document.getElementById('modal-content-detail');
        if (modal) modal.style.display = 'none';
    }

    editContent(contentId) {
        const content = this.contents.find(c => c.id === contentId);
        if (content) {
            this.closeContentDetailModal();
            this.openNewContentModal();
            this.renderContentForm(content);
        }
    }

    deleteContent(contentId) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce contenu ? Cette action est irréversible.')) {
            return;
        }

        const index = this.contents.findIndex(c => c.id === contentId);
        if (index !== -1) {
            this.contents.splice(index, 1);
            this.saveCommunicationData();
            this.renderList();
            this.renderKanban();
            this.renderCalendar();
            this.renderHistory();
            this.updateStats();
            this.closeContentDetailModal();
        }
    }

    editPerformance(contentId) {
        const content = this.contents.find(c => c.id === contentId);
        if (content) {
            this.closeContentDetailModal();
            this.openNewContentModal();
            this.renderContentForm(content);
            // Scroll vers la section performance
            setTimeout(() => {
                const performanceSection = document.getElementById('performance-section');
                if (performanceSection) {
                    performanceSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    performanceSection.style.borderColor = '#FF5500';
                    setTimeout(() => {
                        performanceSection.style.borderColor = 'rgba(255, 85, 0, 0.3)';
                    }, 2000);
                }
            }, 300);
        }
    }

    getStatusLabel(status) {
        const labels = {
            'idée': '💡 Idée',
            'écriture': '✍️ Écriture',
            'design': '🎨 Design',
            'révision': '📝 Révision',
            'prêt': '✅ Prêt',
            'planifié': '📅 Planifié',
            'publié': '🚀 Publié',
            'analyse': '📊 Analyse'
        };
        return labels[status] || status;
    }

    searchContents() {
        const searchTerm = document.getElementById('contents-search').value.toLowerCase();
        const allCards = document.querySelectorAll('.content-card');
        
        allCards.forEach(card => {
            const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
            if (title.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // ============================================
    // CALENDRIER ÉDITORIAL
    // ============================================

    renderCalendar() {
        const container = document.getElementById('editorial-calendar');
        if (!container) return;

        const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const currentDate = new Date(this.currentYear, this.currentMonth, 1);
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const firstDay = currentDate.getDay();
        const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        document.getElementById('calendar-month-year').textContent = 
            `${monthNames[this.currentMonth]} ${this.currentYear}`;

        // Récupérer les contenus planifiés pour ce mois
        const monthContents = this.contents.filter(c => {
            if (!c.scheduledDate) return false;
            const contentDate = new Date(c.scheduledDate);
            return contentDate.getMonth() === this.currentMonth && 
                   contentDate.getFullYear() === this.currentYear;
        });

        // Grouper par jour
        const contentsByDay = {};
        monthContents.forEach(content => {
            const day = new Date(content.scheduledDate).getDate();
            if (!contentsByDay[day]) {
                contentsByDay[day] = [];
            }
            contentsByDay[day].push(content);
        });

        let calendarHTML = `
            <div style="background: #0a0a0a; border: 2px solid #333; border-radius: 4px; padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-bottom: 16px;">
                    ${dayNames.map(dayName => `
                        <div style="text-align: center; padding: 12px; background: #111; border: 1px solid #333; font-size: 11px; color: #999; text-transform: uppercase; font-weight: 600;">
                            ${dayName}
                        </div>
                    `).join('')}
                </div>
                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px;">
        `;

        // Jours vides au début
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div style="padding: 12px; background: #0a0a0a; min-height: 100px;"></div>';
        }

        // Jours du mois
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today.getDate() && 
                          this.currentMonth === today.getMonth() && 
                          this.currentYear === today.getFullYear();
            const dayContents = contentsByDay[day] || [];

            calendarHTML += `
                <div style="padding: 12px; background: ${isToday ? 'rgba(255, 85, 0, 0.1)' : '#0a0a0a'}; border: 2px solid ${isToday ? '#FF5500' : '#333'}; border-radius: 4px; min-height: 100px; cursor: pointer; transition: all 0.3s ease;"
                     onmouseover="this.style.borderColor='#FF5500'; this.style.background='#111';"
                     onmouseout="this.style.borderColor='${isToday ? '#FF5500' : '#333'}'; this.style.background='${isToday ? 'rgba(255, 85, 0, 0.1)' : '#0a0a0a'}'"
                     onclick="communicationManager.openDayContents(${day}, ${this.currentMonth}, ${this.currentYear})">
                    <div style="font-size: 14px; color: ${isToday ? '#FF5500' : 'white'}; font-weight: 600; margin-bottom: 8px;">
                        ${day}
                    </div>
                    ${dayContents.map(content => {
                        const channelColors = {
                            'instagram': '#E4405F',
                            'tiktok': '#000000',
                            'facebook': '#1877F2'
                        };
                        const color = channelColors[content.channel] || '#666';
                        return `
                            <div style="font-size: 10px; color: ${color}; background: rgba(0,0,0,0.3); padding: 4px 6px; border-radius: 2px; margin-bottom: 4px; border-left: 2px solid ${color}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                                 title="${content.title}">
                                ${content.scheduledTime || ''} ${content.type}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        calendarHTML += `
                </div>
            </div>
        `;

        container.innerHTML = calendarHTML;
    }

    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendar();
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    }

    todayMonth() {
        const today = new Date();
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();
        this.renderCalendar();
    }

    openDayContents(day, month, year) {
        const date = new Date(year, month, day);
        const dateString = date.toISOString().split('T')[0];
        const dayContents = this.contents.filter(c => c.scheduledDate === dateString);

        if (dayContents.length === 0) {
            alert(`Aucun contenu planifié pour le ${day}/${month + 1}/${year}`);
            return;
        }

        const contentsList = dayContents.map(c => `• ${c.title} (${c.type})`).join('\n');
        alert(`Contenus planifiés le ${day}/${month + 1}/${year}:\n\n${contentsList}`);
    }

    // ============================================
    // HISTORIQUE DES CONTENUS PUBLIÉS
    // ============================================

    renderHistory() {
        this.filterHistory();
    }

    filterHistory() {
        const channelFilter = document.getElementById('history-filter-channel')?.value || 'all';
        const typeFilter = document.getElementById('history-filter-type')?.value || 'all';

        let filteredContents = this.contents.filter(c => c.status === 'publié');

        if (channelFilter !== 'all') {
            filteredContents = filteredContents.filter(c => c.channel === channelFilter);
        }

        if (typeFilter !== 'all') {
            filteredContents = filteredContents.filter(c => c.type === typeFilter);
        }

        // Trier par date de publication (plus récent en premier)
        filteredContents.sort((a, b) => {
            const dateA = new Date(a.publishedDate || a.scheduledDate || 0);
            const dateB = new Date(b.publishedDate || b.scheduledDate || 0);
            return dateB - dateA;
        });

        const container = document.getElementById('contents-history');
        if (!container) return;

        if (filteredContents.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px; color: #666;">
                    <i class="fas fa-history" style="font-size: 64px; margin-bottom: 16px; opacity: 0.2;"></i>
                    <p>Aucun contenu publié</p>
                    <p style="font-size: 12px; margin-top: 8px;">Les contenus publiés apparaîtront ici</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredContents.map(content => {
            const channelColors = {
                'instagram': '#E4405F',
                'tiktok': '#000000',
                'facebook': '#1877F2'
            };
            const channelColor = channelColors[content.channel] || '#666';

            const pillarLabels = {
                'evenements': 'Événements',
                'artistes': 'Artistes',
                'behind-scenes': 'BTS',
                'communauté': 'Communauté',
                'culture-rave': 'Culture'
            };

            return `
                <div class="history-content-card" 
                     style="background: #0a0a0a; border: 2px solid #333; padding: 24px; margin-bottom: 16px; border-radius: 4px; border-left: 4px solid ${channelColor}; transition: all 0.3s ease; cursor: pointer;"
                     onmouseover="this.style.borderColor='${channelColor}'; this.style.background='#111';"
                     onmouseout="this.style.borderColor='#333'; this.style.background='#0a0a0a';"
                     onclick="communicationManager.openContentDetail('${content.id}')">
                    <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 16px;">
                        <div style="flex: 1;">
                            <h3 style="font-family: 'Oswald', sans-serif; font-size: 18px; color: white; margin: 0 0 8px 0; text-transform: uppercase;">
                                ${content.title}
                            </h3>
                            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                                <span style="font-size: 11px; color: ${channelColor}; text-transform: uppercase; background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 4px; border: 1px solid ${channelColor};">
                                    <i class="fas ${this.getChannelIcon(content.channel)}" style="margin-right: 4px;"></i>${content.channel}
                                </span>
                                <span style="font-size: 11px; color: #999; text-transform: uppercase;">
                                    ${content.type}
                                </span>
                                <span style="font-size: 11px; color: #666;">
                                    ${pillarLabels[content.pillar] || content.pillar}
                                </span>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <p style="font-size: 12px; color: #999; margin: 0 0 4px 0;">
                                Publié le ${content.publishedDate ? new Date(content.publishedDate).toLocaleDateString('fr-FR') : 'N/A'}
                            </p>
                            ${content.publishedTime ? `
                                <p style="font-size: 11px; color: #666; margin: 0;">
                                    à ${content.publishedTime}
                                </p>
                            ` : ''}
                        </div>
                    </div>
                    
                    ${content.caption ? `
                        <p style="font-size: 12px; color: #ccc; line-height: 1.6; margin: 0 0 12px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                            ${content.caption}
                        </p>
                    ` : ''}

                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #333;">
                        ${content.engagement ? `
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Engagement</p>
                                <p style="font-size: 18px; color: #4ade80; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                    ${content.engagement}
                                </p>
                            </div>
                        ` : '<div></div>'}
                        ${content.reach ? `
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Portée</p>
                                <p style="font-size: 18px; color: #60a5fa; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                    ${content.reach.toLocaleString()}
                                </p>
                            </div>
                        ` : '<div></div>'}
                        ${content.hashtags && content.hashtags.length > 0 ? `
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Hashtags</p>
                                <p style="font-size: 14px; color: #FF5500; font-weight: 600; margin: 0;">
                                    ${content.hashtags.length}
                                </p>
                            </div>
                        ` : '<div></div>'}
                    </div>
                </div>
            `;
        }).join('');
    }

    // ============================================
    // STATISTIQUES
    // ============================================

    updateStats() {
        const totalContents = this.contents.length;
        const publishedContents = this.contents.filter(c => c.status === 'publié').length;
        const plannedContents = this.contents.filter(c => c.status === 'planifié').length;

        document.getElementById('contents-total-count').textContent = totalContents;
        document.getElementById('contents-published-count').textContent = publishedContents;
        document.getElementById('contents-planned-count').textContent = plannedContents;
        this.updateKPIs();
    }
}

// Initialiser le gestionnaire communication
let communicationManager;
document.addEventListener('DOMContentLoaded', () => {
    communicationManager = new CommunicationManager();
    
    // Rendre accessible globalement
    window.communicationManager = communicationManager;
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

