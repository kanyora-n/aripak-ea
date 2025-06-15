/**
 * Nairobi Spice Merchant - Product Data
 * 
 * This file contains all product information for the e-commerce site.
 * In a production environment, this data would typically come from a CMS or database.
 * 
 * Author: [Your Name]
 * Date: [Current Date]
 */

window.products = [
    {
        id: 'sp001',
        name: 'Premium Kenyan Cardamom',
        category: 'spices',
        price: 1200,
        rating: 4.8,
        description: 'Our signature cardamom pods, hand-picked from the highlands of Kenya. Known for their intense aroma and flavor.',
        image: 'images/products/cardamom.jpg',
        featured: true,
        stock: 50,
        origin: 'Kericho, Kenya'
    },
    {
        id: 'sp002',
        name: 'Turmeric Powder',
        category: 'spices',
        price: 850,
        rating: 4.5,
        description: 'Bright yellow turmeric powder with high curcumin content. Perfect for cooking and health benefits.',
        image: 'images/products/turmeric.jpg',
        featured: true,
        stock: 75,
        origin: 'Kisumu, Kenya'
    },
    {
        id: 'sp003',
        name: 'Cinnamon Sticks',
        category: 'spices',
        price: 750,
        rating: 4.7,
        description: 'True cinnamon (Ceylon variety) sticks with sweet and woody flavor. Great for teas and desserts.',
        image: 'images/products/cinnamon.jpg',
        featured: false,
        stock: 60,
        origin: 'Mount Kenya Region'
    },
    {
        id: 'sp004',
        name: 'Cumin Seeds',
        category: 'spices',
        price: 650,
        rating: 4.3,
        description: 'Aromatic cumin seeds with earthy, nutty flavor. Essential for curry blends and meat dishes.',
        image: 'images/products/cumin.jpg',
        featured: false,
        stock: 45,
        origin: 'Eastern Kenya'
    },
    {
        id: 'nt001',
        name: 'Macadamia Nuts',
        category: 'nuts',
        price: 1800,
        rating: 4.9,
        description: 'Premium Kenyan macadamia nuts, rich in healthy fats and antioxidants. Perfect for snacking.',
        image: 'images/products/macadamia.jpg',
        featured: true,
        stock: 30,
        origin: 'Central Kenya'
    },
    {
        id: 'nt002',
        name: 'Cashew Nuts',
        category: 'nuts',
        price: 1500,
        rating: 4.6,
        description: 'Large, whole cashew nuts with creamy texture. Great for cooking or eating raw.',
        image: 'images/products/cashew.jpg',
        featured: false,
        stock: 40,
        origin: 'Coastal Kenya'
    },
    {
        id: 'tl001',
        name: 'Purple Tea Leaves',
        category: 'tea',
        price: 2200,
        rating: 4.7,
        description: 'Rare Kenyan purple tea, packed with antioxidants. Has a smooth, slightly fruity flavor.',
        image: 'images/products/purple-tea.jpg',
        featured: true,
        stock: 25,
        origin: 'Nandi Hills, Kenya'
    },
    {
        id: 'tl002',
        name: 'Black Tea Blend',
        category: 'tea',
        price: 950,
        rating: 4.4,
        description: 'Classic Kenyan black tea blend, robust and full-bodied. Perfect for breakfast tea.',
        image: 'images/products/black-tea.jpg',
        featured: false,
        stock: 50,
        origin: 'Kericho, Kenya'
    },
    {
        id: 'sp005',
        name: 'Chili Flakes',
        category: 'spices',
        price: 550,
        rating: 4.2,
        description: 'Hot and flavorful chili flakes made from African bird\'s eye chilies. Use sparingly!',
        image: 'images/products/chili-flakes.jpg',
        featured: false,
        stock: 65,
        origin: 'Western Kenya'
    },
    {
        id: 'sp006',
        name: 'Mixed Berbere Spice',
        category: 'spices',
        price: 900,
        rating: 4.8,
        description: 'Our special blend of Ethiopian-inspired berbere spice mix. Complex, warm, and slightly sweet.',
        image: 'images/products/berbere.jpg',
        featured: true,
        stock: 35,
        origin: 'Custom Blend'
    }
];

/**
 * Gets all products in a specific category
 * @param {string} category - The category to filter by
 * @returns {Array} Array of products in the category
 */
function getProductsByCategory(category) {
    return window.products.filter(product => product.category === category);
}

/**
 * Gets a single product by ID
 * @param {string} id - The product ID
 * @returns {Object|null} The product object or null if not found
 */
function getProductById(id) {
    return window.products.find(product => product.id === id) || null;
}