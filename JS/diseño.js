
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

// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    // Configurar navegación entre páginas
    function navigateToPage(pageId) {
        // Ocultar todas las páginas
        pages.forEach(page => {
            page.classList.remove('active');
            page.classList.add('hidden');
        });
        
        // Mostrar la página seleccionada
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            targetPage.classList.add('active');
            
            // Scroll al inicio de la página
            window.scrollTo(0, 0);
        }
    }
    
    // Manejar clics en enlaces del menú
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();
                const pageId = href.substring(1);
                navigateToPage(pageId);

                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const pageId = href.substring(1);
                navigateToPage(pageId);
            }
        });
    });

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    function checkScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); 

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    const currentHash = window.location.hash.substring(1);
    if (currentHash && document.getElementById(currentHash)) {
        navigateToPage(currentHash);
    } else {

        navigateToPage('pagina-principal');
    }

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '15px 0';
        }
    });

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.textContent.includes('Exploración Espacial')) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        setTimeout(typeWriter, 500);
    }
});