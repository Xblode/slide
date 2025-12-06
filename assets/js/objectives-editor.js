// Système d'édition inline pour les objectifs
document.addEventListener('DOMContentLoaded', () => {
    const editableElements = document.querySelectorAll('.objective-content[contenteditable="true"]');
    
    editableElements.forEach(element => {
        // Ajouter un indicateur visuel d'édition
        element.addEventListener('focus', function() {
            this.classList.add('editing');
            // Afficher un message d'aide
            const helpText = document.createElement('div');
            helpText.className = 'edit-help';
            helpText.textContent = 'Cliquez en dehors pour sauvegarder';
            this.parentElement.appendChild(helpText);
        });

        element.addEventListener('blur', function() {
            this.classList.remove('editing');
            const helpText = this.parentElement.querySelector('.edit-help');
            if (helpText) {
                helpText.remove();
            }
            // Sauvegarder le contenu (pour l'instant dans localStorage)
            saveContent(this);
        });

        // Empêcher les retours à la ligne multiples dans les content-line
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const currentLine = range.startContainer.parentElement;
                
                if (currentLine && currentLine.classList.contains('content-line')) {
                    const newLine = document.createElement('div');
                    newLine.className = 'content-line';
                    newLine.textContent = '';
                    currentLine.after(newLine);
                    
                    range.setStart(newLine, 0);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        });
    });

    function saveContent(element) {
        const objectiveCard = element.closest('.objective-card');
        const objectiveTitle = objectiveCard.querySelector('.objective-title')?.textContent.trim();
        const sectionType = element.closest('.objective-section')?.querySelector('.objective-label span')?.textContent.trim() || 'unknown';
        
        // Créer une clé unique pour le stockage
        const storageKey = `objective_${objectiveTitle}_${sectionType}`;
        
        // Sauvegarder dans localStorage
        localStorage.setItem(storageKey, element.innerHTML);
        
        // Afficher une notification de sauvegarde
        showSaveNotification();
    }

    function showSaveNotification() {
        // Créer une notification temporaire
        const notification = document.createElement('div');
        notification.className = 'save-notification';
        notification.innerHTML = '<i class="fas fa-check"></i> Modifications sauvegardées';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Charger les contenus sauvegardés au chargement de la page
    function loadSavedContent() {
        editableElements.forEach(element => {
            const objectiveCard = element.closest('.objective-card');
            const objectiveTitle = objectiveCard.querySelector('.objective-title')?.textContent.trim();
            const sectionType = element.closest('.objective-section')?.querySelector('.objective-label span')?.textContent.trim() || 'unknown';
            const storageKey = `objective_${objectiveTitle}_${sectionType}`;
            
            const savedContent = localStorage.getItem(storageKey);
            if (savedContent) {
                element.innerHTML = savedContent;
            }
        });
    }

    loadSavedContent();
});

