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
        { id: 1, name: 'Purple Haze', price: 120, img: 'assets/images/product1.jpg', description: 'Unwind with the therapeutic aroma. Known for its calming properties, this natural fragrance helps to reduce stress and anxiety, making it the ideal scent for meditation, relaxation, or a peaceful evening.', ingredients: 'Lavender, Sandalwood, Saffron', tags: ['calm', 'floral', 'sophisticated'], bestseller: true, rating: 4.9 },
        { id: 2, name: 'Valtren', price: 120, img: 'assets/images/product2.jpg', description: ' A powerful and dynamic fragrance that commands attention. Its captivating blend of exotic spices, rich woods, and hints of musk creates an aura of strength and confidence.', ingredients: 'Damask Rose Absolute, White Musk, Geranium', tags: ['bold', 'woody', 'energetic'], bestseller: true, rating: 4.8 },
        { id: 3, name: 'Elvasia', price: 120, img: 'assets/images/product3.jpg', description: 'An earthy and grounding aroma of fresh Vetiver grass, balanced with a hint of citrusy bergamot and green oakmoss.', ingredients: 'Vetiver, Bergamot, Oakmoss', tags: ['calm', 'woody', 'relaxing'] },
        { id: 4, name: 'Ozevia', price: 120, img: 'assets/images/product4.jpg', description: 'This invigorating fragrance is a vibrant blend of crisp citrus and cool marine notes, reminiscent of a refreshing sea breeze on a sun-drenched shore. It is a clean, masculine scent that is both uplifting and sophisticated.', ingredients: 'Neroli, Lemon, Jasmine, Green Tea', tags: ['energetic', 'citrus', 'uplifting'], bestseller: true, rating: 4.7 },
        { id: 5, name: 'Ventara', price: 120, img: 'assets/images/product5.jpg', description: 'A dark, mysterious, and creamy blend of Indian sandalwood, spiced with cardamom and a hint of leather.', ingredients: 'Black Sandalwood, Cardamom, Leather', tags: ['mysterious', 'woody', 'sophisticated'] },
        { id: 6, name: 'Dusk', price: 120, img: 'assets/images/product6.jpg', description: 'A warm, resinous, and inviting scent of golden amber, with sweet notes of vanilla and a touch of cinnamon.', ingredients: 'Amber Resin, Vanilla, Cinnamon', tags: ['calm', 'spicy', 'relaxing'] },
        { id: 7, name: 'Roselune', price: 120, img: 'assets/images/product7.jpg', description: 'The intoxicating fragrance of night-blooming jasmine captured in a bottle. Fresh, floral, and utterly captivating.', ingredients: 'Jasmine Sambac, Green Tea, Ylang-Ylang', tags: ['energetic', 'floral', 'romantic'], bestseller: true, rating: 4.8 },
        { id: 8, name: 'Nexus', price: 120, img: 'assets/images/product8.jpg', description: 'A clean, sophisticated, and modern musk with green notes of galbanum and a powdery iris finish.', ingredients: 'White Musk, Galbanum, Iris Root', tags: ['mysterious', 'woody', 'sophisticated'] },
        { id: 9, name: 'White oud', price: 120, img: 'assets/images/product9.jpg', description: 'A rich and earthy blend of Indonesian patchouli, warm clove, and a subtle note of sweet tobacco leaf.', ingredients: 'Patchouli, Clove Bud, Tobacco', tags: ['bold', 'spicy', 'relaxing'] },
        { id: 10, name: 'Citadel', price: 120, img: 'assets/images/product10.jpg', description: 'The epitome of luxury. Precious saffron threads blended with Bulgarian rose and a touch of rare Oudh.', ingredients: 'Kashmiri Saffron, Bulgarian Rose, Oudh', tags: ['bold', 'spicy', 'sophisticated'], bestseller: true, rating: 5.0 },
    ];

    // --- State Management using localStorage ---
    let cart = JSON.parse(localStorage.getItem('nexoraCart')) || [];
    let orders = JSON.parse(localStorage.getItem('nexoraOrders')) || [];

    const saveCart = () => {
        localStorage.setItem('nexoraCart', JSON.stringify(cart));
    };

    const saveOrder = (order) => {
        orders.push(order);
        localStorage.setItem('nexoraOrders', JSON.stringify(orders));
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
    // Check for the dedicated cart items container
    if (document.getElementById('cart-items-container')) {
        renderCart();
    }
    if (document.getElementById('checkout-form')) {
        setupCheckoutForm();
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

    // --- CART PAGE LOGIC ---
    function renderCart() {
        // Corrected selector
        const cartItemsContainer = document.getElementById('cart-items-container');
        const checkoutSection = document.getElementById('checkout-section');

        if (!cartItemsContainer || !checkoutSection) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <p style="font-size: 1.2rem;">Your cart is empty.</p>
                    <a href="index2.html#products" class="cta-button" style="margin-top: 20px;">Shop Our Collection</a>
                </div>
            `;
            checkoutSection.style.display = 'none';
            return;
        }

        let total = 0;
        let cartItemsHtml = '';

        cart.forEach(item => {
            const product = getProductById(item.id);
            if (product) {
                const subtotal = product.price * item.quantity;
                total += subtotal;
                cartItemsHtml += `
                    <div class="cart-item">
                        <img src="${product.img}" alt="${product.name}" class="cart-item-img" onerror="this.onerror=null;this.src='https://placehold.co/100x100/f5f0e6/3d3d3d?text=${product.name}';">
                        <div class="cart-item-details">
                            <h3 class="cart-item-name">${product.name}</h3>
                            <p class="cart-item-price">₹${product.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div class="cart-item-quantity">
                            <input type="number" value="${item.quantity}" min="1" data-id="${product.id}" class="quantity-input">
                        </div>
                        <button class="cart-item-remove" data-id="${product.id}">&times;</button>
                    </div>
                `;
            }
        });

        cartItemsContainer.innerHTML = `
            <div>
                ${cartItemsHtml}
            </div>
            <div class="cart-summary">
                <p class="cart-total">Total: ₹${total.toLocaleString('en-IN')}</p>
            </div>
        `;

        checkoutSection.style.display = 'block';

        // Add event listeners for quantity and remove buttons
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.dataset.id);
                const newQuantity = parseInt(e.target.value);
                updateCartQuantity(productId, newQuantity);
            });
        });

        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                removeFromCart(productId);
            });
        });
    }

    function updateCartQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity = newQuantity;
            saveCart();
            updateCartCount();
            renderCart(); // Re-render the cart to update totals
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartCount();
        renderCart(); // Re-render the cart
    }

    // --- CHECKOUT FORM LOGIC ---
    function setupCheckoutForm() {
        const checkoutForm = document.getElementById('checkout-form');
        const modal = document.getElementById('order-success-modal');
        const customerNameInput = document.getElementById('customer-name');
        const customerEmailInput = document.getElementById('customer-email');
        const customerPhoneInput = document.getElementById('customer-phone');
        const customerAddressInput = document.getElementById('customer-address');

        if (!checkoutForm) return;

        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Create order object
            const order = {
                id: Date.now(),
                customer: {
                    name: customerNameInput.value,
                    email: customerEmailInput.value,
                    phone: customerPhoneInput.value,
                    address: customerAddressInput.value,
                },
                items: cart.map(item => {
                    const product = getProductById(item.id);
                    return {
                        name: product.name,
                        quantity: item.quantity,
                        price: product.price,
                    };
                }),
                total: cart.reduce((sum, item) => sum + (getProductById(item.id).price * item.quantity), 0),
                date: new Date().toISOString(),
            };

            saveOrder(order);

            // // Prepare email draft
            // const subject = encodeURIComponent('Order Confirmation from NeXoRa Ittar');
            // let body = `Dear ${order.customer.name},\n\nThank you for your order! Here are the details:\n\n`;
            // order.items.forEach(item => {
            //     body += `${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
            // });
            // body += `\nTotal: ₹${order.total.toLocaleString('en-IN')}\n\n`;
            // body += `We will contact you shortly to confirm your order and shipping details.\n\n`;
            // body += `Best regards,\nNeXoRa Ittar Team`;

            // const mailtoLink = `mailto:${order.customer.email}?subject=${subject}&body=${encodeURIComponent(body)}`;

            // // Open email client with the pre-filled draft
            // window.open(mailtoLink, '_blank');

            // Clear the cart and local storage
            cart = [];
            saveCart();
            updateCartCount();

            // Show success modal
            modal.style.display = 'flex';
        });
    }


    // --- Initial Load ---
    updateCartCount();

    // --- HERO SLIDER LOGIC ---
    if (document.querySelector('.hero-slide')) {
        let slideIndex = 0;
        let slideTimer; // To hold the timer
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.dot');
        
        function moveSlide(n) {
            // Set the slide index
            slideIndex = n;

            // Handle looping
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            if (slideIndex < 1) {
                slideIndex = slides.length;
            }

            // Hide all slides and deactivate all dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show the current slide and activate the current dot
            slides[slideIndex - 1].classList.add('active');
            dots[slideIndex - 1].classList.add('active');

            // Reset the automatic timer
            clearTimeout(slideTimer);
            slideTimer = setTimeout(() => moveSlide(slideIndex + 1), 5000); // Move to the next slide after 5 seconds
        }

        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                moveSlide(index + 1); // Move to the slide corresponding to the clicked dot
            });
        });

        // Start the slider by showing the first slide
        moveSlide(1);
    }
});