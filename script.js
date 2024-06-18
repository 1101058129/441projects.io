//Jon Wu Yuhan723
// Initialization: performs DOM manipulation and function binding when the document content is fully loaded.
document.addEventListener('DOMContentLoaded', function() {
    
    // Define an array of items with names and prices.
    const products = [
        // Commodity information
        { name: 'Business Administration Program', price: 50 },
        { name: 'Information Technology (IT) Courses', price: 60 },
        { name: 'Architecture and Engineering Programs', price: 55 },
        { name: 'Health and Nursing Programs', price: 55 },
        { name: 'Creative Industries Courses', price: 70 }
    ];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
 // Render the product list function
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
        // Calculate the total price and build the shopping cart list HTML string
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
        document.getElementById('total').innerText = '$' + total.toFixed(2);
    }
 // Add a click event listener to the product list to handle the add-to-cart logic.
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
        alert('Thank you for your purchase!');
        clearCart();
    }

    function clearCart() {
        cart.length = 0;
        localStorage.removeItem('cart');
        renderCart();
    }
});

//index
function navigateToContact() {
    window.location.href = 'contact.html';
}
//show
function toggleDetails(projectElement) {
    const details = projectElement.querySelector('.project-details');
    if (details.style.display === 'none') {
        details.style.display = 'block';
        // Lazy load image if not loaded yet
        const imgElement = projectElement.querySelector('.lazy-load');
        if (imgElement.src === 'placeholder.jpg') {
            imgElement.src = imgElement.dataset.src;
            imgElement.onload = function() {
                imgElement.style.opacity = 1;
            };
        }
    } else {
        details.style.display = 'none';
    }
}
//contact
var submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', function() {
    alert('Successful Submission');
});