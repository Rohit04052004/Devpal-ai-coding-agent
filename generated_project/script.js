// script.js

async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

function displayProducts(products) {
    const productListing = document.querySelector('.product-listing');
    productListing.innerHTML = '';

    products.forEach(product => {
        const productElement = `
            <div class="product-item">
                <img class="product-image" src="${product.image}" alt="${product.name}">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productListing.innerHTML += productElement;
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId);
        });
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartIcon();
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex !== -1) {
        if (cart[existingProductIndex].quantity > 1) {
            cart[existingProductIndex].quantity--;
        } else {
            cart.splice(existingProductIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartIcon();
    }
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing cart items
    if(cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            fetchProducts().then(products => {
                const product = products.find(p => p.id === item.id);
                if (product) {
                    const cartItemElement = `
                    <li class="cart-item">
                        <span>${product.name} x ${item.quantity}</span>
                        <button class="remove-from-cart" data-product-id="${item.id}">Remove</button>
                    </li>
                `;
                cartItemsContainer.innerHTML += cartItemElement;
                }
            }).then(() => {
                // Add event listeners to "Remove" buttons after they are dynamically added
                const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
                removeFromCartButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const productId = button.dataset.productId;
                        removeFromCart(productId);
                    });
                });
            });
        });
    }
}

function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.textContent = `Cart (${cartItemCount})`;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts().then(products => displayProducts(products));
    updateCartIcon();
    updateCartDisplay();
});

// --- User Login/Signup ---

function loginUser(username, password) {
    console.log(`Logging in user: ${username}, password: ${password}`);
}

function signupUser(username, password) {
    console.log(`Signing up user: ${username}, password: ${password}`);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            loginUser(username, password);
        });
    }

    if (signupButton) {
        signupButton.addEventListener('click', () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            signupUser(username, password);
        });
    }
});
