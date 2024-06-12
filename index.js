

function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}

'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}



/**
 * header & go top btn active on page scroll
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});



/**
 * Cart System
 */

// Sample data for demonstration
const products = [
    { id: 1, name: 'Varsity', price: 299999 },
    { id: 2, name: 'Simple Tee', price: 129999 },
    { id: 3, name: 'Hoodie', price: 189999 }
];

// Function to display cart items
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    let totalPrice = 0;

    // Loop through cart items and display them
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const itemTotal = product.price * item.quantity;
            totalPrice += itemTotal;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <div class="row">
                    <div class="cart-item-image" style="margin-right: 4rem;">
                        <img src="images/${product.name}.png" alt="${product.name}">
                    </div>
                    <div>
                        <h3><b>${product.name}</b></h3>
                        <p>Price: Rp${product.price}</p>
                        <div class="" style="justify-content: space-around; gap: 2rem; align-items: center;">
                            <p>Quantity: 
                                <div class="row" style="justify-content: space-around; gap: 2rem; align-items: center;">
                                <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                                </div>
                            </p>
                        </div>
                        <p>Total: <b>Rp${itemTotal}</b></p>        
                        <button class="remove-btn" data-id="${item.id}">Remove</button>
                    </div>
                </div>
                
                
            `;
            cartItemsDiv.appendChild(cartItemDiv);
        }
    });

    // Update total price
    document.getElementById('total-price').textContent = `Rp${totalPrice}`;
}

// Function to handle quantity change
function handleQuantityChange(e) {
    const action = e.target.dataset.action;
    const productId = parseInt(e.target.dataset.id);

    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        if (action === 'increase') {
            cart[itemIndex].quantity++;
        } else if (action === 'decrease') {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }
        }

        displayCartItems();
    }
}

// Function to handle item removal
function removeItem(e) {
    const productId = parseInt(e.target.dataset.id);
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        displayCartItems();
    }
}

// Sample cart data
let cart = [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 }
];

// Event listeners
document.addEventListener('DOMContentLoaded', displayCartItems);

document.getElementById('cart-items').addEventListener('click', e => {
    if (e.target.classList.contains('quantity-btn')) {
        handleQuantityChange(e);
    } else if (e.target.classList.contains('remove-btn')) {
        removeItem(e);
    }
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    // Implement checkout functionality here
    console.log('Checkout clicked');
});
