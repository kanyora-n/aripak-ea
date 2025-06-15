/**
 * Nairobi Spice Merchant - Shopping Cart Functionality
 * 
 * This file handles all shopping cart operations including:
 * - Adding/removing items
 * - Updating quantities
 * - Calculating totals
 * - Persisting cart data to localStorage
 * 
 * Author: [Your Name]
 * Date: [Current Date]
 */

let cart = [];

/**
 * Initializes the cart by loading from localStorage
 * and setting up event listeners
 */
function initializeCart() {
    loadCart();
    updateCartCount();
    renderCartItems();
    
    // Setup event delegation for cart item actions
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', handleCartItemActions);
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
}

/**
 * Loads the cart from localStorage
 */
function loadCart() {
    const savedCart = localStorage.getItem('nairobiSpicesCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

/**
 * Saves the cart to localStorage
 */
function saveCart() {
    localStorage.setItem('nairobiSpicesCart', JSON.stringify(cart));
}

/**
 * Adds a product to the cart or increments its quantity if already present
 * @param {string} productId - The ID of the product to add
 * @param {number} [quantity=1] - The quantity to add
 */
function addToCart(productId, quantity = 1) {
    // Find the product in our products array
    const product = window.products.find(p => p.id === productId);
    
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Update quantity
        existingItem.quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Save and update UI
    saveCart();
    updateCartCount();
    renderCartItems();
    
    // Show a quick notification
    showCartNotification(`${product.name} added to cart`);
}

/**
 * Removes an item from the cart
 * @param {string} productId - The ID of the product to remove
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCartItems();
}

/**
 * Updates the quantity of an item in the cart
 * @param {string} productId - The ID of the product to update
 * @param {number} newQuantity - The new quantity
 */
function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        // Ensure quantity is at least 1
        item.quantity = Math.max(1, parseInt(newQuantity) || 1);
        saveCart();
        renderCartItems();
    }
}

/**
 * Updates the cart count displayed in the header
 */
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

/**
 * Renders all cart items in the sidebar
 */
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total-amount');
    
    if (!cartItemsContainer || !cartTotalElement) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <p>Your cart is empty</p>
                <a href="products.html" class="btn btn-outline">Browse Products</a>
            </div>
        `;
        cartTotalElement.textContent = 'KES 0.00';
        return;
    }
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    
    // Add each cart item
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">KES ${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update total
    cartTotalElement.textContent = `KES ${total.toFixed(2)}`;
}

/**
 * Handles all cart item actions (remove, quantity changes) via event delegation
 * @param {Event} event - The click event
 */
function handleCartItemActions(event) {
    const target = event.target;
    const productId = target.getAttribute('data-id');
    
    if (!productId) return;
    
    // Handle remove button
    if (target.classList.contains('remove-item')) {
        removeFromCart(productId);
        return;
    }
    
    // Handle quantity decrease
    if (target.classList.contains('minus')) {
        const item = cart.find(item => item.id === productId);
        if (item && item.quantity > 1) {
            updateCartItemQuantity(productId, item.quantity - 1);
        }
        return;
    }
    
    // Handle quantity increase
    if (target.classList.contains('plus')) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            updateCartItemQuantity(productId, item.quantity + 1);
        }
        return;
    }
    
    // Handle direct quantity input
    if (target.classList.contains('quantity-input')) {
        updateCartItemQuantity(productId, target.value);
        return;
    }
}

/**
 * Shows a temporary notification when an item is added to cart
 * @param {string} message - The message to display
 */
function showCartNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        
        // Remove after animation completes
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Handles the checkout process
 * @param {Event} event - The click event
 */
function proceedToCheckout(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        alert('Your cart is empty. Please add some products before checkout.');
        return;
    }
    
    // In a real application, this would redirect to a checkout page
    // For this demo, we'll just show an alert
    alert('Proceeding to checkout with ' + cart.reduce((total, item) => total + item.quantity, 0) + ' items.');
    
    // You would typically:
    // 1. Save the cart to a session or database
    // 2. Redirect to a checkout page with payment processing
    // 3. Handle order confirmation
}