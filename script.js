
let slideIndex = 0;
function showSlides() {
  const slides = document.getElementsByClassName("slide");
  if (slides.length === 0) return;
  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}
showSlides();


const products = [
  { name: "HEADPHONE", price: 1599, image: "images/HEADPHONE.jpg" },
  { name: "KEYBORD", price: 499, image: "images/KEYBORD.jpg" },
  { name: "MOUSE", price: 350, image: "images/MOUSE.jpg" },
  { name: "GPU", price: 9500, image: "images/GPU.jpg" },
  { name: "MONITOR", price: 5500, image: "images/MONITOR.jpg" },
  { name: "SSD", price: 2000, image: "images/SSD.jpg" },
  { name: "XBOX", price: 29999, image: "images/XBOX.jpg" },
  { name: "LAPTOP", price: 39999, image: "images/LAPTOP.jpg" },
  { name: "CAMERA", price: 8999, image: "images/CAMERA.jpg" },
  { name: "WATCH", price: 1299, image: "images/WATCH.jpg" }
];


function displayProducts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name} - ₹${product.price}</h3>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(index) {
  cart.push(products[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${products[index].name} added to cart!`);
}

function showCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartContainer || !cartTotal) return;

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} - ₹${item.price}</span>
      <button onclick="removeItem(${i})">❌</button>
    `;
    cartContainer.appendChild(div);
    total += item.price;
  });

  cartTotal.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCartItems();
}


window.onload = () => {
  displayProducts("home-gallery");
  displayProducts("products-list");
  showCartItems();
};
