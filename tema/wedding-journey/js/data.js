/**
 * THE WEDDING JOURNEY — DATA UNDANGAN (invitationData)
 * ============================================================
 * Ini SATU-SATUNYA file yang perlu diedit untuk membuat undangan
 * baru dari tema ini. Semua teks, tanggal, foto, rekening, dll.
 *
 * Aturan:
 *  - Nilai '' / null / [] = belum diisi → tampil placeholder sopan.
 *  - JANGAN isi data karangan. Isi hanya data asli dari pemesan.
 *  - Path gambar relatif terhadap folder tema ini.
 *
 * Nama tamu personal: tambahkan ?to=Nama+Tamu di akhir URL.
 *   contoh: .../tema/wedding-journey/?to=Bapak+Ahmad
 */
window.invitationData = {
  meta: {
    title: 'The Wedding Journey',
    description: 'Undangan pernikahan digital — Two Souls • One Crew • Forever',
  },

  couple: {
    groom: {
      fullName: 'Nama Lengkap Mempelai Pria',
      nickname: 'Mempelai Pria',
      photo: '', // contoh: 'assets/photos/groom.webp' (rasio 4:5 disarankan)
      childOrder: 'Putra dari', // contoh: 'Putra pertama dari'
      father: '',
      mother: '',
      instagram: '', // tanpa @
    },
    bride: {
      fullName: 'Nama Lengkap Mempelai Wanita',
      nickname: 'Mempelai Wanita',
      photo: '',
      childOrder: 'Putri dari',
      father: '',
      mother: '',
      instagram: '',
    },
  },

  /**
   * Tanggal utama untuk countdown di bagian hero.
   * Format ISO dengan offset zona waktu, contoh: '2027-06-28T08:00:00+07:00'
   * null = belum ditentukan (countdown tidak ditampilkan).
   */
  wedding: {
    date: null,
    timeZone: 'Asia/Jakarta', // Asia/Jakarta (WIB) | Asia/Makassar (WITA) | Asia/Jayapura (WIT)
    timeZoneLabel: 'WIB',
  },

  texts: {
    tagline: 'Two Souls • One Crew • Forever',
    opening: 'Setiap perjalanan memiliki tujuan, setiap lautan memiliki cerita. Kini, kami memutuskan untuk berlayar bersama mengarungi samudra kehidupan.',
    invitation: 'Dengan memohon rahmat dan ridha-Nya, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.',
    closing: 'Terima kasih telah menjadi bagian dari perjalanan kami. Semoga doa dan kebaikan yang kalian titipkan menjadi bekal dalam pelayaran panjang kami.',
    closingSignature: 'Sampai jumpa di pulau bahagia kami.',
  },

  /**
   * Ayat / doa. Biarkan kosong sampai teks final diberikan pemesan.
   * Jangan mengarang kutipan atau sumber.
   */
  verse: {
    enabled: true,
    text: '',        // teks ayat / doa (boleh bahasa Arab)
    translation: '', // terjemahan (opsional)
    source: '',      // sumber, contoh: 'QS. ...'
  },

  /**
   * Acara. date/time memakai format ISO dengan offset.
   * mapsUrl: tautan Google Maps asli dari pemesan.
   */
  events: [
    {
      id: 'akad',
      title: 'Akad Nikah',
      start: null, // contoh: '2027-06-28T08:00:00+07:00'
      end: null,   // null = "selesai"
      venueName: '',
      address: '',
      mapsUrl: '',
    },
    {
      id: 'resepsi',
      title: 'Resepsi',
      start: null,
      end: null,
      venueName: '',
      address: '',
      mapsUrl: '',
    },
  ],

  /**
   * Lokasi utama untuk bagian Treasure Map.
   * Jika kosong, otomatis memakai lokasi acara pertama yang terisi.
   */
  location: {
    venueName: '',
    address: '',
    mapsUrl: '',
  },

  loveStory: {
    enabled: true,
    items: [
      { date: '', title: 'Pertemuan', description: 'Ceritakan bagaimana kalian pertama kali bertemu.', photo: '' },
      { date: '', title: 'Menjalin Cerita', description: 'Ceritakan perjalanan kalian saling mengenal.', photo: '' },
      { date: '', title: 'Memantapkan Hati', description: 'Ceritakan momen kalian memutuskan untuk melangkah bersama.', photo: '' },
      { date: '', title: 'Menuju Hari Bahagia', description: 'Ceritakan persiapan menuju hari pernikahan.', photo: '' },
    ],
  },

  /**
   * Galeri. Kosong = tampil 6 placeholder.
   * contoh item: { src: 'assets/photos/1.webp', thumb: 'assets/photos/1-sm.webp', alt: 'Foto prewedding di pantai' }
   */
  gallery: [],

  /**
   * RSVP & ucapan.
   * mode: 'local'  → mode demo, data hanya tersimpan di browser tamu (TIDAK sampai ke admin)
   *       'remote' → kirim ke endpoint (lihat js/storage.js & README)
   */
  rsvp: {
    enabled: true,
    mode: 'local',
    endpoint: '',
    maxGuests: 5,
  },
  guestbook: {
    enabled: true,
    mode: 'local',
    endpoint: '',
    maxLength: 300,
  },

  gift: {
    enabled: true,
    intro: 'Doa dan kehadiranmu adalah hadiah yang paling berharga. Namun, jika ingin memberikan tanda kasih, berikut pilihannya:',
    // contoh: { bank: 'Nama Bank', number: '0000000000', holder: 'Nama Pemilik' }
    accounts: [],
    qris: '', // path gambar QRIS asli dari pemesan
    shippingAddress: '', // alamat kirim kado (opsional)
  },

  /**
   * Musik latar. src kosong → memakai suara ombak bawaan (dibuat
   * langsung oleh browser, tanpa file & bebas hak cipta).
   * contoh: { src: 'assets/music/lagu.mp3', title: 'Judul Lagu' }
   */
  music: {
    src: '',
    title: '',
  },

  // Tautan "Dibuat dengan Sesandingan" di footer
  credit: {
    show: true,
    url: '../../',
  },
};
