document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Change toggle symbol
            const toggle = item.querySelector('.faq-toggle');
            if (item.classList.contains('active')) {
                toggle.textContent = '−';
            } else {
                toggle.textContent = '+';
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const supportForm = document.getElementById('supportForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    const closeSuccessMessage = document.getElementById('closeSuccessMessage');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // In a real application, you would send this data to your server
            console.log('Form submitted:', formData);
            
            // Show success message
            formSuccessMessage.classList.add('show');
            
            // Reset form
            supportForm.reset();
        });
    }
    
    // Close success message
    if (closeSuccessMessage) {
        closeSuccessMessage.addEventListener('click', function() {
            formSuccessMessage.classList.remove('show');
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('supportSearch');
    const searchButton = document.getElementById('searchButton');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            alert('Please enter at least 2 characters to search');
            return;
        }
        
        // Get all FAQ questions and answers
        const faqQuestions = document.querySelectorAll('.faq-question h3');
        const faqAnswers = document.querySelectorAll('.faq-answer p');
        
        let foundMatch = false;
        
        // First close all FAQ items
        faqItems.forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-toggle').textContent = '+';
        });
        
        // Search through questions
        faqQuestions.forEach((question, index) => {
            const questionText = question.textContent.toLowerCase();
            const answerText = faqAnswers[index].textContent.toLowerCase();
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                // Open this FAQ item
                const faqItem = question.closest('.faq-item');
                faqItem.classList.add('active');
                faqItem.querySelector('.faq-toggle').textContent = '−';
                
                // Scroll to the first match
                if (!foundMatch) {
                    const faqSection = document.getElementById('faq-section');
                    const headerOffset = 120;
                    const elementPosition = faqItem.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    foundMatch = true;
                }
            }
        });
        
        if (!foundMatch) {
            alert('No results found for "' + searchTerm + '"');
        }
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});