// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('mainSidebar');
    const toggleButton = document.getElementById('sidebarToggle');
    const toggleIcon = toggleButton ? toggleButton.querySelector('i') : null;

    // Vérifier si la sidebar existe
    if (!sidebar || !toggleButton) {
        return;
    }

    // Récupérer l'état sauvegardé depuis localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    
    // Appliquer l'état sauvegardé (ou garder le défaut si rien n'est sauvegardé)
    if (savedState !== null) {
        const shouldCollapse = savedState === 'true';
        
        // Retirer la classe par défaut si nécessaire
        sidebar.classList.remove('collapsed');
        
        // Appliquer l'état sauvegardé
        if (shouldCollapse) {
            sidebar.classList.add('collapsed');
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-chevron-left');
                toggleIcon.classList.add('fa-chevron-right');
            }
        } else {
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-chevron-right');
                toggleIcon.classList.add('fa-chevron-left');
            }
        }
    }

    // Toggle au clic
    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        
        // Sauvegarder l'état
        const isNowCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isNowCollapsed.toString());

        // Changer l'icône
        if (toggleIcon) {
            if (isNowCollapsed) {
                toggleIcon.classList.remove('fa-chevron-left');
                toggleIcon.classList.add('fa-chevron-right');
            } else {
                toggleIcon.classList.remove('fa-chevron-right');
                toggleIcon.classList.add('fa-chevron-left');
            }
        }
    });
});

