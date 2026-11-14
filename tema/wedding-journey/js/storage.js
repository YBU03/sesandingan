/**
 * LAPISAN PENYIMPANAN RSVP & UCAPAN
 * ============================================================
 * Antarmuka adapter (semua method mengembalikan Promise):
 *   submitRsvp(entry)       → { ok, persisted, message }
 *   listMessages()          → [{ name, message, createdAt }]
 *   submitMessage(entry)    → { ok, persisted, message }
 *
 * LocalAdapter  : mode demo. Data disimpan di localStorage browser
 *                 tamu sendiri. TIDAK terkirim ke admin/server.
 * RemoteAdapter : kirim JSON ke endpoint milik Anda (Google Apps
 *                 Script, Supabase Edge Function, server sendiri, dll).
 *   POST {endpoint}  body: { type: 'rsvp'|'message', ...data }
 *   GET  {endpoint}?type=message  → [{ name, message, createdAt }]
 *   Server boleh hanya mengembalikan ucapan yang sudah disetujui (moderasi).
 *
 * Tidak ada API key rahasia di sisi client.
 */
(function () {
  'use strict';

  function safeGet(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { return []; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; }
  }

  function LocalAdapter(namespace) {
    var kR = namespace + ':rsvp';
    var kM = namespace + ':messages';
    return {
      mode: 'local',
      submitRsvp: function (entry) {
        var list = safeGet(kR);
        list.push(Object.assign({ createdAt: new Date().toISOString() }, entry));
        var stored = safeSet(kR, list);
        return Promise.resolve({
          ok: true,
          persisted: false,
          message: stored
            ? 'Mode demo: konfirmasi tersimpan di perangkat ini saja dan belum terkirim ke mempelai.'
            : 'Mode demo: konfirmasi tidak dapat disimpan di perangkat ini.',
        });
      },
      listMessages: function () {
        return Promise.resolve(safeGet(kM).slice().reverse());
      },
      submitMessage: function (entry) {
        var list = safeGet(kM);
        list.push(Object.assign({ createdAt: new Date().toISOString() }, entry));
        safeSet(kM, list);
        return Promise.resolve({
          ok: true,
          persisted: false,
          message: 'Mode demo: ucapan hanya tampil di perangkat ini dan tidak tersimpan permanen.',
        });
      },
    };
  }

  function RemoteAdapter(endpoint) {
    function post(body) {
      return fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // hindari preflight CORS (cocok untuk Apps Script)
        body: JSON.stringify(body),
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json().catch(function () { return {}; });
      });
    }
    return {
      mode: 'remote',
      submitRsvp: function (entry) {
        return post(Object.assign({ type: 'rsvp' }, entry)).then(function () {
          return { ok: true, persisted: true, message: 'Terima kasih! Konfirmasi kehadiran Anda telah terkirim.' };
        });
      },
      listMessages: function () {
        var url = endpoint + (endpoint.indexOf('?') > -1 ? '&' : '?') + 'type=message';
        return fetch(url).then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        }).then(function (list) { return Array.isArray(list) ? list : []; });
      },
      submitMessage: function (entry) {
        return post(Object.assign({ type: 'message' }, entry)).then(function (res) {
          var pending = res && res.status === 'pending';
          return {
            ok: true,
            persisted: true,
            pending: pending,
            message: pending ? 'Terima kasih! Ucapan Anda akan tampil setelah disetujui.' : 'Terima kasih atas doa dan ucapannya!',
          };
        });
      },
    };
  }

  window.WJStorage = {
    create: function (config, namespace) {
      if (config && config.mode === 'remote' && config.endpoint) return RemoteAdapter(config.endpoint);
      return LocalAdapter(namespace || 'wedding-journey');
    },
  };
})();
