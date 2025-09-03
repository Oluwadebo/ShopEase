// MODULE 1: HEADER & FOOTER
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
    init: () =>
      Promise.all([
        load("header", "header.html"),
        load("footer", "footer.html"),
      ]),
  };
})();

// MODULE 2: PRODUCTS DATA
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
  ];
  return { PRODUCTS };
})();

// MODULE 3: STATE MANAGEMENT
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

// MODULE 4: PRODUCT RENDERING
const ProductRender = (() => {
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
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy"/>
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

  const render = () => {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

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
  };

  return { render };
})();

// MODULE 5: CART MANAGEMENT
const Cart = (() => {
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
    const list = document.getElementById("cartList");
    const subtotalEl = document.getElementById("subtotal");
    const countEl = document.getElementById("cartCount");
    const summaryItems = document.getElementById("summaryItems");

    // Update cart badge
    if (countEl) {
      countEl.textContent = State.cart.reduce((s, i) => s + i.qty, 0);
    }

    if (list && subtotalEl) {
      let subtotal = 0;

      list.innerHTML = State.cart
        .map((it) => {
          const total = it.price * it.qty;
          subtotal += total;
          return `
          <article class="cart-item">
            <img alt="${it.name}" src="${it.img}" />
            <div class="item-details">
              <div class="item-name" style="font-weight:700">${it.name}</div>
              <div style="color:var(--text-dim); font-size:14px">
                ₦${it.price.toLocaleString()}
              </div>
              <div class="qty" role="group">
                <button aria-label="Decrease" onclick="Cart.changeQty('${it.id}',-1)">−</button>
                <span aria-live="polite">${it.qty}</span>
                <button aria-label="Increase" onclick="Cart.changeQty('${it.id}',1)">+</button>
              </div>
            </div>
            <div style="text-align:right">
              <div style="font-weight:800">₦${total.toLocaleString()}</div>
              <button class="remove" onclick="Cart.remove('${it.id}')">Remove</button>
            </div>
          </article>
        `;
        })
        .join("");

      subtotalEl.textContent = `₦${subtotal.toLocaleString()}`;

      if (summaryItems) {
        summaryItems.innerHTML = State.cart
          .map(
            (it) => `
          <div class="row" style="font-size:14px; margin-bottom:4px">
            <span>${it.qty} × ${it.name}</span>
            <span>₦${(it.price * it.qty).toLocaleString()}</span>
          </div>
        `
          )
          .join("");
      }
    }
  };

  return { add, remove, changeQty, render };
})();

// MODULE 6: EVENT LISTENERS
const Events = (() => {
  const init = () => {
    const chips = document.getElementById("categoryChips");
    const search = document.getElementById("searchInput");
    const sort = document.getElementById("sortSelect");

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

    if (search) {
      search.addEventListener("input", () => {
        State.query = search.value.trim().toLowerCase();
        ProductRender.render();
      });
    }

    if (sort) {
      sort.addEventListener("change", () => {
        State.sort = sort.value;
        ProductRender.render();
      });
    }

    const shopBtn = document.getElementById("shopNow");
    if (shopBtn)
      shopBtn.addEventListener("click", () => {
        const grid = document.getElementById("productGrid");
        if (!grid) return;
        window.scrollTo({
          top: grid.offsetTop - 80,
          behavior: "smooth",
        });
      });
  };

  return { init };
})();

// MODULE 7: INITIALIZE PAGE
document.addEventListener("DOMContentLoaded", () => {
  HeaderFooter.init().then(() => {
    Events.init();

    const allChip = document.querySelector('.chip[data-cat="all"]');
    if (allChip) {
      allChip.classList.add("active");
      allChip.setAttribute("aria-selected", "true");
    }

    ProductRender.render();
    Cart.render();

    if (document.getElementById("productDetail")) {
      ProductDetailPage.renderDetail(ProductData.PRODUCTS[4]);
    }

    // ✅ Initialize Checkout only on checkout page
    if (document.getElementById("checkoutForm")) {
      Checkout.init();
    }
  });
});


// MODULE 8: PRODUCT DETAIL PAGE
const ProductDetailPage = (() => {
  const detailSection = document.getElementById("productDetail");
  const imagesContainer = document.getElementById("productImages");
  const infoContainer = document.getElementById("productInfo");
  const similarContainer = document.getElementById("similarProducts");

  const renderDetail = (product) => {
    // One main image only
    imagesContainer.innerHTML = `
      <img src="${product.images[0]}" 
           alt="${product.name}" 
           class="active" 
           loading="lazy"/>
    `;

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
      <button class="checkout-add-btn" data-add="${product.id}">
        Add to Cart
      </button>
    `;

    const addBtn = infoContainer.querySelector(".checkout-add-btn");
    if (addBtn) addBtn.addEventListener("click", () => Cart.add(product.id));

    renderSimilar(product);
  };

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
        </div>
      `;
      card.addEventListener("click", () => {
        renderDetail(p);
        window.scrollTo({
          top: detailSection.offsetTop - 60,
          behavior: "smooth",
        });
      });
      similarContainer.appendChild(card);
    });
  };

  return { renderDetail };
})();

// MODULE 9: CHECKOUT PAGE
const Checkout = (() => {
  const renderSummary = () => {
    const listEl = document.getElementById("summaryList");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("grandTotal");

    if (!listEl || !subtotalEl || !totalEl) return;

    let subtotal = 0;
    listEl.innerHTML = State.cart
      .map((item) => {
        const total = item.price * item.qty;
        subtotal += total;
        return `
          <article class="summary-item">
            <img src="${item.img}" alt="${item.name}" />
            <div>
              <p>${item.name}</p>
              <small>₦${item.price.toLocaleString()} × ${item.qty}</small>
            </div>
            <strong>₦${total.toLocaleString()}</strong>
          </article>
        `;
      })
      .join("");

    subtotalEl.textContent = "₦" + subtotal.toLocaleString();
    totalEl.textContent = "₦" + subtotal.toLocaleString();
  };

  const handleForm = () => {
    const form = document.getElementById("checkoutForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(form).entries());
      const order = {
        customer: data,
        cart: State.cart,
        total: document.getElementById("grandTotal").textContent,
        date: new Date().toISOString(),
      };

      localStorage.setItem("ORDER_V1", JSON.stringify(order));
      window.location.href = "payment.html";
    });
  };

  const init = () => {
    renderSummary();
    handleForm();
  };

  return { init };
})();
