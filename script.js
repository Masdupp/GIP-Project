// Enhanced Cart and UI Functionality
const cartItems = document.getElementById("cart-items");
let cart = [];
const prices = {
  "White T-Shirt": 20,
  "Black T-Shirt": 20,
  "Mug": 10,
  "White Tote Bag": 12,
  "Blue Tote Bag": 12,
  "Full Bundle Deal": 45
};
const sizes = {};

// Show notification when item is added to cart
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Animate notification
  setTimeout(() => {
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }, 100);
}

function addToCart(itemName, size = null) {
  const itemSize = size || sizes[itemName] || null;
  cart.push({ name: itemName, size: itemSize });
  updateCartCount();
  renderCart();
  showNotification(`${itemName} added to cart!`);
  
  // Animate cart icon
  const cartIcon = document.querySelector('.cart-icon');
  cartIcon.classList.add('bounce');
  setTimeout(() => cartIcon.classList.remove('bounce'), 500);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
    cartCount.classList.add('pulse');
    setTimeout(() => cartCount.classList.remove('pulse'), 300);
  }
}

function clearCart() {
  cart = [];
  updateCartCount();
  renderCart();
}

function applyPromoCode() {
  const input = document.getElementById("promo");
  const code = input.value.trim().toLowerCase();
  const promoMessage = document.createElement('div');
  promoMessage.className = 'promo-message';
  
  if (code === "welcome10") {
    promoMessage.textContent = "10% discount applied!";
    promoMessage.classList.add('success');
  } else {
    promoMessage.textContent = "Invalid promo code";
    promoMessage.classList.add('error');
  }
  
  const promoSection = document.querySelector('.promo');
  promoSection.appendChild(promoMessage);
  setTimeout(() => promoMessage.remove(), 3000);
  
  renderCart();
}

function calculateTotal() {
  let total = cart.reduce((sum, item) => sum + (prices[item.name] || 0), 0);
  
  const promoInput = document.getElementById("promo");
  if (promoInput && promoInput.value.trim().toLowerCase() === "welcome10") {
    total *= 0.9; // 10% discount
  }
  
  return Math.round(total * 100) / 100;
}

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = 'cart-item';
    li.innerHTML = `
      <span class="item-name">${item.name}${item.size ? ` (${item.size})` : ''}</span>
      <span class="item-price">$${prices[item.name] || 0}</span>
      <button onclick="removeFromCart(${index})" class="remove-btn">
        <i class="fas fa-times"></i>
      </button>
    `;
    cartItems.appendChild(li);
  });
  
  const total = calculateTotal();
  document.getElementById("cart-total").innerHTML = `
    <span>Total:</span> 
    <span class="total-amount">$${total}</span>
  `;
}

function checkoutCart() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!");
    return;
  }
  
  // Simulate checkout process
  const loadingBtn = document.querySelector('.checkout-btn');
  loadingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  loadingBtn.disabled = true;
  
  setTimeout(() => {
    showNotification("Thank you for your purchase!");
    clearCart();
    loadingBtn.innerHTML = '<i class="fas fa-credit-card"></i> Proceed to Checkout';
    loadingBtn.disabled = false;
  }, 1500);
}

// Mobile menu toggle
function toggleMenu() {
  const nav = document.querySelector('nav');
  const menuToggle = document.querySelector('.menu-toggle');
  nav.classList.toggle('active');
  menuToggle.classList.toggle('active');
  
  // Close menu when clicking outside
  if (nav.classList.contains('active')) {
    document.addEventListener('click', function closeMenu(e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.removeEventListener('click', closeMenu);
      }
    });
  }
}

// Initialize the cart count on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  
  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
