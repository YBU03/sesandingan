# Sesandingan — Undangan Digital Interaktif

Website bisnis undangan digital **Sesandingan**, terdiri dari:

1. **Landing page** (`/index.html`): katalog tema, program reseller, paket harga, FAQ, dan kontak.
2. **Tema #1: The Wedding Journey** (`/tema/wedding-journey/`): undangan pernikahan bertema petualangan bajak laut.
3. **Slot tema #2–#6**: kartu kosong "Segera hadir" di katalog, diisi bertahap.

Dibangun dengan HTML + CSS + JavaScript murni: tanpa framework, tanpa proses build, tanpa API key.

---

## Menjalankan

Cukup jalankan server statis dari folder proyek:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

Atau `npx serve .`. Untuk deploy, unggah seluruh folder ke hosting statis (Vercel, Netlify, GitHub Pages, cPanel).

> Membuka `index.html` langsung lewat klik ganda (`file://`) umumnya juga berjalan. Namun fitur salin ke clipboard paling andal saat dibuka lewat `http(s)://`.

---

## Struktur

```
index.html                     ← landing page
favicon.png
assets/
  css/landing.css
  js/site-data.js              ← ✏️  DATA LANDING (kontak, tema, paket, FAQ, reseller)
  js/landing.js
  img/                         ← logo, thumbnail tema, og-image
tema/
  wedding-journey/
    index.html
    css/theme.css              ← design system tema (WoodButton, ParchmentCard, dll.)
    js/data.js                 ← ✏️  DATA UNDANGAN (invitationData)
    js/components.js           ← komponen: WantedPoster, EventCard, TreasureMap, StoryTimeline,
                                  PhotoGallery, RSVPForm, Guestbook, GiftCard, WoodButton, ParchmentCard
    js/storage.js              ← lapisan penyimpanan RSVP & ucapan (local demo / remote)
    js/app.js                  ← perakitan halaman & interaksi
    assets/                    ← gambar hero (Going Merry sunset)
```

---

## Mengedit landing page

Edit **`assets/js/site-data.js`**:

- `contact.whatsapp`: nomor WA (format `628xxxxxxxxxx`). Semua tombol "Pesan", "Daftar Reseller", dan "Chat WhatsApp" memakai nomor ini.
- `themes`: daftar tema. Ubah slot `{ status: 'soon' }` menjadi `status: 'live'` beserta datanya saat tema baru selesai.
- `packages[].price`: isi harga (contoh `'Rp149.000'`). `null` tampil sebagai "Harga menyusul".
- `reseller`: keuntungan, langkah, dan ketentuan reseller.
- `faq`: pertanyaan dan jawaban.

## Membuat undangan baru dari tema The Wedding Journey

1. Salin folder `tema/wedding-journey/` (misalnya ke `undangan/andi-sari/`) dan sesuaikan path `../../` jika kedalaman folder berubah.
2. Edit **`js/data.js`**: nama, foto, orang tua, tanggal (format ISO dengan offset, contoh `2027-06-28T08:00:00+07:00`), acara, lokasi dan tautan Google Maps, ayat/doa, love story, galeri, rekening, QRIS, dan musik.
3. Letakkan foto atau musik di folder tema, lalu tulis path-nya di `data.js`.
4. Link personal untuk tamu: `.../?to=Nama+Tamu`.

Nilai kosong akan tampil sebagai placeholder sopan. Tidak ada data karangan yang ditampilkan.

### RSVP & Ucapan: penting

- Default `mode: 'local'` adalah **mode demo**. Data hanya tersimpan di browser tamu sendiri dan **tidak sampai ke mempelai/admin**. Halaman menampilkan label "Mode demo" agar jujur ke tamu.
- Untuk produksi, set `mode: 'remote'` dan `endpoint: 'https://...'`. Endpoint harus menerima:
  - `POST` body JSON `{ type: 'rsvp' | 'message', ... }`
  - `GET ?type=message` → `[{ name, message, createdAt }]`
  - Moderasi: server cukup mengembalikan ucapan yang sudah disetujui, dan boleh membalas `{ status: 'pending' }` saat menerima ucapan.
  - Opsi backend yang cocok: Google Apps Script + Google Sheets, Supabase, atau server sendiri.

### Musik

Jika `music.src` kosong, tombol musik memutar **suara ombak** yang dibuat langsung oleh browser (Web Audio). Tidak ada file dan bebas hak cipta. Musik tidak pernah diputar sebelum tamu menekan **Buka Undangan**.

---

## Yang masih membutuhkan data/aset asli

**Landing page**
- [ ] Nomor WhatsApp, Instagram, email bisnis
- [ ] Harga tiap paket dan isi fitur final
- [ ] Ketentuan reseller (harga reseller, komisi, dll.)
- [ ] Estimasi waktu pengerjaan (FAQ)
- [ ] Logo versi SVG/PNG transparan resolusi tinggi (saat ini dari PNG yang diberikan)
- [ ] Domain dan URL absolut untuk `og:image` (pratinjau saat dibagikan di WhatsApp)

**Tema The Wedding Journey (per pemesan)**
- [ ] Nama lengkap, nama panggilan, foto, nama orang tua, Instagram mempelai
- [ ] Tanggal, jam, zona waktu, tempat, alamat, tautan Google Maps untuk akad dan resepsi
- [ ] Teks ayat/doa beserta sumbernya
- [ ] Isi love story dan foto (opsional)
- [ ] Foto galeri (disarankan WebP, rasio 4:5, ±1200px)
- [ ] Rekening, QRIS, alamat kirim kado
- [ ] File musik berlisensi
- [ ] Backend RSVP/ucapan (endpoint) untuk produksi

## Catatan hak cipta

Gambar hero kapal (Going Merry) dan bendera di dalamnya adalah aset referensi dari pemilik proyek yang terinspirasi One Piece (© Eiichiro Oda / Shueisha / Toei Animation). Untuk penjualan komersial, **ganti gambar `tema/wedding-journey/assets/going-merry-sunset.*`** dengan ilustrasi orisinal berlisensi. Elemen lain di tema (emblem kru, kapal siluet, Log Pose, peta, peti harta, ikon) adalah SVG orisinal.
