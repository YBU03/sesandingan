# Prompt Aset — Tema The Wedding Journey

Kumpulan prompt untuk membuat ulang semua ikon, karakter, ornamen, dan latar tema
**The Wedding Journey** dengan AI image generator (Midjourney, DALL·E/ChatGPT, Leonardo, Ideogram, dll.).

Prompt ditulis dalam **bahasa Inggris** karena hasil generator biasanya lebih akurat.
Penjelasan dalam bahasa Indonesia.

---

## 0. Aturan Umum (WAJIB dibaca dulu)

### Cara pakai
1. Setiap prompt = **satu aset = satu file**. Jangan gabungkan banyak aset dalam satu gambar.
2. Selalu tempelkan **BLOK GAYA** (di bawah) di akhir setiap prompt supaya gayanya seragam.
3. Jika generator mendukung gambar referensi, unggah **gambar Going Merry sunset** sebagai
   *style reference* agar warna dan goresan konsisten.
4. Generate 2–4 variasi, pilih yang paling mirip storyboard.

### Latar transparan
Kebanyakan generator **tidak bisa** langsung membuat PNG transparan. Solusinya:
- Generate dengan latar **putih polos** (`plain solid white background`), lalu hapus latar
  dengan remove.bg, Canva (Background Remover), atau Photoshop.
- Atau kirim saja hasil latar putih ke saya, saya bisa bantu hapus latarnya.

### Spesifikasi file
| Jenis | Ukuran minimal | Format | Latar |
|---|---|---|---|
| Karakter | 1024 × 1024 (atau tinggi 1536) | PNG | Transparan |
| Ikon / properti | 1024 × 1024 | PNG | Transparan |
| Kertas, papan, bingkai | 1536 px sisi terpanjang | PNG | Transparan |
| Latar section | 1080 × 1920 (rasio 9:16) | PNG/JPG | Penuh |
| Tekstur tile | 1024 × 1024 | PNG/JPG | Penuh, *seamless* |

### Aturan penting
- **Jangan ada teks di dalam gambar** (kecuali disebut). Generator sering membuat huruf rusak,
  dan semua teks undangan harus berupa teks HTML agar bisa diedit.
- Area tengah kertas, papan, dan bingkai harus **kosong** karena akan diisi konten oleh website.
- Beri nama file sesuai kolom **Nama file** agar mudah saya pasang.

### Catatan hak cipta
Karakter, bendera Topi Jerami, dan elemen One Piece adalah milik © Eiichiro Oda / Shueisha /
Toei Animation. Beberapa generator akan **menolak** prompt yang menyebut nama karakter. Jika
ditolak, gunakan **deskripsi alternatif** yang tersedia di setiap prompt karakter. Untuk
template yang **dijual**, disarankan memakai versi karakter orisinal.

---

## BLOK GAYA (tempel di akhir setiap prompt)

```
, in the style of a warm cinematic anime adventure illustration, hand-drawn cel shading,
clean bold dark-brown outlines, soft painterly highlights, warm sunset color palette
(amber, gold, coral, muted pink, deep ocean blue), slightly weathered pirate-adventure feel,
high detail, crisp edges, consistent lighting from the upper left, no text, no letters,
no watermark, no signature
```

**Tambahkan untuk aset tunggal (ikon, karakter, kertas):**
```
, single isolated object, centered, full object visible, generous padding around it,
plain solid white background, no shadow on background
```

**Negative prompt (jika generator mendukung):**
```
text, letters, words, watermark, logo, signature, blurry, low resolution, cropped,
cut off, extra limbs, deformed hands, multiple objects, busy background, frame border,
3d render, photorealistic
```

---

## 1. KARAKTER

Gaya karakter: **chibi** (proporsi kepala besar, ±2,5 kepala) agar lucu dan cocok untuk ornamen
undangan, seperti Chopper di storyboard. Semua karakter dibuat **dalam gaya yang sama**.

> Untuk setiap karakter, ada prompt utama (menyebut nama) dan **alternatif** (tanpa nama)
> bila generator menolak.

### 1.1 Kru utama — pose berdiri (dipakai sebagai ornamen di berbagai section)

| ID | Nama file | Karakter | Prompt |
|---|---|---|---|
| C01 | `char-luffy.png` | Luffy | `Chibi Monkey D. Luffy from One Piece, big cheerful grin, straw hat with red band, red open vest, blue shorts, sandals, one arm raised waving happily, full body standing` |
| | | *alternatif* | `Chibi cheerful young pirate captain boy, messy black hair, scar under left eye, straw hat with a red band, red open sleeveless vest, blue knee-length shorts, straw sandals, big toothy grin, one arm raised waving, full body standing` |
| C02 | `char-zoro.png` | Zoro | `Chibi Roronoa Zoro from One Piece, green short hair, three swords at his waist, white shirt, green haramaki sash, confident smile, arms crossed, full body standing` |
| | | *alternatif* | `Chibi swordsman boy, short green hair, three katana on his hip, white shirt, dark green sash belt, black pants, boots, confident smirk, arms crossed, full body standing` |
| C03 | `char-nami.png` | Nami | `Chibi Nami from One Piece, long orange hair, cheerful smile, holding a rolled treasure map, casual sailor outfit, full body standing` |
| | | *alternatif* | `Chibi navigator girl, long wavy orange hair, bright smile, holding a rolled parchment map, light blue striped top, short skirt, sandals, full body standing` |
| C04 | `char-usopp.png` | Usopp | `Chibi Usopp from One Piece, long nose, curly black hair with bandana, overalls, slingshot in hand, proud pose, full body standing` |
| | | *alternatif* | `Chibi sniper boy with a very long nose, curly black hair under a bandana, brown overalls, yellow bag strap, holding a slingshot, proud chest-out pose, full body standing` |
| C05 | `char-sanji.png` | Sanji | `Chibi Sanji from One Piece, blond hair covering one eye, curly eyebrow, black suit, holding a heart-shaped cake on a plate, full body standing` |
| | | *alternatif* | `Chibi cook in a black suit and tie, blond hair covering one eye, curly eyebrow, holding a small heart-shaped wedding cake on a plate, gentleman bow, full body standing` |
| C06 | `char-chopper.png` | Chopper | `Chibi Tony Tony Chopper from One Piece, small reindeer with blue nose, pink top hat with white X, little antlers, red shorts, happy waving, full body standing` |
| | | *alternatif* | `Chibi tiny brown reindeer standing upright, blue nose, small antlers, pink top hat with a white cross mark, red shorts, big shiny eyes, happy waving, full body standing` |
| C07 | `char-robin.png` | Robin | `Chibi Nico Robin from One Piece, long black hair, gentle calm smile, purple coat, holding an old book, full body standing` |
| | | *alternatif* | `Chibi archaeologist woman, long straight black hair, gentle calm smile, purple long coat, holding an old leather book, full body standing` |
| C08 | `char-franky.png` | Franky | `Chibi Franky from One Piece, blue spiky hair, sunglasses on head, big metal forearms, hawaiian shirt, doing his signature super pose, full body standing` |
| | | *alternatif* | `Chibi cheerful shipwright, spiky light-blue hair, sunglasses pushed up, oversized robotic forearms with star tattoos, open hawaiian shirt, speedo, arms together over head in a fun pose, full body standing` |
| C09 | `char-brook.png` | Brook | `Chibi Brook from One Piece, skeleton gentleman with big afro, top hat, black suit, holding a violin, cheerful, full body standing` |
| | | *alternatif* | `Chibi cheerful skeleton musician, big black afro, top hat, black suit with cane, holding a violin, friendly pose, full body standing` |
| C10 | `char-jinbe.png` | Jinbe | `Chibi Jinbe from One Piece, fishman with blue skin, kimono, calm wise smile, arms folded, full body standing` |
| | | *alternatif* | `Chibi calm whale-shark fishman, light blue skin, dark hair tied back, traditional blue kimono, wise smile, arms folded, full body standing` |

### 1.2 Chopper — pose khusus (maskot pemandu undangan)

| ID | Nama file | Dipakai di | Prompt |
|---|---|---|---|
| C11 | `chopper-peek.png` | Bawah poster Wanted | `Chibi Tony Tony Chopper peeking from behind a wooden barrel, only head and hands visible over the edge, curious happy face` |
| C12 | `chopper-rsvp.png` | Header RSVP | `Chibi Tony Tony Chopper waving excitedly at the viewer, one hoof raised, mouth open happily, standing pose, space on the right side for a speech bubble` |
| C13 | `chopper-letter.png` | Ucapan & Doa | `Chibi Tony Tony Chopper hugging a glass message-in-a-bottle with a rolled letter inside, blushing happy face` |
| C14 | `chopper-gift.png` | Wedding Gift | `Chibi Tony Tony Chopper holding a small wrapped gift box with a red ribbon, shy smile` |
| C15 | `chopper-thanks.png` | Penutup | `Chibi Tony Tony Chopper bowing politely with both hooves together, grateful smile, small hearts floating` |

*(Alternatif tanpa nama: ganti `Tony Tony Chopper` dengan
`tiny brown reindeer standing upright with blue nose, pink top hat with white cross mark`.)*

### 1.3 Ilustrasi grup & pasangan

| ID | Nama file | Dipakai di | Prompt |
|---|---|---|---|
| C16 | `crew-group.png` | Penutup / hero | `The Straw Hat Pirates crew from One Piece in chibi style standing together and cheering, Luffy in the center raising his fist, Zoro, Nami, Usopp, Sanji, Chopper, Robin, Franky, Brook, Jinbe around him, confetti and small hearts, celebratory wedding mood, full bodies visible` |
| C17 | `couple-back.png` | Love Story (atas) | `A young couple seen from behind standing on a ship deck railing looking at the sunset sea, the man wearing a straw hat, the woman with long hair blowing in the wind, holding hands, romantic, upper body to full body` *(latar penuh, rasio 4:3, tidak perlu transparan)* |
| C18 | `crew-toast.png` | Hero / Galeri (opsional) | `Chibi Straw Hat Pirates crew raising wooden mugs together in a toast, joyful party mood, full bodies, compact group composition` |

---

## 2. EMBLEM & BENDERA

| ID | Nama file | Dipakai di | Prompt |
|---|---|---|---|
| E01 | `emblem-jolly-roger.png` | Header tiap section | `Straw Hat Pirates jolly roger emblem from One Piece, white skull wearing a straw hat with a red band, crossed bones behind, clean flat illustration` |
| | | *alternatif* | `Friendly cartoon pirate skull emblem wearing a straw hat with a red band, two crossed bones behind, smiling, clean flat illustration` |
| E02 | `flag-jolly-roger.png` | Hero (bendera berkibar) | `Black pirate flag waving in the wind with the Straw Hat jolly roger emblem printed on it, small wooden pole, cloth folds` |
| E03 | `emblem-sign.png` | Atas papan judul | `Straw Hat jolly roger skull mounted on top of a small wooden plaque with two green palm leaves behind, decorative header ornament` |

---

## 3. PROPERTI & IKON

Semua: objek tunggal, latar putih polos, akan dibuat transparan.

| ID | Nama file | Dipakai di | Prompt |
|---|---|---|---|
| P01 | `straw-hat.png` | Ornamen love story, galeri, ucapan | `A straw hat with a red ribbon band, slightly worn, viewed from a three-quarter angle` |
| P02 | `ship-wheel.png` | Ornamen acara | `Wooden ship steering wheel with brass center and eight handles` |
| P03 | `anchor.png` | Ornamen & ikon acara | `Dark iron ship anchor with a rope coiled around it` |
| P04 | `compass.png` | Ornamen lokasi | `Antique brass navigation compass, open lid, glass face with needle` |
| P05 | `log-pose.png` | Header Detail Acara | `Log Pose navigation bracelet from One Piece, glass dome with a floating needle inside, brass frame, leather wrist strap` *(alt: `glass sphere wrist compass with floating needle, brass frame, leather strap`)* |
| P06 | `barrel.png` | Ornamen sudut | `Wooden barrel with dark iron bands` |
| P07 | `telescope.png` | Ornamen lokasi | `Brass and leather pirate spyglass telescope, extended, lying diagonally` |
| P08 | `rope-coil.png` | Ornamen sudut | `Coiled thick hemp ship rope with a loose end` |
| P09 | `seagull.png` | Hiasan langit | `White seagull flying with wings spread, side view` |
| P10 | `seagull-2.png` | Hiasan langit | `White seagull gliding, wings angled upward, three-quarter view` |
| P11 | `news-coo.png` | Cover / RSVP | `News Coo seagull from One Piece wearing a small cap and carrying a sealed envelope with a red heart wax seal in its beak, flying` *(alt: `cute seagull mail carrier wearing a small cap and shoulder bag, carrying a sealed envelope with a red heart wax seal in its beak, flying`)* |
| P12 | `pocket-watch.png` | Ikon waktu / countdown | `Antique golden pocket watch, open, with chain` |
| P13 | `red-x.png` | Penanda peta | `Painted red X mark like on a treasure map, rough brush strokes` |
| P14 | `treasure-chest.png` | Wedding Gift | `Open wooden pirate treasure chest overflowing with gold coins, pearls and jewels, glowing warm light from inside` |
| P15 | `gold-coins.png` | Ornamen gift | `Small pile of shiny gold coins` |
| P16 | `message-bottle.png` | Ucapan & Doa | `Glass message in a bottle with a cork, rolled parchment letter inside tied with red string, lying on its side` |
| P17 | `lantern.png` | Ornamen gift | `Old brass ship lantern with warm glowing candle light` |
| P18 | `map-pin.png` | Ikon lokasi | `Red location pin marker with a small gold star in the center, map pin icon, illustrated` |
| P19 | `calendar-icon.png` | Ikon tanggal | `Small parchment calendar page icon with a red ring binding, blank page` |
| P20 | `heart-anchor.png` | Ornamen pemisah | `Small red heart entwined with a tiny golden anchor and rope, decorative ornament` |
| P21 | `palm-island.png` | Lokasi | `Small tropical island with palm trees, white sand beach and a little wooden hut, floating isolated` |
| P22 | `meat-on-bone.png` | Ornamen lucu (opsional) | `Cartoon roasted meat on a bone, juicy, appetizing` |

---

## 4. KERTAS, PAPAN, & BINGKAI (area tengah KOSONG)

| ID | Nama file | Dipakai di | Prompt |
|---|---|---|---|
| F01 | `wanted-frame.png` | Profil mempelai | `Empty old wanted poster parchment, aged yellowed paper with torn and burnt edges, a large empty rectangular photo frame area in the upper center, empty blank space below for text, small nail at the top center, flat front view, portrait orientation 3:4` |
| F02 | `wanted-frame-text.png` | *Opsional* | Sama seperti F01, tambahkan: `with the word "WANTED" at the top and "DEAD OR ALIVE" below the photo area in bold western serif font` *(cek hurufnya tidak rusak)* |
| F03 | `parchment-portrait.png` | Kartu isi (acara, RSVP) | `Blank aged parchment paper sheet, slightly torn uneven edges, subtle stains and fold lines, warm beige color, flat front view, portrait orientation 3:4, completely empty center` |
| F04 | `parchment-landscape.png` | Kartu ayat, lokasi | `Blank aged parchment paper sheet, slightly torn edges, subtle stains, landscape orientation 4:3, completely empty center, flat front view` |
| F05 | `parchment-square.png` | Kartu rekening | `Blank aged parchment paper sheet, square, slightly torn edges, empty center, flat front view` |
| F06 | `scroll-horizontal.png` | Banner judul alternatif | `Blank horizontal parchment scroll banner with rolled ends on left and right, empty center, flat front view` |
| F07 | `scroll-vertical.png` | Ayat / penutup | `Blank vertical parchment scroll with wooden rollers at top and bottom, empty center, flat front view` |
| F08 | `ribbon-banner.png` | Label "Akad", "Resepsi" | `Blank brown leather ribbon banner with folded tails on both ends, empty center, flat front view` |
| F09 | `wood-sign-large.png` | Judul section | `Blank wooden plank sign board, horizontal, weathered warm brown wood grain, iron nails in the corners, two ropes hanging from the top, empty center, flat front view` |
| F10 | `wood-sign-small.png` | Label kecil | `Small blank wooden plank sign, horizontal, warm brown wood grain, nails at both ends, empty center, flat front view` |
| F11 | `wood-button.png` | Tombol | `Blank rounded wooden button plank, horizontal pill shape, warm polished wood grain, small brass nails at left and right ends, empty center, flat front view, aspect ratio 4:1` |
| F12 | `polaroid-frame.png` | Galeri | `Empty vintage instant photo frame, off-white paper border, thicker bottom border, slightly aged, empty transparent photo area, flat front view` |
| F13 | `treasure-map-blank.png` | Lokasi | `Blank old treasure map on parchment, a few small islands, dotted red route line leading to a red X, compass rose in the corner, sea waves drawn with simple lines, no text, landscape orientation 4:3` |
| F14 | `speech-bubble.png` | RSVP (balon kata Chopper) | `Blank white comic speech bubble with a dark brown outline and a small tail pointing to the lower left, empty inside` |

---

## 5. LATAR SECTION (rasio 9:16, 1080 × 1920, tanpa karakter kecuali disebut)

Latar penuh, tidak transparan. **Bagian tengah dibuat tenang/sederhana** karena akan tertutup kartu konten.
Untuk latar, **jangan** tambahkan blok "single isolated object".

| ID | Nama file | Section | Prompt |
|---|---|---|---|
| B01 | `bg-cabin.png` | Profil Mempelai | `Interior of a cozy wooden pirate ship cabin, wooden plank walls, hanging lantern, barrels and coiled rope in the bottom corners, compass on a wooden floor, warm lantern light, calm empty center area, vertical 9:16` |
| B02 | `bg-deck-sea.png` | Detail Acara | `View from a wooden ship deck with a railing in the foreground, bright blue ocean and fluffy clouds in the background, sunny daytime, wooden floor planks at the bottom, calm empty center, vertical 9:16` |
| B03 | `bg-map-table.png` | Lokasi | `Top-down view of a wooden table with scattered navigation tools at the edges: brass compass, spyglass, coins, rope, calm open ocean blue cloth in the center, vertical 9:16` |
| B04 | `bg-sunset-sea.png` | Love Story | `Wide sunset sky over a calm ocean, orange, pink and purple clouds, distant islands, seagulls, open empty sky area in the upper half, vertical 9:16` |
| B05 | `bg-sky-day.png` | Galeri | `Bright blue sky with soft white fluffy clouds and a few seagulls, distant sea at the bottom, palm leaves at a corner, cheerful, vertical 9:16` |
| B06 | `bg-deck-wood.png` | RSVP | `Close-up warm wooden ship deck planks seen from above, ropes and a barrel in the corners, soft sunlight, calm empty center, vertical 9:16` |
| B07 | `bg-ocean-night.png` | Ucapan & Doa | `Deep blue ocean at dusk, gentle waves, sparkling water reflections, a small island with palm trees at the top, calm, vertical 9:16` |
| B08 | `bg-treasure-room.png` | Wedding Gift | `Inside a pirate ship treasure hold, wooden beams, hanging lanterns with warm glow, gold coins and chests at the bottom edges, calm empty center, vertical 9:16` |
| B09 | `bg-closing.png` | Penutup | `A pirate ship with a big white sail sailing away toward a glowing sunset horizon on a calm sea, seagulls, warm golden light, ship in the lower third, open sky above, vertical 9:16` *(boleh menyertakan kapal Going Merry jika ingin konsisten dengan cover)* |
| B10 | `bg-cover-alt.png` | Cover alternatif (opsional) | `The Going Merry pirate ship from One Piece sailing toward the viewer at sunset, waves splashing, seagulls, a straw hat resting on the wooden deck railing in the foreground, cinematic, vertical 9:16` |

---

## 6. TEKSTUR (seamless / bisa diulang)

| ID | Nama file | Prompt |
|---|---|---|
| T01 | `tex-parchment.png` | `Seamless tileable aged parchment paper texture, warm beige, subtle stains and fibers, flat, even lighting, no edges` |
| T02 | `tex-wood.png` | `Seamless tileable weathered wooden ship deck planks texture, warm brown, horizontal planks, flat even lighting` |
| T03 | `tex-ocean.png` | `Seamless tileable stylized anime ocean water texture, deep blue with light ripples, flat top-down view` |

---

## 7. Prioritas Pengerjaan

Jika ingin bertahap, kerjakan dalam urutan ini (dampak visual terbesar dulu):

1. **Wajib:** E01, C06, C11, C12, F01, F09, P01, P14, F13
2. **Penting:** C01–C10, P02–P07, P09, P11, P16, F03, F08
3. **Pelengkap:** B01–B09, F04–F07, F10–F12, F14, C13–C18, sisanya

## 8. Setelah aset jadi

1. Kumpulkan semua file dengan nama sesuai tabel.
2. Kirim ke saya (unggah di chat).
3. Saya akan hapus latar bila perlu, kompres ke WebP, lalu pasang ke tiap section dan
   menyesuaikan tata letak.
