document.addEventListener('DOMContentLoaded', function() {
    console.log('Fundación Kinal - Rediseño Profesional');

    initNavbar();
    initScrollAnimations();
    initStatsCounter();
    initGalleryFilter();
    initAlumniSlider();
    initSmoothScroll();
    initScrollToTop();
    initWhatsAppButton();
    initProgramCards();
    initDonateCards();
    
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});