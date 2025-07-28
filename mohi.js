// JavaScript for handling the cart

let cart = [];
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutForm = document.getElementById('checkout-form');
const cartItemsHidden = document.getElementById('cart-items-hidden');
const totalPriceHidden = document.getElementById('total-price-hidden');

// Add product to cart
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const productName = e.target.getAttribute('data-product');
    const price = parseFloat(e.target.getAttribute('data-price'));

    // Add item to cart
    cart.push({ productName, price });

    // Update cart count
    cartCount.textContent = cart.length;

    // Update the cart items list
    updateCart();
  });
});

// Update the cart display
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `
      <p>${item.productName} - $${item.price.toFixed(2)}</p>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(cartItemDiv);
    total += item.price;
  });

  totalPriceElement.textContent = total.toFixed(2);
  totalPriceHidden.value = total.toFixed(2);

  // Add remove item functionality
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// Open cart modal
document.getElementById('open-cart-modal').addEventListener('click', () => {
  cartModal.style.display = 'block';
});

// Close cart modal
document.getElementById('close-cart-modal').addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Handle Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
  // Convert cart items to a string format for sending via Formspree
  const cartItemList = cart.map(item => `${item.productName} - $${item.price.toFixed(2)}`).join(', ');

  // Set cart items and total price to hidden form fields
  cartItemsHidden.value = cartItemList;

  // Submit the form to Formspree
  checkoutForm.submit();
});
