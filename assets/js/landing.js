/* =========================================================
   SESANDINGAN — LANDING PAGE LOGIC
   Merender katalog tema, reseller, paket, FAQ dari site-data.js
   dan menangani navigasi, tombol WhatsApp, dan animasi reveal.
   ========================================================= */
(function () {
  'use strict';

  var data = window.siteData || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function icon(name) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }

  /* ---------- Toast ---------- */
  var toastEl = $('#toast');
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 3200);
  }

  /* ---------- WhatsApp ---------- */
  var contact = data.contact || {};
  var messages = data.messages || {};
  function waUrl(text) {
    var num = String(contact.whatsapp || '').replace(/\D/g, '');
    if (!num) return null;
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(text || '');
  }
  function openWhatsApp(type, vars) {
    var tpl = messages[type] || messages.general || '';
    Object.keys(vars || {}).forEach(function (k) { tpl = tpl.replace('{' + k + '}', vars[k]); });
    var url = waUrl(tpl);
    if (!url) {
      toast('Nomor WhatsApp belum diatur. Isi di assets/js/site-data.js');
      return;
    }
    window.open(url, '_blank', 'noopener');
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-wa]');
    if (!btn) return;
    e.preventDefault();
    openWhatsApp(btn.getAttribute('data-wa'), {
      theme: btn.getAttribute('data-theme') || '',
      package: btn.getAttribute('data-package') || '',
    });
  });

  /* ---------- Themes ---------- */
  function renderThemes() {
    var grid = $('#themeGrid');
    var themes = data.themes || [];
    var soonIndex = 0;
    grid.innerHTML = themes.map(function (t, i) {
      if (t.status === 'live') {
        return (
          '<article class="theme-card reveal' + (i === 0 ? ' is-featured' : '') + '" role="listitem">' +
            '<a class="theme-thumb" href="' + esc(t.demoUrl) + '" aria-label="Lihat demo ' + esc(t.name) + '">' +
              '<img src="' + esc(t.thumbnail) + '" alt="Pratinjau tema ' + esc(t.name) + '" loading="lazy" width="480" height="853">' +
              '<span class="badge badge-new">Baru</span>' +
            '</a>' +
            '<div class="theme-body">' +
              (t.category ? '<span class="theme-cat">' + esc(t.category) + '</span>' : '') +
              '<h3>' + esc(t.name) + '</h3>' +
              (t.description ? '<p>' + esc(t.description) + '</p>' : '') +
              (t.tags && t.tags.length ? '<div class="theme-tags">' + t.tags.map(function (g) { return '<span>' + esc(g) + '</span>'; }).join('') + '</div>' : '') +
              '<div class="theme-actions">' +
                '<a class="btn btn-soft" href="' + esc(t.demoUrl) + '">' + icon('eye') + ' Demo</a>' +
                '<button type="button" class="btn btn-primary" data-wa="order" data-theme="' + esc(t.name) + '">Pesan</button>' +
              '</div>' +
            '</div>' +
          '</article>'
        );
      }
      soonIndex++;
      return (
        '<article class="theme-card is-empty reveal" role="listitem" aria-label="Slot tema kosong">' +
          '<div class="theme-thumb"><span class="empty-ic">' + icon('plus') + '</span></div>' +
          '<div class="theme-body">' +
            '<h3>Tema #' + (soonIndex + 1) + '</h3>' +
            '<p>Segera hadir</p>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  /* ---------- Reseller ---------- */
  function renderReseller() {
    var r = data.reseller || {};
    $('#benefitList').innerHTML = (r.benefits || []).map(function (b) {
      return '<li class="benefit"><span class="benefit-ic">' + icon(b.icon || 'check') + '</span><div><h3>' + esc(b.title) + '</h3><p>' + esc(b.text) + '</p></div></li>';
    }).join('');
    $('#resellerSteps').innerHTML = (r.steps || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
    $('#resellerTerms').textContent = r.terms || '';
  }

  /* ---------- Pricing ---------- */
  function renderPricing() {
    $('#priceGrid').innerHTML = (data.packages || []).map(function (p) {
      var priceHtml = p.price
        ? '<p class="price">' + esc(p.price) + '</p>'
        : '<p class="price is-pending">Harga menyusul</p>';
      return (
        '<article class="price-card reveal' + (p.highlight ? ' is-highlight' : '') + '">' +
          (p.highlight ? '<span class="badge">Paling diminati</span>' : '') +
          '<h3>' + esc(p.name) + '</h3>' + priceHtml +
          '<ul class="price-features">' + (p.features || []).map(function (f) { return '<li>' + icon('check') + '<span>' + esc(f) + '</span></li>'; }).join('') + '</ul>' +
          '<button type="button" class="btn ' + (p.highlight ? 'btn-primary' : 'btn-ghost') + ' btn-block" data-wa="package" data-package="' + esc(p.name) + '">Pilih ' + esc(p.name) + '</button>' +
        '</article>'
      );
    }).join('');
  }

  /* ---------- FAQ ---------- */
  function renderFaq() {
    $('#faqList').innerHTML = (data.faq || []).map(function (f) {
      return '<details class="faq-item reveal"><summary>' + esc(f.q) + icon('plus') + '</summary><p>' + esc(f.a) + '</p></details>';
    }).join('');
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    var items = [];
    if (contact.instagram) items.push('<a href="https://instagram.com/' + esc(contact.instagram.replace(/^@/, '')) + '" target="_blank" rel="noopener">' + icon('instagram') + '@' + esc(contact.instagram.replace(/^@/, '')) + '</a>');
    if (contact.email) items.push('<a href="mailto:' + esc(contact.email) + '">' + icon('mail') + esc(contact.email) + '</a>');
    if (!items.length) items.push('<span class="is-pending">Kontak media sosial &amp; email belum diisi</span>');
    $('#contactList').innerHTML = items.map(function (h) { return '<li>' + h + '</li>'; }).join('');
  }

  /* ---------- Active nav (tab bar + desktop) ---------- */
  function setupActiveNav() {
    var links = $$('[data-nav]');
    var sections = $$('[data-section]');
    if (!('IntersectionObserver' in window)) return;
    var current = '';
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) current = en.target.getAttribute('data-section');
      });
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-nav') === current); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  function setupHeader() {
    var header = $('#header');
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function setupReveal() {
    var els = $$('.reveal, .feature, .how-grid li');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    els.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  renderThemes();
  renderReseller();
  renderPricing();
  renderFaq();
  renderContact();
  setupHeader();
  setupActiveNav();
  setupReveal();
  $('#year').textContent = new Date().getFullYear();
})();
