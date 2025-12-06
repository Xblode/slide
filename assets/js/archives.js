// Archives page navigation
document.addEventListener('DOMContentLoaded', function() {
    const folderView = document.getElementById('folderView');
    const sliderView = document.getElementById('sliderView');
    const archiveItems = document.querySelectorAll('.archive-item');
    const backButton = document.getElementById('backToFolder');

    // Ouvrir le slider au clic sur un élément d'archive
    archiveItems.forEach(item => {
        item.addEventListener('click', function() {
            const archiveType = this.getAttribute('data-archive');
            
            if (archiveType === 'slider') {
                // Afficher la vue slider et cacher la vue dossier
                folderView.style.display = 'none';
                sliderView.style.display = 'block';
                
                // Réinitialiser le slider si nécessaire
                if (typeof initSlider === 'function') {
                    initSlider();
                }
            }
        });
    });

    // Retour à la vue dossier
    if (backButton) {
        backButton.addEventListener('click', function() {
            folderView.style.display = 'block';
            sliderView.style.display = 'none';
        });
    }
});

