// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-button')) {
        const nav = document.querySelector('nav');
        const logoContainer = document.querySelector('.logo-container');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = '☰';
        
        // Insert the button after the logo container
        nav.insertBefore(mobileMenuButton, navLinks);
    }
    
    // Get the mobile menu button and navigation links
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    // Add click event listener to the mobile menu button
    mobileMenuButton.addEventListener('click', function() {
        // Toggle the 'active' class on the navigation links
        navLinks.classList.toggle('active');
        
        // Change the button icon based on menu state
        if (navLinks.classList.contains('active')) {
            mobileMenuButton.innerHTML = '✕';
        } else {
            mobileMenuButton.innerHTML = '☰';
        }
    });
    
    // Close the menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            // Check if we're in mobile view (button is visible)
            if (window.getComputedStyle(mobileMenuButton).display !== 'none') {
                navLinks.classList.remove('active');
                mobileMenuButton.innerHTML = '☰';
            }
        });
    });
    
    // Close the menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnButton = mobileMenuButton.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnButton && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuButton.innerHTML = '☰';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // If window is resized larger than mobile breakpoint, remove active class
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            mobileMenuButton.innerHTML = '☰';
        }
    });
});