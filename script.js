document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { code: 'BA001', name: 'Business Administration Program', price: 50 },
        { code: 'IT001', name: 'Information Technology (IT) Courses', price: 60 },
        { code: 'AE001', name: 'Architecture and Engineering Programs', price: 55 },
        { code: 'HN001', name: 'Health and Nursing Programs', price: 55 },
        { code: 'CI001', name: 'Creative Industries Courses', price: 70 }
    ];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderProducts() {
        let productList = '';
        for (let product of products) {
            productList += `
                <div class="product">
                    <h3>${product.code}: ${product.name}</h3>
                    <p>$${product.price}</p>
                    <input type="number" id="quantity-${products.indexOf(product)}" value="1" min="1">
                    <button class="add-to-cart" data-product="${product.name}">Add to Cart</button>
                </div>
            `;
        }
        document.getElementById('products').innerHTML = productList;
    }

    function renderCart() {
        let cartList = '';
        let total = 0;
        for (let [index, item] of cart.entries()) {
            total += item.quantity * item.product.price;
            cartList += `
                <p>${item.product.name} x ${item.quantity}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
        }
        document.getElementById('cart').innerHTML = cartList;
        document.getElementById('total').innerText = 'Total: $' + total.toFixed(2);
    }

    document.getElementById('products').addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productName = e.target.getAttribute('data-product');
            const product = products.find(p => p.name === productName);
            const quantityInput = document.getElementById(`quantity-${products.indexOf(product)}`);
            const quantity = parseInt(quantityInput.value, 10);

            const existingItem = cart.find(item => item.product.name === productName);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ product, quantity });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    document.getElementById('cart').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    document.getElementById('checkout').addEventListener('click', checkout);
    document.getElementById('clearCart').addEventListener('click', clearCart);

    renderProducts();
    renderCart();

    function checkout() {
        const modal = document.getElementById('orderModal');
        const orderDetails = document.getElementById('orderDetails');
        const orderTotal = document.getElementById('orderTotal');

        let orderList = '';
        let total = 0;
        for (let item of cart) {
            total += item.quantity * item.product.price;
            orderList += `
                <p>${item.product.name} x ${item.quantity}</p>
            `;
        }
        orderDetails.innerHTML = orderList;
        orderTotal.innerText = '$' + total.toFixed(2);

        modal.style.display = 'block';

        document.getElementsByClassName('close')[0].addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    function clearCart() {
        cart.length = 0;
        localStorage.removeItem('cart');
        renderCart();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const navLinks = document.querySelectorAll('.navbar ul li a');
    const loginLink = document.querySelector('.navbar li.login a');
    const logoutLink = document.querySelector('.navbar li.logout a');

    function updateNavButtons() {
        if (isLoggedIn) {
            if (loginLink) loginLink.parentElement.style.display = 'none';
            if (logoutLink) logoutLink.parentElement.style.display = 'block';
        } else {
            if (loginLink) loginLink.parentElement.style.display = 'block';
            if (logoutLink) logoutLink.parentElement.style.display = 'none';
        }
    }

    updateNavButtons();

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetPage = new URL(link.href).pathname;

            if (!isLoggedIn && targetPage !== '/login.html' && link !== loginLink) {
                event.preventDefault();
                alert('Please log in to access this page.');
            }
        });
    });

    if (loginLink) {
        loginLink.addEventListener('click', function() {
            localStorage.setItem('previousPage', window.location.href);
        });
    }

    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault(); 
            localStorage.removeItem('isLoggedIn'); 
            alert('You have been logged out.');
            window.location.href = 'index.html'; 
            updateNavButtons(); 
        });
    }

    function navigateToContact() {
        if (isLoggedIn) {
            window.location.href = 'contact.html';
        } else {
            alert('Please log in to enroll.');
            window.location.href = 'login.html';
        }
    }
});