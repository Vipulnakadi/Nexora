// --- Preloader Logic ---
window.onload = function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Add the 'hidden' class to trigger the fade-out animation
        preloader.classList.add('hidden');
    }
};


    // The rest of your main.js code goes here...
document.addEventListener('DOMContentLoaded', () => {

    // --- Product Data ---
    const products = [
        { id: 1, name: 'Sultan\'s Oudh', price: 120, img: 'assets/images/product1.jpg', description: 'A regal and powerful scent with deep notes of aged Agarwood (Oudh), layered with rich sandalwood and warm amber. For the bold and confident.', ingredients: 'Agarwood, Sandalwood, Amber, Saffron', tags: ['bold', 'woody', 'sophisticated'], bestseller: true, rating: 4.9 },
        { id: 2, name: 'Mystic Rose', price: 120, img: 'assets/images/product2.jpg', description: 'An enchanting elixir of pure Damask rose. Timeless, romantic, and deeply floral, with a soft touch of musk.', ingredients: 'Damask Rose Absolute, White Musk, Geranium', tags: ['calm', 'floral', 'romantic'], bestseller: true, rating: 4.8 },
        { id: 3, name: 'Verdant Vetiver', price: 120, img: 'assets/images/product3.jpg', description: 'An earthy and grounding aroma of fresh Vetiver grass, balanced with a hint of citrusy bergamot and green oakmoss.', ingredients: 'Vetiver, Bergamot, Oakmoss', tags: ['calm', 'woody', 'relaxing'] },
        { id: 4, name: 'Citrus Bloom', price: 120, img: 'assets/images/product4.jpg', description: 'A vibrant and energetic burst of Sicilian lemon and neroli, softened by a delicate whisper of jasmine.', ingredients: 'Neroli, Lemon, Jasmine, Green Tea', tags: ['energetic', 'citrus', 'uplifting'], bestseller: true, rating: 4.7 },
        { id: 5, name: 'Santal Noir', price: 120, img: 'assets/images/product5.jpg', description: 'A dark, mysterious, and creamy blend of Indian sandalwood, spiced with cardamom and a hint of leather.', ingredients: 'Black Sandalwood, Cardamom, Leather', tags: ['mysterious', 'woody', 'sophisticated'] },
        { id: 6, name: 'Golden Amber', price: 120, img: 'assets/images/product6.jpg', description: 'A warm, resinous, and inviting scent of golden amber, with sweet notes of vanilla and a touch of cinnamon.', ingredients: 'Amber Resin, Vanilla, Cinnamon', tags: ['calm', 'spicy', 'relaxing'] },
        { id: 7, name: 'Jasmine Dew', price: 120, img: 'assets/images/product7.jpg', description: 'The intoxicating fragrance of night-blooming jasmine captured in a bottle. Fresh, floral, and utterly captivating.', ingredients: 'Jasmine Sambac, Green Tea, Ylang-Ylang', tags: ['energetic', 'floral', 'romantic'], bestseller: true, rating: 4.8 },
        { id: 8, name: 'Emerald Musk', price: 120, img: 'assets/images/product8.jpg', description: 'A clean, sophisticated, and modern musk with green notes of galbanum and a powdery iris finish.', ingredients: 'White Musk, Galbanum, Iris Root', tags: ['mysterious', 'woody', 'sophisticated'] },
        { id: 9, name: 'Spiced Earth', price: 120, img: 'assets/images/product9.jpg', description: 'A rich and earthy blend of Indonesian patchouli, warm clove, and a subtle note of sweet tobacco leaf.', ingredients: 'Patchouli, Clove Bud, Tobacco', tags: ['bold', 'spicy', 'relaxing'] },
        { id: 10, name: 'Royal Saffron', price: 120, img: 'assets/images/product10.jpg', description: 'The epitome of luxury. Precious saffron threads blended with Bulgarian rose and a touch of rare Oudh.', ingredients: 'Kashmiri Saffron, Bulgarian Rose, Oudh', tags: ['bold', 'spicy', 'sophisticated'], bestseller: true, rating: 5.0 },
    ];

    // --- State Management using localStorage ---
    let cart = JSON.parse(localStorage.getItem('nexoraCart')) || [];
    
    const saveCart = () => {
        localStorage.setItem('nexoraCart', JSON.stringify(cart));
    };

    // --- Global Elements ---
    const cartCountElement = document.getElementById('cart-count');

    // --- Utility Functions ---
    const getProductById = (id) => products.find(p => p.id === parseInt(id));

    // --- Update Cart Count in Header ---
    const updateCartCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    };

    // --- Page Specific Logic ---
    if (document.getElementById('product-grid')) {
        renderProducts();
    }
    if (document.getElementById('bestsellers-grid')) {
        renderBestsellers();
    }
    if (document.getElementById('scent-finder-form')) {
        setupScentFinder();
    }
    if (document.querySelector('.cart-page')) {
        renderCartPage();
    }
    
    // --- Render All Products ---
    function renderProducts() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;
        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <a href="javascript:void(0);" onclick="viewProduct(${product.id})" class="product-link">
                    <div class="product-image-container">
                        <img src="${product.img}" alt="${product.name}" class="product-image">
                    </div>
                </a>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">₹${product.price.toLocaleString('en-IN')}</p>
                    <button class="cta-button" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }
    
    // --- Render Best Sellers ---
    function renderBestsellers() {
        const bestsellersGrid = document.getElementById('bestsellers-grid');
        const bestsellers = products.filter(p => p.bestseller);
        bestsellersGrid.innerHTML = bestsellers.slice(0, 3).map(product => `
             <div class="product-card">
                <a href="javascript:void(0);" onclick="viewProduct(${product.id})" class="product-link">
                    <div class="product-image-container">
                        <img src="${product.img}" alt="${product.name}" class="product-image">
                    </div>
                </a>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <span>${'★'.repeat(Math.floor(product.rating))}</span>${product.rating % 1 !== 0 ? '☆' : ''} (${product.rating})
                    </div>
                    <p class="product-price">₹${product.price.toLocaleString('en-IN')}</p>
                    <button class="cta-button" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }
    
    // --- View Product (Simulated Product Page) ---
    window.viewProduct = (id) => {
        localStorage.setItem('viewingProductId', id);
        // This would navigate to product-detail.html in a multi-page setup.
        // For this demo, we'll simulate by storing the ID and you would have a separate product-detail.html file
        // that reads this ID and displays the product.
        // Let's create a simple modal for demonstration instead of a full page.
        const product = getProductById(id);
        const modalHTML = `
            <div id="product-detail-modal" class="modal" style="display:block;">
                <div class="modal-content" style="max-width: 800px; text-align: left; display: flex; gap: 30px;">
                    <span class="close-button" onclick="document.getElementById('product-detail-modal').remove()">&times;</span>
                    <div style="flex:1;">
                        <img src="${product.img}" style="width:100%; border-radius:5px;">
                    </div>
                    <div style="flex:1;">
                        <h2 style="font-family:var(--header-font); color:var(--primary-color)">${product.name}</h2>
                        <p style="font-size: 1.5rem; color: var(--secondary-color); font-weight:700; margin-bottom:15px;">₹${product.price.toLocaleString('en-IN')}</p>
                        <p style="margin-bottom:15px;">${product.description}</p>
                        <p style="margin-bottom:20px;"><strong>Ingredients:</strong> ${product.ingredients}</p>
                        <button class="cta-button" onclick="addToCart(${product.id}); document.getElementById('product-detail-modal').remove();">Add to Cart</button>
                        <button class="cta-button" style="background:var(--primary-color); margin-left:10px;" onclick="findSimilar('${product.tags[1]}')">Find Similar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    };
    
    // --- Find Similar ---
    window.findSimilar = (scentFamily) => {
        document.getElementById('product-detail-modal')?.remove();
        const scentFinderSection = document.getElementById('finder');
        scentFinderSection.scrollIntoView({ behavior: 'smooth' });
        // Pre-fill the form
        document.querySelector(`#scent-finder-form select[name="scent_family"]`).value = scentFamily;
    };


    // --- Add to Cart Logic ---
    window.addToCart = (productId, quantity = 1) => {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id: productId, quantity: quantity });
        }
        saveCart();
        updateCartCount();
        // Show confirmation
        const product = getProductById(productId);
        const confirmation = document.createElement('div');
        confirmation.className = 'cart-confirmation';
        confirmation.innerHTML = `Added <strong>${product.name}</strong> to cart!`;
        document.body.appendChild(confirmation);
        setTimeout(() => {
            confirmation.remove();
        }, 3000);
        
        // Add a temporary CSS for confirmation
        if (!document.getElementById('cart-confirm-style')) {
            const style = document.createElement('style');
            style.id = 'cart-confirm-style';
            style.innerHTML = `
            .cart-confirmation {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: var(--primary-color);
                color: #fff;
                padding: 15px 25px;
                border-radius: 5px;
                z-index: 2000;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                animation: slideInUp 0.5s ease;
            }
            @keyframes slideInUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `;
            document.head.appendChild(style);
        }
    };

    // --- Render Cart Page ---
    function renderCartPage() {
        const cartContainer = document.getElementById('cart-container');
        const checkoutSection = document.getElementById('checkout-section');
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <p style="text-align:center; font-size:1.2rem;">Your cart is empty.</p>
                <div style="text-align:center; margin-top:20px;">
                    <a href="index.html#products" class="cta-button">Start Shopping</a>
                </div>
            `;
            checkoutSection.style.display = 'none';
            return;
        }

        let subtotal = 0;
        const cartItemsHTML = cart.map(item => {
            const product = getProductById(item.id);
            subtotal += product.price * item.quantity;
            return `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${product.img}" alt="${product.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${product.name}</h3>
                        <p class="cart-item-price">₹${product.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <label>Qty:</label>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                    </div>
                    <div class="cart-item-total">
                        <strong>₹${(product.price * item.quantity).toLocaleString('en-IN')}</strong>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&times;</button>
                </div>
            `;
        }).join('');
        
        cartContainer.innerHTML = cartItemsHTML + `
            <div class="cart-summary">
                <p class="cart-total">Subtotal: <strong>₹${subtotal.toLocaleString('en-IN')}</strong></p>
                <button id="proceed-to-checkout" class="cta-button">Proceed to Checkout</button>
            </div>
        `;

        document.getElementById('proceed-to-checkout').addEventListener('click', () => {
            checkoutSection.style.display = 'block';
            checkoutSection.scrollIntoView({ behavior: 'smooth' });
        });
        
        setupCheckoutForm(subtotal);
    }
    
    // --- Cart Page Actions ---
    window.updateQuantity = (productId, newQuantity) => {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(newQuantity);
            if (item.quantity < 1) {
                item.quantity = 1;
            }
            saveCart();
            renderCartPage();
            updateCartCount();
        }
    };
    
    window.removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        renderCartPage();
        updateCartCount();
    };
    
    // --- Checkout Form Logic ---
    function setupCheckoutForm(totalAmount) {
        const checkoutForm = document.getElementById('checkout-form');
        if (!checkoutForm) return;

        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const customerDetails = {
                name: document.getElementById('customer-name').value,
                email: document.getElementById('customer-email').value,
                phone: document.getElementById('customer-phone').value,
                address: document.getElementById('customer-address').value,
            };

            const orderedProducts = cart.map(item => {
                const product = getProductById(item.id);
                return {
                    name: product.name,
                    quantity: item.quantity,
                    price: product.price
                };
            });
            
            const newOrder = {
                id: `NEX${Date.now()}`,
                customer: customerDetails,
                products: orderedProducts,
                total: totalAmount,
                date: new Date().toISOString()
            };
            
            // Save order to localStorage (simulating a database)
            let orders = JSON.parse(localStorage.getItem('nexoraOrders')) || [];
            orders.push(newOrder);
            localStorage.setItem('nexoraOrders', JSON.stringify(orders));
            
            // Prepare mailto link for email notification
            const subject = `New Ittar Order: ${newOrder.id}`;
            let body = `New Order Received\n\n`;
            body += `Order ID: ${newOrder.id}\n`;
            body += `Date: ${new Date(newOrder.date).toLocaleString()}\n\n`;
            body += `CUSTOMER DETAILS:\n`;
            body += `Name: ${newOrder.customer.name}\n`;
            body += `Email: ${newOrder.customer.email}\n`;
            body += `Phone: ${newOrder.customer.phone}\n`;
            body += `Address: ${newOrder.customer.address}\n\n`;
            body += `ORDERED PRODUCTS:\n`;
            newOrder.products.forEach(p => {
                body += `- ${p.name} (x${p.quantity}) - ₹${(p.price * p.quantity).toLocaleString('en-IN')}\n`;
            });
            body += `\nTOTAL AMOUNT: ₹${newOrder.total.toLocaleString('en-IN')}\n`;
            body += `Payment Method: Cash on Delivery`;
            
            window.location.href = `mailto:vipulnakadi14@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Clear cart and show success
            cart = [];
            saveCart();
            updateCartCount();
            
            document.getElementById('order-success-modal').style.display = 'block';
        });
    }


    // --- Scent Finder Logic ---
    function setupScentFinder() {
        const form = document.getElementById('scent-finder-form');
        const resultDiv = document.getElementById('finder-result');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const personality = form.elements.personality.value;
            const scentFamily = form.elements.scent_family.value;
            const mood = form.elements.mood.value;
            
            // Simple matching logic
            let bestMatch = null;
            let maxScore = -1;

            products.forEach(product => {
                let score = 0;
                if (product.tags.includes(personality)) score += 3;
                if (product.tags.includes(scentFamily)) score += 2;
                if (product.tags.includes(mood)) score += 1;

                if (score > maxScore) {
                    maxScore = score;
                    bestMatch = product;
                }
            });
            
            if (bestMatch) {
                resultDiv.innerHTML = `
                    <div class="finder-result-img">
                         <img src="${bestMatch.img}" alt="${bestMatch.name}">
                    </div>
                    <div class="finder-result-text">
                        <p>Your perfect match is...</p>
                        <h3>${bestMatch.name}</h3>
                        <p>${bestMatch.description}</p>
                        <a href="javascript:void(0);" onclick="viewProduct(${bestMatch.id})" class="cta-button" style="margin-top:15px;">View Product</a>
                    </div>
                `;
                resultDiv.style.display = 'flex';
                resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // --- Animate on Scroll ---
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // --- Initial Load ---
    updateCartCount();
});

// Select the navigation bar element
const navBar = document.querySelector('.main-header');

// Store the last scroll position
let lastScrollY = window.scrollY;

// Listen for scroll events
window.addEventListener('scroll', () => {
    // If the user scrolls down, hide the navbar
    if (lastScrollY < window.scrollY) {
        navBar.classList.add('header-hidden');
    } else {
    // If the user scrolls up, show the navbar
        navBar.classList.remove('header-hidden');
    }

    // Update the last scroll position
    lastScrollY = window.scrollY;
});

  // --- Hide Header on Scroll Down 
