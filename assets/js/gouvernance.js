// Gouvernance page - Role cards interactions
document.addEventListener('DOMContentLoaded', function() {
    const roleCards = document.querySelectorAll('.role-card.clickable');
    const modal = document.getElementById('roleModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalPerson = document.getElementById('modalPerson');
    const modalIcon = document.getElementById('modalIcon');
    const modalDescription = document.getElementById('modalDescription');

    // Données des rôles (peut être étendu avec plus de détails)
    const rolesData = {
        'president': {
            icon: '<i class="fas fa-hat-cowboy"></i>',
            title: 'Président',
            person: 'Matthieu',
            description: 'Garant de la vision long terme, de l\'éthique et du cadre légal. Arbitre final sur les orientations stratégiques.'
        },
        'directeur-artistique': {
            icon: '<i class="fas fa-palette"></i>',
            title: 'Directeur Artistique',
            person: 'Benjamin',
            description: 'Gardien de l\'identité visuelle, sonore et émotionnelle. Garant de la cohérence esthétique globale.'
        },
        'directeur-strategique': {
            icon: '<i class="fas fa-bullseye"></i>',
            title: 'Directeur Stratégique',
            person: 'Benjamin',
            description: 'Pilote du développement stratégique et du positionnement. Définit les opportunités futures et les axes de croissance.'
        },
        'directeur-marketing': {
            icon: '<i class="fas fa-bullhorn"></i>',
            title: 'Directeur Marketing',
            person: 'Benjamin',
            description: 'Responsable de la stratégie marketing, de la communication externe et du développement de la marque.'
        },
        'gestionnaire-projets': {
            icon: '<i class="fas fa-cogs"></i>',
            title: 'Gestionnaire Projets',
            person: 'Hugo / Milan',
            description: 'Coordinateur opérationnel et garant du rythme collectif. Assure le suivi et l\'exécution des projets.'
        },
        'tresorier': {
            icon: '<i class="fas fa-coins"></i>',
            title: 'Trésorier',
            person: 'Sofiane',
            description: 'Gardien de la santé financière. Valide la faisabilité budgétaire et assure la transparence financière.'
        },
        'secretaire': {
            icon: '<i class="fas fa-folder-open"></i>',
            title: 'Secrétaire',
            person: 'Marie',
            description: 'Gestion administrative et organisationnelle. Assure le suivi des documents et de la communication interne.'
        },
        'rh-benevoles': {
            icon: '<i class="fas fa-users"></i>',
            title: 'RH / Bénévoles',
            person: 'Moumou',
            description: 'Gestion des ressources humaines et coordination des bénévoles. Assure le recrutement et la formation.'
        },
        'commercial': {
            icon: '<i class="fas fa-briefcase"></i>',
            title: 'Commercial',
            person: 'Eddie',
            description: 'Développement commercial et partenariats. Gestion des relations clients et prospects.'
        },
        'technique': {
            icon: '<i class="fas fa-wrench"></i>',
            title: 'Technique',
            person: 'Flow',
            description: 'Gestion technique et logistique. Assure le bon fonctionnement des équipements et installations.'
        },
        'manager-artistique': {
            icon: '<i class="fas fa-headphones"></i>',
            title: 'Manager Artistique',
            person: 'Flow',
            description: 'Coordination artistique et programmation. Gestion des relations avec les artistes et la programmation.'
        },
        'graphistes': {
            icon: '<i class="fas fa-pen-nib"></i>',
            title: 'Graphistes',
            person: 'Team Créa',
            description: 'Création graphique et identité visuelle. Production de supports de communication visuels.'
        },
        'media-video': {
            icon: '<i class="fas fa-camera"></i>',
            title: 'Média / Vidéo',
            person: 'Team Média',
            description: 'Production de contenu vidéo et média. Gestion de la communication visuelle et audiovisuelle.'
        },
        'storytelling-cm': {
            icon: '<i class="fas fa-comment-dots"></i>',
            title: 'Storytelling / CM',
            person: 'Blondy',
            description: 'Création de contenu et storytelling. Gestion des réseaux sociaux et de la communication digitale.'
        },
        'djs-artistes': {
            icon: '<i class="fas fa-music"></i>',
            title: 'DJs & Artistes',
            person: 'Résidents',
            description: 'Programmation artistique et performances. Gestion des résidences et des événements musicaux.'
        },
        'benevoles': {
            icon: '<i class="fas fa-people-carry"></i>',
            title: 'Bénévoles',
            person: 'Team Terrain',
            description: 'Support opérationnel sur le terrain. Participation aux événements et activités de l\'association.'
        },
        'techniciens': {
            icon: '<i class="fas fa-tools"></i>',
            title: 'Techniciens',
            person: 'Team Montage',
            description: 'Installation et maintenance technique. Support logistique et technique lors des événements.'
        }
    };

    // Ouvrir le modal au clic sur une carte
    roleCards.forEach(card => {
        card.addEventListener('click', function() {
            const roleId = this.getAttribute('data-role');
            const roleData = rolesData[roleId];

            if (roleData) {
                modalIcon.innerHTML = roleData.icon;
                modalTitle.textContent = roleData.title;
                modalPerson.textContent = roleData.person;
                modalDescription.textContent = roleData.description;
                modal.classList.add('active');
            }
        });
    });

    // Fermer le modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
    });

    // Fermer le modal en cliquant sur l'overlay
    modal.querySelector('.modal-overlay').addEventListener('click', function() {
        modal.classList.remove('active');
    });

    // Fermer le modal avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
});

