// ============================================================
// Loomexra — SPA Application Engine v2
// Nav: Home | Category (dropdown) | About Us | Contact
// Color: #667D85 Steel Blue-Grey (logo matched)
// ============================================================

// ── State ─────────────────────────────────────────────────
let state = {
  cart:     JSON.parse(localStorage.getItem('lx_cart')     || '[]'),
  wishlist: JSON.parse(localStorage.getItem('lx_wishlist') || '[]'),
  currentProduct: null,
  selectedSize: null,
  route: 'home'
};

// Persist state
function persist() {
  localStorage.setItem('lx_cart',     JSON.stringify(state.cart));
  localStorage.setItem('lx_wishlist', JSON.stringify(state.wishlist));
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  setupListeners();
  updateBadges();
  route(location.hash || '#home');
});

// ── Router ────────────────────────────────────────────────
window.addEventListener('hashchange', () => route(location.hash));

const ROUTES = {
  '#home':               renderHome,
  '#category/maternity': () => renderCategory('maternity'),
  '#category/dresses':   () => renderCategory('dresses'),
  '#category/cordsets':  () => renderCategory('cordsets'),
  '#category/kids':      () => renderCategory('kids'),
  '#cart':               renderCart,
  '#checkout':           renderCheckout,
  '#wishlist':           renderWishlist,
  '#about':              renderAbout,
  '#contact':            renderContact,
  '#order-confirmed':    renderOrderConfirm,
  '#shipping-policy':    () => renderPolicy('Shipping Policy', shippingContent),
  '#returns-exchanges':  () => renderPolicy('Returns & Exchanges', returnsContent),
  '#privacy-policy':     () => renderPolicy('Privacy Policy', privacyContent),
  '#terms-conditions':   () => renderPolicy('Terms & Conditions', termsContent),
  '#faqs':               () => renderPolicy('Frequently Asked Questions', faqContent),
  '#track-order':        renderTrackOrder,
};

function route(hash) {
  state.route = hash;
  const view = ROUTES[hash];
  const app = qs('#app-view');
  if (view) {
    app.innerHTML = '';
    app.className = 'page-enter';
    view();
  } else if (hash.startsWith('#product/')) {
    const id = hash.split('/')[1];
    const p = PRODUCTS.find(x => x.id === id);
    if (p) renderProductDetail(p);
  } else {
    renderHome();
  }
  updateNav(hash);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMobileDrawer();
  lucide.createIcons();
}

function updateNav(hash) {
  document.querySelectorAll('.nav-link').forEach(l => {
    const href = l.getAttribute('href');
    l.classList.toggle('active',
      href === hash ||
      (href === '#home' && hash === '#home') ||
      (hash.startsWith('#category/') && l.id === 'cat-nav-trigger')
    );
  });
}

// ── Helpers ───────────────────────────────────────────────
const qs = (s, p = document) => p.querySelector(s);
const qsa = (s, p = document) => [...p.querySelectorAll(s)];

function updateBadges() {
  const cartTotal = state.cart.reduce((a, b) => a + b.qty, 0);
  const wlTotal   = state.wishlist.length;
  const cc = qs('#cart-count');
  const wc = qs('#wishlist-count');
  if (cc) cc.textContent = cartTotal;
  if (wc) {
    wc.textContent = wlTotal;
    wc.style.display = wlTotal ? 'flex' : 'none';
  }
}

function stars(n) {
  let out = '';
  for (let i = 0; i < 5; i++)
    out += `<span class="star">${i < Math.floor(n) ? '★' : '☆'}</span>`;
  return out;
}

function fmt(n) { return `₹${n.toLocaleString('en-IN')}`; }

// ── Toast ─────────────────────────────────────────────────
function showToast(msg) {
  const tc = qs('#toast-container');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="toast-icon">✓</span>${msg}`;
  tc.appendChild(t);
  setTimeout(() => {
    t.classList.add('out');
    t.addEventListener('animationend', () => t.remove(), { once: true });
  }, 3200);
}

// ── Cart / Wishlist Actions ───────────────────────────────
function addToCart(productId, size, qty = 1) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const sz = size || p.sizes[0];
  const existing = state.cart.find(c => c.id === productId && c.size === sz);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({ id: productId, size: sz, qty, name: p.name, price: p.price, image: p.image });
  }
  persist();
  updateBadges();
  showToast(`${p.name} added to cart`);
}

function removeFromCart(productId, size) {
  state.cart = state.cart.filter(c => !(c.id === productId && c.size === size));
  persist(); updateBadges();
}

function changeQty(productId, size, delta) {
  const item = state.cart.find(c => c.id === productId && c.size === size);
  if (item) {
    item.qty = Math.max(1, item.qty + delta);
    persist(); updateBadges();
  }
}

function toggleWishlist(productId) {
  const idx = state.wishlist.indexOf(productId);
  if (idx === -1) {
    state.wishlist.push(productId);
    showToast('Added to Wishlist');
  } else {
    state.wishlist.splice(idx, 1);
    showToast('Removed from Wishlist');
  }
  persist(); updateBadges();
}

function isWishlisted(id) { return state.wishlist.includes(id); }

// ── Product Card HTML ─────────────────────────────────────
function productCardHTML(p) {
  const wished = isWishlisted(p.id);
  return `
  <article class="product-card" data-id="${p.id}">
    <div class="card-img-wrap">
      <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80'">
      <button class="wish-btn ${wished ? 'active' : ''}" data-wish="${p.id}" aria-label="Wishlist">
        <i data-lucide="${wished ? 'heart' : 'heart'}"></i>
        ${wished ? '♥' : '♡'}
      </button>
      <div class="quick-overlay">
        <button class="quick-btn btn" data-qv="${p.id}">Quick View</button>
      </div>
    </div>
    <div class="card-info">
      <div class="card-rating">${stars(p.rating)} <span>${p.rating} (${p.reviews})</span></div>
      <h3 class="card-name"><a href="#product/${p.id}">${p.name}</a></h3>
      <div class="card-price">${fmt(p.price)}</div>
      <p class="card-desc">${p.description}</p>
      <div class="size-row">${p.sizes.map((s,i) => `<button class="sz-pill${i===0?' active':''}" data-sz="${s}" data-pid="${p.id}">${s}</button>`).join('')}</div>
      <button class="btn btn-dark atc-btn" data-atc="${p.id}">
        <i data-lucide="shopping-bag" style="width:14px;height:14px;"></i> Add to Cart
      </button>
    </div>
  </article>`;
}

// ── Setup Global Event Listeners ──────────────────────────
function setupListeners() {
  // Mobile drawer
  qs('#hamburger-btn').addEventListener('click', openMobileDrawer);
  qs('#drawer-close').addEventListener('click', closeMobileDrawer);
  qs('#drawer-backdrop').addEventListener('click', closeMobileDrawer);

  // Quick View modal
  qs('#qv-overlay').addEventListener('click', e => {
    if (e.target === qs('#qv-overlay')) closeQV();
  });
  qs('#qv-close').addEventListener('click', closeQV);

  // Account modal
  qs('#account-btn').addEventListener('click', () => {
    qs('#account-overlay').classList.add('open');
  });
  qs('#account-overlay').addEventListener('click', e => {
    if (e.target === qs('#account-overlay')) qs('#account-overlay').classList.remove('open');
  });
  qs('#account-close').addEventListener('click', () => qs('#account-overlay').classList.remove('open'));

  // Delegate: size pills, add-to-cart, quick-view, wishlist
  document.addEventListener('click', e => {
    // Size pill
    const szPill = e.target.closest('.sz-pill');
    if (szPill) {
      const pid = szPill.dataset.pid;
      document.querySelectorAll(`.sz-pill[data-pid="${pid}"]`).forEach(p => p.classList.remove('active'));
      szPill.classList.add('active');
    }

    // Add to cart
    const atcBtn = e.target.closest('[data-atc]');
    if (atcBtn) {
      const pid = atcBtn.dataset.atc;
      const activeSz = qs(`.sz-pill.active[data-pid="${pid}"]`);
      addToCart(pid, activeSz?.dataset.sz);
    }

    // Quick view
    const qvBtn = e.target.closest('[data-qv]');
    if (qvBtn) openQV(qvBtn.dataset.qv);

    // Wishlist on card
    const wishBtn = e.target.closest('[data-wish]');
    if (wishBtn) {
      toggleWishlist(wishBtn.dataset.wish);
      // Toggle icon text
      const wl = isWishlisted(wishBtn.dataset.wish);
      wishBtn.className = `wish-btn ${wl ? 'active' : ''}`;
      wishBtn.innerHTML = `${wl ? '♥' : '♡'}`;
    }
  });

  // Search
  qs('#search-btn').addEventListener('click', doSearch);
  qs('#search-input').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
}

function doSearch() {
  const q = qs('#search-input').value.trim().toLowerCase();
  if (!q) return;
  const app = qs('#app-view');
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.includes(q)
  );
  app.innerHTML = `
    <section class="section-wrap">
      <div class="container">
        <div class="cat-page-header">
          <h1 class="cat-page-title">Search: "${q}"</h1>
          <p class="cat-page-count">${results.length} result${results.length !== 1 ? 's' : ''} found</p>
        </div>
        ${results.length ? `<div class="product-grid">${results.map(productCardHTML).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">🔍</div><h2 class="empty-title">No results found</h2><p class="empty-text">Try a different search term or browse our collections.</p><a href="#home" class="btn btn-brand">Back to Home</a></div>`}
      </div>
    </section>`;
  lucide.createIcons();
}

function openMobileDrawer() {
  qs('#mobile-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileDrawer() {
  qs('#mobile-drawer').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Quick View ────────────────────────────────────────────
function openQV(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  state.currentProduct = p;
  state.selectedSize = p.sizes[0];

  qs('#qv-img').src = p.image;
  qs('#qv-img').alt = p.name;
  qs('#qv-rating').textContent = `${p.rating} (${p.reviews} reviews)`;
  qs('#qv-name').textContent = p.name;
  qs('#qv-price').textContent = fmt(p.price);
  qs('#qv-desc').textContent = p.description;
  qs('#qv-highlights').innerHTML = p.highlights.map(h => `<li>${h}</li>`).join('');

  qs('#qv-sizes').innerHTML = p.sizes.map((s, i) =>
    `<button class="sz-pill${i === 0 ? ' active' : ''}" data-qvs="${s}">${s}</button>`
  ).join('');

  const wished = isWishlisted(p.id);
  qs('#qv-wish').className = `modal-wish-btn ${wished ? 'active' : ''}`;
  qs('#qv-wish').innerHTML = wished ? '<i data-lucide="heart" style="fill:#C0645A;color:#C0645A;"></i>' : '<i data-lucide="heart"></i>';

  qs('#qv-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();

  // Size selection inside modal
  qs('#qv-sizes').addEventListener('click', e => {
    const sp = e.target.closest('[data-qvs]');
    if (sp) {
      document.querySelectorAll('#qv-sizes .sz-pill').forEach(x => x.classList.remove('active'));
      sp.classList.add('active');
      state.selectedSize = sp.dataset.qvs;
    }
  });

  qs('#qv-atc').onclick = () => {
    addToCart(p.id, state.selectedSize);
    closeQV();
  };

  qs('#qv-wish').onclick = () => {
    toggleWishlist(p.id);
    const wl = isWishlisted(p.id);
    qs('#qv-wish').className = `modal-wish-btn ${wl ? 'active' : ''}`;
    qs('#qv-wish').innerHTML = wl ? '<i data-lucide="heart" style="fill:#C0645A;color:#C0645A;"></i>' : '<i data-lucide="heart"></i>';
    lucide.createIcons();
  };
}

function closeQV() {
  qs('#qv-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── PAGES ─────────────────────────────────────────────────

function renderHome() {
  const app = qs('#app-view');
  const featured = PRODUCTS.slice(0, 4);
  const bestSellers = PRODUCTS.filter(p => p.reviews > 100).slice(0, 4);

  app.innerHTML = `
    <!-- HERO -->
    <section class="hero" id="home">
      <img class="hero-img" src="assets/hero.jpg" alt="Loomexra Collection — Premium Indian Fashion" loading="eager">
      <div class="hero-overlay">
        <div class="hero-content">
          <div class="hero-tag">New Collection 2026</div>
          <h1 class="hero-title serif">Crafted for the<br>Modern Indian Woman</h1>
          <p class="hero-sub">Handpicked fabrics · Timeless silhouettes · Premium quality</p>
          <div class="hero-actions">
            <a href="#category/maternity" class="btn hero-btn-primary">Shop Collection</a>
            <a href="#about" class="btn hero-btn-outline">Our Story</a>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST STRIP -->
    <div class="trust-strip">
      <div class="container">
        <div class="trust-grid">
          <div class="trust-item">
            <span class="trust-icon">✨</span>
            <div><div class="trust-title">Premium Selection</div><div class="trust-desc">Handpicked luxury fabrics</div></div>
          </div>
          <div class="trust-item">
            <span class="trust-icon">🚚</span>
            <div><div class="trust-title">Free Shipping</div><div class="trust-desc">Orders above ₹1,999</div></div>
          </div>
          <div class="trust-item">
            <span class="trust-icon">🔄</span>
            <div><div class="trust-title">Easy Returns</div><div class="trust-desc">15-day returns (only valuable reason accepted)</div></div>
          </div>
          <div class="trust-item">
            <span class="trust-icon">🔒</span>
            <div><div class="trust-title">Secure Checkout</div><div class="trust-desc">UPI, Cards, COD, EMI</div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- CATEGORIES -->
    <section class="section-wrap">
      <div class="container">
        <div class="section-head">
          <div>
            <h2 class="section-title serif">Shop by Category</h2>
            <p class="section-sub">Curated collections for every stage of life</p>
          </div>
        </div>
        <div class="category-cards-grid">
          ${[
            { label: 'Maternity Wear', href: '#category/maternity', img: 'assets/mat1.jpg' },
            { label: 'Non-Maternity Dresses', href: '#category/dresses', img: 'assets/dress1.jpg' },
            { label: 'Cord Sets', href: '#category/cordsets', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80' },
            { label: 'Kids Clothing', href: '#category/kids', img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80' }
          ].map(c => `
            <a class="cat-card" href="${c.href}">
              <img src="${c.img}" alt="${c.label}" loading="lazy">
              <div class="cat-card-overlay">
                <div class="cat-card-title serif">${c.label}</div>
                <span class="cat-card-btn">Shop Now →</span>
              </div>
            </a>`).join('')}
        </div>
      </div>
    </section>

    <!-- FEATURED -->
    <section class="section-wrap" style="background:var(--bg-sec);">
      <div class="container">
        <div class="section-head">
          <div>
            <h2 class="section-title serif">New Arrivals</h2>
            <p class="section-sub">Freshly launched this season</p>
          </div>
          <a href="#category/maternity" class="view-all-link">View All →</a>
        </div>
        <div class="product-grid">
          ${featured.map(productCardHTML).join('')}
        </div>
      </div>
    </section>

    <!-- BESTSELLERS -->
    <section class="section-wrap">
      <div class="container">
        <div class="section-head">
          <div>
            <h2 class="section-title serif">Best Sellers</h2>
            <p class="section-sub">Most loved by our community</p>
          </div>
          <a href="#category/dresses" class="view-all-link">View All →</a>
        </div>
        <div class="product-grid">
          ${bestSellers.map(productCardHTML).join('')}
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="section-wrap" style="background: linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 100%); color: white;">
      <div class="container text-center" style="max-width:800px; padding: var(--sp-lg) var(--sp-md);">
        <p style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:var(--brand-pale);margin-bottom:12px;">What Our Customers Say</p>
        <h2 class="serif" style="font-size:2.2rem;font-weight:300;margin-bottom:var(--sp-md);">Loved by 10,000+ Women</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:var(--sp-sm);text-align:left;">
          ${[
            { name: 'Priya M.', loc: 'Chennai, Tamil Nadu', text: 'The maternity dress was absolutely perfect! The premium cotton fabric was so gentle on my skin during my third trimester. Absolutely loved the quality!', stars: '★★★★★' },
            { name: 'Kavitha R.', loc: 'Coimbatore, Tamil Nadu', text: 'Loomexra\'s cord set is my favourite work outfit. Premium quality and the fabric feels luxurious.', stars: '★★★★★' },
            { name: 'Deepika S.', loc: 'Madurai, Tamil Nadu', text: 'Bought kids clothing for my daughter and she loves the comfort. Will definitely order again!', stars: '★★★★☆' }
          ].map(t => `
            <div style="background:rgba(255,255,255,0.1);padding:var(--sp-md);border:1px solid rgba(255,255,255,0.2);">
              <div style="color:var(--gold);margin-bottom:8px;">${t.stars}</div>
              <p style="font-size:0.88rem;color:rgba(255,255,255,0.85);line-height:1.7;margin-bottom:12px;">"${t.text}"</p>
              <p style="font-size:0.78rem;font-weight:600;color:var(--brand-pale);">${t.name} · ${t.loc}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>`;

  lucide.createIcons();
}

// ── Category Page ─────────────────────────────────────────
const CAT_LABELS = {
  maternity: { label: 'Maternity Wear', sub: 'Premium artisanal maternity fashion for every trimester' },
  dresses:   { label: 'Non-Maternity Dresses', sub: 'Elegant dresses for every occasion' },
  cordsets:  { label: 'Cord Sets', sub: 'Curated matching coordinates for modern living' },
  kids:      { label: 'Kids Clothing', sub: 'Soft, handpicked, and stylish clothing for little ones' }
};

function renderCategory(cat) {
  const app = qs('#app-view');
  const meta = CAT_LABELS[cat] || { label: cat, sub: '' };
  const products = PRODUCTS.filter(p => p.category === cat);

  app.innerHTML = `
    <section class="section-wrap">
      <div class="container">
        <div class="cat-page-header">
          <h1 class="cat-page-title serif">${meta.label}</h1>
          <p class="cat-page-count">${products.length} items · ${meta.sub}</p>
        </div>
        <div class="filter-bar">
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="filter-btn"><i data-lucide="sliders-horizontal" style="width:14px;height:14px;"></i> Filter</button>
            <button class="filter-btn"><i data-lucide="tag" style="width:14px;height:14px;"></i> All Sizes</button>
          </div>
          <select class="sort-select" id="sort-select">
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
        <div class="product-grid" id="cat-grid">
          ${products.map(productCardHTML).join('')}
        </div>
      </div>
    </section>`;

  qs('#sort-select').addEventListener('change', function() {
    let sorted = [...products];
    if (this.value === 'price-asc')  sorted.sort((a,b) => a.price - b.price);
    if (this.value === 'price-desc') sorted.sort((a,b) => b.price - a.price);
    if (this.value === 'rating')     sorted.sort((a,b) => b.rating - a.rating);
    qs('#cat-grid').innerHTML = sorted.map(productCardHTML).join('');
    lucide.createIcons();
  });

  lucide.createIcons();
}

// ── Product Detail ────────────────────────────────────────
function renderProductDetail(p) {
  const app = qs('#app-view');
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const catMeta = CAT_LABELS[p.category];

  app.innerHTML = `
    <section class="section-wrap">
      <div class="container">
        <div style="display:flex;gap:4px;align-items:center;margin-bottom:var(--sp-md);font-size:0.78rem;color:var(--text-muted);">
          <a href="#home" style="color:var(--text-muted);">Home</a> &rsaquo;
          <a href="#category/${p.category}" style="color:var(--text-muted);">${catMeta?.label || p.category}</a> &rsaquo;
          <span style="color:var(--brand);">${p.name}</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-lg);align-items:start;">
          <div style="border:1px solid var(--brand-pale);overflow:hidden;aspect-ratio:3/4;background:var(--bg-sec);">
            <img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80'">
          </div>
          <div style="position:sticky;top:calc(var(--header-h)+16px);">
            <div class="card-rating" style="margin-bottom:10px;">${stars(p.rating)} <span>${p.rating} (${p.reviews} reviews)</span></div>
            <h1 class="serif" style="font-size:2.2rem;font-weight:400;color:var(--brand-dark);line-height:1.2;margin-bottom:8px;">${p.name}</h1>
            <div style="font-size:1.4rem;font-weight:700;color:var(--brand);margin-bottom:var(--sp-md);">${fmt(p.price)}</div>
            <p style="font-size:0.9rem;color:var(--text-muted);line-height:1.75;margin-bottom:var(--sp-md);">${p.description}</p>
            <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:8px;">Select Size</div>
            <div class="size-row" style="margin-bottom:var(--sp-md);">${p.sizes.map((s,i) => `<button class="sz-pill${i===0?' active':''}" data-sz="${s}" data-pid="${p.id}">${s}</button>`).join('')}</div>
            <div style="display:grid;grid-template-columns:1fr auto;gap:10px;margin-bottom:var(--sp-md);">
              <button class="btn btn-brand" data-atc="${p.id}"><i data-lucide="shopping-bag" style="width:15px;height:15px;"></i> Add to Cart</button>
              <button class="wish-btn ${isWishlisted(p.id)?'active':''}" style="position:static;width:48px;height:48px;border:1.5px solid var(--border);" data-wish="${p.id}" aria-label="Wishlist">
                ${isWishlisted(p.id) ? '♥' : '♡'}
              </button>
            </div>
            <div style="border:1px solid var(--brand-pale);padding:var(--sp-sm);">
              <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:10px;border-bottom:1px solid var(--brand-pale);padding-bottom:6px;">Fabric & Care Highlights</div>
              <ul style="padding-left:16px;font-size:0.83rem;color:var(--text-dark);line-height:1.8;">
                ${p.highlights.map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-top:var(--sp-sm);font-size:0.75rem;color:var(--text-muted);">
              <span style="color:var(--brand);">🔒</span> Secure Checkout &nbsp;|&nbsp;
              <span style="color:var(--brand);">🔄</span> 15-day Returns (only valuable reason accepted) &nbsp;|&nbsp;
              <span style="color:var(--brand);">🚚</span> Free Shipping ₹1,999+
            </div>
          </div>
        </div>

        ${related.length ? `
        <div class="section-head" style="margin-top:var(--sp-xl);">
          <div><h2 class="section-title serif">You May Also Like</h2></div>
        </div>
        <div class="product-grid">${related.map(productCardHTML).join('')}</div>` : ''}
      </div>
    </section>`;

  lucide.createIcons();
}

// ── Cart ──────────────────────────────────────────────────
function renderCart() {
  const app = qs('#app-view');
  if (state.cart.length === 0) {
    app.innerHTML = `
      <section class="section-wrap"><div class="container">
        <div class="page-title-block"><h1 class="page-title serif">Your Cart</h1><p class="page-subtitle">Items you've added</p></div>
        <div class="empty-state">
          <div class="empty-icon">🛍️</div>
          <h2 class="empty-title">Your cart is empty</h2>
          <p class="empty-text">Add some beautiful pieces to your cart to begin.</p>
          <a href="#home" class="btn btn-brand" style="margin-top:8px;">Continue Shopping</a>
        </div>
      </div></section>`;
    return;
  }

  const subtotal = state.cart.reduce((a,b) => a + (b.price * b.qty), 0);
  const shipping  = subtotal >= 1999 ? 0 : 99;
  const tax       = Math.round(subtotal * 0.05);
  const total     = subtotal + shipping + tax;

  app.innerHTML = `
    <section class="section-wrap"><div class="container">
      <div class="page-title-block">
        <h1 class="page-title serif">Your Cart</h1>
        <p class="page-subtitle">${state.cart.reduce((a,b)=>a+b.qty,0)} item(s)</p>
      </div>
      <div class="cart-layout">
        <div class="cart-items" id="cart-items">
          ${state.cart.map(item => {
            const p = PRODUCTS.find(x => x.id === item.id);
            return `
            <div class="cart-item">
              <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80'">
              </div>
              <div class="cart-item-meta">
                <div>
                  <h3 class="cart-item-name">${item.name}</h3>
                  <p class="cart-meta-text">Size: ${item.size}</p>
                  <p class="cart-meta-text">${fmt(item.price)} each</p>
                </div>
                <div class="cart-actions">
                  <div class="qty-wrap">
                    <button class="qty-btn" data-qty-dec="${item.id}" data-sz="${item.size}">−</button>
                    <span class="qty-val">${item.qty}</span>
                    <button class="qty-btn" data-qty-inc="${item.id}" data-sz="${item.size}">+</button>
                  </div>
                  <button class="remove-btn" data-remove="${item.id}" data-sz="${item.size}">Remove</button>
                </div>
              </div>
              <div class="cart-item-price">${fmt(item.price * item.qty)}</div>
            </div>`;
          }).join('')}
        </div>
        <div class="summary-panel">
          <h2 class="summary-panel-title">Order Summary</h2>
          <div class="summary-row"><span>Subtotal (${state.cart.reduce((a,b)=>a+b.qty,0)} items)</span><span>${fmt(subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:var(--success);">FREE</span>' : fmt(shipping)}</span></div>
          <div class="summary-row"><span>GST (5%)</span><span>${fmt(tax)}</span></div>
          <div class="summary-row summary-total"><span>Total</span><span>${fmt(total)}</span></div>
          <a href="#checkout" class="btn btn-brand summary-checkout-btn">Proceed to Checkout</a>
          <div class="secure-badge"><span class="secure-icon">🔒</span> Secure & Encrypted Checkout</div>
          <p style="font-size:0.7rem;color:var(--text-muted);text-align:center;margin-top:8px;">Accepts UPI · Cards · Net Banking · COD</p>
        </div>
      </div>
    </div></section>`;

  // Cart events
  document.querySelectorAll('[data-qty-dec]').forEach(btn => {
    btn.addEventListener('click', () => { changeQty(btn.dataset.qtyDec, btn.dataset.sz, -1); renderCart(); });
  });
  document.querySelectorAll('[data-qty-inc]').forEach(btn => {
    btn.addEventListener('click', () => { changeQty(btn.dataset.qtyInc, btn.dataset.sz, 1); renderCart(); });
  });
  document.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => { removeFromCart(btn.dataset.remove, btn.dataset.sz); renderCart(); });
  });
  lucide.createIcons();
}

// ── Checkout ──────────────────────────────────────────────
function renderCheckout() {
  if (state.cart.length === 0) { location.hash = '#cart'; return; }
  const app = qs('#app-view');
  const subtotal = state.cart.reduce((a,b) => a + (b.price * b.qty), 0);
  const shipping  = subtotal >= 1999 ? 0 : 99;
  const tax       = Math.round(subtotal * 0.05);
  const total     = subtotal + shipping + tax;

  app.innerHTML = `
    <section class="section-wrap"><div class="container">
      <div class="page-title-block">
        <h1 class="page-title serif">Checkout</h1>
        <p class="page-subtitle">Complete your order securely</p>
      </div>
      <div class="checkout-layout">
        <div>
          <!-- Delivery Address -->
          <div class="co-section">
            <h2 class="co-section-title">Delivery Address</h2>
            <form class="co-form" id="co-form">
              <div class="form-grid2">
                <div class="field"><label for="co-fname">First Name</label><input type="text" id="co-fname" required placeholder="Priya"></div>
                <div class="field"><label for="co-lname">Last Name</label><input type="text" id="co-lname" required placeholder="Sharma"></div>
              </div>
              <div class="field"><label for="co-email">Email Address</label><input type="email" id="co-email" required placeholder="priya@example.com"></div>
              <div class="field"><label for="co-phone">Mobile Number</label><input type="tel" id="co-phone" required placeholder="+91 98765 43210"></div>
              <div class="field"><label for="co-addr">Street Address</label><input type="text" id="co-addr" required placeholder="House No, Street, Area"></div>
              <div class="form-grid2">
                <div class="field"><label for="co-city">City</label><input type="text" id="co-city" required placeholder="Mumbai"></div>
                <div class="field"><label for="co-state">State</label>
                  <select class="field input" id="co-state" style="border:1.5px solid var(--border);padding:10px 14px;background:var(--bg-white);">
                    <option>Maharashtra</option><option>Karnataka</option><option>Delhi</option><option>Tamil Nadu</option>
                    <option>Telangana</option><option>Gujarat</option><option>Kerala</option><option>Rajasthan</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div class="field"><label for="co-pin">PIN Code</label><input type="text" id="co-pin" required placeholder="400001" maxlength="6"></div>
            </form>
          </div>

          <!-- Payment -->
          <div class="co-section">
            <h2 class="co-section-title">Payment Method</h2>
            <div class="pay-list">
              ${[
                { id: 'pay-upi',  label: 'UPI / BHIM UPI', desc: 'GPay, PhonePe, Paytm', checked: true },
                { id: 'pay-card', label: 'Debit / Credit Card', desc: 'Visa, Mastercard, RuPay' },
                { id: 'pay-nb',   label: 'Net Banking', desc: 'All major banks' },
                { id: 'pay-cod',  label: 'Cash on Delivery', desc: 'Extra ₹40 COD charge' }
              ].map(o => `
                <label class="pay-option ${o.checked ? 'active' : ''}" for="${o.id}">
                  <input class="pay-radio" type="radio" name="payment" id="${o.id}" value="${o.id}" ${o.checked ? 'checked' : ''}>
                  <span class="pay-name">${o.label}</span>
                  <span class="pay-desc">${o.desc}</span>
                </label>`).join('')}
            </div>
          </div>

          <button class="btn btn-brand" id="place-order-btn" style="width:100%;padding:16px;">
            <i data-lucide="lock" style="width:15px;height:15px;"></i> Place Order · ${fmt(total)}
          </button>
        </div>

        <!-- Summary -->
        <div class="co-summary">
          <h2 class="summary-panel-title">Your Order</h2>
          <div class="co-items-list">
            ${state.cart.map(c => `
              <div class="co-item">
                <span class="co-item-name">${c.name} (${c.size}) ×${c.qty}</span>
                <span style="font-weight:600;white-space:nowrap;">${fmt(c.price * c.qty)}</span>
              </div>`).join('')}
          </div>
          <div class="summary-row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:var(--success);">FREE</span>' : fmt(shipping)}</span></div>
          <div class="summary-row"><span>GST (5%)</span><span>${fmt(tax)}</span></div>
          <div class="summary-row summary-total"><span>Total</span><span>${fmt(total)}</span></div>
          <div class="secure-badge"><span class="secure-icon">🔒</span> 256-bit SSL Encryption</div>
        </div>
      </div>
    </div></section>`;

  // Payment option active states
  document.querySelectorAll('.pay-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.pay-option').forEach(x => x.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  qs('#place-order-btn').addEventListener('click', () => {
    const form = qs('#co-form');
    if (!form.checkValidity()) { form.reportValidity(); return; }
    state.cart = []; persist(); updateBadges();
    location.hash = '#order-confirmed';
  });

  lucide.createIcons();
}

// ── Order Confirmation ─────────────────────────────────────
function renderOrderConfirm() {
  const orderId = 'LX' + Math.floor(Math.random() * 900000 + 100000);
  const app = qs('#app-view');
  app.innerHTML = `
    <section class="section-wrap">
      <div class="container" style="max-width:640px;margin:0 auto;padding: var(--sp-lg) var(--sp-md);">
        <div class="confirm-wrap">
          <div class="confirm-icon">✅</div>
          <h1 class="confirm-title serif">Order Confirmed!</h1>
          <p class="confirm-text">Thank you for shopping with Loomexra. Your order has been placed and you'll receive a confirmation shortly.</p>
          <div class="confirm-detail-box">
            <div class="detail-row"><span class="detail-label">Order ID</span><span class="detail-val">#${orderId}</span></div>
            <div class="detail-row"><span class="detail-label">Estimated Delivery</span><span class="detail-val">5–7 Business Days</span></div>
            <div class="detail-row"><span class="detail-label">Payment Status</span><span class="detail-val" style="color:var(--success);">✓ Confirmed</span></div>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <a href="#home" class="btn btn-brand">Continue Shopping</a>
            <a href="#home" class="btn btn-outline">Track My Order</a>
          </div>
        </div>
      </div>
    </section>`;
}

// ── Wishlist ──────────────────────────────────────────────
function renderWishlist() {
  const app = qs('#app-view');
  const items = PRODUCTS.filter(p => state.wishlist.includes(p.id));
  app.innerHTML = `
    <section class="section-wrap"><div class="container">
      <div class="page-title-block">
        <h1 class="page-title serif">My Wishlist</h1>
        <p class="page-subtitle">${items.length} saved item${items.length !== 1 ? 's' : ''}</p>
      </div>
      ${items.length
        ? `<div class="product-grid">${items.map(productCardHTML).join('')}</div>`
        : `<div class="empty-state">
            <div class="empty-icon">🤍</div>
            <h2 class="empty-title">Your wishlist is empty</h2>
            <p class="empty-text">Save items you love by clicking the heart icon on any product.</p>
            <a href="#home" class="btn btn-brand" style="margin-top:8px;">Explore Collection</a>
          </div>`}
    </div></section>`;
  lucide.createIcons();
}

// ── About ─────────────────────────────────────────────────
function renderAbout() {
  const app = qs('#app-view');
  app.innerHTML = `
    <section class="section-wrap">
      <div class="container">
        <div class="narrative-header">
          <h1 class="narrative-title serif">About Loomexra</h1>
          <p class="narrative-italic">Where comfort meets elegance — crafted for the modern Indian woman</p>
        </div>
        <div class="two-col" style="margin-bottom:var(--sp-lg);">
          <div class="two-col-img">
            <img src="assets/mat2.jpg" alt="Loomexra atelier" loading="lazy">
          </div>
          <div class="two-col-text">
            <h2>Our Story</h2>
            <p>Loomexra was born from a simple belief — that every woman deserves clothing that feels as beautiful as it looks. Founded in 2020, we set out to create a premium Indian fashion brand that prioritises handpicked fabrics, ethical manufacturing and timeless design.</p>
            <p>Every piece in our collection is thoughtfully designed with real women in mind — women who are nurturing new life, who are celebrating milestones, who are simply living fully. We celebrate every stage of a woman's journey.</p>
          </div>
        </div>
        <div class="two-col" style="direction: rtl;">
          <div class="two-col-img" style="direction:ltr;">
            <img src="assets/dress2.jpg" alt="Loomexra design process" loading="lazy">
          </div>
          <div class="two-col-text" style="direction:ltr;">
            <h2>Our Commitment</h2>
            <p>We handpick only the finest fabrics — from Belgian flax linen to long-staple Pima cotton and bamboo-viscose blends — ensuring every garment is gentle on skin and crafted to last.</p>
            <p>All our garments are ethically made in India by skilled artisans who are paid fair wages in safe, comfortable workshops. Loomexra is more than a brand — it's a movement toward conscious, beautiful fashion.</p>
          </div>
        </div>
        <div style="background:var(--bg-sec);border:1px solid var(--brand-pale);padding:var(--sp-lg);text-align:center;margin-top:var(--sp-lg);">
          <h2 class="serif" style="font-size:2rem;color:var(--brand-dark);margin-bottom:var(--sp-md);">Our Values</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:var(--sp-md);">
            ${[
              { icon: '✨', title: 'Premium Quality', desc: 'Handpicked luxury fabrics for every piece' },
              { icon: '🤝', title: 'Ethical', desc: 'Fair wages, safe workspaces' },
              { icon: '💎', title: 'Craftsmanship', desc: 'Uncompromising quality in every stitch' },
              { icon: '💛', title: 'Made with Love', desc: 'Designed for the modern Indian woman' }
            ].map(v => `
              <div>
                <div style="font-size:2rem;margin-bottom:8px;">${v.icon}</div>
                <h3 style="font-family:var(--serif);font-size:1.3rem;color:var(--brand-dark);margin-bottom:6px;">${v.title}</h3>
                <p style="font-size:0.82rem;color:var(--text-muted);">${v.desc}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>`;
  lucide.createIcons();
}

// ── Contact ───────────────────────────────────────────────
function renderContact() {
  const app = qs('#app-view');
  app.innerHTML = `
    <section class="section-wrap">
      <div class="container">
        <div class="narrative-header">
          <h1 class="narrative-title serif">Get in Touch</h1>
          <p class="narrative-italic">We'd love to hear from you</p>
        </div>
        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-info-item">
              <div class="contact-label">Email Us</div>
              <div class="contact-value">hello@loomexra.com</div>
              <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">We reply within 24 hours</div>
            </div>
            <div class="contact-info-item">
              <div class="contact-label">Call / WhatsApp</div>
              <div class="contact-value">+91 98765 43210</div>
              <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">Mon–Sat, 10am–7pm IST</div>
            </div>
            <div class="contact-info-item">
              <div class="contact-label">Follow Us</div>
              <div style="display:flex;gap:10px;margin-top:8px;">
                <a href="https://instagram.com" target="_blank" class="btn btn-outline" style="padding:8px 14px;font-size:0.75rem;gap:6px;">Instagram</a>
                <a href="https://facebook.com" target="_blank" class="btn btn-outline" style="padding:8px 14px;font-size:0.75rem;gap:6px;">Facebook</a>
                <a href="https://wa.me/919876543210" target="_blank" class="btn btn-outline" style="padding:8px 14px;font-size:0.75rem;gap:6px;">WhatsApp</a>
              </div>
            </div>
            <div style="background:var(--bg-sec);border:1px solid var(--brand-pale);padding:var(--sp-sm);">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:0.78rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">
                <span>🔄</span> Easy Returns
              </div>
              <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.65;">Return within 15 days — only valuable reason accepted. Eligible items must be unused, unwashed and in original packaging.</p>
            </div>
          </div>
          <div class="contact-form-wrap">
            <h2>Send Us a Message</h2>
            <form class="co-form" onsubmit="event.preventDefault(); showToast('Message sent! We\'ll reply within 24 hours.'); this.reset();">
              <div class="field"><label for="ct-name">Full Name</label><input type="text" id="ct-name" required placeholder="Your name"></div>
              <div class="field"><label for="ct-email">Email Address</label><input type="email" id="ct-email" required placeholder="your@email.com"></div>
              <div class="field"><label for="ct-subject">Subject</label>
                <select style="border:1.5px solid var(--border);padding:10px 14px;background:var(--bg-white);font-size:0.88rem;" id="ct-subject">
                  <option>Order Query</option><option>Return / Exchange</option><option>Product Information</option><option>Wholesale / Bulk</option><option>Other</option>
                </select>
              </div>
              <div class="field"><label for="ct-msg">Message</label><textarea id="ct-msg" rows="5" style="border:1.5px solid var(--border);padding:10px 14px;resize:vertical;" required placeholder="How can we help you?"></textarea></div>
              <button type="submit" class="btn btn-brand">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>`;
  lucide.createIcons();
}

// ── Track Order ────────────────────────────────────────────
function renderTrackOrder() {
  const app = qs('#app-view');
  app.innerHTML = `
    <section class="section-wrap">
      <div class="container" style="max-width:560px;margin:0 auto;">
        <div class="page-title-block"><h1 class="page-title serif">Track Your Order</h1></div>
        <div style="background:var(--bg-sec);border:1px solid var(--brand-pale);padding:var(--sp-lg);">
          <form class="co-form" onsubmit="event.preventDefault(); showToast('Tracking info sent to your email!'); this.reset();">
            <div class="field"><label for="trk-order">Order ID</label><input type="text" id="trk-order" required placeholder="LX123456"></div>
            <div class="field"><label for="trk-email">Email Address</label><input type="email" id="trk-email" required placeholder="your@email.com"></div>
            <button type="submit" class="btn btn-brand">Track Order</button>
          </form>
        </div>
      </div>
    </section>`;
}

// ── Policy Pages ──────────────────────────────────────────
const shippingContent = `
<h3>Shipping Policy</h3>
<p>Loomexra ships across India using trusted courier partners. Standard delivery takes 5–7 business days. Express delivery (2–3 days) is available at checkout for select pin codes.</p>
<p>Free shipping on all orders above ₹1,999. Orders below ₹1,999 carry a flat ₹99 delivery charge.</p>
<h3>Order Processing</h3>
<p>Orders placed before 2 PM IST are processed the same day. Orders placed after 2 PM are processed the following business day. Public holidays may cause minor delays.</p>`;

const returnsContent = `
<h3>Returns & Exchange Policy</h3>
<p>We offer a 15-day return and exchange window. Returns are accepted only for a valid and valuable reason (e.g., manufacturing defect, wrong item delivered, or significant size mismatch). Change of mind is not accepted.</p>
<h3>How to Return</h3>
<p>Email us at hello@loomexra.com with your order ID and reason for return. We'll arrange a free pickup within 2 business days. Refunds are processed within 5–7 business days.</p>
<h3>Non-Returnable Items</h3>
<p>Innerwear, customised items and sale items marked as final sale are not eligible for return.</p>`;

const privacyContent = `
<h3>Privacy Policy</h3>
<p>Loomexra is committed to protecting your personal information. We collect only the minimum data needed to process your order and provide excellent customer service.</p>
<h3>Data Use</h3>
<p>Your data is never sold to third parties. It is used solely for order fulfilment, delivery, and occasional marketing emails (which you can opt out of at any time).</p>
<h3>Cookies</h3>
<p>We use cookies to improve your browsing experience and remember your cart. You can disable cookies in your browser settings at any time.</p>`;

const termsContent = `
<h3>Terms & Conditions</h3>
<p>By using the Loomexra website, you agree to these terms. All products are subject to availability. Prices are in Indian Rupees (₹) and inclusive of applicable taxes.</p>
<h3>Intellectual Property</h3>
<p>All content on this website — including images, text, logos and design — is the exclusive property of Loomexra and may not be reproduced without written permission.</p>
<h3>Limitation of Liability</h3>
<p>Loomexra is not liable for any indirect, incidental or consequential damages arising from the use of our products beyond the purchase price paid.</p>`;

const faqContent = `
<h3>Frequently Asked Questions</h3>
<h3>What sizes do you offer?</h3>
<p>We offer sizes S, M, L, XL, and XXL across most product ranges. Maternity and kids sizes are specifically tailored for comfort and expandability.</p>
<h3>Do you offer Cash on Delivery?</h3>
<p>Yes, COD is currently available only for orders within Tamil Nadu. A small convenience fee of ₹40 applies for COD orders.</p>
<h3>Can I cancel my order?</h3>
<p>Orders can be cancelled within 2 hours of placement. After that, please wait for delivery and initiate a return if needed.</p>
<h3>What is your return policy?</h3>
<p>We accept returns within 15 days for valid reasons only (e.g., manufacturing defect, wrong item delivered). Change of mind or dislike of colour is not accepted. Please email hello@loomexra.com with your order ID and reason.</p>
<h3>How long does delivery take?</h3>
<p>Standard delivery takes 5–7 business days across India. Express delivery (2–3 days) is available for select pin codes at checkout.</p>`;

function renderPolicy(title, content) {
  const app = qs('#app-view');
  app.innerHTML = `
    <section class="section-wrap">
      <div class="container">
        <div class="page-title-block"><h1 class="page-title serif">${title}</h1></div>
        <div class="policy-wrap">${content}</div>
      </div>
    </section>`;
}
