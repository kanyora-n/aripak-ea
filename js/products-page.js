/**
 * Nairobi Spice Merchant - Products Page JavaScript
 * 
 * Handles:
 * - Product filtering by category
 * - Product search functionality
 * - Dynamic loading of all products
 * 
 * Author: [Your Name]
 * Date: [Current Date]
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load all products when page loads
    loadAllProducts();
    
    // Set up category filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state of buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // Set up product search
    const searchInput = document.getElementById('product-search-input');
    const searchButton = document.getElementById('search-btn');
    
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        searchProducts(searchInput.value.trim());
    });
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchProducts(this.value.trim());
        }
    });
});

/**
 * Loads all products into the products grid
 */
function loadAllProducts() {
    const productsContainer = document.getElementById('all-products-container');
    
    if (!productsContainer) return;
    
    // Clear any loading state
    productsContainer.innerHTML = '';
    
    // Display each product
    window.products.forEach(product => {
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
        
        productsContainer.appendChild(productCard);
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
 * Filters products by category
 * @param {string} category - The category to filter by ('all', 'spices', 'nuts', 'tea')
 */
function filterProducts(category) {
    const productsContainer = document.getElementById('all-products-container');
    
    if (!productsContainer) return;
    
    // Clear existing products
    productsContainer.innerHTML = '';
    
    // Get filtered products
    let filteredProducts = [];
    if (category === 'all') {
        filteredProducts = window.products;
    } else {
        filteredProducts = window.products.filter(product => product.category === category);
    }
    
    // Display filtered products
    filteredProducts.forEach(product => {
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
        
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to the new "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

/**
 * Searches products by name
 * @param {string} query - The search query
 */
function searchProducts(query) {
    if (!query) {
        loadAllProducts();
        return;
    }
    
    const productsContainer = document.getElementById('all-products-container');
    
    if (!productsContainer) return;
    
    // Clear existing products
    productsContainer.innerHTML = '';
    
    // Get matching products (case insensitive)
    const searchResults = window.products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    if (searchResults.length === 0) {
        productsContainer.innerHTML = '<p class="no-results">No products found matching your search.</p>';
        return;
    }
    
    // Display search results
    searchResults.forEach(product => {
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
        
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to the new "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}