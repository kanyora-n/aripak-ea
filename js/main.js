/**
 * Nairobi Spice Merchant - Main JavaScript File
 * 
 * This file contains the core functionality for the e-commerce website including:
 * - Mobile navigation toggle
 * - Testimonial slider
 * - Newsletter form handling
 * - Cart sidebar toggle
 * - Dynamic loading of featured products
 * 
 * Author: [Your Name]
 * Date: [Current Date]
 */

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.primary-navigation');
    
    if (mobileNavToggle && primaryNav) {
        mobileNavToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('active');
            
            // Toggle the hamburger icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
            
            // Toggle body overflow to prevent scrolling when menu is open
            document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
        });
    }

    

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }

    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);

    // Newsletter Form Handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const messageDiv = document.getElementById('newsletter-message');
            
            // Simple email validation
            if (!emailInput.value || !emailInput.value.includes('@')) {
                messageDiv.textContent = 'Please enter a valid email address.';
                messageDiv.style.color = '#e74c3c';
                return;
            }
            
            // In a real application, you would send this to your server
            // For demo purposes, we'll just show a success message
            messageDiv.textContent = 'Thank you for subscribing!';
            messageDiv.style.color = '#27ae60';
            
            // Reset the form
            emailInput.value = '';
            
            // Clear the message after 5 seconds
            setTimeout(() => {
                messageDiv.textContent = '';
            }, 5000);
        });
    }

    // Cart Sidebar Toggle
    const cartLink = document.getElementById('cart-link');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const overlay = document.getElementById('overlay');

    if (cartLink && cartSidebar && closeCart && overlay) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeCart.addEventListener('click', function() {
            cartSidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        overlay.addEventListener('click', function() {
            cartSidebar.classList.remove('open');
            this.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Load featured products
    loadFeaturedProducts();

    // Initialize cart
    initializeCart();
});

/**
 * Loads featured products from the products.js file and displays them
 */
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products-container');
    
    if (!featuredContainer) return;
    
    // Get the featured products (filtered from all products)
    const featuredProducts = window.products.filter(product => product.featured);
    
    // Clear any loading state
    featuredContainer.innerHTML = '';
    
    // Display each featured product
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">KES ${product.price.toFixed(2)}</div>
                <div class="product-rating">
                    ${getRatingStars(product.rating)}
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        featuredContainer.appendChild(productCard);
    });
    
    // Add event listeners to the "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

/**
 * Generates star rating HTML
 * @param {number} rating - The product rating (0-5)
 * @returns {string} HTML string of star icons
 */
function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}