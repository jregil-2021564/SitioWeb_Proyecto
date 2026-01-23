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

    setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        setTimeout(() => {
            document.body.style.background = 'var(--light-bg)';
            document.body.style.transition = 'background 1s ease';
        }, 500);
    }, 500);
});

setTimeout(() => {
    document.querySelectorAll('.animate-card').forEach(card => {
        card.classList.add('visible');
    });
}, 500);

setTimeout(() => {
    document.querySelector('.animate-fade').classList.add('visible');
}, 1200);
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.querySelector('.nav-links-container');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateActiveNavLink();
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            menuToggle.classList.toggle('active');

            const bars = menuToggle.querySelectorAll('.menu-bar');
            if (navLinksContainer.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinksContainer.classList.remove('active');
            menuToggle.classList.remove('active');
            
            const bars = menuToggle.querySelectorAll('.menu-bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], .hero-video-container');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                if (entry.target.classList.contains('stat-card')) {
                    animateStatProgress(entry.target);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const suffix = statNumber.nextElementSibling?.classList.contains('stat-suffix') 
                    ? statNumber.nextElementSibling.textContent 
                    : '';
                const duration = 2000; 
                
                animateCounter(statNumber, target, duration, suffix);

                counterObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(statNumber => {
        counterObserver.observe(statNumber);
    });
}

function animateCounter(element, target, duration, suffix = '') {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

function animateStatProgress(statCard) {
    const progressBar = statCard.querySelector('.stat-progress');
    if (progressBar) {
        progressBar.style.transition = 'transform 2s ease-out';
    }
}

function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));

            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initAlumniSlider() {
    const track = document.querySelector('.alumni-track');
    const cards = document.querySelectorAll('.alumni-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const totalCards = cards.length;

    cards[0].classList.add('active');
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalCards;
            updateSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateSlider();
        });
    }

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSlider();
    }, 8000);
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

function initProgramCards() {
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        const btn = card.querySelector('.program-btn');
        
        if (btn) {
            btn.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    this.style.transform = '';

                    const programTitle = card.querySelector('.program-title').textContent;
                    console.log(`Abriendo más información sobre: ${programTitle}`);

                    alert(`Más información sobre: ${programTitle}`);
                }, 200);
            });
        }

        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.program-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.8) 100%)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.program-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%)';
            }
        });
    });
}

function initDonateCards() {
    const donateCards = document.querySelectorAll('.donate-card');
    
    donateCards.forEach(card => {
        const btn = card.querySelector('.donate-btn');
        
        if (btn) {
            btn.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    this.style.transform = '';

                    const donateTitle = card.querySelector('.donate-title').textContent;
                    console.log(`Iniciando proceso de donación para: ${donateTitle}`);

                    alert(`Redirigiendo al proceso de donación: ${donateTitle}`);
                }, 200);
            });
        }
    });
}

window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-video-container');
    const scrollPosition = window.scrollY;
    
    if (hero && scrollPosition < hero.offsetHeight) {
        const parallaxValue = scrollPosition * 0.5;
        hero.style.transform = `translateY(${parallaxValue}px)`;
    }
});

window.addEventListener('load', function() {
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 500);
});

function playClickSound() {
    const clickSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
    clickSound.volume = 0.3;
    clickSound.play().catch(e => console.log('Error playing sound:', e));
}

document.addEventListener('click', function(e) {
    if (e.target.matches('.program-btn, .donate-btn, .action-btn, .btn-hero')) {
        playClickSound();
    }
});

function initTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const lines = heroTitle.querySelectorAll('.hero-line');
    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentLine = lines[lineIndex];
        const text = currentLine.textContent;
        
        if (!isDeleting && charIndex <= text.length) {
            currentLine.textContent = text.substring(0, charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else if (isDeleting && charIndex >= 0) {
            currentLine.textContent = text.substring(0, charIndex);
            charIndex--;
            setTimeout(typeWriter, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                lineIndex = (lineIndex + 1) % lines.length;
            }
            setTimeout(typeWriter, 500);
        }
    }
    
    // Comentar/descomentar para activar/desactivar
    //setTimeout(typeWriter, 1000);
}

//initTypewriter();

function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '30px';
    themeToggle.style.left = '30px';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.background = 'var(--primary-blue)';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.boxShadow = 'var(--shadow-md)';
    themeToggle.style.display = 'flex';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.justifyContent = 'center';
    themeToggle.style.fontSize = '20px';
    themeToggle.style.transition = 'var(--transition-normal)';
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.style.background = 'var(--gold)';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.style.background = 'var(--primary-blue)';
        }
    });