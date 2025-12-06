class Slider {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.init();
    }

    init() {
        // Récupérer toutes les slides
        this.slides = Array.from(document.querySelectorAll('.slide'));
        this.totalSlides = this.slides.length;
        
        // Initialiser les indicateurs
        this.createIndicators();
        
        // Mettre à jour le compteur
        this.updateCounter();
        
        // Événements de navigation
        document.getElementById('prevBtn').addEventListener('click', () => this.prevSlide());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());
        
        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === 'Home') this.goToSlide(0);
            if (e.key === 'End') this.goToSlide(this.totalSlides - 1);
        });
        
        // Navigation tactile (swipe)
        this.initSwipe();
        
        // Focus sur le container pour les raccourcis clavier
        document.querySelector('.slider-container').setAttribute('tabindex', '0');
    }

    createIndicators() {
        const indicatorsContainer = document.getElementById('indicators');
        indicatorsContainer.innerHTML = '';
        
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    updateCounter() {
        document.getElementById('currentSlide').textContent = this.currentSlide + 1;
        document.getElementById('totalSlides').textContent = this.totalSlides;
        
        // Mettre à jour les boutons de navigation
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.disabled = this.currentSlide === 0;
        nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    goToSlide(index) {
        if (index < 0 || index >= this.totalSlides) return;
        
        // Retirer la classe active de la slide actuelle
        this.slides[this.currentSlide].classList.remove('active');
        document.querySelectorAll('.indicator')[this.currentSlide].classList.remove('active');
        
        // Mettre à jour l'index
        this.currentSlide = index;
        
        // Ajouter la classe active à la nouvelle slide
        this.slides[this.currentSlide].classList.add('active');
        document.querySelectorAll('.indicator')[this.currentSlide].classList.add('active');
        
        // Mettre à jour le compteur
        this.updateCounter();
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    initSwipe() {
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        // Support pour la souris (drag)
        let mouseStartX = 0;
        let isDragging = false;

        document.addEventListener('mousedown', (e) => {
            mouseStartX = e.screenX;
            isDragging = true;
        });

        document.addEventListener('mouseup', (e) => {
            if (isDragging) {
                const mouseEndX = e.screenX;
                const diff = mouseStartX - mouseEndX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
                isDragging = false;
            }
        });
    }

    handleSwipe() {
        const diff = touchStartX - touchEndX;
        const minSwipeDistance = 50;
        
        if (Math.abs(diff) > minSwipeDistance) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }

    // Méthode pour ajouter une slide dynamiquement
    addSlide(htmlContent) {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = htmlContent;
        
        const wrapper = document.querySelector('.slider-wrapper');
        wrapper.appendChild(slide);
        
        // Réinitialiser
        this.slides = Array.from(document.querySelectorAll('.slide'));
        this.totalSlides = this.slides.length;
        this.createIndicators();
        this.updateCounter();
    }
}

// Initialiser le slider quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    window.slider = new Slider();
});

