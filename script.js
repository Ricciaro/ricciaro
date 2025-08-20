const products = [
  { name: "Sneaker One", price: 2500, stock: 5, image: "assets/shoe1.jpg" },
  { name: "Sneaker Two", price: 3000, stock: 3, image: "assets/shoe2.jpg" }
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const checkoutBtn = document.getElementById("checkout-btn");
const addProductForm = document.getElementById("add-product-form");

let cart = [];

// Load products
function loadProducts() {
  productList.innerHTML = "";
  products.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p>Stock: ${p.stock}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
      <button onclick="tryOn(${index})">Try On (AR)</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(index) {
  if (products[index].stock > 0) {
    cart.push(products[index]);
    products[index].stock--;
    loadProducts();
    renderCart();
  } else {
    alert("Out of stock!");
  }
}

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.innerHTML = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(div);
  });
}

checkoutBtn.addEventListener("click", () => {
  alert("Checkout successful! Thank you for shopping with Ricciaro.");
  cart = [];
  renderCart();
});

// Admin add product
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const stock = document.getElementById("product-stock").value;
  const image = document.getElementById("product-image").value;

  products.push({ name, price, stock, image });
  loadProducts();
  addProductForm.reset();
});

// Try-on AR (simplified mockup)
function tryOn(index) {
  alert("AR feature: Point your camera at your feet and imagine wearing " + products[index].name);
}

loadProducts();
