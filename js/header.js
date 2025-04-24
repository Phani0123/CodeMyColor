document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);
    
    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
            mobileMenuButton.querySelector('.menu-icon').textContent = '✕';
        } else {
            body.style.overflow = '';
            mobileMenuButton.querySelector('.menu-icon').textContent = '☰';
        }
    });
    
    // Close menu when clicking on overlay
    overlay.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileMenuButton.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
        mobileMenuButton.querySelector('.menu-icon').textContent = '☰';
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
            mobileMenuButton.querySelector('.menu-icon').textContent = '☰';
        });
    });
    
    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.querySelectorAll('a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
            mobileMenuButton.querySelector('.menu-icon').textContent = '☰';
        }
    });
});