// ============================
// MODULE 1: HEADER & FOOTER
// ============================
const HeaderFooter = (() => {
  const load = (id, url) => {
    const el = document.getElementById(id);
    if (!el) return Promise.resolve();
    return fetch(url)
      .then((res) => res.text())
      .then((html) => {
        el.innerHTML = html;
        if (id === "footer") {
          const yearEl = document.getElementById("year");
          if (yearEl) yearEl.textContent = new Date().getFullYear();
        }
      });
  };
  return {
    init: () => Promise.all([load("header", "header.html"), load("footer", "footer.html")]),
  };
})();


// ============================
// MODULE 2: PRODUCTS DATA
// ============================
const ProductData = (() => {
  const PRODUCTS = [
    {
      id: "p1",
      name: "Smart Watch S9",
      price: 68000,
      oldPrice: 75000,
      category: "electronics",
      tag: "New",
      images: [
        "https://picsum.photos/seed/watch1/600/600",
        "https://picsum.photos/seed/watch2/600/600",
        "https://picsum.photos/seed/watch3/600/600",
      ],
    },
    {
      id: "p2",
      name: "Minimal Sneakers",
      price: 29000,
      oldPrice: 34000,
      category: "fashion",
      tag: "Sale",
      images: [
        "https://picsum.photos/seed/sneakers1/600/600",
        "https://picsum.photos/seed/sneakers2/600/600",
        "https://picsum.photos/seed/sneakers3/600/600",
      ],
    },
    {
      id: "p3",
      name: "Cotton Hoodie",
      price: 18000,
      oldPrice: 22000,
      category: "fashion",
      tag: "Casual",
      images: [
        "https://picsum.photos/seed/hoodie1/600/600",
        "https://picsum.photos/seed/hoodie2/600/600",
        "https://picsum.photos/seed/hoodie3/600/600",
      ],
    },
    {
      id: "p4",
      name: "Ceramic Mug",
      price: 6500,
      oldPrice: 8500,
      category: "home",
      tag: "Sale",
      images: [
        "https://picsum.photos/seed/mug1/600/600",
        "https://picsum.photos/seed/mug2/600/600",
        "https://picsum.photos/seed/mug3/600/600",
      ],
    },
    {
      id: "p5",
      name: "LED Table Lamp",
      price: 22000,
      oldPrice: 26000,
      category: "home",
      tag: "New",
      images: [
        "https://picsum.photos/seed/lamp1/600/600",
        "https://picsum.photos/seed/lamp2/600/600",
        "https://picsum.photos/seed/lamp3/600/600",
      ],
    },
    {
      id: "p6",
      name: "Leather Wallet",
      price: 15000,
      oldPrice: 18000,
      category: "accessories",
      tag: "Classic",
      images: [
        "https://picsum.photos/seed/wallet1/600/600",
        "https://picsum.photos/seed/wallet2/600/600",
        "https://picsum.photos/seed/wallet3/600/600",
      ],
    },
    {
      id: "p7",
      name: "Sunglasses Nova",
      price: 12500,
      oldPrice: 15000,
      category: "accessories",
      tag: "Hot",
      images: [
        "https://picsum.photos/seed/sunglasses1/600/600",
        "https://picsum.photos/seed/sunglasses2/600/600",
        "https://picsum.photos/seed/sunglasses3/600/600",
      ],
    },
    {
      id: "p8",
      name: "Skincare Set",
      price: 26000,
      oldPrice: 31000,
      category: "beauty",
      tag: "Bundle",
      images: [
        "https://picsum.photos/seed/beauty1/600/600",
        "https://picsum.photos/seed/beauty2/600/600",
        "https://picsum.photos/seed/beauty3/600/600",
      ],
    },
    {
      id: "p9",
      name: "Bluetooth Speaker",
      price: 24000,
      oldPrice: 28000,
      category: "electronics",
      tag: "Trending",
      images: [
        "https://picsum.photos/seed/speaker1/600/600",
        "https://picsum.photos/seed/speaker2/600/600",
        "https://picsum.photos/seed/speaker3/600/600",
      ],
    },
    {
      id: "p10",
      name: "Throw Pillow",
      price: 8000,
      oldPrice: 10000,
      category: "home",
      tag: "Cozy",
      images: [
        "https://picsum.photos/seed/pillow1/600/600",
        "https://picsum.photos/seed/pillow2/600/600",
        "https://picsum.photos/seed/pillow3/600/600",
      ],
    },
    {
      id: "p11",
      name: "Denim Jacket",
      price: 33000,
      oldPrice: 37000,
      category: "fashion",
      tag: "New",
      images: [
        "https://picsum.photos/seed/denim1/600/600",
        "https://picsum.photos/seed/denim2/600/600",
        "https://picsum.photos/seed/denim3/600/600",
      ],
    },
    {
      id: "p12",
      name: "Smartphone X",
      price: 200000,
      oldPrice: 220000,
      category: "electronics",
      tag: "Premium",
      images: [
        "https://picsum.photos/seed/smartphone1/600/600",
        "https://picsum.photos/seed/smartphone2/600/600",
        "https://picsum.photos/seed/smartphone3/600/600",
      ],
    },
    {
      id: "p13",
      name: "Wireless Headphones",
      price: 75000,
      oldPrice: 85000,
      category: "electronics",
      tag: "Hot",
      images: [
        "https://picsum.photos/seed/headphones1/600/600",
        "https://picsum.photos/seed/headphones2/600/600",
        "https://picsum.photos/seed/headphones3/600/600",
      ],
    },
    {
      id: "p14",
      name: "Leather Jacket",
      price: 55000,
      oldPrice: 65000,
      category: "fashion",
      tag: "Classic",
      images: [
        "https://picsum.photos/seed/leatherjacket1/600/600",
        "https://picsum.photos/seed/leatherjacket2/600/600",
        "https://picsum.photos/seed/leatherjacket3/600/600",
      ],
    },
    {
      id: "p15",
      name: "Coffee Maker",
      price: 40000,
      oldPrice: 45000,
      category: "home",
      tag: "Kitchen",
      images: [
        "https://picsum.photos/seed/coffeemaker1/600/600",
        "https://picsum.photos/seed/coffeemaker2/600/600",
        "https://picsum.photos/seed/coffeemaker3/600/600",
      ],
    },
    {
      id: "p16",
      name: "Gold Necklace",
      price: 120000,
      oldPrice: 135000,
      category: "accessories",
      tag: "Luxury",
      images: [
        "https://picsum.photos/seed/necklace1/600/600",
        "https://picsum.photos/seed/necklace2/600/600",
        "https://picsum.photos/seed/necklace3/600/600",
      ],
    },
    {
      id: "p17",
      name: "Face Cream",
      price: 15000,
      oldPrice: 18000,
      category: "beauty",
      tag: "Care",
      images: [
        "https://picsum.photos/seed/facecream1/600/600",
        "https://picsum.photos/seed/facecream2/600/600",
        "https://picsum.photos/seed/facecream3/600/600",
      ],
    },
  ];
  return { PRODUCTS };
})();

// ============================
// MODULE 3: STATE MANAGEMENT
// ============================
const State = {
  query: "",
  category: "all",
  sort: "relevance",
  cart: JSON.parse(localStorage.getItem("CART_V1") || "[]"),
  cartOpen: localStorage.getItem("CART_PANEL_OPEN") === "true",
  saveCart() {
    localStorage.setItem("CART_V1", JSON.stringify(this.cart));
  },
  saveCartPanel() {
    localStorage.setItem("CART_PANEL_OPEN", this.cartOpen);
  },
};

// ============================
// MODULE 4: PRODUCT RENDERING
// ============================
const ProductRender = (() => {
  const grid = document.getElementById("productGrid");

  const score = (name, q) => {
    if (!q) return 0;
    const n = name.toLowerCase();
    if (n.startsWith(q)) return 3;
    if (n.includes(q)) return 1;
    return 0;
  };

  const sortItems = (items, mode) => {
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
      default:
        arr.sort(
          (a, b) =>
            score(b.name, State.query) - score(a.name, State.query) ||
            a.price - b.price
        );
    }
    return arr;
  };

  const cardHTML = (p) => `
    <article class="card" aria-label="${p.name}">
      <div class="thumb">
        <div class="carousel">
          ${p.images
            .map(
              (img, i) =>
                `<img src="${img}" alt="${p.name} ${i + 1}" loading="lazy"/>`
            )
            .join("")}
        </div>
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
    </article>
  `;

  const setupCarousel = (carousel) => {
    const imgs = carousel.querySelectorAll("img");
    let index = 0,
      intervalId = null;
    const startHover = () => {
      if (!intervalId && imgs.length > 1)
        intervalId = setInterval(() => {
          index = (index + 1) % imgs.length;
          carousel.style.transform = `translateX(-${index * 100}%)`;
        }, 1500);
    };
    const stopHover = () => {
      clearInterval(intervalId);
      intervalId = null;
      index = 0;
      carousel.style.transform = "translateX(0)";
    };
    carousel.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) startHover();
    });
    carousel.addEventListener("mouseleave", stopHover);
    let startX = 0,
      isDragging = false;
    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });
    carousel.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      carousel.style.transform = `translateX(${
        -index * 100 + (dx / carousel.offsetWidth) * 100
      }%)`;
    });
    carousel.addEventListener("touchend", (e) => {
      if (!isDragging) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (dx < -30 && index < imgs.length - 1) index++;
      if (dx > 30 && index > 0) index--;
      carousel.style.transform = `translateX(-${index * 100}%)`;
      isDragging = false;
    });
  };

  const render = () => {
    const filtered = ProductData.PRODUCTS.filter(
      (p) => State.category === "all" || p.category === State.category
    ).filter((p) => p.name.toLowerCase().includes(State.query));
    const sorted = sortItems(filtered, State.sort);
    grid.innerHTML = sorted.map(cardHTML).join("");
    grid
      .querySelectorAll("[data-add]")
      .forEach((btn) =>
        btn.addEventListener("click", () => Cart.add(btn.dataset.add))
      );
    grid.querySelectorAll(".carousel").forEach(setupCarousel);
  };

  return { render };
})();

// ============================
// MODULE 5: CART MANAGEMENT
// ============================
const Cart = (() => {
  const drawer = document.getElementById("cartDrawer");
  const list = document.getElementById("cartList");
  const subtotalEl = document.getElementById("subtotal");
  const countEl = document.getElementById("cartCount");

  const find = (id) => State.cart.find((i) => i.id === id);

  const add = (id) => {
    const p = ProductData.PRODUCTS.find((p) => p.id === id);
    if (!p) return;
    const existing = find(id);
    if (existing) existing.qty++;
    else
      State.cart.push({
        id: p.id,
        name: p.name,
        price: p.price,
        img: p.images[0],
        qty: 1,
      });
    State.saveCart();
    render();
  };

  const remove = (id) => {
    State.cart = State.cart.filter((i) => i.id !== id);
    State.saveCart();
    render();
  };

  const changeQty = (id, delta) => {
    const item = find(id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    State.saveCart();
    render();
  };

  const render = () => {
    if (!list) return;
    list.innerHTML = State.cart
      .map(
        (it) => `
      <div class="cart-item">
        <img alt="${it.name}" src="${it.img}" />
        <div>
          <div style="font-weight:700">${it.name}</div>
          <div style="color:var(--text-dim); font-size:14px">₦${it.price.toLocaleString()}</div>
          <div class="qty" role="group">
            <button aria-label="Decrease" onclick="Cart.changeQty('${
              it.id
            }',-1)">−</button>
            <span aria-live="polite">${it.qty}</span>
            <button aria-label="Increase" onclick="Cart.changeQty('${
              it.id
            }',1)">+</button>
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:800">₦${(
            it.price * it.qty
          ).toLocaleString()}</div>
          <button class="remove" onclick="Cart.remove('${
            it.id
          }')">Remove</button>
        </div>
      </div>
    `
      )
      .join("");
    subtotalEl.textContent = `₦${State.cart
      .reduce((s, i) => s + i.price * i.qty, 0)
      .toLocaleString()}`;
    countEl.textContent = State.cart.reduce((s, i) => s + i.qty, 0);
  };

  const open = () => {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    State.cartOpen = true;
    State.saveCartPanel();
  };
  const close = () => {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    State.cartOpen = false;
    State.saveCartPanel();
  };

  return { add, remove, changeQty, render, open, close };
})();

// ============================
// MODULE 6: EVENT LISTENERS
// ============================
const Events = (() => {
  const chips = document.getElementById("categoryChips");
  const search = document.getElementById("searchInput");
  const sort = document.getElementById("sortSelect");

  const init = () => {
    // Category filter
    if (chips) {
      chips.addEventListener("click", (e) => {
        const btn = e.target.closest(".chip");
        if (!btn) return;
        chips.querySelectorAll(".chip").forEach((c) => {
          c.classList.remove("active");
          c.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        State.category = btn.dataset.cat;
        ProductRender.render();
      });
    }

    // Search input
    if (search) {
      search.addEventListener("input", () => {
        State.query = search.value.trim().toLowerCase();
        ProductRender.render();
      });
    }

    // Sort select
    if (sort) {
      sort.addEventListener("change", () => {
        State.sort = sort.value;
        ProductRender.render();
      });
    }

    // Shop now scroll
    const shopBtn = document.getElementById("shopNow");
    if (shopBtn)
      shopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: document.getElementById("productGrid").offsetTop - 80,
          behavior: "smooth",
        });
      });

    // Cart open/close
    // Use delegation to make sure buttons exist even if loaded dynamically
    document.body.addEventListener("click", (e) => {
      if (e.target.id === "openCart") Cart.open();
      if (e.target.id === "closeCart") Cart.close();
    });
  };

  return { init };
})();


// ============================
// MODULE 7: INITIALIZE PAGE
// ============================
document.addEventListener("DOMContentLoaded", () => {
  HeaderFooter.init().then(() => {
    // Header & Footer fully loaded
    Events.init();

    // Set default active category
    const allChip = document.querySelector('.chip[data-cat="all"]');
    if (allChip) {
      allChip.classList.add("active");
      allChip.setAttribute("aria-selected", "true");
    }

    ProductRender.render();
    Cart.render();
    if (State.cartOpen) Cart.open();
  });
});



// ============================
// MODULE 8: PRODUCT DETAIL PAGE
// ============================
const ProductDetailPage = (() => {
  const detailSection = document.getElementById("productDetail");
  const imagesContainer = document.getElementById("productImages");
  const infoContainer = document.getElementById("productInfo");
  const similarContainer = document.getElementById("similarProducts");

  // Default product (first in array)
  let currentProduct = ProductData.PRODUCTS[0];

  // Render main product detail
  const renderDetail = (product) => {
    currentProduct = product;

    // Images carousel
    imagesContainer.innerHTML = product.images
      .map(
        (img, i) =>
          `<img src="${img}" alt="${product.name} ${i + 1}" class="${
            i === 0 ? "active" : ""
          }"/>`
      )
      .join("");

    // Auto-rotate images
    const imgs = imagesContainer.querySelectorAll("img");
    let idx = 0;
    clearInterval(imagesContainer.intervalId);
    imagesContainer.intervalId = setInterval(() => {
      imgs.forEach((img, i) => img.classList.toggle("active", i === idx));
      idx = (idx + 1) % imgs.length;
    }, 2500);

    // Info
    infoContainer.innerHTML = `
      ${product.tag ? `<span class="badge-tag">${product.tag}</span>` : ""}
      <h1>${product.name}</h1>
      <div class="price-row">
        <div class="price">₦${product.price.toLocaleString()}</div>
        ${
          product.oldPrice
            ? `<div class="old">₦${product.oldPrice.toLocaleString()}</div>`
            : ""
        }
      </div>
      <button class="add-btn" data-add="${product.id}">Add to Cart</button>
    `;

    // Add to cart button
    const addBtn = infoContainer.querySelector(".add-btn");
    if (addBtn) {
      addBtn.addEventListener("click", () => Cart.add(product.id));
    }

    renderSimilar(product);
  };

  // Render similar products based on category or tag
  const renderSimilar = (product) => {
    similarContainer.innerHTML = "";
    const similar = ProductData.PRODUCTS.filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.tag === product.tag)
    );
    similar.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${p.images[0]}" alt="${p.name}">
        <div class="card-content">
          <div class="card-title">${p.name}</div>
          <div class="card-price-row">
            <div class="card-price">₦${p.price.toLocaleString()}</div>
            ${
              p.oldPrice
                ? `<div class="card-old">₦${p.oldPrice.toLocaleString()}</div>`
                : ""
            }
          </div>
        </div>
      `;
      // Click updates main product
      card.addEventListener("click", () => {
        renderDetail(p);
        window.scrollTo({ top: detailSection.offsetTop - 60, behavior: "smooth" });
      });
      similarContainer.appendChild(card);
    });
  };

  return { renderDetail };
})();

// ============================
// Initialize Product Detail Page
// ============================
document.addEventListener("DOMContentLoaded", () => {
  // Only initialize if product detail section exists
  if (document.getElementById("productDetail")) {
    ProductDetailPage.renderDetail(ProductData.PRODUCTS[0]);
  }
});
