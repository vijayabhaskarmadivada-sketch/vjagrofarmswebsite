document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    const iconMenu = document.getElementById('icon-menu');
    const iconClose = document.getElementById('icon-close');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                iconMenu.style.display = 'none';
                iconClose.style.display = 'block';
            } else {
                iconMenu.style.display = 'block';
                iconClose.style.display = 'none';
            }
        });
    }

    // 2. Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 3. Floating WhatsApp Button
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            window.open('https://wa.me/917386830909?text=I%20want%20to%20order%20cold%20pressed%20oils', '_blank');
        });
    }

    // 4. Product Order WhatsApp Buttons
    const orderButtons = document.querySelectorAll('.order-whatsapp-btn');
    orderButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.getAttribute('data-product');
            const message = `Hi, I'm interested in ordering: ${product}`;
            window.open(`https://wa.me/917386830909?text=${encodeURIComponent(message)}`, '_blank');
        });
    });

    // 5. Contact Form Simulation
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success-message');
    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';

            // Reset form after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
                contactForm.style.display = 'block';
                contactForm.reset();
            }, 3000);
        });
    }

    // 6. Product Filtering (Products Page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card[data-type]');
    
    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-type') === filterValue) {
                        card.style.display = 'block';
                        // Re-trigger animation
                        card.style.animation = 'none';
                        card.offsetHeight; /* trigger reflow */
                        card.style.animation = null; 
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 7. Scroll Animations (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    
    // We initially need to remove the animation so it can be triggered by the observer
    // But since the CSS has it running immediately, let's reset it and apply via JS class
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        // Pause animation initially
        el.style.animationPlayState = 'paused';
        el.style.opacity = '0'; // Ensure it's hidden before animation starts
        observer.observe(el);
    });
});
