// Système de modal pour les objectifs
document.addEventListener('DOMContentLoaded', () => {
    const summaryCards = document.querySelectorAll('.objective-card-summary');
    const fullDataCards = document.querySelectorAll('.objective-full-data');
    
    // Cache pour stocker les contenus déjà chargés (max 10 items)
    const contentCache = new Map();
    const MAX_CACHE_SIZE = 10;
    
    // Fonction pour ajouter au cache avec gestion LRU (Least Recently Used)
    function addToCache(key, value) {
        // Si le cache est plein, supprimer le plus ancien
        if (contentCache.size >= MAX_CACHE_SIZE) {
            const firstKey = contentCache.keys().next().value;
            contentCache.delete(firstKey);
        }
        contentCache.set(key, value);
    }
    
    // Créer la modal
    const modal = document.createElement('div');
    modal.className = 'objective-modal';
    modal.id = 'objectiveModal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-container">
            <button class="modal-close" id="modalClose">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-content" id="modalContent">
                <!-- Le contenu sera injecté ici -->
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const modalContent = modal.querySelector('.modal-content');
    
    // Fonction pour ouvrir la modal
    async function openModal(objectiveId) {
        // Afficher la modal immédiatement
        requestAnimationFrame(() => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Vérifier si le contenu est déjà en cache
        if (contentCache.has(objectiveId)) {
            // Utiliser le contenu en cache (instantané)
            requestAnimationFrame(() => {
                modalContent.innerHTML = contentCache.get(objectiveId);
                modalContent.scrollTop = 0;
            });
            return;
        }
        
        // Afficher le loader pendant le chargement
        modalContent.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; padding: 40px;">
                <div style="width: 60px; height: 60px; border: 4px solid #333; border-top-color: #FF5500; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="color: #999; margin-top: 24px; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Chargement...</p>
            </div>
        `;
        
        try {
            // Tentative de chargement du fichier externe
            const response = await fetch(`../data/objectives/${objectiveId}.html`);
            
            if (response.ok) {
                // Fichier externe trouvé : charger son contenu
                const htmlContent = await response.text();
                
                // Mettre en cache
                addToCache(objectiveId, htmlContent);
                
                // Afficher avec requestAnimationFrame pour éviter le lag
                requestAnimationFrame(() => {
                    modalContent.innerHTML = htmlContent;
                    modalContent.scrollTop = 0;
                });
            } else {
                // Fichier externe non trouvé : fallback sur l'ancien système (données inline)
                const fullData = document.querySelector(`.objective-full-data[data-objective="${objectiveId}"]`);
                
                if (fullData) {
                    const contentClone = fullData.cloneNode(true);
                    contentClone.style.display = 'block';
                    const htmlContent = contentClone.outerHTML;
                    
                    // Mettre en cache
                    addToCache(objectiveId, htmlContent);
                    
                    requestAnimationFrame(() => {
                        modalContent.innerHTML = htmlContent;
                        modalContent.scrollTop = 0;
                    });
                } else {
                    // Aucun contenu trouvé
                    modalContent.innerHTML = `
                        <div style="padding: 60px 40px; text-align: center;">
                            <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #FF5500; margin-bottom: 20px;"></i>
                            <h2 style="color: white; font-size: 24px; margin-bottom: 12px;">Contenu non disponible</h2>
                            <p style="color: #999; font-size: 14px;">Le contenu détaillé de cet objectif est en cours de préparation.</p>
                        </div>
                    `;
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement du contenu:', error);
            
            // Fallback sur l'ancien système en cas d'erreur réseau
            const fullData = document.querySelector(`.objective-full-data[data-objective="${objectiveId}"]`);
            
            if (fullData) {
                const contentClone = fullData.cloneNode(true);
                contentClone.style.display = 'block';
                const htmlContent = contentClone.outerHTML;
                
                // Mettre en cache même en fallback
                addToCache(objectiveId, htmlContent);
                
                requestAnimationFrame(() => {
                    modalContent.innerHTML = htmlContent;
                    modalContent.scrollTop = 0;
                });
            } else {
                modalContent.innerHTML = `
                    <div style="padding: 60px 40px; text-align: center;">
                        <i class="fas fa-times-circle" style="font-size: 48px; color: #ef4444; margin-bottom: 20px;"></i>
                        <h2 style="color: white; font-size: 24px; margin-bottom: 12px;">Erreur de chargement</h2>
                        <p style="color: #999; font-size: 14px;">Impossible de charger le contenu. Veuillez réessayer.</p>
                    </div>
                `;
            }
        }
    }
    
    // Fonction pour fermer la modal
    function closeModal() {
        requestAnimationFrame(() => {
            modal.classList.remove('active');
        });
        
        // Attendre la fin de l'animation avant de réactiver le scroll
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 250); // Correspond à la durée de transition CSS (0.25s)
    }
    
    // Timer pour debounce du prefetch
    let prefetchTimer = null;
    
    // Fonction de préchargement (au survol) avec debounce
    async function prefetchContent(objectiveId) {
        // Si déjà en cache, ne rien faire
        if (contentCache.has(objectiveId)) return;
        
        // Debounce: attendre 300ms avant de précharger
        clearTimeout(prefetchTimer);
        prefetchTimer = setTimeout(async () => {
            try {
                const response = await fetch(`../data/objectives/${objectiveId}.html`);
                if (response.ok) {
                    const htmlContent = await response.text();
                    addToCache(objectiveId, htmlContent);
                }
            } catch (error) {
                // Échec silencieux du préchargement
                console.log('Prefetch failed for:', objectiveId);
            }
        }, 300);
    }
    
    // Ajouter les événements de clic sur les cartes résumées
    summaryCards.forEach(card => {
        const btn = card.querySelector('.summary-btn');
        const objectiveId = card.getAttribute('data-objective');
        
        // Précharger au survol de la carte (prefetch)
        card.addEventListener('mouseenter', () => {
            prefetchContent(objectiveId);
        });
        
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(objectiveId);
            });
        }
        
        // Permettre aussi le clic sur toute la carte
        card.addEventListener('click', () => {
            openModal(objectiveId);
        });
    });
    
    // Fermer la modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Fermer avec Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

