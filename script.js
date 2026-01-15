// Inicializar iconos Lucide
document.addEventListener("DOMContentLoaded", function() {
    lucide.createIcons();
});

// ========================================
// MENÚ MÓVIL RESPONSIVE
// ========================================
document.addEventListener("DOMContentLoaded", function() {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const body = document.body;

    // Verificar que los elementos existen
    if (!navToggle || !navMenu) return;

    // Toggle menú móvil
    navToggle.addEventListener("click", function(e) {
        e.preventDefault();
        toggleMobileMenu();
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // Cerrar menú con tecla Escape
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && navMenu.classList.contains("active")) {
            closeMobileMenu();
        }
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener("click", function(e) {
        if (!navToggle.contains(e.target) && 
            !navMenu.contains(e.target) && 
            navMenu.classList.contains("active")) {
            closeMobileMenu();
        }
    });

    // Manejar resize de ventana
    window.addEventListener("resize", function() {
        if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
            closeMobileMenu();
        }
    });

    // Funciones del menú
    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains("active");
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        navMenu.classList.add("active");
        navToggle.classList.add("active");
        body.style.overflow = "hidden"; // Prevenir scroll del body
        
        // Accesibilidad
        navToggle.setAttribute("aria-expanded", "true");
        navMenu.setAttribute("aria-hidden", "false");
    }

    function closeMobileMenu() {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        body.style.overflow = ""; // Restaurar scroll del body
        
        // Accesibilidad
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.setAttribute("aria-hidden", "true");
    }

    // Inicializar atributos de accesibilidad
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
    navMenu.setAttribute("aria-hidden", "true");
});

// ========================================
// NAVEGACIÓN SUAVE MEJORADA
// ========================================
document.addEventListener("DOMContentLoaded", function() {
    // Navegación suave mejorada para todos los enlaces internos
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector(".header") ? 
                    document.querySelector(".header").offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
                
                // Cerrar menú móvil si está abierto
                const navMenu = document.querySelector(".nav-menu");
                if (navMenu && navMenu.classList.contains("active")) {
                    const closeMobileMenu = () => {
                        navMenu.classList.remove("active");
                        document.querySelector(".nav-toggle").classList.remove("active");
                        document.body.style.overflow = "";
                    };
                    closeMobileMenu();
                }
            }
        });
    });
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector(".header");
    if (!header) return;

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function() {
        const currentScrollY = window.scrollY;
        
        // Añadir/quitar efecto cuando se hace scroll
        if (currentScrollY > 100) {
            header.style.background = "rgba(18, 18, 39, 0.98)";
            header.style.backdropFilter = "blur(20px)";
        } else {
            header.style.background = "rgba(18, 18, 39, 0.95)";
            header.style.backdropFilter = "blur(10px)";
        }
        
        lastScrollY = currentScrollY;
    });
});

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function() {
    const animatedElements = document.querySelectorAll(
        ".validacion-item, .servicio-card, .diferenciador-column, .cta-option"
    );

    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });
});

// Efecto parallax
document.addEventListener("scroll", function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".bg-circle");

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Hover en tarjetas con efecto más suave
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(
        ".validacion-item, .servicio-card, .cta-option, .red-social"
    );

    cards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-8px) scale(1.02)";
        });

        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0) scale(1)";
        });
    });
});

// Navegación activa
document.addEventListener("scroll", function() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Efecto de escritura del título del hero
document.addEventListener("DOMContentLoaded", function() {
    const heroTitle = document.querySelector(".hero-title");
    if (!heroTitle) return;

    // Texto final
    const finalText = "Tu negocio funciona.\nTú ya no.";

    // Limpiar contenido previo
    heroTitle.innerHTML = "";
    heroTitle.style.opacity = "1";

    let charIndex = 0;

    // Escribir carácter por carácter
    function typeWriter() {
        if (charIndex < finalText.length) {
            const char = finalText.charAt(charIndex);
            if (char === '\n') {
                heroTitle.innerHTML += '<br>';
            } else {
                heroTitle.textContent += char;
            }
            charIndex++;
            
            // Ritmo natural
            const isPause = /[\s,.]/.test(char);
            const delay = isPause ? 90 : 55;
            setTimeout(typeWriter, delay);
        }
    }

    // Iniciar con una pequeña pausa
    setTimeout(typeWriter, 400);
});

// Efecto de aparición gradual para elementos al hacer scroll
document.addEventListener("DOMContentLoaded", function() {
    const fadeElements = document.querySelectorAll(".section-header, .validacion-statement, .reencuadre-content");

    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        fadeObserver.observe(el);
    });
});

// Mejora de accesibilidad para navegación por teclado
document.addEventListener("DOMContentLoaded", function() {
    const focusableElements = document.querySelectorAll(
        "a, button, input, textarea, select, [tabindex]:not([tabindex=\"-1\"])"
    );

    focusableElements.forEach(element => {
        element.addEventListener("focus", function() {
            this.style.outline = "2px solid var(--primary)";
            this.style.outlineOffset = "2px";
        });

        element.addEventListener("blur", function() {
            this.style.outline = "none";
        });
    });
});

// ========================================
// UTILIDADES ADICIONALES RESPONSIVE
// ========================================

// Detectar dispositivo táctil
function isTouchDevice() {
    return (("ontouchstart" in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// Añadir clase al body si es dispositivo táctil
if (isTouchDevice()) {
    document.body.classList.add("touch-device");
} else {
    document.body.classList.add("no-touch");
}

// Optimización de rendimiento para scroll
let ticking = false;

function updateScrollEffects() {
    // Aquí puedes añadir efectos adicionales de scroll
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

window.addEventListener("scroll", requestScrollUpdate);
