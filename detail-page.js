// Clean Detail Page JavaScript

// Global variables for mega effects
let isPageLoaded = false;
let effectsEnabled = true;
let particleCount = 0;
const maxParticles = 15; // Reduced from 50

// Initialize all mega lebay effects
function initDetailPageEffects() {
    console.log('🚀 Initializing MEGA LEBAY Detail Page Effects!');
    
    // Wait for page to fully load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startMegaEffects);
    } else {
        startMegaEffects();
    }
}

// Start all mega effects
function startMegaEffects() {
    isPageLoaded = true;
    
    // Initialize core effects
    initNavigationEffects();
    initScrollEffects();
    initInteractiveElements();
    initParticleSystem();
    initCursorEffects();
    initTypingAnimation();
    initMegaTransitions();
    
    // Start continuous effects
    startContinuousEffects();
    
    console.log('✨ All MEGA LEBAY effects initialized!');
}

// Navigation mega effects
function initNavigationEffects() {
    const nav = document.querySelector('.mega-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (nav) {
        // Add scroll-based nav effects
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled > 100) {
                nav.style.background = 'linear-gradient(135deg, rgba(0,0,0,0.98), rgba(0,0,0,0.9))';
                nav.style.boxShadow = '0 10px 50px rgba(0,0,0,0.5)';
            } else {
                nav.style.background = 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,0,0,0.7))';
                nav.style.boxShadow = 'none';
            }
        });
    }
    
    // Add mega hover effects to nav links
    navLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
            createNavSparkle(link);
            link.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click ripple effect
        link.addEventListener('click', (e) => {
            createRippleEffect(e, link);
        });
    });
}

// Scroll-based mega effects
function initScrollEffects() {
    const cards = document.querySelectorAll('.detail-card, .mega-cta-section');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                createElementSparkle(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.95)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(card);
    });
    
    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.detail-main::before');
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.3;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Interactive elements mega effects
function initInteractiveElements() {
    const buttons = document.querySelectorAll('.mega-btn');
    const cards = document.querySelectorAll('.detail-card');
    
    // Mega button effects
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            createButtonGlow(button);
            button.style.transform = 'translateY(-8px) scale(1.08)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', (e) => {
            createMegaExplosion(e, button);
        });
    });
    
    // Card interaction effects
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createCardAura(card);
        });
        
        card.addEventListener('mousemove', (e) => {
            createFollowCursor(e, card);
        });
        
        card.addEventListener('mouseleave', () => {
            removeCardEffects(card);
        });
    });
}

// Particle system removed for clean interface

// Cursor trail effects
function initCursorEffects() {
    const trail = [];
    const trailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        if (!effectsEnabled) return;
        
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Create cursor sparkles occasionally (reduced frequency)
        if (Math.random() < 0.03) { // Reduced from 0.1 to 0.03
            createCursorSparkle(e.clientX, e.clientY);
        }
    });
}

// Typing animation for titles
function initTypingAnimation() {
    const titles = document.querySelectorAll('.mega-title');
    
    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '3px solid var(--accent-color)';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    });
}

// Mega page transitions
function initMegaTransitions() {
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.hostname === window.location.hostname) {
                e.preventDefault();
                createPageTransition(link.href);
            }
        });
    });
}

// Continuous background effects
function startContinuousEffects() {
    // Color cycling for accent elements
    setInterval(() => {
        if (!effectsEnabled) return;
        
        const accentElements = document.querySelectorAll('.mega-title, .nav-logo');
        accentElements.forEach(element => {
            const hue = (Date.now() / 50) % 360;
            element.style.filter = `hue-rotate(${hue}deg)`;
        });
    }, 100);
    
    // Random element highlights
    setInterval(() => {
        if (!effectsEnabled) return;
        
        const cards = document.querySelectorAll('.detail-card');
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        
        if (randomCard && Math.random() < 0.3) {
            createRandomHighlight(randomCard);
        }
    }, 5000);
    
    // Floating text effects removed
}

// Effect creation functions
// Navigation sparkles removed for clean interface

function createRippleEffect(event, element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.6);
        transform: scale(0);
        animation: ripple-expand 0.6s linear;
        pointer-events: none;
        left: ${event.clientX - rect.left - 10}px;
        top: ${event.clientY - rect.top - 10}px;
        width: 20px;
        height: 20px;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Element sparkles removed for clean interface

function createButtonGlow(button) {
    button.style.boxShadow = '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.4)';
    
    setTimeout(() => {
        button.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
    }, 300);
}

function createMegaExplosion(event, element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) { // Reduced explosion particles from 15 to 8
        const particle = document.createElement('div');
        const angle = (i / 15) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #FFD700, #FF6B35);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1001;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            animation: explosion-particle 1.5s ease-out forwards;
        `;
        
        particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1500);
    }
}

function createCardAura(card) {
    card.style.boxShadow = '0 0 50px rgba(255,255,255,0.3), 0 0 100px rgba(255,255,255,0.1)';
}

function createFollowCursor(event, card) {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 20;
    
    card.style.transform = `translateY(-10px) scale(1.02) rotateX(${y}deg) rotateY(${x}deg)`;
}

function removeCardEffects(card) {
    card.style.boxShadow = '0 15px 50px rgba(0,0,0,0.1)';
    card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
}

// Floating particles and cursor sparkles removed for clean interface

function createPageTransition(url) {
    const overlay = document.createElement('div');
    
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, var(--accent-color), var(--secondary-color));
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.5s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2rem;
        font-weight: bold;
    `;
    
    overlay.innerHTML = '🚀 MEGA TRANSITION...';
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

function createRandomHighlight(element) {
    const originalBorder = element.style.border;
    element.style.border = '3px solid rgba(255,215,0,0.8)';
    element.style.boxShadow = '0 0 30px rgba(255,215,0,0.5)';
    
    setTimeout(() => {
        element.style.border = originalBorder;
        element.style.boxShadow = '0 15px 50px rgba(0,0,0,0.1)';
    }, 2000);
}

// Floating text removed for clean interface

// Performance optimization
function toggleEffects() {
    effectsEnabled = !effectsEnabled;
    console.log(`Effects ${effectsEnabled ? 'enabled' : 'disabled'}`);
}

// Keyboard shortcuts for effects
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        toggleEffects();
    }
});

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    /* All floating and sparkle animations removed for clean interface */
`;
document.head.appendChild(style);

// Initialize everything when script loads
initDetailPageEffects();

// Export functions for external use
window.DetailPageEffects = {
    toggle: toggleEffects,
    createSparkle: createElementSparkle,
    createExplosion: createMegaExplosion
};

console.log('🎆 MEGA LEBAY Detail Page JavaScript loaded successfully!');