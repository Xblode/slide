// Gestion de la recherche et des filtres de documents
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categorySections = document.querySelectorAll('.category-section');
    const documentItems = document.querySelectorAll('.document-item');

    // Fonction de recherche
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        documentItems.forEach(item => {
            const documentName = item.querySelector('.document-name').textContent.toLowerCase();
            const documentDescription = item.querySelector('.document-description').textContent.toLowerCase();
            
            if (documentName.includes(searchTerm) || documentDescription.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Masquer les sections vides
        categorySections.forEach(section => {
            const visibleItems = Array.from(section.querySelectorAll('.document-item')).filter(
                item => item.style.display !== 'none'
            );
            
            if (visibleItems.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    }

    // Événement de recherche
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    }

    // Gestion des filtres par catégorie
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Réinitialiser la recherche
            if (searchInput) {
                searchInput.value = '';
            }

            // Filtrer les sections de catégories
            categorySections.forEach(section => {
                const category = section.getAttribute('data-category');
                
                if (filter === 'all') {
                    section.style.display = 'block';
                    // Afficher tous les documents
                    section.querySelectorAll('.document-item').forEach(item => {
                        item.style.display = 'flex';
                    });
                } else if (filter === category) {
                    section.style.display = 'block';
                    // Afficher tous les documents de cette catégorie
                    section.querySelectorAll('.document-item').forEach(item => {
                        item.style.display = 'flex';
                    });
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
});

