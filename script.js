// onload of all page
fetch("header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;
  });
  fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
    document.getElementById("year").textContent = new Date().getFullYear();
  });
// Products data
const PRODUCTS = [
  {
    id: "p1",
    name: "Smart Watch S9",
    price: 68000,
    oldPrice: 75000,
    category: "electronics",
    tag: "New",
    img: "https://picsum.photos/seed/watch/600/600",
  },
  {
    id: "p2",
    name: "Minimal Sneakers",
    price: 29000,
    oldPrice: 34000,
    category: "fashion",
    tag: "Sale",
    img: "https://picsum.photos/seed/sneakers/600/600",
  },
  {
    id: "p3",
    name: "Cotton Hoodie",
    price: 18000,
    oldPrice: 22000,
    category: "fashion",
    tag: "Casual",
    img: "https://picsum.photos/seed/hoodie/600/600",
  },
  {
    id: "p4",
    name: "Ceramic Mug",
    price: 6500,
    oldPrice: 8500,
    category: "home",
    tag: "Sale",
    img: "https://picsum.photos/seed/mug/600/600",
  },
  {
    id: "p5",
    name: "LED Table Lamp",
    price: 22000,
    oldPrice: 26000,
    category: "home",
    tag: "New",
    img: "https://picsum.photos/seed/lamp/600/600",
  },
  {
    id: "p6",
    name: "Leather Wallet",
    price: 15000,
    oldPrice: 18000,
    category: "accessories",
    tag: "Classic",
    img: "https://picsum.photos/seed/wallet/600/600",
  },
  {
    id: "p7",
    name: "Sunglasses Nova",
    price: 12500,
    oldPrice: 15000,
    category: "accessories",
    tag: "Hot",
    img: "https://picsum.photos/seed/sunglasses/600/600",
  },
  {
    id: "p8",
    name: "Skincare Set",
    price: 26000,
    oldPrice: 31000,
    category: "beauty",
    tag: "Bundle",
    img: "https://picsum.photos/seed/beauty/600/600",
  },
  {
    id: "p9",
    name: "Bluetooth Speaker",
    price: 24000,
    oldPrice: 28000,
    category: "electronics",
    tag: "Trending",
    img: "https://picsum.photos/seed/speaker/600/600",
  },
  {
    id: "p10",
    name: "Throw Pillow",
    price: 8000,
    oldPrice: 10000,
    category: "home",
    tag: "Cozy",
    img: "https://picsum.photos/seed/pillow/600/600",
  },
  {
    id: "p11",
    name: "Denim Jacket",
    price: 33000,
    oldPrice: 37000,
    category: "fashion",
    tag: "New",
    img: "https://picsum.photos/seed/denim/600/600",
  },
  {
    id: "p12",
    name: "Smartphone X",
    price: 200000,
    oldPrice: 220000,
    category: "electronics",
    tag: "Premium",
    img: "https://picsum.photos/300?1",
  },
  {
    id: "p13",
    name: "Wireless Headphones",
    price: 75000,
    oldPrice: 85000,
    category: "electronics",
    tag: "Hot",
    img: "https://picsum.photos/300?2",
  },
  {
    id: "p14",
    name: "Leather Jacket",
    price: 55000,
    oldPrice: 65000,
    category: "fashion",
    tag: "Classic",
    img: "https://picsum.photos/300?3",
  },
  {
    id: "p15",
    name: "Coffee Maker",
    price: 40000,
    oldPrice: 45000,
    category: "home",
    tag: "Kitchen",
    img: "https://picsum.photos/300?4",
  },
  {
    id: "p16",
    name: "Gold Necklace",
    price: 120000,
    oldPrice: 135000,
    category: "accessories",
    tag: "Luxury",
    img: "https://picsum.photos/300?5",
  },
  {
    id: "p17",
    name: "Face Cream",
    price: 15000,
    oldPrice: 18000,
    category: "beauty",
    tag: "Care",
    img: "https://picsum.photos/300?6",
  },
];

// getting ids
const grid = document.getElementById("productGrid");
const chips = document.getElementById("categoryChips");
const search = document.getElementById("searchInput");
const sort = document.getElementById("sortSelect");
const cartDrawer = document.getElementById("cartDrawer");
const openCartBtn = document.getElementById("openCart");
const closeCartBtn = document.getElementById("closeCart");
const cartList = document.getElementById("cartList");
const subtotalEl = document.getElementById("subtotal");
const cartCountEl = document.getElementById("cartCount");

// ---------- State ----------
let cart = [];
let state = {
  query: "",
  category: "all",
  sort: "relevance",
  cart: JSON.parse(localStorage.getItem("CART_V1") || "[]"),
};

// ---------- Rendering ----------
function renderProducts() {
  let items = PRODUCTS.filter(
    (p) =>
      (state.category === "all" || p.category === state.category) &&
      p.name.toLowerCase().includes(state.query)
  );
  items = sortItems(items, state.sort);
  grid.innerHTML = items.map(cardHTML).join("");
  // Bind add buttons
  grid
    .querySelectorAll("[data-add]")
    .forEach((btn) =>
      btn.addEventListener("click", () => addToCart(btn.dataset.add))
    );
}

function sortItems(items, mode) {
  const arr = [...items];
  switch (mode) {
    case "price-asc":
      arr.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      arr.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      arr.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      arr.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default: // relevance: name match strength then price
      arr.sort((a, b) => {
        const qa = score(a.name, state.query),
          qb = score(b.name, state.query);
        return qb - qa || a.price - b.price;
      });
  }
  return arr;
}

function score(name, q) {
  if (!q) return 0;
  const n = name.toLowerCase();
  if (n.startsWith(q)) return 3;
  if (n.includes(q)) return 1;
  return 0;
}

function cardHTML(p) {
  return `
        <article class="card" aria-label="${p.name}">
          <div class="thumb">
            <img src="${p.img}" alt="${p.name}" loading="lazy" />
            ${p.tag ? `<span class="badge-tag">${p.tag}</span>` : ""}
          </div>
          <div class="content">
            <div class="title">${p.name}</div>
            <div class="price-row">
              <div class="price">₦${p.price.toLocaleString()}</div>
              ${
                p.oldPrice
                  ? `<div class="old">₦${p.oldPrice.toLocaleString()}</div>`
                  : ""
              }
            </div>
            <button class="add-btn" data-add="${p.id}">Add to cart</button>
          </div>
        </article>`;
}

// ---------- Cart ----------
function saveCart() {
  localStorage.setItem("CART_V1", JSON.stringify(state.cart));
}
function findInCart(id) {
  return state.cart.find((i) => i.id === id);
}
function addToCart(id) {
  const p = PRODUCTS.find((p) => p.id === id);
  if (!p) return;
  const existing = findInCart(id);
  if (existing) existing.qty += 1;
  else
    state.cart.push({
      id: p.id,
      name: p.name,
      price: p.price,
      img: p.img,
      qty: 1,
    });
  saveCart();
  renderCart();
  //   openCart();
}
function removeFromCart(id) {
  state.cart = state.cart.filter((i) => i.id !== id);
  saveCart();
  renderCart();
}
function changeQty(id, delta) {
  const it = findInCart(id);
  if (!it) return;
  it.qty = Math.max(1, it.qty + delta);
  saveCart();
  renderCart();
}
function renderCart() {
  cartList.innerHTML = state.cart
    .map(
      (it) => `
        <div class="cart-item">
          <img alt="${it.name}" src="${it.img}" />
          <div>
            <div style="font-weight:700">${it.name}</div>
            <div style="color:var(--text-dim); font-size:14px">₦${it.price.toLocaleString()}</div>
            <div class="qty" role="group" aria-label="Quantity">
              <button aria-label="Decrease" onclick="changeQty('${
                it.id
              }', -1)">−</button>
              <span aria-live="polite">${it.qty}</span>
              <button aria-label="Increase" onclick="changeQty('${
                it.id
              }', 1)">+</button>
            </div>
          </div>
          <div style="text-align:right">
            <div style="font-weight:800">₦${(
              it.price * it.qty
            ).toLocaleString()}</div>
            <button class="remove" onclick="removeFromCart('${
              it.id
            }')">Remove</button>
          </div>
        </div>`
    )
    .join("");
  const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  subtotalEl.textContent = `₦${subtotal.toLocaleString()}`;

  cartCountEl.textContent = state.cart.reduce((s, i) => s + i.qty, 0);
}
function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}
function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

// onload of index page
document.addEventListener("DOMContentLoaded", () => {
  // Make sure "All" chip is active on load
  const allChip = document.querySelector('.chip[data-cat="all"]');
  if (allChip) {
    allChip.classList.add("active");
    allChip.setAttribute("aria-selected", "true");
  }
  // 🔥 Load cart from localStorage
  const saved = localStorage.getItem("CART_V1");
  if (saved) {
    state.cart = JSON.parse(saved);
    renderCart(); // show saved items immediately
  }
  // Render all products on page load
  renderProducts();
});
// ---------- Events ----------
chips.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  chips.querySelectorAll(".chip").forEach((c) => {
    c.classList.remove("active");
    c.setAttribute("aria-selected", "false");
  });
  btn.classList.add("active");
  btn.setAttribute("aria-selected", "true");
  state.category = btn.dataset.cat;
  renderProducts();
});
search.addEventListener("input", () => {
  state.query = search.value.trim().toLowerCase();
  renderProducts();
});
sort.addEventListener("change", () => {
  state.sort = sort.value;
  renderProducts();
});

document.getElementById("shopNow").addEventListener("click", () => {
  window.scrollTo({
    top: document.getElementById("productGrid").offsetTop - 80,
    behavior: "smooth",
  });
});
openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);

// Expose cart fns for inline handlers
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;
