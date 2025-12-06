// Système de gestion Événements - BOOMKŒUR.EXE
// Gère : Événements, Dashboard, Liste, Calendrier, Kanban, Fiches complètes, Checklists

class EvenementsManager {
    constructor() {
        this.events = [];
        this.currentTab = 'list';
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.init();
    }

    init() {
        this.loadEventsData();
        this.renderDashboard();
        this.renderList();
        this.renderCalendar();
        this.renderKanban();
        this.updateStats();
    }

    // ============================================
    // CHARGEMENT DES DONNÉES
    // ============================================

    loadEventsData() {
        const savedEvents = localStorage.getItem('evenements_events');

        if (savedEvents) {
            this.events = JSON.parse(savedEvents);
        } else {
            // Données d'exemple
            this.events = [
                {
                    id: 'event-1',
                    name: 'Boomkœur Printemps 2026',
                    type: 'soirée',
                    status: 'confirmé',
                    startDate: '2026-05-15',
                    endDate: '2026-05-15',
                    startTime: '22:00',
                    endTime: '06:00',
                    venue: {
                        name: 'Le Havre - Salle principale',
                        address: '123 Rue Example, Le Havre',
                        capacity: 500
                    },
                    ticketPrice: {
                        earlyBird: 15,
                        standard: 20,
                        onSite: 25
                    },
                    lineUp: [
                        { artist: 'DJ Resident 1', type: 'résident', startTime: '22:00', endTime: '00:00' },
                        { artist: 'DJ Confirmé', type: 'confirmé', startTime: '00:00', endTime: '03:00' },
                        { artist: 'DJ Headliner', type: 'headliner', startTime: '03:00', endTime: '06:00' }
                    ],
                    budget: {
                        total: 8000,
                        artists: 3000,
                        venue: 2000,
                        sound: 1500,
                        light: 1000,
                        communication: 500
                    },
                    responsible: 'Benjamin',
                    notes: 'Grand événement printemps',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'event-2',
                    name: 'Boomkœur Summer Festival',
                    type: 'festival',
                    status: 'en préparation',
                    startDate: '2026-07-20',
                    endDate: '2026-07-22',
                    startTime: '18:00',
                    endTime: '06:00',
                    venue: {
                        name: 'Parc des Expositions',
                        address: 'Le Havre',
                        capacity: 2000
                    },
                    ticketPrice: {
                        earlyBird: 45,
                        standard: 60,
                        onSite: 75
                    },
                    lineUp: [],
                    budget: {
                        total: 25000,
                        artists: 12000,
                        venue: 5000,
                        sound: 3000,
                        light: 2000,
                        communication: 2000,
                        security: 1000
                    },
                    responsible: 'Benjamin',
                    notes: 'Festival multi-jours',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'event-3',
                    name: 'Boomkœur Résidence - DJ Flow',
                    type: 'résidence',
                    status: 'idée',
                    startDate: '2026-06-10',
                    endDate: '2026-06-10',
                    startTime: '22:00',
                    endTime: '06:00',
                    venue: {
                        name: 'Lieu à définir',
                        address: '',
                        capacity: 300
                    },
                    ticketPrice: {
                        earlyBird: 12,
                        standard: 15,
                        onSite: 18
                    },
                    lineUp: [
                        { artist: 'DJ Flow', type: 'résident', startTime: '22:00', endTime: '06:00' }
                    ],
                    budget: {
                        total: 4000,
                        artists: 1500,
                        venue: 1000,
                        sound: 800,
                        light: 500,
                        communication: 200
                    },
                    responsible: 'Blondy',
                    notes: 'Résidence artiste',
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveEventsData();
        }
    }

    saveEventsData() {
        localStorage.setItem('evenements_events', JSON.stringify(this.events));
    }

    // ============================================
    // DASHBOARD ÉVÉNEMENTS
    // ============================================

    renderDashboard() {
        this.updateKPIs();
        this.renderUpcomingEvents();
    }

    updateKPIs() {
        const currentYear = new Date().getFullYear();
        const thisYearEvents = this.events.filter(e => {
            const eventYear = new Date(e.startDate).getFullYear();
            return eventYear === currentYear && (e.status === 'terminé' || e.status === 'confirmé' || e.status === 'en cours');
        });

        const upcomingEvents = this.events.filter(e => {
            const eventDate = new Date(e.startDate);
            const today = new Date();
            const in30Days = new Date(today);
            in30Days.setDate(today.getDate() + 30);
            return eventDate >= today && eventDate <= in30Days && e.status !== 'terminé' && e.status !== 'annulé';
        });

        const completedEvents = this.events.filter(e => e.status === 'terminé');
        const avgFillRate = completedEvents.length > 0
            ? Math.round(completedEvents.reduce((sum, e) => sum + (e.fillRate || 0), 0) / completedEvents.length) + '%'
            : '0%';

        const avgRevenue = completedEvents.length > 0
            ? Math.round(completedEvents.reduce((sum, e) => sum + (e.revenue || 0), 0) / completedEvents.length) + '€'
            : '0€';

        const urgentEvents = this.events.filter(e => {
            if (e.status === 'terminé' || e.status === 'annulé') return false;
            const eventDate = new Date(e.startDate);
            const today = new Date();
            const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
            return daysUntil <= 30 && (!e.lineUp || e.lineUp.length === 0 || !e.budget || !e.budget.total);
        });

        document.getElementById('kpi-objective-progress').textContent = `${thisYearEvents.length}/15`;
        document.getElementById('kpi-next-30-days').textContent = upcomingEvents.length;
        document.getElementById('kpi-avg-fill-rate').textContent = avgFillRate;
        document.getElementById('kpi-avg-revenue').textContent = avgRevenue;
        document.getElementById('kpi-urgent-actions').textContent = urgentEvents.length;
    }

    renderUpcomingEvents() {
        const container = document.getElementById('upcoming-events-list');
        if (!container) return;

        const today = new Date();
        const upcoming = this.events
            .filter(e => {
                const eventDate = new Date(e.startDate);
                return eventDate >= today && e.status !== 'terminé' && e.status !== 'annulé';
            })
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
            .slice(0, 5);

        if (upcoming.length === 0) {
            container.innerHTML = '<p style="color: #666; font-size: 13px;">Aucun événement à venir</p>';
            return;
        }

        container.innerHTML = upcoming.map(event => {
            const eventDate = new Date(event.startDate);
            const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
            const statusColors = {
                'idée': '#666',
                'en préparation': '#fbbf24',
                'confirmé': '#4ade80',
                'en cours': '#FF5500',
                'terminé': '#4ade80',
                'annulé': '#ef4444'
            };
            const statusColor = statusColors[event.status] || '#666';

            return `
                <div onclick="evenementsManager.openEventDetail('${event.id}')" 
                     style="background: #111; border: 2px solid #333; padding: 16px; margin-bottom: 12px; border-radius: 4px; cursor: pointer; transition: all 0.3s ease; border-left: 3px solid ${statusColor};"
                     onmouseover="this.style.borderColor='${statusColor}'; this.style.background='#1a1a1a';"
                     onmouseout="this.style.borderColor='#333'; this.style.background='#111';">
                    <div style="display: flex; align-items: start; justify-content: space-between;">
                        <div style="flex: 1;">
                            <h4 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 8px 0; text-transform: uppercase;">
                                ${event.name}
                            </h4>
                            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 8px;">
                                <span style="font-size: 11px; color: #999; text-transform: uppercase;">${this.getTypeLabel(event.type)}</span>
                                <span style="font-size: 11px; color: #666;">•</span>
                                <span style="font-size: 11px; color: ${statusColor}; text-transform: uppercase;">${this.getStatusLabel(event.status)}</span>
                                <span style="font-size: 11px; color: #666;">•</span>
                                <span style="font-size: 11px; color: #999;">${event.venue.name}</span>
                            </div>
                            <p style="font-size: 12px; color: #ccc; margin: 0;">
                                ${eventDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                ${event.startTime ? ' à ' + event.startTime : ''}
                                ${daysUntil > 0 ? ` • Dans ${daysUntil} jour${daysUntil > 1 ? 's' : ''}` : daysUntil === 0 ? ' • Aujourd\'hui' : ''}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ============================================
    // NAVIGATION PAR ONGLETS
    // ============================================

    switchTab(tabName) {
        this.currentTab = tabName;
        
        document.querySelectorAll('.evenements-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        document.getElementById(`tab-${tabName}`).style.display = 'block';
        
        document.querySelectorAll('.evenements-tab').forEach(btn => {
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
        else if (tabName === 'calendar') this.renderCalendar();
        else if (tabName === 'kanban') this.renderKanban();
    }

    // ============================================
    // LISTE DES ÉVÉNEMENTS
    // ============================================

    renderList() {
        const container = document.getElementById('events-list');
        if (!container) return;

        let filteredEvents = [...this.events];

        // Filtre par statut
        const statusFilter = document.getElementById('events-filter-status')?.value;
        if (statusFilter && statusFilter !== 'all') {
            filteredEvents = filteredEvents.filter(e => e.status === statusFilter);
        }

        // Filtre par type
        const typeFilter = document.getElementById('events-filter-type')?.value;
        if (typeFilter && typeFilter !== 'all') {
            filteredEvents = filteredEvents.filter(e => e.type === typeFilter);
        }

        // Tri par date (plus récent en premier)
        filteredEvents.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

        if (filteredEvents.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px; color: #666;">
                    <i class="fas fa-calendar-times" style="font-size: 64px; margin-bottom: 16px; opacity: 0.2;"></i>
                    <p>Aucun événement trouvé</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredEvents.map(event => {
            const eventDate = new Date(event.startDate);
            const statusColors = {
                'idée': '#666',
                'en préparation': '#fbbf24',
                'confirmé': '#4ade80',
                'en cours': '#FF5500',
                'terminé': '#4ade80',
                'annulé': '#ef4444'
            };
            const statusColor = statusColors[event.status] || '#666';

            return `
                <div onclick="evenementsManager.openEventDetail('${event.id}')" 
                     class="event-card"
                     style="background: #0a0a0a; border: 2px solid #333; padding: 24px; margin-bottom: 16px; border-radius: 4px; cursor: pointer; transition: all 0.3s ease; border-left: 4px solid ${statusColor};"
                     onmouseover="this.style.borderColor='${statusColor}'; this.style.background='#111';"
                     onmouseout="this.style.borderColor='#333'; this.style.background='#0a0a0a';">
                    <div style="display: flex; align-items: start; justify-content: space-between;">
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <h3 style="font-family: 'Oswald', sans-serif; font-size: 20px; color: white; margin: 0; text-transform: uppercase;">
                                    ${event.name}
                                </h3>
                                <span style="font-size: 11px; color: ${statusColor}; background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 4px; border: 1px solid ${statusColor}; text-transform: uppercase;">
                                    ${this.getStatusLabel(event.status)}
                                </span>
                                <span style="font-size: 11px; color: #999; text-transform: uppercase;">
                                    ${this.getTypeLabel(event.type)}
                                </span>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Date</p>
                                    <p style="font-size: 14px; color: white; margin: 0;">
                                        ${eventDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        ${event.startTime ? ' à ' + event.startTime : ''}
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Lieu</p>
                                    <p style="font-size: 14px; color: white; margin: 0;">${event.venue.name}</p>
                                </div>
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Line-up</p>
                                    <p style="font-size: 14px; color: white; margin: 0;">
                                        ${event.lineUp && event.lineUp.length > 0 ? event.lineUp.length + ' artiste' + (event.lineUp.length > 1 ? 's' : '') : 'À définir'}
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Budget</p>
                                    <p style="font-size: 14px; color: white; margin: 0;">
                                        ${event.budget && event.budget.total ? event.budget.total.toLocaleString() + '€' : 'À définir'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    searchEvents() {
        const searchTerm = document.getElementById('events-search').value.toLowerCase();
        const allCards = document.querySelectorAll('.event-card');
        
        allCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            if (title.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterEvents() {
        this.renderList();
    }

    // ============================================
    // CALENDRIER ÉVÉNEMENTS
    // ============================================

    renderCalendar() {
        const container = document.getElementById('events-calendar');
        if (!container) return;

        const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const currentDate = new Date(this.currentYear, this.currentMonth, 1);
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const firstDay = currentDate.getDay();
        const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        document.getElementById('calendar-month-year').textContent = 
            `${monthNames[this.currentMonth]} ${this.currentYear}`;

        const monthEvents = this.events.filter(e => {
            const eventDate = new Date(e.startDate);
            return eventDate.getMonth() === this.currentMonth && 
                   eventDate.getFullYear() === this.currentYear;
        });

        const eventsByDay = {};
        monthEvents.forEach(event => {
            const day = new Date(event.startDate).getDate();
            if (!eventsByDay[day]) {
                eventsByDay[day] = [];
            }
            eventsByDay[day].push(event);
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

        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div style="padding: 12px; background: #0a0a0a; min-height: 120px;"></div>';
        }

        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today.getDate() && 
                          this.currentMonth === today.getMonth() && 
                          this.currentYear === today.getFullYear();
            const dayEvents = eventsByDay[day] || [];

            calendarHTML += `
                <div style="padding: 12px; background: ${isToday ? 'rgba(255, 85, 0, 0.1)' : '#0a0a0a'}; border: 2px solid ${isToday ? '#FF5500' : '#333'}; border-radius: 4px; min-height: 120px; cursor: pointer; transition: all 0.3s ease;"
                     onmouseover="this.style.borderColor='#FF5500'; this.style.background='#111';"
                     onmouseout="this.style.borderColor='${isToday ? '#FF5500' : '#333'}'; this.style.background='${isToday ? 'rgba(255, 85, 0, 0.1)' : '#0a0a0a'}'"
                     onclick="evenementsManager.openDayEvents(${day}, ${this.currentMonth}, ${this.currentYear})">
                    <div style="font-size: 14px; color: ${isToday ? '#FF5500' : 'white'}; font-weight: 600; margin-bottom: 8px;">
                        ${day}
                    </div>
                    ${dayEvents.map(event => {
                        const statusColors = {
                            'idée': '#666',
                            'en préparation': '#fbbf24',
                            'confirmé': '#4ade80',
                            'en cours': '#FF5500',
                            'terminé': '#4ade80',
                            'annulé': '#ef4444'
                        };
                        const color = statusColors[event.status] || '#666';
                        return `
                            <div style="font-size: 10px; color: ${color}; background: rgba(0,0,0,0.3); padding: 4px 6px; border-radius: 2px; margin-bottom: 4px; border-left: 2px solid ${color}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                                 title="${event.name}">
                                ${event.startTime || ''} ${event.name}
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

    openDayEvents(day, month, year) {
        const date = new Date(year, month, day);
        const dateString = date.toISOString().split('T')[0];
        const dayEvents = this.events.filter(e => e.startDate === dateString);

        if (dayEvents.length === 0) {
            alert(`Aucun événement prévu le ${day}/${month + 1}/${year}`);
            return;
        }

        const eventsList = dayEvents.map(e => `• ${e.name} (${this.getTypeLabel(e.type)})`).join('\n');
        alert(`Événements prévus le ${day}/${month + 1}/${year}:\n\n${eventsList}`);
    }

    // ============================================
    // KANBAN ÉVÉNEMENTS
    // ============================================

    renderKanban() {
        const container = document.getElementById('events-kanban');
        if (!container) return;

        const stages = [
            { id: 'idée', name: '💡 IDÉE', color: '#666' },
            { id: 'en préparation', name: '📋 EN PRÉPARATION', color: '#fbbf24' },
            { id: 'confirmé', name: '✅ CONFIRMÉ', color: '#4ade80' },
            { id: 'en cours', name: '🚀 EN COURS', color: '#FF5500' },
            { id: 'terminé', name: '✅ TERMINÉ', color: '#4ade80' },
            { id: 'annulé', name: '❌ ANNULÉ', color: '#ef4444' }
        ];

        container.innerHTML = stages.map(stage => {
            const stageEvents = this.events.filter(e => e.status === stage.id);
            
            return `
                <div class="kanban-column" data-stage="${stage.id}" style="background: #0a0a0a; border: 2px solid #333; border-radius: 4px; padding: 12px; min-height: 400px; min-width: 200px;">
                    <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #333;">
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 12px; color: white; margin: 0 0 6px 0; text-transform: uppercase;">
                            ${stage.name}
                        </h3>
                        <span style="font-size: 20px; color: ${stage.color}; font-weight: 700; font-family: 'Oswald', sans-serif;">
                            ${stageEvents.length}
                        </span>
                    </div>
                    <div class="kanban-events" data-stage="${stage.id}" style="min-height: 300px;">
                        ${stageEvents.map(event => this.renderEventCard(event)).join('')}
                    </div>
                </div>
            `;
        }).join('');

        this.initDragAndDrop();
    }

    renderEventCard(event) {
        const eventDate = new Date(event.startDate);
        const statusColors = {
            'idée': '#666',
            'en préparation': '#fbbf24',
            'confirmé': '#4ade80',
            'en cours': '#FF5500',
            'terminé': '#4ade80',
            'annulé': '#ef4444'
        };
        const statusColor = statusColors[event.status] || '#666';

        return `
            <div class="event-card-kanban" 
                 draggable="true" 
                 data-event-id="${event.id}"
                 style="background: #111; border: 2px solid #333; padding: 12px; margin-bottom: 8px; border-radius: 4px; cursor: move; transition: all 0.3s ease; border-left: 3px solid ${statusColor};"
                 onmouseover="this.style.borderColor='${statusColor}'; this.style.transform='translateY(-2px)';"
                 onmouseout="this.style.borderColor='#333'; this.style.transform='translateY(0)';"
                 onclick="evenementsManager.openEventDetail('${event.id}')">
                <h4 style="font-family: 'Oswald', sans-serif; font-size: 12px; color: white; margin: 0 0 8px 0; text-transform: uppercase; line-height: 1.2;">
                    ${event.name}
                </h4>
                <div style="font-size: 10px; color: #999; margin-bottom: 4px;">
                    ${this.getTypeLabel(event.type)}
                </div>
                <div style="font-size: 9px; color: #666; margin-top: 4px;">
                    ${eventDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                </div>
            </div>
        `;
    }

    initDragAndDrop() {
        const eventCards = document.querySelectorAll('.event-card-kanban');
        const kanbanColumns = document.querySelectorAll('.kanban-column');

        eventCards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('event-id', card.dataset.eventId);
                card.style.opacity = '0.5';
            });

            card.addEventListener('dragend', (e) => {
                card.style.opacity = '1';
            });
        });

        kanbanColumns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                const eventsContainer = column.querySelector('.kanban-events');
                if (eventsContainer) {
                    eventsContainer.style.background = 'rgba(255, 85, 0, 0.1)';
                }
            });

            column.addEventListener('dragleave', (e) => {
                const eventsContainer = column.querySelector('.kanban-events');
                if (eventsContainer) {
                    eventsContainer.style.background = 'transparent';
                }
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                const eventsContainer = column.querySelector('.kanban-events');
                if (eventsContainer) {
                    eventsContainer.style.background = 'transparent';
                }

                const eventId = e.dataTransfer.getData('event-id');
                const newStatus = column.dataset.stage;
                
                this.moveEventToStatus(eventId, newStatus);
            });
        });
    }

    moveEventToStatus(eventId, newStatus) {
        const event = this.events.find(e => e.id === eventId);
        if (event) {
            event.status = newStatus;
            this.saveEventsData();
            this.renderKanban();
            this.renderList();
            this.updateStats();
        }
    }

    // ============================================
    // GESTION DES ÉVÉNEMENTS
    // ============================================

    openNewEventModal() {
        const modal = document.getElementById('modal-new-event');
        if (modal) {
            modal.style.display = 'flex';
            this.renderEventForm();
        }
    }

    closeNewEventModal() {
        const modal = document.getElementById('modal-new-event');
        if (modal) modal.style.display = 'none';
    }

    renderEventForm(event = null) {
        const container = document.getElementById('event-form-container');
        if (!container) return;

        container.innerHTML = `
            <form id="event-form">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Nom de l'événement *</label>
                        <input type="text" class="form-input" id="event-name" value="${event?.name || ''}" placeholder="Ex: Boomkœur Printemps 2026" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Type d'événement *</label>
                        <select class="form-input" id="event-type" required>
                            <option value="soirée" ${event?.type === 'soirée' ? 'selected' : ''}>Soirée</option>
                            <option value="festival" ${event?.type === 'festival' ? 'selected' : ''}>Festival</option>
                            <option value="résidence" ${event?.type === 'résidence' ? 'selected' : ''}>Résidence</option>
                            <option value="tournée" ${event?.type === 'tournée' ? 'selected' : ''}>Tournée</option>
                            <option value="spécial" ${event?.type === 'spécial' ? 'selected' : ''}>Spécial</option>
                        </select>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Statut *</label>
                        <select class="form-input" id="event-status" required>
                            <option value="idée" ${event?.status === 'idée' ? 'selected' : ''}>💡 Idée</option>
                            <option value="en préparation" ${event?.status === 'en préparation' ? 'selected' : ''}>📋 En préparation</option>
                            <option value="confirmé" ${event?.status === 'confirmé' ? 'selected' : ''}>✅ Confirmé</option>
                            <option value="en cours" ${event?.status === 'en cours' ? 'selected' : ''}>🚀 En cours</option>
                            <option value="terminé" ${event?.status === 'terminé' ? 'selected' : ''}>✅ Terminé</option>
                            <option value="annulé" ${event?.status === 'annulé' ? 'selected' : ''}>❌ Annulé</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Responsable</label>
                        <input type="text" class="form-input" id="event-responsible" value="${event?.responsible || 'Benjamin'}" placeholder="Ex: Benjamin">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Date de début *</label>
                        <input type="date" class="form-input" id="event-start-date" value="${event?.startDate || ''}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Date de fin</label>
                        <input type="date" class="form-input" id="event-end-date" value="${event?.endDate || event?.startDate || ''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Heure de début</label>
                        <input type="time" class="form-input" id="event-start-time" value="${event?.startTime || ''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Heure de fin</label>
                        <input type="time" class="form-input" id="event-end-time" value="${event?.endTime || ''}">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Lieu - Nom *</label>
                        <input type="text" class="form-input" id="event-venue-name" value="${event?.venue?.name || ''}" placeholder="Ex: Le Havre - Salle principale" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Capacité</label>
                        <input type="number" class="form-input" id="event-venue-capacity" value="${event?.venue?.capacity || ''}" placeholder="Ex: 500">
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Adresse du lieu</label>
                    <input type="text" class="form-input" id="event-venue-address" value="${event?.venue?.address || ''}" placeholder="Ex: 123 Rue Example, Le Havre">
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Prix Early Bird (€)</label>
                        <input type="number" class="form-input" id="event-price-early" value="${event?.ticketPrice?.earlyBird || ''}" placeholder="15">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Prix Standard (€)</label>
                        <input type="number" class="form-input" id="event-price-standard" value="${event?.ticketPrice?.standard || ''}" placeholder="20">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Prix Sur place (€)</label>
                        <input type="number" class="form-input" id="event-price-onsite" value="${event?.ticketPrice?.onSite || ''}" placeholder="25">
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label">Notes</label>
                    <textarea class="form-textarea" id="event-notes" rows="4" placeholder="Notes internes sur l'événement...">${event?.notes || ''}</textarea>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-cancel" onclick="evenementsManager.closeNewEventModal()">Annuler</button>
                    <button type="submit" class="btn-save">${event ? 'Modifier' : 'Créer'} l'événement</button>
                </div>
            </form>
        `;

        const form = document.getElementById('event-form');
        if (form) {
            form.addEventListener('submit', (e) => this.saveEvent(e, event));
        }
    }

    saveEvent(e, event) {
        e.preventDefault();

        const newEvent = {
            id: event?.id || 'event-' + Date.now(),
            name: document.getElementById('event-name').value,
            type: document.getElementById('event-type').value,
            status: document.getElementById('event-status').value,
            startDate: document.getElementById('event-start-date').value,
            endDate: document.getElementById('event-end-date').value || document.getElementById('event-start-date').value,
            startTime: document.getElementById('event-start-time').value || null,
            endTime: document.getElementById('event-end-time').value || null,
            venue: {
                name: document.getElementById('event-venue-name').value,
                address: document.getElementById('event-venue-address').value || '',
                capacity: parseInt(document.getElementById('event-venue-capacity').value) || null
            },
            ticketPrice: {
                earlyBird: parseFloat(document.getElementById('event-price-early').value) || null,
                standard: parseFloat(document.getElementById('event-price-standard').value) || null,
                onSite: parseFloat(document.getElementById('event-price-onsite').value) || null
            },
            responsible: document.getElementById('event-responsible').value || 'Benjamin',
            notes: document.getElementById('event-notes').value || '',
            createdAt: event?.createdAt || new Date().toISOString(),
            lineUp: event?.lineUp || [],
            budget: event?.budget || null,
            fillRate: event?.fillRate || null,
            revenue: event?.revenue || null
        };

        if (event) {
            const index = this.events.findIndex(e => e.id === event.id);
            if (index !== -1) {
                this.events[index] = newEvent;
            }
        } else {
            this.events.push(newEvent);
        }

        this.saveEventsData();
        this.renderList();
        this.renderCalendar();
        this.renderKanban();
        this.updateStats();
        this.closeNewEventModal();
    }

    openEventDetail(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        const modal = document.getElementById('modal-event-detail');
        const container = document.getElementById('event-detail-container');
        const title = document.getElementById('event-detail-title');
        
        if (!modal || !container) return;

        title.textContent = event.name;
        
        const statusColors = {
            'idée': '#666',
            'en préparation': '#fbbf24',
            'confirmé': '#4ade80',
            'en cours': '#FF5500',
            'terminé': '#4ade80',
            'annulé': '#ef4444'
        };
        const statusColor = statusColors[event.status] || '#666';

        const eventDate = new Date(event.startDate);
        const endDate = event.endDate ? new Date(event.endDate) : null;

        container.innerHTML = `
            <!-- Onglets -->
            <div style="display: flex; gap: 8px; border-bottom: 2px solid #333; margin-bottom: 24px;">
                <button class="event-detail-tab active" data-tab="info" onclick="evenementsManager.switchEventDetailTab('info')" style="background: transparent; border: none; padding: 12px 24px; color: #999; font-size: 13px; text-transform: uppercase; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px;">
                    Informations
                </button>
                <button class="event-detail-tab" data-tab="lineup" onclick="evenementsManager.switchEventDetailTab('lineup')" style="background: transparent; border: none; padding: 12px 24px; color: #999; font-size: 13px; text-transform: uppercase; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px;">
                    Line-up
                </button>
                <button class="event-detail-tab" data-tab="budget" onclick="evenementsManager.switchEventDetailTab('budget')" style="background: transparent; border: none; padding: 12px 24px; color: #999; font-size: 13px; text-transform: uppercase; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px;">
                    Budget
                </button>
                <button class="event-detail-tab" data-tab="checklist" onclick="evenementsManager.switchEventDetailTab('checklist')" style="background: transparent; border: none; padding: 12px 24px; color: #999; font-size: 13px; text-transform: uppercase; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px;">
                    Checklist
                </button>
            </div>

            <!-- Contenu Onglet Informations -->
            <div id="event-detail-info" class="event-detail-tab-content">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                    <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px;">
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 16px 0; text-transform: uppercase;">
                            Informations Générales
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Type</p>
                                <p style="font-size: 14px; color: white; margin: 0; text-transform: uppercase;">${this.getTypeLabel(event.type)}</p>
                            </div>
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Statut</p>
                                <span style="font-size: 12px; color: ${statusColor}; text-transform: uppercase; background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 4px; border: 1px solid ${statusColor};">
                                    ${this.getStatusLabel(event.status)}
                                </span>
                            </div>
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Date</p>
                                <p style="font-size: 14px; color: white; margin: 0;">
                                    ${eventDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    ${endDate && endDate.getTime() !== eventDate.getTime() ? ' - ' + endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                                </p>
                            </div>
                            ${event.startTime ? `
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Horaires</p>
                                    <p style="font-size: 14px; color: white; margin: 0;">
                                        ${event.startTime} - ${event.endTime || 'N/A'}
                                    </p>
                                </div>
                            ` : ''}
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Responsable</p>
                                <p style="font-size: 14px; color: white; margin: 0;">${event.responsible || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px;">
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 16px 0; text-transform: uppercase;">
                            Lieu
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div>
                                <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Nom</p>
                                <p style="font-size: 14px; color: white; margin: 0;">${event.venue.name}</p>
                            </div>
                            ${event.venue.address ? `
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Adresse</p>
                                    <p style="font-size: 14px; color: white; margin: 0;">${event.venue.address}</p>
                                </div>
                            ` : ''}
                            ${event.venue.capacity ? `
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Capacité</p>
                                    <p style="font-size: 14px; color: white; margin: 0;">${event.venue.capacity} personnes</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>

                ${event.ticketPrice && (event.ticketPrice.earlyBird || event.ticketPrice.standard || event.ticketPrice.onSite) ? `
                    <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px; margin-bottom: 24px;">
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 16px 0; text-transform: uppercase;">
                            Billetterie
                        </h3>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                            ${event.ticketPrice.earlyBird ? `
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Early Bird</p>
                                    <p style="font-size: 18px; color: #FF5500; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${event.ticketPrice.earlyBird}€
                                    </p>
                                </div>
                            ` : ''}
                            ${event.ticketPrice.standard ? `
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Standard</p>
                                    <p style="font-size: 18px; color: #FF5500; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${event.ticketPrice.standard}€
                                    </p>
                                </div>
                            ` : ''}
                            ${event.ticketPrice.onSite ? `
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Sur place</p>
                                    <p style="font-size: 18px; color: #FF5500; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${event.ticketPrice.onSite}€
                                    </p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                ${event.notes ? `
                    <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px; margin-bottom: 24px;">
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 12px 0; text-transform: uppercase;">
                            Notes
                        </h3>
                        <p style="font-size: 13px; color: #ccc; line-height: 1.6; margin: 0;">${event.notes}</p>
                    </div>
                ` : ''}
            </div>

            <!-- Contenu Onglet Line-up -->
            <div id="event-detail-lineup" class="event-detail-tab-content" style="display: none;">
                ${event.lineUp && event.lineUp.length > 0 ? `
                    <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px;">
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 16px 0; text-transform: uppercase;">
                            Line-up (${event.lineUp.length} artiste${event.lineUp.length > 1 ? 's' : ''})
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${event.lineUp.map((artist, index) => {
                                const typeColors = {
                                    'résident': '#4ade80',
                                    'confirmé': '#60a5fa',
                                    'headliner': '#FF5500'
                                };
                                const typeColor = typeColors[artist.type] || '#666';
                                return `
                                    <div style="background: #111; border: 2px solid #333; padding: 16px; border-radius: 4px; border-left: 3px solid ${typeColor};">
                                        <div style="display: flex; align-items: center; justify-content: space-between;">
                                            <div>
                                                <h4 style="font-family: 'Oswald', sans-serif; font-size: 14px; color: white; margin: 0 0 4px 0; text-transform: uppercase;">
                                                    ${artist.artist}
                                                </h4>
                                                <span style="font-size: 11px; color: ${typeColor}; text-transform: uppercase;">
                                                    ${artist.type}
                                                </span>
                                            </div>
                                            ${artist.startTime && artist.endTime ? `
                                                <div style="text-align: right;">
                                                    <p style="font-size: 12px; color: #999; margin: 0;">
                                                        ${artist.startTime} - ${artist.endTime}
                                                    </p>
                                                </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : `
                    <div style="text-align: center; padding: 60px; color: #666;">
                        <i class="fas fa-music" style="font-size: 64px; margin-bottom: 16px; opacity: 0.2;"></i>
                        <p>Line-up à définir</p>
                    </div>
                `}
            </div>

            <!-- Contenu Onglet Budget -->
            <div id="event-detail-budget" class="event-detail-tab-content" style="display: none;">
                ${event.budget && event.budget.total ? `
                    <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px;">
                        <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 16px 0; text-transform: uppercase;">
                            Budget Prévisionnel
                        </h3>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 16px;">
                            ${event.budget.artists ? `
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Artistes</p>
                                    <p style="font-size: 18px; color: #FF5500; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${event.budget.artists.toLocaleString()}€
                                    </p>
                                </div>
                            ` : ''}
                            ${event.budget.venue ? `
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Lieu</p>
                                    <p style="font-size: 18px; color: #FF5500; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${event.budget.venue.toLocaleString()}€
                                    </p>
                                </div>
                            ` : ''}
                            ${event.budget.sound ? `
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Son</p>
                                    <p style="font-size: 18px; color: #FF5500; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${event.budget.sound.toLocaleString()}€
                                    </p>
                                </div>
                            ` : ''}
                            ${event.budget.light ? `
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Lumière</p>
                                    <p style="font-size: 18px; color: #FF5500; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${event.budget.light.toLocaleString()}€
                                    </p>
                                </div>
                            ` : ''}
                            ${event.budget.communication ? `
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Communication</p>
                                    <p style="font-size: 18px; color: #FF5500; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${event.budget.communication.toLocaleString()}€
                                    </p>
                                </div>
                            ` : ''}
                            ${event.budget.security ? `
                                <div>
                                    <p style="font-size: 11px; color: #999; margin: 0 0 4px 0; text-transform: uppercase;">Sécurité</p>
                                    <p style="font-size: 18px; color: #FF5500; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                        ${event.budget.security.toLocaleString()}€
                                    </p>
                                </div>
                            ` : ''}
                        </div>
                        <div style="padding-top: 16px; border-top: 2px solid #333;">
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <p style="font-size: 14px; color: white; margin: 0; text-transform: uppercase; font-weight: 600;">Total</p>
                                <p style="font-size: 24px; color: #FF5500; font-weight: 700; margin: 0; font-family: 'Oswald', sans-serif;">
                                    ${event.budget.total.toLocaleString()}€
                                </p>
                            </div>
                        </div>
                    </div>
                ` : `
                    <div style="text-align: center; padding: 60px; color: #666;">
                        <i class="fas fa-euro-sign" style="font-size: 64px; margin-bottom: 16px; opacity: 0.2;"></i>
                        <p>Budget à définir</p>
                    </div>
                `}
            </div>

            <!-- Contenu Onglet Checklist -->
            <div id="event-detail-checklist" class="event-detail-tab-content" style="display: none;">
                <div style="background: #0a0a0a; border: 2px solid #333; padding: 24px; border-radius: 4px;">
                    <h3 style="font-family: 'Oswald', sans-serif; font-size: 16px; color: white; margin: 0 0 16px 0; text-transform: uppercase;">
                        Checklist Événement
                    </h3>
                    <div id="event-checklist-items">
                        ${this.renderChecklistItems(event)}
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 12px; margin-top: 24px;">
                <button onclick="evenementsManager.editEvent('${eventId}')" 
                        style="background: #FF5500; color: white; border: none; padding: 12px 24px; font-size: 13px; text-transform: uppercase; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-edit"></i> Modifier
                </button>
            </div>
        `;

        modal.style.display = 'flex';
        this.currentEventDetail = eventId;
    }

    renderChecklistItems(event) {
        const categories = [
            {
                name: 'Logistique',
                items: [
                    { id: 'venue-confirmed', label: 'Lieu confirmé et réservé', checked: event.checklist?.venueConfirmed || false },
                    { id: 'sound-booked', label: 'Son réservé', checked: event.checklist?.soundBooked || false },
                    { id: 'light-booked', label: 'Lumière réservée', checked: event.checklist?.lightBooked || false },
                    { id: 'security-booked', label: 'Sécurité réservée', checked: event.checklist?.securityBooked || false }
                ]
            },
            {
                name: 'Line-up',
                items: [
                    { id: 'lineup-complete', label: 'Line-up complet', checked: event.checklist?.lineupComplete || false },
                    { id: 'contracts-signed', label: 'Contrats artistes signés', checked: event.checklist?.contractsSigned || false }
                ]
            },
            {
                name: 'Communication',
                items: [
                    { id: 'poster-created', label: 'Affiche créée', checked: event.checklist?.posterCreated || false },
                    { id: 'announcement-posted', label: 'Annonce publiée', checked: event.checklist?.announcementPosted || false },
                    { id: 'lineup-announced', label: 'Line-up annoncé', checked: event.checklist?.lineupAnnounced || false }
                ]
            },
            {
                name: 'Billetterie',
                items: [
                    { id: 'tickets-online', label: 'Billets en ligne', checked: event.checklist?.ticketsOnline || false },
                    { id: 'ticket-link-shared', label: 'Lien billetterie partagé', checked: event.checklist?.ticketLinkShared || false }
                ]
            }
        ];

        return categories.map(category => `
            <div style="margin-bottom: 24px;">
                <h4 style="font-family: 'Oswald', sans-serif; font-size: 14px; color: #FF5500; margin: 0 0 12px 0; text-transform: uppercase;">
                    ${category.name}
                </h4>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${category.items.map(item => `
                        <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 8px; border-radius: 4px; transition: all 0.3s ease;"
                               onmouseover="this.style.background='#111';"
                               onmouseout="this.style.background='transparent';">
                            <input type="checkbox" 
                                   ${item.checked ? 'checked' : ''}
                                   onchange="evenementsManager.toggleChecklistItem('${this.currentEventDetail}', '${item.id}')"
                                   style="width: 18px; height: 18px; cursor: pointer;">
                            <span style="font-size: 13px; color: ${item.checked ? '#4ade80' : '#ccc'}; text-decoration: ${item.checked ? 'line-through' : 'none'};">
                                ${item.label}
                            </span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    toggleChecklistItem(eventId, itemId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        if (!event.checklist) {
            event.checklist = {};
        }

        const checkbox = document.querySelector(`input[onchange*="${itemId}"]`);
        event.checklist[itemId] = checkbox.checked;

        this.saveEventsData();
    }

    switchEventDetailTab(tabName) {
        document.querySelectorAll('.event-detail-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        document.getElementById(`event-detail-${tabName}`).style.display = 'block';
        
        document.querySelectorAll('.event-detail-tab').forEach(btn => {
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

    closeEventDetailModal() {
        const modal = document.getElementById('modal-event-detail');
        if (modal) modal.style.display = 'none';
        this.currentEventDetail = null;
    }

    editEvent(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (event) {
            this.closeEventDetailModal();
            this.openNewEventModal();
            this.renderEventForm(event);
        }
    }

    // ============================================
    // UTILITAIRES
    // ============================================

    getStatusLabel(status) {
        const labels = {
            'idée': '💡 Idée',
            'en préparation': '📋 En préparation',
            'confirmé': '✅ Confirmé',
            'en cours': '🚀 En cours',
            'terminé': '✅ Terminé',
            'annulé': '❌ Annulé'
        };
        return labels[status] || status;
    }

    getTypeLabel(type) {
        const labels = {
            'soirée': 'Soirée',
            'festival': 'Festival',
            'résidence': 'Résidence',
            'tournée': 'Tournée',
            'spécial': 'Spécial'
        };
        return labels[type] || type;
    }

    // ============================================
    // STATISTIQUES
    // ============================================

    updateStats() {
        const totalEvents = this.events.length;
        const currentYear = new Date().getFullYear();
        const thisYearEvents = this.events.filter(e => {
            const eventYear = new Date(e.startDate).getFullYear();
            return eventYear === currentYear;
        }).length;
        const upcomingEvents = this.events.filter(e => {
            const eventDate = new Date(e.startDate);
            const today = new Date();
            return eventDate >= today && e.status !== 'terminé' && e.status !== 'annulé';
        }).length;

        document.getElementById('events-total-count').textContent = totalEvents;
        document.getElementById('events-this-year-count').textContent = thisYearEvents;
        document.getElementById('events-upcoming-count').textContent = upcomingEvents;
        this.updateKPIs();
    }
}

// Initialiser le gestionnaire événements
let evenementsManager;
document.addEventListener('DOMContentLoaded', () => {
    evenementsManager = new EvenementsManager();
    
    // Rendre accessible globalement
    window.evenementsManager = evenementsManager;
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

