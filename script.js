// footer year
const year = new Date().getFullYear();
document.getElementById("year").innerText = year;

//  Demo data 
const PRODUCTS = [
  {
    id: "p1",
    name: "Wireless Headphones",
    price: 35000,
    oldPrice: 42000,
    category: "electronics",
    tag: "Hot",
    img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%234f8cff"/><stop offset="100%" stop-color="%2320d6a7"/></linearGradient></defs><rect width="400" height="400" fill="%23131820"/><circle cx="200" cy="200" r="120" fill="url(%23g)" opacity=".7"/></svg>',
  },
  {
    id: "p2",
    name: "Smart Watch S9",
    price: 68000,
    oldPrice: null,
    category: "electronics",
    tag: "New",
    img: "https://picsum.photos/seed/watch/600/600",
  },
  {
    id: "p3",
    name: "Minimal Sneakers",
    price: 29000,
    oldPrice: 34000,
    category: "fashion",
    tag: "Sale",
    img: "https://picsum.photos/seed/sneakers/600/600",
  },
  {
    id: "p4",
    name: "Cotton Hoodie",
    price: 18000,
    oldPrice: null,
    category: "fashion",
    tag: "",
    img: "https://picsum.photos/seed/hoodie/600/600",
  },
  {
    id: "p5",
    name: "Ceramic Mug",
    price: 6500,
    oldPrice: 8500,
    category: "home",
    tag: "Sale",
    img: "https://picsum.photos/seed/mug/600/600",
  },
  {
    id: "p6",
    name: "LED Table Lamp",
    price: 22000,
    oldPrice: null,
    category: "home",
    tag: "New",
    img: "https://picsum.photos/seed/lamp/600/600",
  },
  {
    id: "p7",
    name: "Leather Wallet",
    price: 15000,
    oldPrice: null,
    category: "accessories",
    tag: "",
    img: "https://picsum.photos/seed/wallet/600/600",
  },
  {
    id: "p8",
    name: "Sunglasses Nova",
    price: 12500,
    oldPrice: 15000,
    category: "accessories",
    tag: "Hot",
    img: "https://picsum.photos/seed/sunglasses/600/600",
  },
  {
    id: "p9",
    name: "Skincare Set",
    price: 26000,
    oldPrice: 31000,
    category: "beauty",
    tag: "Bundle",
    img: "https://picsum.photos/seed/beauty/600/600",
  },
  {
    id: "p10",
    name: "Bluetooth Speaker",
    price: 24000,
    oldPrice: 28000,
    category: "electronics",
    tag: "",
    img: "https://picsum.photos/seed/speaker/600/600",
  },
  {
    id: "p11",
    name: "Throw Pillow",
    price: 8000,
    oldPrice: null,
    category: "home",
    tag: "",
    img: "https://picsum.photos/seed/pillow/600/600",
  },
  {
    id: "p12",
    name: "Denim Jacket",
    price: 33000,
    oldPrice: null,
    category: "fashion",
    tag: "New",
    img: "https://picsum.photos/seed/denim/600/600",
  },
];

// ---------- State ----------
let state = {
  query: "",
  category: "all",
  sort: "relevance",
  cart: JSON.parse(localStorage.getItem("CART_V1") || "[]"),
};

const fmt = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

// ---------- DOM ----------
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
              <div class="price">${fmt(p.price)}</div>
              ${p.oldPrice ? `<div class="old">${fmt(p.oldPrice)}</div>` : ""}
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
  openCart();
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
            <div style="color:var(--text-dim); font-size:14px">${fmt(
              it.price
            )}</div>
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
            <div style="font-weight:800">${fmt(it.price * it.qty)}</div>
            <button class="remove" onclick="removeFromCart('${
              it.id
            }')">Remove</button>
          </div>
        </div>`
    )
    .join("");
  const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  subtotalEl.textContent = fmt(subtotal);
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

// Light/Dark toggle (kept simple for demo)
document.getElementById("themeToggle").addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme !== "light";
  document.documentElement.dataset.theme = dark ? "light" : "dark";
  if (!dark) {
    // switch to light
    document.documentElement.style.setProperty("--bg", "#f7f8fb");
    document.documentElement.style.setProperty("--panel", "#ffffff");
    document.documentElement.style.setProperty("--muted", "#f0f3f7");
    document.documentElement.style.setProperty("--text", "#101317");
    document.documentElement.style.setProperty("--text-dim", "#4a5562");
    document.documentElement.style.setProperty(
      "--shadow",
      "0 10px 30px rgba(10,16,30,.08)"
    );
  } else {
    // switch back to dark
    document.documentElement.style.setProperty("--bg", "#0b0d10");
    document.documentElement.style.setProperty("--panel", "#12151a");
    document.documentElement.style.setProperty("--muted", "#1a1f27");
    document.documentElement.style.setProperty("--text", "#e9eef5");
    document.documentElement.style.setProperty("--text-dim", "#b6c2d0");
    document.documentElement.style.setProperty(
      "--shadow",
      "0 10px 30px rgba(0,0,0,.35)"
    );
  }
});

// Init
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();

// Expose cart fns for inline handlers
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;
