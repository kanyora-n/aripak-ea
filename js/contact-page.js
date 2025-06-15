/**
 * Nairobi Spice Merchant - Contact Page JavaScript
 * 
 * Handles:
 * - Contact form submission
 * - Form validation
 * - Google Maps integration
 * 
 * Author: [Your Name]
 * Date: [Current Date]
 */

document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            const messageDiv = document.getElementById('contact-form-message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                messageDiv.textContent = 'Please fill in all fields.';
                messageDiv.style.color = '#e74c3c';
                return;
            }
            
            if (!validateEmail(email)) {
                messageDiv.textContent = 'Please enter a valid email address.';
                messageDiv.style.color = '#e74c3c';
                return;
            }
            
            // In a real application, you would send this data to your server
            // For demo purposes, we'll just show a success message
            messageDiv.textContent = 'Thank you for your message! We will respond within 24 hours.';
            messageDiv.style.color = '#27ae60';
            
            // Reset the form
            contactForm.reset();
            
            // Clear the message after 5 seconds
            setTimeout(() => {
                messageDiv.textContent = '';
            }, 5000);
        });
    }
    
    // FAQ accordion (same as about page)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} True if email is valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}