/**
 * THE WEDDING JOURNEY — APP
 * Merakit halaman dari invitationData dan mengatur semua interaksi.
 */
(function () {
  'use strict';

  var D = window.invitationData;
  var U = window.WJ.U;
  var C = window.WJ.C;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TZ = D.wedding.timeZone;
  var TZL = D.wedding.timeZoneLabel;

  /* ---------------- Toast ---------------- */
  var toastEl = $('#toast'), toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 3000);
  }

  /* ---------------- Binding teks sederhana ---------------- */
  function getPath(path) {
    var root = { groom: D.couple.groom, bride: D.couple.bride, texts: D.texts };
    return path.split('.').reduce(function (o, k) { return o ? o[k] : ''; }, root);
  }
  $$('[data-bind]').forEach(function (el) { el.textContent = getPath(el.getAttribute('data-bind')) || ''; });
  document.title = D.couple.groom.nickname + ' & ' + D.couple.bride.nickname + ' — ' + D.meta.title;

  /* ---------------- Nama tamu (?to=) ---------------- */
  (function () {
    var to = new URLSearchParams(location.search).get('to');
    if (to && to.trim()) {
      $('#guestName').textContent = to.trim().slice(0, 80);
      $('#coverGuest').hidden = false;
      window.__guestName = to.trim().slice(0, 80);
    }
  })();

  /* ---------------- Musik ---------------- */
  var Music = (function () {
    var playing = false, audio = null, ctx = null, master = null, nodes = [];
    var btn = $('#musicBtn');

    function buildOcean() {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      // white noise buffer
      var len = ctx.sampleRate * 4;
      var buf = ctx.createBuffer(2, len, ctx.sampleRate);
      for (var ch = 0; ch < 2; ch++) {
        var d = buf.getChannelData(ch), last = 0;
        for (var i = 0; i < len; i++) { var w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
      }
      // dua lapis ombak dengan LFO berbeda
      [[0.09, 500, 0.55], [0.13, 900, 0.3]].forEach(function (cfg) {
        var src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
        var filt = ctx.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = cfg[1];
        var g = ctx.createGain(); g.gain.value = cfg[2] * 0.5;
        var lfo = ctx.createOscillator(); lfo.frequency.value = cfg[0];
        var lfoG = ctx.createGain(); lfoG.gain.value = cfg[2] * 0.5;
        lfo.connect(lfoG); lfoG.connect(g.gain);
        src.connect(filt); filt.connect(g); g.connect(master);
        src.start(); lfo.start();
        nodes.push(src, lfo);
      });
      return true;
    }

    function setUI() {
      btn.classList.toggle('is-playing', playing);
      btn.setAttribute('aria-pressed', String(playing));
      btn.setAttribute('aria-label', playing ? 'Jeda musik' : 'Putar musik');
    }

    function play() {
      if (D.music.src) {
        if (!audio) { audio = new Audio(D.music.src); audio.loop = true; audio.preload = 'auto'; }
        return audio.play().then(function () { playing = true; setUI(); })
          .catch(function () { playing = false; setUI(); });
      }
      if (!ctx && !buildOcean()) { toast('Browser tidak mendukung audio.'); return Promise.resolve(); }
      return ctx.resume().then(function () {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0.35, ctx.currentTime, 0.6);
        playing = true; setUI();
      }).catch(function () { playing = false; setUI(); });
    }
    function pause() {
      if (audio) audio.pause();
      if (ctx && master) master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
      playing = false; setUI();
    }
    btn.addEventListener('click', function () {
      if (playing) pause(); else play();
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && playing) pause();
    });
    setUI();
    return { play: play, pause: pause };
  })();

  /* ---------------- Cover → buka undangan ---------------- */
  $('#openBtn').addEventListener('click', function () {
    var cover = $('#cover');
    cover.classList.add('is-open');
    document.body.classList.remove('is-locked');
    $('#main').removeAttribute('aria-hidden');
    $('#dock').hidden = false;
    window.scrollTo(0, 0);
    Music.play();
    setTimeout(function () { cover.hidden = true; $('#home').focus({ preventScroll: true }); }, reduceMotion ? 0 : 900);
  });
  $('#home').setAttribute('tabindex', '-1');

  /* ---------------- Hero: tanggal & countdown ---------------- */
  var cdEl = $('#countdown');
  var hasWeddingDate = U.isValidDate(D.wedding.date);
  if (hasWeddingDate) {
    $('#heroDate').textContent = U.formatDate(D.wedding.date, TZ);
    cdEl.innerHTML = ['Hari', 'Jam', 'Menit', 'Detik'].map(function (l, i) {
      return '<div class="cd-box"><span class="cd-num" data-cd="' + i + '">00</span><span class="cd-label">' + l + '</span></div>';
    }).join('');
  } else {
    $('#heroDate').innerHTML = U.pending('Tanggal akan segera diumumkan');
    cdEl.innerHTML = '<p class="cd-empty">Hitung mundur akan tampil setelah tanggal acara ditentukan.</p>';
  }

  function tick() {
    var now = Date.now();
    if (hasWeddingDate) {
      var diff = new Date(D.wedding.date).getTime() - now;
      if (diff <= 0) {
        cdEl.innerHTML = '<p class="cd-empty">Hari bahagia telah tiba. Terima kasih atas doa restunya.</p>';
        hasWeddingDate = false;
      } else {
        var s = Math.floor(diff / 1000);
        var vals = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
        $$('[data-cd]', cdEl).forEach(function (el, i) { el.textContent = String(vals[i]).padStart(2, '0'); });
      }
    }
    $$('[data-eta]').forEach(function (el) {
      var start = new Date(el.getAttribute('data-eta')).getTime();
      var endAttr = el.getAttribute('data-end');
      var end = endAttr && U.isValidDate(endAttr) ? new Date(endAttr).getTime() : start + 3 * 3600 * 1000;
      var txt;
      if (now < start) {
        var days = Math.floor((start - now) / 86400000);
        var h = Math.floor((start - now) / 3600000);
        txt = days >= 1 ? days + ' hari lagi' : (h >= 1 ? 'Dimulai dalam ' + h + ' jam' : 'Segera dimulai');
      } else if (now <= end) txt = 'Sedang berlangsung';
      else txt = 'Telah berlangsung';
      el.textContent = txt;
    });
  }
  tick();
  setInterval(tick, 1000);

  /* ---------------- C. Ayat ---------------- */
  (function () {
    var v = D.verse;
    if (!v.enabled) { $('#ayat').hidden = true; return; }
    var inner = v.text
      ? '<p class="verse-text">' + U.esc(v.text) + '</p>' +
        (v.translation ? '<p class="verse-translation">' + U.esc(v.translation) + '</p>' : '') +
        (v.source ? '<p class="verse-source">— ' + U.esc(v.source) + '</p>' : '')
      : '<p class="verse-text verse-empty">Ayat, terjemahan, atau doa pilihan mempelai akan ditampilkan di sini.</p>';
    $('#verseMount').innerHTML = C.ParchmentCard('<span class="verse-ornament" aria-hidden="true">' + U.icon('compass') + '</span>' + inner, 'verse reveal');
  })();

  /* ---------------- D. Wanted posters ---------------- */
  $('#t-mempelai-wrap').innerHTML = C.BoardTitle('Mempelai', 'Kru Baru Telah Ditemukan');
  $('#postersMount').innerHTML = C.WantedPoster(D.couple.groom, 'Mempelai Pria') + C.WantedPoster(D.couple.bride, 'Mempelai Wanita');

  /* ---------------- E. Acara ---------------- */
  $('#eventsTitle').innerHTML = C.BoardTitle('Detail Acara', 'Arah Log Pose Menunjuk Ke');
  $('#eventsMount').innerHTML = D.events.map(function (ev) { return C.EventCard(ev, TZ, TZL); }).join('');

  /* ---------------- F. Lokasi ---------------- */
  (function () {
    var loc = D.location;
    if (!loc.venueName && !loc.address && !loc.mapsUrl) {
      loc = D.events.filter(function (e) { return e.venueName || e.mapsUrl; })[0] || loc;
    }
    $('#mapMount').innerHTML = C.BoardTitle('Lokasi', 'Peta Menuju Harta Karun') + C.TreasureMap(loc);
  })();

  /* ---------------- G. Love story ---------------- */
  (function () {
    var ls = D.loveStory;
    if (!ls.enabled || !ls.items.length) { $('#cerita').hidden = true; return; }
    $('#storyMount').innerHTML = C.BoardTitle('Our Adventure', 'Kisah Perjalanan Kami') + C.StoryTimeline(ls.items);
  })();

  /* ---------------- H. Galeri + Lightbox ---------------- */
  $('#galleryMount').innerHTML = C.BoardTitle('Galeri Kami', 'Memories of Our Journey') + C.PhotoGallery(D.gallery);

  var LB = (function () {
    var box = $('#lightbox'), img = $('#lbImg'), cap = $('#lbCap');
    var items = [], idx = 0, lastFocus = null, touchX = null;
    function collect() {
      items = $$('.gallery-btn img').map(function (im) { return { src: im.getAttribute('data-full'), alt: im.alt }; });
    }
    function show(i) {
      idx = (i + items.length) % items.length;
      img.src = items[idx].src; img.alt = items[idx].alt;
      cap.textContent = (idx + 1) + ' / ' + items.length;
    }
    function open(i) {
      collect(); lastFocus = document.activeElement;
      box.hidden = false; document.body.classList.add('lb-open');
      show(i); $('#lbClose').focus();
    }
    function close() {
      box.hidden = true; document.body.classList.remove('lb-open');
      if (lastFocus) lastFocus.focus();
    }
    document.addEventListener('click', function (e) {
      var b = e.target.closest('.gallery-btn');
      if (b) open(+b.getAttribute('data-index'));
    });
    $('#lbClose').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', function () { show(idx - 1); });
    $('#lbNext').addEventListener('click', function () { show(idx + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
      else if (e.key === 'Tab') {
        var f = $$('button', box); var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    box.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (touchX == null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
      touchX = null;
    });
    return { open: open, close: close };
  })();

  /* ---------------- Form helpers ---------------- */
  function setError(form, field, msg) {
    var el = form.querySelector('.field-error[data-for="' + field + '"]');
    if (el) el.textContent = msg || '';
    var input = form.querySelector('[name="' + field + '"]');
    if (input && input.type !== 'radio') input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }
  function setStatus(form, msg, type) {
    var el = form.querySelector('.form-status');
    el.textContent = msg || '';
    el.className = 'form-status' + (type ? ' is-' + type : '');
  }
  function busy(form, on) {
    var b = form.querySelector('[type="submit"]');
    b.disabled = on;
    b.querySelector('span').textContent = on ? 'Mengirim…' : b.getAttribute('data-label');
  }

  /* ---------------- I. RSVP ---------------- */
  (function () {
    if (!D.rsvp.enabled) { $('#rsvp').hidden = true; return; }
    $('#rsvpMount').innerHTML = C.BoardTitle('Konfirmasi Kehadiran', 'Join Our Celebration') + C.RSVPForm(D.rsvp);
    var form = $('#rsvpForm');
    var store = window.WJStorage.create(D.rsvp, 'wedding-journey');
    var btn = form.querySelector('[type="submit"]');
    btn.setAttribute('data-label', btn.textContent.trim());
    if (window.__guestName) form.name.value = window.__guestName;

    form.addEventListener('change', function (e) {
      if (e.target.name === 'attendance') {
        var hadir = e.target.value === 'hadir';
        $('#guestField').hidden = !hadir;
        if (!hadir) { form.guests.value = ''; setError(form, 'guests', ''); }
        setError(form, 'attendance', '');
      }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var att = (form.querySelector('[name="attendance"]:checked') || {}).value;
      var guests = form.guests.value;
      var ok = true;
      setError(form, 'name', ''); setError(form, 'attendance', ''); setError(form, 'guests', '');
      if (name.length < 2) { setError(form, 'name', 'Mohon isi nama Anda (minimal 2 huruf).'); ok = false; }
      if (!att) { setError(form, 'attendance', 'Mohon pilih konfirmasi kehadiran.'); ok = false; }
      if (att === 'hadir' && !guests) { setError(form, 'guests', 'Mohon pilih jumlah orang yang hadir.'); ok = false; }
      if (!ok) { setStatus(form, 'Periksa kembali isian yang ditandai.', 'error'); return; }

      busy(form, true); setStatus(form, '');
      store.submitRsvp({ name: name, attendance: att, guests: att === 'hadir' ? +guests : 0, message: form.message.value.trim() })
        .then(function (res) {
          setStatus(form, res.message, res.persisted ? 'success' : 'demo');
          form.reset(); $('#guestField').hidden = true;
        })
        .catch(function () { setStatus(form, 'Gagal mengirim. Periksa koneksi Anda dan coba lagi.', 'error'); })
        .then(function () { busy(form, false); });
    });
  })();

  /* ---------------- J. Guestbook ---------------- */
  (function () {
    if (!D.guestbook.enabled) { $('#ucapan').hidden = true; return; }
    var cfg = D.guestbook;
    $('#guestbookMount').innerHTML = C.BoardTitle('Ucapan & Doa', 'Message in a Bottle') + C.Guestbook(cfg);
    var form = $('#guestForm'), list = $('#gbList'), counter = $('#gbCounter'), count = $('#gbCount');
    var store = window.WJStorage.create(cfg, 'wedding-journey');
    var btn = form.querySelector('[type="submit"]');
    btn.setAttribute('data-label', btn.textContent.trim());
    if (window.__guestName) form.name.value = window.__guestName;

    function render(items) {
      count.textContent = items.length ? '(' + items.length + ')' : '';
      list.innerHTML = items.length
        ? items.map(C.MessageItem).join('')
        : '<li class="message-empty">Belum ada ucapan. Jadilah yang pertama mengirim doa untuk kedua mempelai.</li>';
    }
    function load() {
      list.innerHTML = '<li class="message-empty">Memuat ucapan…</li>';
      store.listMessages().then(render).catch(function () {
        list.innerHTML = '<li class="message-empty">Ucapan belum dapat dimuat.</li>';
      });
    }
    form.message.addEventListener('input', function () {
      counter.textContent = form.message.value.length + '/' + cfg.maxLength;
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim(), msg = form.message.value.trim(), ok = true;
      setError(form, 'name', ''); setError(form, 'message', '');
      if (name.length < 2) { setError(form, 'name', 'Mohon isi nama (minimal 2 huruf).'); ok = false; }
      if (msg.length < 3) { setError(form, 'message', 'Ucapan minimal 3 karakter.'); ok = false; }
      if (msg.length > cfg.maxLength) { setError(form, 'message', 'Ucapan maksimal ' + cfg.maxLength + ' karakter.'); ok = false; }
      if (!ok) { setStatus(form, 'Periksa kembali isian yang ditandai.', 'error'); return; }
      busy(form, true); setStatus(form, '');
      store.submitMessage({ name: name, message: msg })
        .then(function (res) {
          setStatus(form, res.message, res.persisted ? 'success' : 'demo');
          form.message.value = ''; counter.textContent = '0/' + cfg.maxLength;
          if (!res.pending) load();
        })
        .catch(function () { setStatus(form, 'Gagal mengirim. Periksa koneksi Anda dan coba lagi.', 'error'); })
        .then(function () { busy(form, false); });
    });
    load();
  })();

  /* ---------------- K. Gift ---------------- */
  (function () {
    var g = D.gift;
    if (!g.enabled) { $('#hadiah').hidden = true; return; }
    var html = C.BoardTitle('Wedding Gift', 'Treasure Chest') +
      '<div class="chest reveal" aria-hidden="true"><svg viewBox="0 0 200 150"><use href="#chest"/></svg></div>' +
      '<p class="gift-intro reveal">' + U.esc(g.intro) + '</p>';
    if (g.accounts && g.accounts.length) {
      html += '<div class="gift-list reveal">' + g.accounts.map(C.GiftCard).join('') + '</div>';
    } else {
      html += C.ParchmentCard('<p class="gift-bank">Rekening</p><p>' + U.pending('Informasi rekening belum diisi oleh mempelai.') + '</p>', 'gift-card reveal');
    }
    if (g.qris) {
      html += C.ParchmentCard('<p class="gift-bank">QRIS</p><img class="qris" src="' + U.esc(g.qris) + '" alt="Kode QRIS untuk transfer" loading="lazy"><p class="gift-holder">Pindai untuk transfer</p>', 'gift-card reveal');
    }
    if (g.shippingAddress) {
      html += C.ParchmentCard(
        '<p class="gift-bank">' + U.icon('truck') + ' Kirim Kado</p><p class="gift-address">' + U.esc(g.shippingAddress) + '</p>' +
        C.WoodButton({ label: 'Salin Alamat', icon: 'copy', size: 'sm', data: { copy: g.shippingAddress } }),
        'gift-card reveal');
    }
    $('#giftMount').innerHTML = html;
  })();

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (res, rej) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? res() : rej(); } catch (e) { rej(e); }
      document.body.removeChild(ta);
    });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (!b) return;
    copyText(b.getAttribute('data-copy'))
      .then(function () { toast('Berhasil disalin!'); b.classList.add('is-copied'); setTimeout(function () { b.classList.remove('is-copied'); }, 1500); })
      .catch(function () { toast('Gagal menyalin. Salin secara manual.'); });
  });

  /* Tombol wood dengan aria-disabled tidak boleh berpindah halaman */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[aria-disabled="true"]');
    if (a) { e.preventDefault(); toast('Tautan belum tersedia.'); }
  });

  /* ---------------- Credit ---------------- */
  if (D.credit && D.credit.show) {
    $('#credit').innerHTML = 'Dibuat dengan <a href="' + U.esc(D.credit.url) + '">Sesandingan</a>';
  }

  /* ---------------- Navigasi aktif, ke atas, reveal ---------------- */
  (function () {
    var links = $$('#dock a');
    links.forEach(function (a) {
      var target = document.getElementById(a.getAttribute('data-nav'));
      if (!target || target.hidden) a.hidden = true;
    });
    var toTop = $('#toTop');
    window.addEventListener('scroll', function () {
      toTop.hidden = window.scrollY < 700 || document.body.classList.contains('is-locked');
    }, { passive: true });

    if (!('IntersectionObserver' in window)) { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); return; }
    var current = 'home';
    var navMap = { home: 'home', ayat: 'home', mempelai: 'mempelai', acara: 'acara', lokasi: 'acara', cerita: 'galeri', galeri: 'galeri', rsvp: 'ucapan', ucapan: 'ucapan', hadiah: 'ucapan', penutup: 'ucapan' };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) current = navMap[en.target.getAttribute('data-section')] || current; });
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-nav') === current); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('[data-section]').forEach(function (s) { io.observe(s); });

    if (reduceMotion) { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); return; }
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); rio.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(function (el) { rio.observe(el); });
  })();
})();
