document.addEventListener('DOMContentLoaded', function() {
    // Category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide tutorial cards based on category
            tutorialCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('tutorialSearch');
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
        
        // Reset category buttons
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === 'all') {
                btn.classList.add('active');
            }
        });
        
        let foundMatch = false;
        
        // Search through tutorial cards
        tutorialCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.getAttribute('data-category').toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
                foundMatch = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (!foundMatch) {
            alert('No results found for "' + searchTerm + '"');
            // Reset to show all tutorials
            tutorialCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterSuccessMessage = document.getElementById('newsletterSuccessMessage');
    const closeNewsletterMessage = document.getElementById('closeNewsletterMessage');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real application, you would send this data to your server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            if (newsletterSuccessMessage) {
                newsletterSuccessMessage.classList.add('show');
            }
            
            // Reset form
            this.reset();
        });
    }
    
    // Close newsletter success message
    if (closeNewsletterMessage) {
        closeNewsletterMessage.addEventListener('click', function() {
            newsletterSuccessMessage.classList.remove('show');
        });
    }
    
    // Pagination functionality
    const pageNumbers = document.querySelectorAll('.page-number');
    const prevButton = document.querySelector('.pagination-btn:first-child');
    const nextButton = document.querySelector('.pagination-btn:last-child');
    
    if (pageNumbers.length > 0) {
        pageNumbers.forEach((pageNumber, index) => {
            pageNumber.addEventListener('click', function() {
                // Remove active class from all page numbers
                pageNumbers.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked page number
                this.classList.add('active');
                
                // Enable/disable prev/next buttons
                prevButton.disabled = index === 0;
                nextButton.disabled = index === pageNumbers.length - 1;
                
                // In a real application, you would load the appropriate page of tutorials here
                console.log('Page changed to:', index + 1);
                
                // Scroll to top of tutorials grid
                document.querySelector('.tutorials-grid-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
        
        // Previous button functionality
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                if (this.disabled) return;
                
                const activeIndex = Array.from(pageNumbers).findIndex(p => p.classList.contains('active'));
                if (activeIndex > 0) {
                    pageNumbers[activeIndex - 1].click();
                }
            });
        }
        
        // Next button functionality
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                if (this.disabled) return;
                
                const activeIndex = Array.from(pageNumbers).findIndex(p => p.classList.contains('active'));
                if (activeIndex < pageNumbers.length - 1) {
                    pageNumbers[activeIndex + 1].click();
                }
            });
        }
    }
    
    // Placeholder for tutorial images
    // This would be replaced with real images in production
    const tutorialImages = document.querySelectorAll('.tutorial-image');
    tutorialImages.forEach(image => {
        // Add a subtle animation to the gradient backgrounds
        if (image.style.backgroundImage.includes('gradient')) {
            image.style.backgroundSize = '200% 200%';
            image.style.animation = 'gradient-shift 5s ease infinite';
        }
    });
});


