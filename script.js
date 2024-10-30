document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { name: 'Business Administration Program', price: 50 },
        { name: 'Information Technology (IT) Courses', price: 60 },
        { name: 'Architecture and Engineering Programs', price: 55 },
        { name: 'Health and Nursing Programs', price: 55 },
        { name: 'Creative Industries Courses', price: 70 }
    ];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderProducts() {
        let productList = '';
        for (let product of products) {
            productList += `
                <div class="product">
                    <h3>${product.name}</h3>
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