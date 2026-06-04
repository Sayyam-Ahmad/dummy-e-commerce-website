(function () {
  const cart = [];
  let currentFilter = "all";
  let searchQuery = "";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const productsGrid = $("#productsGrid");
  const mensGrid = $("#mensGrid");
  const womensGrid = $("#womensGrid");
  const cartSidebar = $("#cartSidebar");
  const cartOverlay = $("#cartOverlay");
  const cartItems = $("#cartItems");
  const cartCount = $("#cartCount");
  const cartTotal = $("#cartTotal");
  const toast = $("#toast");

  function formatPrice(price) {
    return "$" + price.toFixed(2);
  }

  function createProductCard(product) {
    const hasSale = product.originalPrice && product.originalPrice > product.price;
    const discount = hasSale
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

    return `
      <article class="product-card" data-id="${product.id}" data-category="${product.category}">
        <div class="product-image-wrap">
          ${product.badge ? `<span class="product-badge badge-${product.badge.toLowerCase().replace(/\s/g, "-")}">${product.badge}</span>` : ""}
          ${hasSale ? `<span class="product-discount">-${discount}%</span>` : ""}
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-actions">
            <button class="quick-add" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-category">${product.category === "mens" ? "Men's" : "Women's"}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price">
            <span class="price-current">${formatPrice(product.price)}</span>
            ${hasSale ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ""}
          </div>
        </div>
      </article>
    `;
  }

  function getFilteredProducts(list) {
    return list.filter((p) => {
      const matchCategory = currentFilter === "all" || p.category === currentFilter;
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery);
      return matchCategory && matchSearch;
    });
  }

  function sortProducts(list, sortBy) {
    const sorted = [...list];
    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }

  function renderProducts() {
    const filtered = getFilteredProducts(products);
    const sorted = sortProducts(filtered, $("#sortSelect").value);

    productsGrid.innerHTML = sorted.length
      ? sorted.map(createProductCard).join("")
      : `<p class="no-results">No products found. Try a different search or filter.</p>`;

    mensGrid.innerHTML = products
      .filter((p) => p.category === "mens")
      .slice(0, 4)
      .map(createProductCard)
      .join("");

    womensGrid.innerHTML = products
      .filter((p) => p.category === "womens")
      .slice(0, 4)
      .map(createProductCard)
      .join("");
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`${product.name} added to cart`);
  }

  function removeFromCart(productId) {
    const index = cart.findIndex((item) => item.id === productId);
    if (index > -1) cart.splice(index, 1);
    updateCartUI();
  }

  function updateQuantity(productId, delta) {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) removeFromCart(productId);
    else updateCartUI();
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = formatPrice(totalPrice);

    if (cart.length === 0) {
      cartItems.innerHTML = `<p class="cart-empty">Your cart is empty</p>`;
      return;
    }

    cartItems.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>${formatPrice(item.price)}</p>
            <div class="qty-controls">
              <button class="qty-btn" data-id="${item.id}" data-action="decrease">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
            </div>
          </div>
          <button class="remove-item" data-id="${item.id}" aria-label="Remove">×</button>
        </div>
      `
      )
      .join("");
  }

  function openCart() {
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Event delegation for product cards
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("quick-add")) {
      addToCart(Number(e.target.dataset.id));
    }

    if (e.target.classList.contains("qty-btn")) {
      const id = Number(e.target.dataset.id);
      const action = e.target.dataset.action;
      updateQuantity(id, action === "increase" ? 1 : -1);
    }

    if (e.target.classList.contains("remove-item")) {
      removeFromCart(Number(e.target.dataset.id));
    }
  });

  // Filter buttons
  $$(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  // Sort
  $("#sortSelect").addEventListener("change", renderProducts);

  // Search
  $(".search-toggle").addEventListener("click", () => {
    $("#searchBar").classList.toggle("open");
    if ($("#searchBar").classList.contains("open")) {
      $("#searchInput").focus();
    }
  });

  $("#searchInput").addEventListener(
    "input",
    debounce((e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    }, 250)
  );

  // Cart toggle
  $("#cartBtn").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  $("#checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty");
      return;
    }
    showToast("Thank you! Checkout is a demo feature.");
    closeCart();
  });

  // Mobile menu
  $("#menuToggle").addEventListener("click", () => {
    $("#mainNav").classList.toggle("open");
    $("#menuToggle").classList.toggle("active");
  });

  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      $("#mainNav").classList.remove("open");
      $("#menuToggle").classList.remove("active");
      $$(".nav-link").forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Newsletter
  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Thanks for subscribing! Check your inbox for 15% off.");
    e.target.reset();
  });

  // Smooth scroll offset for fixed header
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector(".header").offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // Header scroll effect
  window.addEventListener(
    "scroll",
    debounce(() => {
      document.querySelector(".header").classList.toggle("scrolled", window.scrollY > 50);
    }, 10)
  );

  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  renderProducts();
})();
