
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

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.explanation-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        setTimeout(() => {
            card.classList.add('animated');
        }, 300 + (index * 200));
    });

    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width') + '%';
            bar.style.width = width;
        }, 1000 + (index * 300));
    });

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const logoSection = document.querySelector('.footer-logo-section');
        if (logoSection) {
            logoSection.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.explanation-card, .comparison-section, .conclusion');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.animation = 'wordAppear 0.5s forwards';
        }, index * 100);
    });

    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });


