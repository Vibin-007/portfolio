// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTheme();
    initLoader();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initParticles();
    initSkillBars();
    initContactForm();
});

// Theme Toggle Functionality
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Theme toggle event
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'dark' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add ripple effect to toggle
        createRipple(this, e);
        
        console.log('Theme switched to:', newTheme);
    });
    
    // Create ripple effect for button
    function createRipple(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Add ripple keyframes if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Loading Screen
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 800);
    });
}

// Navigation Functionality - FIXED
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('.btn');
    
    // Header scroll effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
        updateActiveLink();
    });
    
    // Active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scroll function
    function smoothScrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = 80;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            // Smooth scroll with animation
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            console.log('Scrolling to section:', targetId);
            return true;
        }
        return false;
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (smoothScrollToSection(targetId)) {
                // Close mobile menu if open
                if (window.closeMobileMenu) {
                    window.closeMobileMenu();
                }
            }
        });
    });
    
    // Smooth scroll for hero buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollToSection(href);
            }
        });
    });
    
    // Initial active link setup
    setTimeout(updateActiveLink, 100);
}

// Mobile Menu
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
        console.log('Mobile menu toggled');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => closeMobileMenu(), 300);
        });
    });
    
    function toggleMobileMenu() {
        const isActive = navToggle.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        navToggle.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Make closeMobileMenu globally accessible
    window.closeMobileMenu = function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    };
}

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger specific animations based on section
                const sectionClass = entry.target.className;
                
                if (sectionClass.includes('skills')) {
                    setTimeout(animateSkillBars, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-header, .about-text, .education-item, .skill-item, .project-card, .certificate-item, .workshop-card, .contact-info, .contact-form-wrapper');
    
    animateElements.forEach((el, index) => {
        // Add appropriate animation classes
        if (el.classList.contains('section-header')) {
            el.classList.add('fade-in-up');
        } else if (el.classList.contains('education-item')) {
            el.classList.add('fade-in-left', `stagger-${(index % 3) + 1}`);
        } else if (el.classList.contains('skill-item')) {
            el.classList.add('fade-in-left', `stagger-${(index % 4) + 1}`);
        } else if (el.classList.contains('certificate-item')) {
            el.classList.add('scale-in', `stagger-${(index % 4) + 1}`);
        } else if (el.classList.contains('workshop-card')) {
            el.classList.add('scale-in');
        } else {
            el.classList.add('fade-in-up');
        }
        
        observer.observe(el);
    });
    
    // Observe sections for skill animation trigger
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Particle Effect for Hero Section
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth > 768 ? 50 : 25;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.8 + 0.2};
        `;
        
        const particleData = {
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: Math.random() * 100,
            maxLife: Math.random() * 300 + 200
        };
        
        particles.push(particleData);
        particlesContainer.appendChild(particle);
    }
    
    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life++;
            
            // Wrap around screen edges
            if (particle.x < -10) particle.x = window.innerWidth + 10;
            if (particle.x > window.innerWidth + 10) particle.x = -10;
            if (particle.y < -10) particle.y = window.innerHeight + 10;
            if (particle.y > window.innerHeight + 10) particle.y = -10;
            
            // Update DOM position
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            
            // Pulse effect
            const pulseIntensity = Math.sin(particle.life * 0.02) * 0.4 + 0.6;
            particle.element.style.opacity = pulseIntensity;
            
            // Size variation
            const size = Math.sin(particle.life * 0.015) * 1.5 + 3;
            particle.element.style.width = size + 'px';
            particle.element.style.height = size + 'px';
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Mouse interaction for desktop
    if (window.innerWidth > 768) {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        setInterval(() => {
            particles.forEach(particle => {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    const angle = Math.atan2(dy, dx);
                    particle.vx -= Math.cos(angle) * force * 0.02;
                    particle.vy -= Math.sin(angle) * force * 0.02;
                }
                
                // Apply friction
                particle.vx *= 0.99;
                particle.vy *= 0.99;
            });
        }, 16);
    }
}

// Skill Bar Animations
function initSkillBars() {
    window.animateSkillBars = function() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                const skillLevel = item.dataset.skill;
                const progressBar = item.querySelector('.skill-progress');
                
                if (progressBar && !progressBar.classList.contains('animated')) {
                    progressBar.style.width = skillLevel + '%';
                    progressBar.classList.add('animated');
                    console.log(`Animating skill: ${skillLevel}%`);
                }
            }, index * 200);
        });
    };
}



// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const optimizedScrollHandler = throttle(function() {
    // Handle scroll events here if needed
}, 16);

const optimizedResizeHandler = debounce(function() {
    // Handle resize events here if needed
    const particles = document.querySelectorAll('.particles-container div');
    particles.forEach(particle => {
        const left = parseInt(particle.style.left);
        const top = parseInt(particle.style.top);
        
        if (left > window.innerWidth) {
            particle.style.left = '0px';
        }
        if (top > window.innerHeight) {
            particle.style.top = '0px';
        }
    });
}, 250);

window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('resize', optimizedResizeHandler);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Handle keyboard navigation for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function(e) {
    document.body.classList.remove('keyboard-navigation');
});

// Initialize when DOM is ready
console.log('Vibin D Portfolio initialized');
console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
console.log('Stored theme:', localStorage.getItem('theme'));







 const cursorFollower = document.getElementById('cursorFollower');
        const cursorName = document.getElementById('cursorName');
        const name = "VIBIN"; // Change this to your actual name
        let mouseX = 0;
        let mouseY = 0;
        let isMoving = false;
        let hideTimeout;
        let letterIndex = 0;

        // Create letter elements
        function createLetters() {
            cursorName.innerHTML = '';
            for (let i = 0; i < name.length; i++) {
                const letter = document.createElement('span');
                letter.classList.add('letter');
                letter.textContent = name[i] === ' ' ? '\u00A0' : name[i]; // Non-breaking space for spaces
                cursorName.appendChild(letter);
            }
        }

        // Animate letters sequentially
        function animateLetters() {
            const letters = cursorName.querySelectorAll('.letter');
            
            // Reset all animations
            letters.forEach(letter => {
                letter.classList.remove('animate');
            });
            
            // Animate letters one by one
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('animate');
                    setTimeout(() => {
                        letter.classList.remove('animate');
                    }, 600);
                }, index * 100);
            });
        }

        // Smooth cursor following
        function updateCursorPosition() {
            cursorFollower.style.left = mouseX + 'px';
            cursorFollower.style.top = mouseY + 'px';
        }

        // Show cursor name
        function showCursor() {
            if (!isMoving) {
                isMoving = true;
                cursorFollower.style.opacity = '1';
                animateLetters();
            }
            
            // Clear any existing timeout
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
            
            // Set new timeout to hide after 1 second of no movement
            hideTimeout = setTimeout(() => {
                hideCursor();
            }, 1000);
        }

        // Hide cursor name
        function hideCursor() {
            isMoving = false;
            cursorFollower.style.opacity = '0';
        }

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            updateCursorPosition();
            showCursor();
        });

        // Hide when mouse leaves window
        document.addEventListener('mouseleave', () => {
            hideCursor();
        });

        // Show when mouse enters window
        document.addEventListener('mouseenter', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            updateCursorPosition();
            showCursor();
        });

        // Initial setup
        createLetters();
        hideCursor();
