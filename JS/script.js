
document.addEventListener('DOMContentLoaded', function() {

    const menuMovil = document.querySelector('.menu-movil');
    const navegacion = document.querySelector('.navegacion');
    
    if (menuMovil && navegacion) {
        menuMovil.addEventListener('click', function() {
            navegacion.classList.toggle('mostrar');
        });

        const enlacesNav = navegacion.querySelectorAll('a');
        enlacesNav.forEach(enlace => {
            enlace.addEventListener('click', function() {
                navegacion.classList.remove('mostrar');
            });
        });
    }

    const elementosAnimados = document.querySelectorAll('.animacion-tarjeta, .animacion-item, .animacion-proyecto');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });

    const libro = document.querySelector('.libro');
    const botonLibro = document.querySelector('.boton-libro');
    
    if (libro && botonLibro) {
        libro.addEventListener('click', function(e) {
            if (!e.target.closest('.boton-libro')) {
                botonLibro.click();
            }
        });

        libro.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        libro.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        libro.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    const imagenesAnimadas = document.querySelectorAll('.marco-imagen, .imagen-galeria img');
    
    const observerImagenes = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    imagenesAnimadas.forEach(imagen => {
        observerImagenes.observe(imagen);
    });

    const anioActual = new Date().getFullYear();
    const elementosAnio = document.querySelectorAll('footer p');
    
    elementosAnio.forEach(elemento => {
        if (elemento.textContent.includes('2026')) {
            elemento.textContent = elemento.textContent.replace('2026', anioActual);
        }
    });
});