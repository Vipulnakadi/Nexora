// --- Preloader Logic ---
window.onload = function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Functionality ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerButton && navLinks) {
        hamburgerButton.addEventListener('click', () => {
            // Toggle the .nav-active class to show/hide the menu.
            navLinks.classList.toggle('nav-active');
        });

        // Listen for clicks on the navigation links themselves
        navLinks.addEventListener('click', (event) => {
            // If a link (<a> tag) is clicked inside the menu
            if (event.target.tagName === 'A') {
                // Remove the .nav-active class to close the menu
                navLinks.classList.remove('nav-active');
            }
        });
    }
    
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
    
    // --- Render All Products ---
    function renderProducts() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;
        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <a href="javascript:void(0);" onclick="viewProduct(${product.id})" class="product-link">
                    <div class="product-image-container">
                        <img src="${product.img}" alt="${product.name}" class="product-image" onerror="this.onerror=null;this.src='https://placehold.co/600x600/f5f0e6/3d3d3d?text=${product.name}';">
                    </div>
                </a>
                <div class="product-info">
                    <div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">₹${product.price.toLocaleString('en-IN')}</p>
                    </div>
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
                        <img src="${product.img}" alt="${product.name}" class="product-image" onerror="this.onerror=null;this.src='https://placehold.co/600x600/f5f0e6/3d3d3d?text=${product.name}';">
                    </div>
                </a>
                <div class="product-info">
                    <div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-rating">
                            <span>${'★'.repeat(Math.floor(product.rating))}</span>${'☆'.repeat(5 - Math.floor(product.rating))} (${product.rating})
                        </div>
                        <p class="product-price">₹${product.price.toLocaleString('en-IN')}</p>
                    </div>
                    <button class="cta-button" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }
    
    // --- View Product (Simulated Product Page via Modal) ---
    window.viewProduct = (id) => {
        const product = getProductById(id);
        const modalHTML = `
            <div id="product-detail-modal" class="modal" style="display:flex; align-items:center; justify-content:center;">
                <div class="modal-content" style="max-width: 800px; text-align: left; display: flex; flex-direction: column; gap: 20px; margin: 1rem;">
                     <span class="close-button" onclick="document.getElementById('product-detail-modal').remove()">&times;</span>
                    <div style="display: flex; gap: 30px; flex-direction: column; md:flex-direction: row;">
                        <div style="flex:1;">
                            <img src="${product.img}" style="width:100%; border-radius:5px;" onerror="this.onerror=null;this.src='https://placehold.co/600x600/f5f0e6/3d3d3d?text=${product.name}';">
                        </div>
                        <div style="flex:1;">
                            <h2 style="font-family:var(--header-font); color:var(--primary-color)">${product.name}</h2>
                            <p style="font-size: 1.5rem; color: var(--secondary-color); font-weight:700; margin-bottom:15px;">₹${product.price.toLocaleString('en-IN')}</p>
                            <p style="margin-bottom:15px;">${product.description}</p>
                            <p style="margin-bottom:20px;"><strong>Ingredients:</strong> ${product.ingredients}</p>
                            <button class="cta-button" onclick="addToCart(${product.id}); document.getElementById('product-detail-modal').remove();">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
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
        
        const product = getProductById(productId);
        showConfirmation(`Added <strong>${product.name}</strong> to cart!`);
    };

    function showConfirmation(message) {
        // Remove any existing confirmation
        const oldConfirmation = document.querySelector('.cart-confirmation');
        if(oldConfirmation) oldConfirmation.remove();

        const confirmation = document.createElement('div');
        confirmation.className = 'cart-confirmation';
        confirmation.innerHTML = message;
        document.body.appendChild(confirmation);
        
        // Add animation style if not present
        if (!document.getElementById('cart-confirm-style')) {
            const style = document.createElement('style');
            style.id = 'cart-confirm-style';
            style.innerHTML = `
            .cart-confirmation {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: var(--primary-color);
                color: #fff;
                padding: 15px 25px;
                border-radius: 5px;
                z-index: 2000;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                animation: slideInUp 0.5s ease, fadeOut 0.5s ease 2.5s;
            }
            @keyframes slideInUp { from { transform: translate(-50%, 100%); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
            @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            confirmation.remove();
        }, 3000);
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
                         <img src="${bestMatch.img}" alt="${bestMatch.name}" onerror="this.onerror=null;this.src='https://placehold.co/150x150/f5f0e6/3d3d3d?text=${bestMatch.name}';">
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

    // --- Hide Header on Scroll ---
    const navBar = document.querySelector('.main-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY && window.scrollY > 100) {
            navBar.classList.add('header-hidden');
        } else {
            navBar.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    });

    // --- Initial Load ---
    updateCartCount();
});

