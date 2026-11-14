/**
 * THE WEDDING JOURNEY — KOMPONEN
 * ============================================================
 * Fungsi-fungsi kecil yang mengembalikan string HTML dari data.
 * Komponen: WoodButton, ParchmentCard, BoardTitle, WantedPoster,
 * EventCard, TreasureMap, StoryTimeline, PhotoGallery, RSVPForm,
 * Guestbook, GiftCard. Semua teks di-escape.
 */
(function () {
  'use strict';

  var U = {};

  U.esc = function (str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  U.icon = function (name, cls) {
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  };
  U.isValidDate = function (iso) {
    if (!iso) return false;
    var d = new Date(iso);
    return !isNaN(d.getTime());
  };
  U.formatDate = function (iso, tz) {
    if (!U.isValidDate(iso)) return '';
    try {
      return new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: tz }).format(new Date(iso));
    } catch (e) {
      return new Date(iso).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }
  };
  U.formatShortDate = function (iso, tz) {
    if (!U.isValidDate(iso)) return '';
    try {
      return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: tz }).format(new Date(iso)).replace(/\//g, ' . ');
    } catch (e) { return ''; }
  };
  U.formatTime = function (iso, tz) {
    if (!U.isValidDate(iso)) return '';
    try {
      return new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(new Date(iso)).replace(':', '.');
    } catch (e) { return ''; }
  };
  U.pending = function (text) {
    return '<span class="pending">' + U.esc(text) + '</span>';
  };

  /* Placeholder gambar (SVG data URI) — bukan foto asli */
  U.photoPlaceholder = function (label) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7d9a8"/><stop offset=".55" stop-color="#e9a77a"/><stop offset="1" stop-color="#2d5b8a"/></linearGradient></defs>' +
      '<rect width="400" height="500" fill="url(#g)"/>' +
      '<circle cx="200" cy="270" r="54" fill="#fff3d6" opacity=".85"/>' +
      '<path d="M0 330 Q50 310 100 330 T200 330 T300 330 T400 330 V500 H0Z" fill="#1f4670"/>' +
      '<path d="M0 360 Q50 345 100 360 T200 360 T300 360 T400 360 V500 H0Z" fill="#163a5e"/>' +
      '<g fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity=".9" transform="translate(170 400)"><rect x="0" y="6" width="60" height="44" rx="8"/><circle cx="30" cy="28" r="11"/><path d="M18 6l6-8h12l6 8"/></g>' +
      (label ? '<text x="200" y="120" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#5a3a1a" opacity=".7">' + label + '</text>' : '') +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };
  U.portraitPlaceholder = function () {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 300">' +
      '<rect width="440" height="300" fill="#ead3a2" opacity=".55"/>' +
      '<circle cx="220" cy="118" r="54" fill="#b8955f" opacity=".55"/>' +
      '<path d="M120 300c8-80 50-118 100-118s92 38 100 118z" fill="#b8955f" opacity=".55"/>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  /* ---------------- Komponen ---------------- */
  var C = {};

  C.WoodButton = function (opts) {
    var tag = opts.href ? 'a' : 'button';
    var attrs = opts.href
      ? ' href="' + U.esc(opts.href) + '"' + (opts.external ? ' target="_blank" rel="noopener"' : '')
      : ' type="' + (opts.type || 'button') + '"';
    if (opts.id) attrs += ' id="' + U.esc(opts.id) + '"';
    if (opts.disabled) attrs += opts.href ? ' aria-disabled="true" tabindex="-1"' : ' disabled';
    if (opts.data) Object.keys(opts.data).forEach(function (k) { attrs += ' data-' + k + '="' + U.esc(opts.data[k]) + '"'; });
    return '<' + tag + ' class="wood-btn' + (opts.size ? ' wood-btn--' + opts.size : '') + (opts.cls ? ' ' + opts.cls : '') + '"' + attrs + '>' +
      (opts.icon ? U.icon(opts.icon) : '') + '<span>' + U.esc(opts.label) + '</span></' + tag + '>';
  };

  C.ParchmentCard = function (inner, cls) {
    return '<div class="parchment' + (cls ? ' ' + cls : '') + '">' + inner + '</div>';
  };

  C.BoardTitle = function (title, kicker) {
    return '<header class="board-title reveal">' +
      (kicker ? '<p class="board-kicker">' + U.esc(kicker) + '</p>' : '') +
      '<h2 class="board"><span>' + U.esc(title) + '</span></h2>' +
      '</header>';
  };

  /**
   * Poster Wanted dari 3 potongan gambar (atas, tengah memanjang, bawah).
   * Gambar atas sudah memuat tulisan "WANTED", bingkai foto, dan
   * "FOREVER & ALWAYS". Foto & data mempelai diisi sebagai HTML.
   */
  C.WantedPoster = function (p, role, art) {
    var parents = [p.father, p.mother].filter(Boolean);
    var parentsHtml = parents.length
      ? U.esc(p.childOrder || '') + '<br><strong>' + parents.map(U.esc).join(' &amp; ') + '</strong>'
      : U.esc(p.childOrder || '') + '<br>' + U.pending('Nama orang tua belum diisi');
    var photo = p.photo || U.portraitPlaceholder();
    return (
      '<article class="wanted reveal" aria-label="Profil ' + U.esc(role) + '">' +
        '<div class="wanted-top">' +
          '<img class="wanted-paper" src="' + U.esc(art.top) + '" alt="" width="900" height="900" loading="lazy">' +
          '<figure class="wanted-photo">' +
            '<img src="' + U.esc(photo) + '" alt="' + (p.photo ? 'Foto ' + U.esc(p.nickname || p.fullName) : 'Placeholder foto ' + U.esc(role)) + '" loading="lazy">' +
          '</figure>' +
        '</div>' +
        '<div class="wanted-band" style="background-image:url(\'' + U.esc(art.band) + '\')">' +
          '<p class="wanted-role">' + U.esc(role) + '</p>' +
          '<h3 class="wanted-name">' + U.esc(p.fullName) + '</h3>' +
          (p.nickname ? '<p class="wanted-nick">“' + U.esc(p.nickname) + '”</p>' : '') +
          '<p class="wanted-parents">' + parentsHtml + '</p>' +
          (p.instagram
            ? '<a class="wanted-social" href="https://instagram.com/' + U.esc(p.instagram.replace(/^@/, '')) + '" target="_blank" rel="noopener">' + U.icon('instagram') + '@' + U.esc(p.instagram.replace(/^@/, '')) + '</a>'
            : '') +
        '</div>' +
        '<img class="wanted-bottom" src="' + U.esc(art.bottom) + '" alt="" width="900" height="90" loading="lazy">' +
      '</article>'
    );
  };

  /* Maskot (gambar dekoratif) + balon kata opsional */
  C.Mascot = function (src, cls, bubble) {
    if (!src) return '';
    return '<div class="mascot ' + (cls || '') + '">' +
      '<img src="' + U.esc(src) + '" alt="" aria-hidden="true" loading="lazy" decoding="async">' +
      (bubble ? '<p class="bubble">' + U.esc(bubble) + '</p>' : '') +
      '</div>';
  };

  C.EventCard = function (ev, tz, tzLabel) {
    var hasDate = U.isValidDate(ev.start);
    var dateHtml = hasDate ? U.esc(U.formatDate(ev.start, tz)) : U.pending('Tanggal belum ditentukan');
    var timeHtml;
    if (hasDate) {
      var tzs = tzLabel ? ' ' + U.esc(tzLabel) : '';
      timeHtml = U.isValidDate(ev.end)
        ? U.esc(U.formatTime(ev.start, tz)) + ' – ' + U.esc(U.formatTime(ev.end, tz)) + tzs
        : U.esc(U.formatTime(ev.start, tz)) + tzs + ' – selesai';
    } else {
      timeHtml = U.pending('Waktu belum ditentukan');
    }
    var placeHtml = ev.venueName ? '<strong>' + U.esc(ev.venueName) + '</strong>' : U.pending('Nama tempat belum diisi');
    var addrHtml = ev.address ? U.esc(ev.address) : U.pending('Alamat belum diisi');
    return (
      '<article class="parchment event-card reveal" data-event="' + U.esc(ev.id) + '">' +
        '<h3 class="ribbon">' + U.icon('anchor') + '<span>' + U.esc(ev.title) + '</span></h3>' +
        '<ul class="event-list">' +
          '<li>' + U.icon('calendar') + '<div><small>Hari &amp; Tanggal</small><span>' + dateHtml + '</span></div></li>' +
          '<li>' + U.icon('clock') + '<div><small>Waktu</small><span>' + timeHtml + '</span></div></li>' +
          '<li>' + U.icon('pin') + '<div><small>Lokasi</small><span>' + placeHtml + '<br>' + addrHtml + '</span></div></li>' +
        '</ul>' +
        (hasDate ? '<p class="event-eta" data-eta="' + U.esc(ev.start) + '" data-end="' + U.esc(ev.end || '') + '"></p>' : '') +
        (ev.mapsUrl
          ? '<div class="event-actions">' + C.WoodButton({ label: 'Petunjuk Arah', icon: 'pin', href: ev.mapsUrl, external: true, size: 'sm' }) + '</div>'
          : '') +
      '</article>'
    );
  };

  C.TreasureMap = function (loc) {
    var mapSvg =
      '<svg class="tmap-svg" viewBox="0 0 360 260" role="img" aria-label="Ilustrasi peta harta karun (dekoratif)">' +
        '<defs>' +
          '<filter id="rough"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/></filter>' +
          '<radialGradient id="seaG" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#e9d3a3"/><stop offset="1" stop-color="#cfae74"/></radialGradient>' +
        '</defs>' +
        '<rect x="6" y="6" width="348" height="248" rx="10" fill="url(#seaG)"/>' +
        '<g stroke="#8b6a3e" stroke-width="1" opacity=".25">' +
          '<path d="M6 70H354M6 130H354M6 190H354M90 6V254M180 6V254M270 6V254"/>' +
        '</g>' +
        '<g fill="none" stroke="#7a5a32" stroke-width="1.4" opacity=".45">' +
          '<path d="M24 222q12-6 24 0t24 0"/><path d="M290 60q10-5 20 0t20 0"/><path d="M200 230q10-5 20 0t20 0"/><path d="M40 40q10-5 20 0t20 0"/>' +
        '</g>' +
        '<g filter="url(#rough)">' +
          '<path d="M52 150c-4-22 14-40 34-36 10-14 34-12 40 4 18 2 24 22 12 34 4 18-16 28-30 20-12 12-36 8-40-6-14 0-20-8-16-16z" fill="#9bbf7a" stroke="#5f7d43" stroke-width="2"/>' +
          '<path d="M150 72c6-16 28-20 40-8 16-6 32 6 28 22 12 10 4 28-12 28-8 12-30 12-36 0-16 2-26-14-20-26-8-6-6-14 0-16z" fill="#a9c985" stroke="#5f7d43" stroke-width="2"/>' +
          '<path d="M236 160c2-18 22-28 38-20 14-8 34 2 34 18 14 8 10 28-6 30-4 16-28 20-38 8-16 6-32-6-28-20-8-2-8-12 0-16z" fill="#b5d08e" stroke="#5f7d43" stroke-width="2"/>' +
        '</g>' +
        '<g fill="#6f8f4b"><path d="M84 130l6-10 6 10z"/><path d="M174 82l6-10 6 10z"/><path d="M186 86l5-8 5 8z"/></g>' +
        '<path class="tmap-route" d="M86 150C110 120 140 120 168 96S230 110 248 150 268 168 276 168" fill="none" stroke="#c0392b" stroke-width="3" stroke-dasharray="7 7" stroke-linecap="round"/>' +
        '<g class="tmap-x" transform="translate(276 168)"><path d="M-10 -10L10 10M10 -10L-10 10" stroke="#c0392b" stroke-width="5" stroke-linecap="round"/></g>' +
        '<g transform="translate(312 220)" stroke="#5a3d1e" fill="none">' +
          '<circle r="22" stroke-width="1.5"/><circle r="16" stroke-width="1" stroke-dasharray="2 3"/>' +
          '<path d="M0-26L5 0 0 26-5 0z" fill="#5a3d1e" stroke="none"/><path d="M-26 0L0 4 26 0 0-4z" fill="#8b6a3e" stroke="none"/>' +
          '<text y="-30" text-anchor="middle" font-size="10" fill="#5a3d1e" stroke="none" font-family="serif">U</text>' +
        '</g>' +
        '<rect x="6" y="6" width="348" height="248" rx="10" fill="none" stroke="#7a5530" stroke-width="3"/>' +
      '</svg>';
    var nameHtml = loc.venueName ? U.esc(loc.venueName) : U.pending('Nama tempat belum diisi');
    var addrHtml = loc.address ? U.esc(loc.address) : U.pending('Alamat belum diisi');
    var btn = loc.mapsUrl
      ? C.WoodButton({ label: 'Lihat Lokasi', icon: 'pin', href: loc.mapsUrl, external: true })
      : C.WoodButton({ label: 'Lihat Lokasi', icon: 'pin', disabled: true }) + '<p class="hint">Tautan Google Maps belum diisi.</p>';
    return (
      '<div class="tmap reveal">' +
        '<div class="parchment tmap-frame">' + mapSvg + '</div>' +
        '<div class="parchment tmap-info">' +
          '<span class="tmap-pin">' + U.icon('pin') + '</span>' +
          '<h3>' + nameHtml + '</h3>' +
          '<p>' + addrHtml + '</p>' +
          btn +
        '</div>' +
      '</div>'
    );
  };

  C.StoryTimeline = function (items) {
    var icons = ['compass', 'ship', 'heart', 'anchor', 'star'];
    return '<ol class="timeline">' + items.map(function (it, i) {
      return (
        '<li class="timeline-item reveal">' +
          '<span class="timeline-node">' + U.icon(icons[i % icons.length]) + '</span>' +
          '<div class="parchment timeline-card">' +
            (it.photo ? '<img class="timeline-photo" src="' + U.esc(it.photo) + '" alt="' + U.esc(it.title) + '" loading="lazy">' : '') +
            (it.date ? '<p class="timeline-date">' + U.esc(it.date) + '</p>' : '') +
            '<h3>' + U.esc(it.title) + '</h3>' +
            (it.description ? '<p>' + U.esc(it.description) + '</p>' : '') +
          '</div>' +
        '</li>'
      );
    }).join('') + '</ol>';
  };

  C.PhotoGallery = function (items) {
    var isPlaceholder = !items || !items.length;
    var list = isPlaceholder
      ? [1, 2, 3, 4, 5, 6].map(function (n) { return { src: U.photoPlaceholder('Foto ' + n), alt: 'Placeholder foto ' + n }; })
      : items;
    return (
      (isPlaceholder ? '<p class="note">Foto pasangan akan ditampilkan di sini.</p>' : '') +
      '<ul class="gallery">' + list.map(function (it, i) {
        return (
          '<li class="gallery-item reveal">' +
            '<button type="button" class="gallery-btn" data-index="' + i + '" aria-label="Buka foto ' + (i + 1) + '">' +
              '<img src="' + U.esc(it.thumb || it.src) + '" data-full="' + U.esc(it.src) + '" alt="' + U.esc(it.alt || 'Foto ' + (i + 1)) + '" loading="lazy" decoding="async" width="400" height="500">' +
            '</button>' +
          '</li>'
        );
      }).join('') + '</ul>'
    );
  };

  C.RSVPForm = function (cfg) {
    var opts = '<option value="">Pilih jumlah</option>';
    for (var n = 1; n <= (cfg.maxGuests || 5); n++) opts += '<option value="' + n + '">' + n + ' orang</option>';
    return (
      '<form class="parchment form reveal" id="rsvpForm" novalidate>' +
        (cfg.mode !== 'remote' ? '<p class="demo-badge">' + U.icon('info') + ' Mode demo — data belum tersimpan permanen</p>' : '') +
        '<div class="field">' +
          '<label for="rsvpName">Nama Tamu</label>' +
          '<input id="rsvpName" name="name" type="text" autocomplete="name" maxlength="80" placeholder="Masukkan nama lengkap" required>' +
          '<p class="field-error" data-for="name"></p>' +
        '</div>' +
        '<fieldset class="field">' +
          '<legend>Konfirmasi Kehadiran</legend>' +
          '<div class="radio-row">' +
            '<label class="radio"><input type="radio" name="attendance" value="hadir" required><span>Hadir</span></label>' +
            '<label class="radio"><input type="radio" name="attendance" value="tidak"><span>Tidak Hadir</span></label>' +
          '</div>' +
          '<p class="field-error" data-for="attendance"></p>' +
        '</fieldset>' +
        '<div class="field" id="guestField" hidden>' +
          '<label for="rsvpGuests">Jumlah Orang</label>' +
          '<select id="rsvpGuests" name="guests">' + opts + '</select>' +
          '<p class="field-error" data-for="guests"></p>' +
        '</div>' +
        '<div class="field">' +
          '<label for="rsvpMsg">Pesan <small>(opsional)</small></label>' +
          '<textarea id="rsvpMsg" name="message" rows="3" maxlength="300" placeholder="Tulis pesan untuk kami…"></textarea>' +
        '</div>' +
        C.WoodButton({ label: 'Kirim', type: 'submit', icon: 'send', cls: 'wood-btn--block' }) +
        '<p class="form-status" role="status" aria-live="polite"></p>' +
      '</form>'
    );
  };

  C.Guestbook = function (cfg) {
    return (
      '<div class="guestbook reveal">' +
        '<form class="parchment form" id="guestForm" novalidate>' +
          (cfg.mode !== 'remote' ? '<p class="demo-badge">' + U.icon('info') + ' Mode demo — ucapan tidak tersimpan permanen</p>' : '') +
          '<div class="field">' +
            '<label for="gbName">Nama</label>' +
            '<input id="gbName" name="name" type="text" autocomplete="name" maxlength="60" placeholder="Masukkan nama" required>' +
            '<p class="field-error" data-for="name"></p>' +
          '</div>' +
          '<div class="field">' +
            '<label for="gbMsg">Ucapan &amp; Doa</label>' +
            '<textarea id="gbMsg" name="message" rows="4" maxlength="' + cfg.maxLength + '" placeholder="Tulis ucapan dan doa…" required></textarea>' +
            '<div class="field-meta"><p class="field-error" data-for="message"></p><span class="counter" id="gbCounter">0/' + cfg.maxLength + '</span></div>' +
          '</div>' +
          C.WoodButton({ label: 'Kirim Ucapan', type: 'submit', icon: 'send', cls: 'wood-btn--block' }) +
          '<p class="form-status" role="status" aria-live="polite"></p>' +
        '</form>' +
        '<div class="parchment messages">' +
          '<h3>Ucapan dari Tamu <span class="count" id="gbCount"></span></h3>' +
          '<ul class="message-list" id="gbList" aria-live="polite"></ul>' +
        '</div>' +
      '</div>'
    );
  };

  C.MessageItem = function (m) {
    var when = U.isValidDate(m.createdAt)
      ? new Date(m.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      : '';
    return '<li class="message"><span class="bottle" aria-hidden="true">' + U.icon('bottle') + '</span><div><p class="message-from">' + U.esc(m.name) +
      (when ? ' <time>' + U.esc(when) + '</time>' : '') + '</p><p class="message-text">' + U.esc(m.message) + '</p></div></li>';
  };

  C.GiftCard = function (acc, i) {
    return (
      '<article class="parchment gift-card">' +
        '<p class="gift-bank">' + U.esc(acc.bank) + '</p>' +
        '<p class="gift-number" id="accNum' + i + '">' + U.esc(acc.number) + '</p>' +
        '<p class="gift-holder">a.n. ' + U.esc(acc.holder) + '</p>' +
        C.WoodButton({ label: 'Salin Rekening', icon: 'copy', size: 'sm', data: { copy: acc.number } }) +
      '</article>'
    );
  };

  window.WJ = { U: U, C: C };
})();
