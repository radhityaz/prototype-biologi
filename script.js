// DOM Elements
const carouselTrack = document.getElementById('carouselTrack');
const paginationDots = document.getElementById('paginationDots');
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');

// Carousel State
let currentSlide = 0;
let isScrolling = false;

// Card data for navigation
const cardPages = {
    'makromolekul': 'makromolekul.html',
    'genetika': 'genetika.html',
    'sel-organel': 'sel-organel.html',
    'sistem-tubuh': 'sistem-tubuh.html',
    'ekosistem': 'ekosistem.html',
    'evolusi': 'evolusi.html'
};

// Back button functionality
function goBack() {
    console.log('goBack function called - redirecting to index');
    // Always redirect to index page for now
    window.location.href = 'index.html';
}

// Initialize carousel
function initCarousel() {
    updateCarouselPosition();
    updatePaginationDots();
    
    // Add event listeners to cards
    cards.forEach(card => {
        card.addEventListener('click', handleCardClick);
        card.addEventListener('keydown', handleCardKeydown);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        // Add specific event listeners to card buttons
        const cardButton = card.querySelector('.card-button');
        if (cardButton) {
            cardButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click from firing
                handleCardClick(e); // Use the same handler but with button as target
            });
            cardButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCardClick(e);
                }
            });
        }
    });
    
    // Add event listeners to pagination dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
            }
        });
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    });
    
    // Touch/swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        carouselTrack.style.transition = 'none';
    });
    
    carouselTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        const currentTransform = -currentSlide * getCardWidth();
        carouselTrack.style.transform = `translateX(${currentTransform + diffX}px)`;
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        carouselTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        const diffX = currentX - startX;
        const threshold = getCardWidth() * 0.3;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentSlide > 0) {
                goToSlide(currentSlide - 1);
            } else if (diffX < 0 && currentSlide < cards.length - 1) {
                goToSlide(currentSlide + 1);
            } else {
                updateCarouselPosition();
            }
        } else {
            updateCarouselPosition();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.carousel-section')) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    if (currentSlide > 0) goToSlide(currentSlide - 1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (currentSlide < cards.length - 1) goToSlide(currentSlide + 1);
                    break;
            }
        }
    });
    
    // Auto-scroll on mouse wheel (optional)
    carouselTrack.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        e.preventDefault();
        isScrolling = true;
        
        if (e.deltaY > 0 && currentSlide < cards.length - 1) {
            goToSlide(currentSlide + 1);
        } else if (e.deltaY < 0 && currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    });
}

// Get card width including gap
function getCardWidth() {
    const card = cards[0];
    const cardStyle = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth;
    const gap = parseInt(window.getComputedStyle(carouselTrack).gap) || 16;
    return cardWidth + gap;
}

// Update carousel position
function updateCarouselPosition() {
    const cardWidth = getCardWidth();
    const offset = -currentSlide * cardWidth;
    carouselTrack.style.transform = `translateX(${offset}px)`;
}

// Update pagination dots
function updatePaginationDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
        dot.setAttribute('aria-pressed', index === currentSlide);
    });
}

// Go to specific slide
function goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < cards.length) {
        currentSlide = slideIndex;
        updateCarouselPosition();
        updatePaginationDots();
        
        // Focus management for accessibility
        cards[currentSlide].focus();
    }
}

// Handle card click
function handleCardClick(e) {
    let card = e.currentTarget;
    
    // If the click came from a button, get the parent card
    if (e.target.classList.contains('card-button')) {
        card = e.target.closest('.card');
    }
    
    const page = card.getAttribute('data-page');
    
    if (cardPages[page]) {
        navigateToPage(cardPages[page]);
    }
}

// Handle card keyboard interaction
function handleCardKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(e);
    }
}

// Page transition with whooshh effect
function navigateToPage(pageUrl) {
    // Create transition overlay
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    // Add whooshh sound effect (optional - requires audio file)
    // const audio = new Audio('whooshh.mp3');
    // audio.play().catch(() => {}); // Ignore if audio fails
    
    // Trigger transition
    setTimeout(() => {
        transition.classList.add('active');
    }, 10);
    
    // Navigate after animation
    setTimeout(() => {
        window.location.href = pageUrl;
    }, 600);
}

// Responsive handling
function handleResize() {
    updateCarouselPosition();
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
}

// Auto-play functionality
function initAutoPlay() {
    let autoPlayInterval;
    let particleInterval;
    let colorCycleInterval;
    
    // Ultra-smooth continuous scrolling (NO PAUSES!)
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % cards.length;
            goToSlide(nextSlide);
            
            // Simple transition without effects
            
            // Random color pulse on cards
            addRandomColorPulse();
        }, 3000); // Faster transitions for more "lebay" effect
    }
    
    // Removed particle system for simplicity
    
    // Dynamic color cycling
    function initColorCycling() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
        let colorIndex = 0;
        
        colorCycleInterval = setInterval(() => {
            document.documentElement.style.setProperty('--accent-color', colors[colorIndex]);
            colorIndex = (colorIndex + 1) % colors.length;
        }, 2000);
    }
    
    // Start all the over-engineered features
    startAutoPlay();
    // Particle system removed for clean interface
    initColorCycling();
    
    // NO PAUSE EVENTS - TRULY CONTINUOUS!
    // (Removed all hover, focus, and touch pause events for maximum "lebay")
}

// Visual effects removed for clean interface

function addRandomColorPulse() {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    if (randomCard) {
        randomCard.style.animation = 'tajMahalPulse 1s ease-in-out';
        setTimeout(() => {
            randomCard.style.animation = '';
        }, 1000);
    }
}

// Cursor trail removed for clean interface

// Performance optimization
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 150);
    });
    
    // Preload next/previous slides
    function preloadSlides() {
        const prevSlide = currentSlide > 0 ? currentSlide - 1 : cards.length - 1;
        const nextSlide = currentSlide < cards.length - 1 ? currentSlide + 1 : 0;
        
        [prevSlide, nextSlide].forEach(slideIndex => {
            const card = cards[slideIndex];
            if (card) {
                card.style.willChange = 'transform';
                setTimeout(() => {
                    card.style.willChange = 'auto';
                }, 1000);
            }
        });
    }
    
    // Call preload on slide change
    const originalGoToSlide = goToSlide;
    goToSlide = function(slideIndex) {
        originalGoToSlide(slideIndex);
        preloadSlides();
    };
// Performance optimization function
function optimizePerformance() {
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 150);
    });
    
    // Preload next/previous slides
    function preloadSlides() {
        const prevSlide = currentSlide > 0 ? currentSlide - 1 : cards.length - 1;
        const nextSlide = currentSlide < cards.length - 1 ? currentSlide + 1 : 0;
        
        [prevSlide, nextSlide].forEach(slideIndex => {
            const card = cards[slideIndex];
            if (card) {
                card.style.willChange = 'transform';
                setTimeout(() => {
                    card.style.willChange = 'auto';
                }, 1000);
            }
        });
    }
    
    // Call preload on slide change
    const originalGoToSlide = goToSlide;
    goToSlide = function(slideIndex) {
        originalGoToSlide(slideIndex);
        preloadSlides();
    };
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initAnimations();
    optimizePerformance();
    
    // Additional features
    initAutoPlay();
    // Cursor trail removed for simplicity
    
    // Add loading complete class for animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        cards.forEach(card => {
            card.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page is visible
        cards.forEach(card => {
            card.style.animationPlayState = 'running';
        });
    }
});

// Export functions for potential external use
window.BiologiCarousel = {
    goToSlide,
    getCurrentSlide: () => currentSlide,
    getTotalSlides: () => cards.length
};