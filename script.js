// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        const mainNav = document.querySelector('.main-nav');
        document.addEventListener('click', function(event) {
            if (mainNav && !mainNav.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Search Functionality
    const searchIcon = document.getElementById('searchIcon');
    const searchInline = document.getElementById('searchInline');
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const searchGoBtn = document.querySelector('.search-go-btn');

    if (searchIcon && searchInline) {
        // Open inline search
        searchIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            searchIcon.classList.add('hidden');
            searchInline.style.display = 'flex';
            setTimeout(() => {
                searchInput.focus();
            }, 100);
        });

        // Close inline search function
        function closeSearch() {
            searchIcon.classList.remove('hidden');
            searchInline.style.display = 'none';
            if (searchInput) {
                searchInput.value = '';
            }
            if (searchClear) {
                searchClear.style.display = 'none';
            }
        }

        // Clear search input
        if (searchClear) {
            // Initially hide clear button
            searchClear.style.display = 'none';
            
            searchClear.addEventListener('click', function() {
                if (searchInput) {
                    searchInput.value = '';
                    searchClear.style.display = 'none';
                    searchInput.focus();
                }
            });

            // Show/hide clear button based on input
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    if (searchInput.value.length > 0) {
                        searchClear.style.display = 'flex';
                    } else {
                        searchClear.style.display = 'none';
                    }
                });
            }
        }

        // Handle GO button
        if (searchGoBtn) {
            searchGoBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const query = searchInput ? searchInput.value.trim() : '';
                if (query) {
                    // Perform search - you can customize this
                    console.log('Searching for:', query);
                    // window.location.href = `/search?q=${encodeURIComponent(query)}`;
                }
            });

            // Handle Enter key in search input
            if (searchInput) {
                searchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        searchGoBtn.click();
                    }
                });
            }
        }

        // Close search when clicking outside
        document.addEventListener('click', function(event) {
            if (searchInline.style.display === 'flex' && 
                !searchInline.contains(event.target) && 
                !searchIcon.contains(event.target)) {
                closeSearch();
            }
        });

        // Close search on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchInline.style.display === 'flex') {
                closeSearch();
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Back to top button functionality
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
    }

    // Add animation on scroll for stats and cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe stat cards and solution cards
    document.querySelectorAll('.stat-card, .solution-card, .service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Dropdown menu enhancement for touch devices
    const dropdowns = document.querySelectorAll('.has-dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('> a');
        const menu = dropdown.querySelector('.dropdown');

        // For touch devices, toggle on click
        if ('ontouchstart' in window) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
                dropdown.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });

    // Add active state to dropdowns on touch devices
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) {
            .has-dropdown.active .dropdown {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Form validation (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation logic here if needed
        });
    });

    // Lazy loading for images (if images are added)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add loading state to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Session timeout warning (if needed)
let sessionTimeout;
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        // Show session timeout warning
        const warning = document.createElement('div');
        warning.className = 'session-warning';
        warning.innerHTML = `
            <div class="session-warning-content">
                <h3>Session Timeout</h3>
                <p>Your session will expire in <span id="countdown">5:00</span></p>
                <button onclick="extendSession()">Extend Session</button>
            </div>
        `;
        document.body.appendChild(warning);
    }, SESSION_DURATION - 5 * 60 * 1000); // Warn 5 minutes before
}

function extendSession() {
    resetSessionTimeout();
    const warning = document.querySelector('.session-warning');
    if (warning) {
        warning.remove();
    }
}

// Reset session timeout on user activity
['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetSessionTimeout, { passive: true });
});

// Initialize session timeout
resetSessionTimeout();

