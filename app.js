// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initTheme();
    initLoader();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    // initParticles(); // Called by initConstellationEffect or directly
    // initParticles(); // Disabled
    initContactForm();
    initContactHub();


    // Premium Features
    initScrollProgress();
    initTypingEffect(); // Restored to clean typewriter
    // initConstellationEffect(); // Disabled
    // init3DTiltEffect(); // Disabled
    initCursor();
    initBackToTop();
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
    themeToggle.addEventListener('click', function (e) {
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
    window.addEventListener('load', function () {
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

    window.addEventListener('scroll', function () {
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
        const bgText = document.getElementById('bgSectionText');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');

                        // Update background text
                        if (bgText) {
                            let displayText = sectionId.toUpperCase();
                            if (sectionId === 'hero') displayText = 'HOME';
                            if (sectionId === 'contact') displayText = 'CONNECT';

                            if (bgText.textContent !== displayText) {
                                bgText.style.opacity = '0';
                                setTimeout(() => {
                                    bgText.textContent = displayText;
                                    bgText.style.opacity = ''; // Reset to CSS default
                                }, 300);
                            }
                        }
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
        link.addEventListener('click', function (e) {
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
        button.addEventListener('click', function (e) {
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
    navToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
        console.log('Mobile menu toggled');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
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
    window.closeMobileMenu = function () {
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

    const observer = new IntersectionObserver(function (entries) {
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
    const animateElements = document.querySelectorAll('.section-header, .about-text, .education-item, .tech-card, .project-card, .contact-info, .contact-form-wrapper, .ds-card');

    animateElements.forEach((el, index) => {
        // Add appropriate animation classes
        if (el.classList.contains('section-header')) {
            el.classList.add('fade-in-up');
        } else if (el.classList.contains('education-item')) {
            el.classList.add('fade-in-left', `stagger-${(index % 3) + 1}`);
        } else if (el.classList.contains('tech-card')) {
            el.classList.add('fade-in-left', `stagger-${(index % 4) + 1}`);
        } else if (el.classList.contains('ds-card')) {
            el.classList.add('fade-in-up', `stagger-${(index % 3) + 1}`);
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
// Particle Effect for Hero Section (Constellation Upgrade)
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    // Clear existing canvas if any
    particlesContainer.innerHTML = '';

    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    particlesContainer.appendChild(canvas);

    let particles = [];
    const particleCount = window.innerWidth > 768 ? 80 : 40;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 1;
            this.vy = (Math.random() - 0.5) * 1;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();

        particles.forEach(particle => {
            particle.update();
            particle.draw();

            // Connect particles
            particles.forEach(other => {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = primaryColor;
                    ctx.globalAlpha = (150 - distance) / 150 * 0.2;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            });
        });

        // Mouse interaction
        if (mouse.x && mouse.y) {
            particles.forEach(particle => {
                const dx = particle.x - mouse.x;
                const dy = particle.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    ctx.beginPath();
                    ctx.strokeStyle = primaryColor;
                    ctx.globalAlpha = (200 - distance) / 200 * 0.4;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            });
        }

        requestAnimationFrame(animate);
    }

    const mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    init();
    animate();
}

// Skill Bar Animations
function initSkillBars() {
    window.animateSkillBars = function () {
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
    return function () {
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
const optimizedScrollHandler = throttle(function () {
    // Handle scroll events here if needed
}, 16);

const optimizedResizeHandler = debounce(function () {
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
document.addEventListener('keydown', function (e) {
    // Handle keyboard navigation for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function (e) {
    document.body.classList.remove('keyboard-navigation');
});

// Initialize when DOM is ready
console.log('Vibin D Portfolio initialized');
console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
console.log('Stored theme:', localStorage.getItem('theme'));










// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
}

// Typing Effect
// Clean Typewriter Effect
function initTypingEffect() {
    const textElement = document.querySelector('.typing-text');
    if (!textElement) return;

    const words = ["Data Scientist", "Python Developer", "Machine Learning Engineer", "Full Stack Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Constellation Effect (Upgraded Particles)
function initConstellationEffect() {
    initParticles(); // Use existing basis but upgrade drawing
}

// 3D Tilt Effect for Hero
function init3DTiltEffect() {
    const heroText = document.querySelector('.hero-text');
    if (!heroText) return;

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xVal = (clientX - innerWidth / 2) / 30; // Limit rotation
        const yVal = (clientY - innerHeight / 2) / 30;

        heroText.style.transform = `perspective(1000px) rotateY(${xVal}deg) rotateX(${-yVal}deg)`;
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        heroText.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    });
}
function initCursor() {
    const cursorFollower = document.getElementById('cursorFollower');
    const cursorName = document.getElementById('cursorName');

    // Check if device is desktop
    if (window.matchMedia("(max-width: 768px)").matches || !cursorFollower) return;

    const name = "VIBIN";
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Create letters
    cursorName.innerHTML = '';
    for (let i = 0; i < name.length; i++) {
        const letter = document.createElement('span');
        letter.classList.add('letter');
        letter.textContent = name[i];
        cursorName.appendChild(letter);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Show cursor
        cursorFollower.style.opacity = '1';

        // Animate letters
        const letters = cursorName.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            if (!letter.classList.contains('animate')) {
                setTimeout(() => {
                    letter.classList.add('animate');
                    setTimeout(() => letter.classList.remove('animate'), 1000);
                }, index * 50);
            }
        });
    });

    // Smooth loop
    function animate() {
        let distX = mouseX - cursorX;
        let distY = mouseY - cursorY;

        cursorX += distX * 0.1;
        cursorY += distY * 0.1;

        cursorFollower.style.left = cursorX + 'px';
        cursorFollower.style.top = cursorY + 'px';

        requestAnimationFrame(animate);
    }
    animate();
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
// Contact Hub Functionality
function initContactHub() {
    const copyBtn = document.getElementById('copyEmail');
    const emailLink = document.getElementById('emailLink');

    if (!copyBtn || !emailLink) return;

    copyBtn.addEventListener('click', () => {
        const email = emailLink.textContent;
        const tooltip = copyBtn.querySelector('.tooltip');
        const icon = copyBtn.querySelector('.material-symbols-outlined');

        navigator.clipboard.writeText(email).then(() => {
            // Success State
            tooltip.textContent = 'Copied!';
            tooltip.classList.add('success');
            icon.textContent = 'check';

            // Reset after 2 seconds
            setTimeout(() => {
                tooltip.textContent = 'Copy';
                tooltip.classList.remove('success');
                icon.textContent = 'content_copy';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email:', err);
            tooltip.textContent = 'Error';
            setTimeout(() => {
                tooltip.textContent = 'Copy';
            }, 2000);
        });
    });
}
