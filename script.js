// --- Core Application State & Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // JS Feature 1: Dynamic Footer Year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // JS Feature 2: Mobile Navigation Toggle
    setupMobileNav();

    // JS Feature 3: Dark/Light Mode Toggle
    setupThemeToggle();

    // JS Feature 4: Contact Form Client-Side Validation & Submission Simulation
    setupContactForm();
    
    // JS Feature 5: "Read More" Toggle Functionality
    setupReadMoreToggles();

    // JS Feature 6: Project Filtering
    setupProjectFiltering();
    
    // JS Feature 7: Smooth Scrolling for internal links (Ensures cross-browser support, enhancing native CSS behavior)
    setupSmoothScrolling();
    
    // Bonus JS Feature 8: Active Navigation Highlighting
    setupActiveNavHighlighting();
});


// ------------------------------------
// JAVASCRIPT FEATURES (8 Total)
// ------------------------------------


/**
 * Feature 2: Sets up the mobile navigation toggle functionality.
 */
function setupMobileNav() {
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Accessibility: Toggle aria-expanded
        const isExpanded = navMenu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when a link is clicked (for single-page navigation)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
        });
    });
}

/**
 * Feature 3: Sets up the dark/light mode toggle functionality using localStorage.
 */
function setupThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const body = document.body;
    const darkIcon = '☀️';
    const lightIcon = '🌙';

    // Check for saved preference or system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        body.classList.add('dark-mode');
        icon.textContent = darkIcon;
    } else {
        icon.textContent = lightIcon;
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        const isDarkMode = body.classList.contains('dark-mode');
        
        // Update icon and local storage
        icon.textContent = isDarkMode ? darkIcon : lightIcon;
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}

/**
 * Feature 4: Handles client-side form validation and simulates submission.
 */
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const messageBox = document.getElementById('form-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset message box
        messageBox.style.display = 'none';
        messageBox.className = 'form-message'; // Reset classes for new type

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation checks
        if (name === '' || email === '' || message === '') {
            displayMessage('Please fill out all required fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            displayMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true; // Disable button during submission
        
        // Simulate network latency (2 seconds)
        setTimeout(() => {
            form.reset();
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false; // Re-enable button
            displayMessage('Thank you for your message! I will be in touch soon.', 'success');
        }, 2000);
    });

    /**
     * Helper function to validate email format.
     * @param {string} email - The email string to validate.
     * @returns {boolean} True if the email is valid, false otherwise.
     */
    function validateEmail(email) {
        // Basic regex for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * Helper function to display messages to the user.
     * @param {string} text - The message text.
     * @param {('success'|'error')} type - The type of message (for styling).
     */
    function displayMessage(text, type) {
        messageBox.textContent = text;
        messageBox.classList.add(type);
        messageBox.style.display = 'block';
        messageBox.setAttribute('role', type === 'error' ? 'alert' : 'status'); // Set ARIA role
    }
}

/**
 * Feature 5: Sets up the "Read More" content toggle functionality for project cards.
 */
function setupReadMoreToggles() {
    document.querySelectorAll('.read-more-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                this.textContent = 'Read Less';
                this.setAttribute('aria-expanded', 'true');
            } else {
                content.style.display = 'none';
                this.textContent = 'Read More';
                this.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

/**
 * Feature 6: Sets up project filtering based on data attributes.
 */
function setupProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    // Select cards that have a category attribute, excluding the filter card itself
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button style
            filterButtons.forEach(btn => btn.classList.remove('active-filter'));
            this.classList.add('active-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Set 'All' button active by default on load
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active-filter');
}

/**
 * Feature 7: Ensures smooth scrolling for all internal anchor links.
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is an internal anchor link
            if (this.hostname === location.hostname && this.pathname === location.pathname) {
                e.preventDefault();
                const targetElement = document.querySelector(this.hash);
                if (targetElement) {
                     targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Feature 8: Highlights the currently active navigation link based on scroll position.
 */
function setupActiveNavHighlighting() {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px 0px -70% 0px', // Trigger when section is 30% from top
        threshold: 0
    };

    /**
     * Callback function for the IntersectionObserver.
     * @param {IntersectionObserverEntry[]} entries
     */
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(a => a.classList.remove('active-link'));
                // Add active class to the currently visible section's link
                if (link) {
                    link.classList.add('active-link');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}
