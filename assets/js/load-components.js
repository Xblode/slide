/**
 * Chargement dynamique des composants (Header & Sidebar)
 * Pour éviter la duplication de code dans chaque page
 */

// Fonction pour détecter le chemin relatif vers les composants
function getComponentPath() {
    // Si on est dans le dossier pages/, le chemin est ../components/
    // Si on est à la racine, le chemin est components/
    const path = window.location.pathname;
    return path.includes('/pages/') ? '../components/' : 'components/';
}

// Fonction pour détecter la page courante
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    
    // Si c'est index.html ou vide, retourner 'dashboard'
    if (!page || page === 'index') return 'dashboard';
    
    return page;
}

// Fonction pour charger un composant HTML
async function loadComponent(componentName, targetId) {
    try {
        const componentPath = getComponentPath();
        const response = await fetch(`${componentPath}${componentName}.html`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const target = document.getElementById(targetId);
        
        if (target) {
            target.innerHTML = html;
            return true;
        } else {
            console.error(`Target element #${targetId} not found`);
            return false;
        }
    } catch (error) {
        console.error(`Error loading ${componentName}:`, error);
        return false;
    }
}

// Fonction pour mettre à jour la classe active dans la sidebar
function setActiveMenuItem() {
    const currentPage = getCurrentPage();
    
    // Attendre un peu que la sidebar soit chargée
    setTimeout(() => {
        // Retirer toutes les classes active
        const allItems = document.querySelectorAll('.sidebar-item');
        allItems.forEach(item => item.classList.remove('active'));
        
        // Ajouter la classe active à l'élément correspondant
        const activeItem = document.querySelector(`.sidebar-item[data-page="${currentPage}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }, 100);
}

// Fonction pour corriger les liens relatifs dans le header
function fixHeaderLinks() {
    setTimeout(() => {
        const header = document.querySelector('.main-header');
        if (!header) return;
        
        // Si on est dans pages/, ajuster le lien du logo
        if (window.location.pathname.includes('/pages/')) {
            const logoLink = header.querySelector('.logo-container a');
            if (logoLink) {
                logoLink.href = '../index.html';
            }
        }
    }, 100);
}

// Fonction pour corriger les liens relatifs dans la sidebar
function fixSidebarLinks() {
    setTimeout(() => {
        const sidebar = document.querySelector('.main-sidebar');
        if (!sidebar) return;
        
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        
        // Corriger tous les liens du menu
        const menuLinks = sidebar.querySelectorAll('.sidebar-link');
        
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (!href) return;
            
            // Si on est à la racine (index.html)
            if (!isInPagesFolder) {
                // Le lien vers index.html reste tel quel
                if (href === 'index.html' || href === '../index.html') {
                    link.setAttribute('href', 'index.html');
                }
                // Les autres liens doivent pointer vers pages/
                else if (!href.startsWith('pages/') && href !== 'index.html') {
                    link.setAttribute('href', 'pages/' + href);
                }
            }
            // Si on est dans pages/
            else {
                // Le lien vers index.html doit remonter d'un niveau
                if (href === 'index.html') {
                    link.setAttribute('href', '../index.html');
                }
                // Les autres liens restent relatifs (même niveau)
                // Déjà corrects
            }
        });
        
        console.log('🔗 Liens de la sidebar corrigés');
    }, 100);
}

// Initialisation précoce du positionnement (avant le chargement des composants)
function initializeContentPosition() {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        // Position par défaut (sidebar collapsed)
        mainContent.style.marginLeft = '70px';
        mainContent.style.width = 'calc(100% - 70px)';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Chargement des composants...');
    
    // Initialiser le positionnement dès que possible
    initializeContentPosition();
    
    // Charger le header
    const headerLoaded = await loadComponent('header', 'header-container');
    if (headerLoaded) {
        console.log('✅ Header chargé');
        fixHeaderLinks();
    }
    
    // Charger la sidebar
    const sidebarLoaded = await loadComponent('sidebar', 'sidebar-container');
    if (sidebarLoaded) {
        console.log('✅ Sidebar chargée');
        
        // Attendre un peu plus pour que le DOM soit bien mis à jour
        setTimeout(() => {
            setActiveMenuItem();
            fixSidebarLinks();
            initSidebarToggle();
        }, 150);
    }
    
    console.log('✨ Composants chargés avec succès');
});

// Fonction pour initialiser le toggle de la sidebar
function initSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('mainSidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (!sidebarToggle || !sidebar) return;
    
    // Fonction pour mettre à jour le positionnement du contenu
    function updateContentPosition() {
        if (!mainContent) return;
        
        if (sidebar.classList.contains('collapsed')) {
            mainContent.style.marginLeft = '70px'; // Sidebar réduite
            mainContent.style.width = 'calc(100% - 70px)'; // Largeur ajustée
        } else {
            mainContent.style.marginLeft = '280px'; // Sidebar ouverte
            mainContent.style.width = 'calc(100% - 280px)'; // Largeur ajustée
        }
    }
    
    // Initialiser le positionnement au chargement
    updateContentPosition();
    
    // Gérer le clic sur le toggle
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        
        const icon = this.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-chevron-right');
        } else {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-left');
        }
        
        // Mettre à jour le positionnement du contenu
        updateContentPosition();
    });
    
    console.log('✅ Sidebar toggle initialisé');
}

