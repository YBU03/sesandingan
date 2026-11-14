/**
 * SESANDINGAN — DATA LANDING PAGE
 * ------------------------------------------------------------
 * Semua isi yang sering diubah ada di sini. Edit nilai di bawah,
 * simpan, lalu muat ulang halaman. Tidak perlu menyentuh HTML/JS.
 *
 * Nilai kosong ('' atau null) = belum diisi. Halaman akan
 * menampilkan placeholder yang jelas, BUKAN data karangan.
 */
window.siteData = {
  brand: {
    name: 'Sesandingan',
    tagline: 'Undangan Digital Interaktif',
  },

  contact: {
    // Format internasional tanpa tanda + / spasi. Contoh: '6281234567890'
    whatsapp: '',
    instagram: '', // tanpa @, contoh: 'sesandingan.id'
    email: '',
  },

  // Pesan otomatis saat tombol WhatsApp ditekan
  messages: {
    order: 'Halo Sesandingan, saya ingin memesan undangan digital tema "{theme}".',
    reseller: 'Halo Sesandingan, saya tertarik bergabung menjadi reseller.',
    general: 'Halo Sesandingan, saya ingin bertanya tentang undangan digital.',
    package: 'Halo Sesandingan, saya tertarik dengan paket "{package}".',
  },

  /**
   * Katalog tema.
   * status: 'live' = sudah bisa dilihat demonya
   *         'soon' = slot kosong / segera hadir
   */
  themes: [
    {
      id: 'wedding-journey',
      status: 'live',
      name: 'The Wedding Journey',
      category: 'Petualangan',
      description: 'Berlayar bersama mengarungi samudra kehidupan. Nuansa sunset, peta harta karun, dan kapal bajak laut.',
      thumbnail: 'assets/img/theme-wedding-journey-thumb.webp',
      demoUrl: 'tema/wedding-journey/',
      tags: ['Animasi', 'RSVP', 'Musik'],
    },
    { id: 'slot-2', status: 'soon' },
    { id: 'slot-3', status: 'soon' },
    { id: 'slot-4', status: 'soon' },
    { id: 'slot-5', status: 'soon' },
    { id: 'slot-6', status: 'soon' },
  ],

  /**
   * Paket harga. price: null = belum ditentukan (tampil "Harga menyusul").
   * Contoh pengisian: price: 'Rp149.000'
   */
  packages: [
    {
      name: 'Basic',
      price: null,
      features: ['1 tema pilihan', 'Detail acara & lokasi', 'Countdown', 'Musik latar'],
    },
    {
      name: 'Premium',
      price: null,
      highlight: true,
      features: ['Semua fitur Basic', 'Galeri foto', 'RSVP & ucapan tamu', 'Love story', 'Amplop digital'],
    },
    {
      name: 'Exclusive',
      price: null,
      features: ['Semua fitur Premium', 'Nama tamu personal', 'Revisi prioritas', 'Domain khusus (opsional)'],
    },
  ],

  reseller: {
    benefits: [
      { icon: 'tag', title: 'Atur harga sendiri', text: 'Jual ulang undangan dengan harga dan margin yang Anda tentukan.' },
      { icon: 'layers', title: 'Katalog tema siap jual', text: 'Akses semua tema Sesandingan untuk ditawarkan ke pelanggan Anda.' },
      { icon: 'megaphone', title: 'Materi promosi', text: 'Gunakan link demo tema untuk promosi di media sosial.' },
      { icon: 'headset', title: 'Dukungan tim', text: 'Kami bantu proses pembuatan undangan pesanan pelanggan Anda.' },
    ],
    steps: [
      'Hubungi kami lewat WhatsApp dan sampaikan minat menjadi reseller.',
      'Dapatkan informasi harga reseller dan cara kerja sama.',
      'Mulai tawarkan tema Sesandingan ke pelanggan Anda.',
    ],
    // Catatan ketentuan (isi bila sudah final), contoh: 'Komisi 20% per pesanan'
    terms: '',
  },

  faq: [
    { q: 'Bagaimana cara memesan undangan?', a: 'Pilih tema, lalu tekan tombol Pesan untuk terhubung dengan kami via WhatsApp. Kirim data acara dan foto, kami siapkan undangannya.' },
    { q: 'Apakah tamu bisa konfirmasi kehadiran?', a: 'Bisa. Tema Sesandingan dilengkapi formulir RSVP dan buku ucapan tamu.' },
    { q: 'Apakah nama tamu bisa dibuat personal?', a: 'Bisa. Setiap tamu dapat menerima tautan dengan namanya sendiri di halaman pembuka.' },
    { q: 'Berapa lama proses pembuatannya?', a: 'Estimasi waktu pengerjaan akan diinformasikan saat pemesanan.' },
    { q: 'Bagaimana cara menjadi reseller?', a: 'Buka menu Reseller lalu tekan Daftar Reseller untuk terhubung dengan tim kami.' },
  ],
};
