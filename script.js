// MODULE 1: HEADER & FOOTER
const HeaderFooter = (() => {
  const load = async (id, url) => {
    const el = document.getElementById(id);
    if (!el) return;

    try {
      const res = await fetch(url);
      const html = await res.text();
      el.innerHTML = html;

      // Auto-update year in footer
      if (id === "footer") {
        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
      }
    } catch (err) {
      console.error(`Error loading ${url}:`, err);
    }
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
  saveCart() {
    localStorage.setItem("CART_V1", JSON.stringify(this.cart));
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
    <a href="product.html?id=${p.id}" class="thumb">
      <img src="${p.images[0]}" alt="${p.name}" loading="lazy"/>
      ${p.tag ? `<span class="badge-tag">${p.tag}</span>` : ""}
    </a>
    <div class="content">
      <a href="product.html?id=${p.id}" class="title">${p.name}</a>
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
  const cardpHTML = (p) => `
  <article class="card" aria-label="${p.name}">
    <a href="product.html?id=${p.id}" class="">
      <img src="${p.images[0]}" alt="${p.name}" loading="lazy"/>
      ${p.tag ? `<span class="badge-tag">${p.tag}</span>` : ""}
    </a>
    <div class="content">
      <a href="product.html?id=${p.id}" class="title">${p.name}</a>
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
    const grid =
      document.getElementById("productGrid") ||
      document.getElementById("similarProducts");
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

  const renderDetail = (id) => {
    const product = ProductData.PRODUCTS.find((p) => p.id === id);
    if (!product) return;

    const imagesEl = document.getElementById("productImages");
    const infoEl = document.getElementById("productInfo");

    if (imagesEl) {
      imagesEl.innerHTML = product.images
        .map(
          (src, i) =>
            `<img src="${src}" alt="${product.name} ${i + 1}" ${
              i === 0 ? "" : "loading='lazy'"
            } />`
        )
        .join("");
    }

    if (infoEl) {
      infoEl.innerHTML = `
        <h1>${product.name}</h1>
        <div class="price-row">
          <div class="price">₦${product.price.toLocaleString()}</div>
          ${
            product.oldPrice
              ? `<div class="old">₦${product.oldPrice.toLocaleString()}</div>`
              : ""
          }
        </div>
        <p>Category: ${product.category}</p>
        <p><span class="badge-tag">${product.tag}</span></p>
        <button class="add-btn" onclick="Cart.add('${
          product.id
        }')">Add to Cart</button>
      `;
    }

    // Render similar products
    const similar = ProductData.PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
    const similarEl = document.getElementById("similarProducts");
    if (similarEl) {
      similarEl.innerHTML = similar.map(cardpHTML).join("");
      similarEl
        .querySelectorAll("[data-add]")
        .forEach((btn) =>
          btn.addEventListener("click", () => Cart.add(btn.dataset.add))
        );
    }
  };

  return { render, renderDetail };
})();

// MODULE 5: CART MANAGEMENT
const Cart = (() => {
  const find = (id) => State.cart.find((i) => i.id === id);

  const add = (id) => {
    const p = ProductData.PRODUCTS.find((p) => p.id === id);
    if (!p) return;
    const existing = find(id);
    existing
      ? existing.qty++
      : State.cart.push({ ...p, qty: 1, img: p.images[0] });
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
    const checkoutBtn = document.getElementById("checkoutBtn");

    let subtotal = 0;

    if (list) {
      list.innerHTML = State.cart
        .map((it) => {
          const total = it.price * it.qty;
          subtotal += total;
          return `
        <article class="cart-item">
          <img src="${it.img}" alt="${it.name}" />
          <div class="item-details">
            <div class="item-name">${it.name}</div>
            <small>₦${it.price.toLocaleString()}</small>
            <div class="qty">
              <button onclick="Cart.changeQty('${it.id}',-1)">−</button>
              <span>${it.qty}</span>
              <button onclick="Cart.changeQty('${it.id}',1)">+</button>
            </div>
          </div>
          <div>
            <strong>₦${total.toLocaleString()}</strong>
            <button class="remove" onclick="Cart.remove('${
              it.id
            }')">Remove</button>
          </div>
        </article>
      `;
        })
        .join("");
    }

    if (subtotalEl) subtotalEl.textContent = "₦" + subtotal.toLocaleString();
    if (countEl)
      countEl.textContent = State.cart.reduce((s, i) => s + i.qty, 0);

    if (summaryItems) {
      if (State.cart.length === 0) {
        summaryItems.innerHTML = "<h3>Your cart is empty.</h3>";
      } else {
        const rows = State.cart
          .map(
            (it) => `
      <tr>
        <td>${it.qty}</td>
        <td>${it.name}</td>
        <td>₦${it.price.toLocaleString()}</td>
        <td>₦${(it.price * it.qty).toLocaleString()}</td>
      </tr>
    `
          )
          .join("");

        const grandTotal = State.cart.reduce(
          (sum, it) => sum + it.price * it.qty,
          0
        );

        summaryItems.innerHTML = `
    <table border="0" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse; text-align:left;">
      <thead>
        <tr>
          <th>Qty</th>
          <th>Item</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr style="font-weight: bold;">
          <td colspan="3" style="text-align:center;">Grand Total</td>
          <td>₦${grandTotal.toLocaleString()}</td>
        </tr>
        <tr style="font-weight: bold;">
          <td colspan="1" style="text-align:
          center;">Shipping</td>
          <td colspan="3" style="text-align:
          right;">Calculated at checkout</td>
        </tr>
      </tbody>
    </table>
  `;
      }
    }

    if (checkoutBtn) {
      checkoutBtn.disabled = State.cart.length === 0;
      checkoutBtn.style.opacity = State.cart.length === 0 ? "0.5" : "1";
      checkoutBtn.style.cursor =
        State.cart.length === 0 ? "not-allowed" : "pointer";
    }
  };

  return { add, remove, changeQty, render };
})();

// MODULE 6: EVENTS
const Events = (() => {
  const init = () => {
    const search = document.getElementById("searchInput");
    const sort = document.getElementById("sortSelect");
    const shopBtn = document.getElementById("shopNow");
    const chips = document.querySelectorAll("#categoryChips .chip");

    if (search)
      search.addEventListener("input", () => {
        State.query = search.value.trim().toLowerCase();
        ProductRender.render();
      });

    if (sort)
      sort.addEventListener("change", () => {
        State.sort = sort.value;
        ProductRender.render();
      });

    if (shopBtn)
      shopBtn.addEventListener("click", () => {
        const grid = document.getElementById("productGrid");
        if (grid)
          window.scrollTo({ top: grid.offsetTop - 80, behavior: "smooth" });
      });

    // ✅ handle category chips
    if (chips.length) {
      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          // remove active class
          chips.forEach((c) => c.classList.remove("active"));
          chip.classList.add("active");

          // update state
          State.category = chip.dataset.cat;
          ProductRender.render();
        });
      });
    }
  };

  return { init };
})();

// MODULE 7: CHECKOUT
const Checkout = (() => {
  const handleForm = () => {
    const form = document.getElementById("checkoutForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      const order = {
        id: "ORD-" + Date.now(),
        customer: data,
        items: State.cart,
        total:
          "₦" +
          State.cart
            .reduce((sum, it) => sum + it.price * it.qty, 0)
            .toLocaleString(),
        date: new Date().toISOString(),
      };

      localStorage.setItem("ORDER_V1", JSON.stringify(order));
      window.location.href = "payment.html";
    });
  };

  return {
    init: () => {
      // renderSummary();
      handleForm();
    },
  };
})();

// MODULE 8: PAYMENT
const Payment = (() => {
  const render = () => {
    const order = JSON.parse(localStorage.getItem("ORDER_V1") || "null");
    if (!order) return (window.location.href = "checkout.html");

    const summaryEl = document.getElementById("paymentSummary");
    const customerEl = document.getElementById("customerInfo");

    if (summaryEl) {
      summaryEl.innerHTML = `
    <table border="0" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse; text-align:left;">
      <thead>
        <tr>
        <th>Qty</th>
        <th>Item</th>
          <th>Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${order.items
          .map(
            (it) => `
              <tr>
              <td>${it.qty}</td>
              <td>${it.name}</td>
                <td>₦${it.price.toLocaleString()}</td>
                <td>₦${(it.price * it.qty).toLocaleString()}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
      <tfoot>
        <tr style="font-weight: bold;">
          <td colspan="3" style="text-align:center;">Grand Total</td>
          <td>${order.total.toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>
  `;
    }

    if (customerEl) {
      customerEl.innerHTML = `
        <p><strong>Name:</strong> ${order.customer.name || ""}</p>
        <p><strong>Email:</strong> ${order.customer.email || ""}</p>
        <p><strong>Phone:</strong> ${order.customer.phone || ""}</p>
        <p><strong>Address:</strong> ${order.customer.address || ""}</p>
      `;
    }
  };

  const handlePayment = () => {
    const form = document.getElementById("paymentForm");
    const mess = document.getElementById("paymentmethod");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const method = form.querySelector("input[name=payment]:checked");
      // if (!method) return alert("Select a payment method");
      if (!method) {
        mess.style.color = "red";
        mess.textContent =
          "⚠️ Please select a payment method before continuing.";
        return;
      }

      const paymentData = {
        method: method.value,
        status: "Pending",
        date: new Date().toISOString(),
        order: JSON.parse(localStorage.getItem("ORDER_V1")),
      };

      localStorage.setItem("PAYMENT_V1", JSON.stringify(paymentData));
      State.cart = [];
      State.saveCart();
      window.location.href = "thankyou.html";
    });
  };

  return {
    init: () => {
      render();
      handlePayment();
    },
  };
})();

// MODULE 9: THANK YOU PAGE
const ThankYou = (() => {
  const render = () => {
    let order = JSON.parse(localStorage.getItem("ORDER_V1") || "null") || {
      items: [],
      customer: {},
    };
    const payment =
      JSON.parse(localStorage.getItem("PAYMENT_V1") || "null") || {};

    // Generate Order ID if missing
    if (!order.orderId) {
      const uniqueId =
        "MSH-" +
        new Date().getFullYear() +
        "-" +
        Math.floor(10000 + Math.random() * 90000);
      order.orderId = uniqueId;
      localStorage.setItem("ORDER_V1", JSON.stringify(order));
    }
    const orderIdEl = document.getElementById("orderId");
    if (orderIdEl) orderIdEl.textContent = order.orderId;

    // Customer Info
    const custEl = document.getElementById("customerSummary");
    if (custEl && order.customer && order.customer.name) {
      custEl.innerHTML = `
        <p>
          <strong>${order.customer.name}</strong>, 
          ${order.customer.email || ""}, 
          ${order.customer.phone || ""}, 
          ${order.customer.address || ""}
        </p>
      `;
    }

    // Payment Info
    const payEl = document.getElementById("paymentSummary");
    if (payEl && payment.method) {
      payEl.innerHTML = `<p><strong>${payment.method}</strong></p>`;
    }

    // Order Items
    const orderSumEl = document.getElementById("orderSummary");
    if (orderSumEl && order.items.length > 0) {
      const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
      orderSumEl.innerHTML = `
        <table border="0" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse; text-align:left;">
          <thead>
            <tr>
            <th style="text-align:center; padding:6px; border-bottom:1px solid #ddd;">Qty</th>
            <th style="text-align:left; padding:6px; border-bottom:1px solid #ddd;">Item</th>
              <th style="text-align:right; padding:6px; border-bottom:1px solid #ddd;">Price</th>
              <th style="text-align:right; padding:6px; border-bottom:1px solid #ddd;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (it) => `
                <tr>
                <td style="padding:6px; text-align:center; border-bottom:1px solid #eee;">${
                  it.qty
                }</td>
                <td style="padding:6px; border-bottom:1px solid #eee;">${
                  it.name
                }</td>
                  <td style="padding:6px; text-align:right; border-bottom:1px solid #eee;">₦${it.price.toLocaleString()}</td>
                  <td style="padding:6px; text-align:right; border-bottom:1px solid #eee;">₦${(
                    it.price * it.qty
                  ).toLocaleString()}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight: bold;">
              <td colspan="3" style="text-align:center;">Grand Total</td>
              <td style="padding:8px; text-align:right;">₦${subtotal.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      `;
    }

    // ✅ Clear cart after successful order
    localStorage.removeItem("CART_V1");
  };

  return { render };
})();

// INIT APP
document.addEventListener("DOMContentLoaded", () => {
  HeaderFooter.init().then(() => {
    Events.init();
    ProductRender.render();
    Cart.render();
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    if (productId) ProductRender.renderDetail(productId);
    if (document.getElementById("checkoutForm")) Checkout.init();
    if (document.getElementById("paymentForm")) Payment.init();
    if (document.getElementById("receiptArea")) ThankYou.render();
  });
});
