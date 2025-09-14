let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({name, price});
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
    });
    document.getElementById('total').textContent = total;
}

function filterProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const nameAttr = product.getAttribute('data-name');
        const name = nameAttr ? nameAttr.toLowerCase() : "";
        if (name.includes(input)) {
            product.style.display = "block"; // mostrar
        } else {
            product.style.display = "none";  // ocultar
        }
    });
}
