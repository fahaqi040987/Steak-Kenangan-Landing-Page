/**
 * Site content module — the single source of truth for all brand copy and asset paths.
 * Sourced from Steak-Kenangan-Paket-Lengkap-Website/06-Teks/TEKS-PROFIL-RESTAURANT.txt
 * (edit here, not in components). Assets live in public/ with stable names; the paket
 * folder itself is raw material and is never referenced by the app.
 */
import type { CabangEntry, MenuItem } from "@/types";

/** One contact/social entry; href omitted for plain text lines (e.g. opening hours). */
export interface ContactInfo {
  label: string;
  text: string;
  href?: string;
}

export const site = {
  brand: {
    name: "Steak Kenangan",
    tagline: "Rasa Yang Bercerita",
    founded: 2021,
    origin: "Belitung, Kepulauan Bangka Belitung",
    concept:
      "Premium steakhouse dengan jiwa steak rumahan — lezat, terjangkau, dan ramah keluarga",
    halal: "Bersertifikat Halal Indonesia",
    logoWhite: "/brand/logo-white.png",
    logoDark: "/brand/logo-dark.png",
  },

  hero: {
    eyebrow: "Premium Steakhouse — Sejak 2021",
    title: "Steak Kenangan",
    tagline: "Rasa Yang Bercerita",
    cities: "Belitung • Depok Tanah Baru • Cibitung Bekasi • Depok Kukusan",
    image: "/hero/banner.jpg",
    imageAlt: "Suasana Steak Kenangan",
    ctaPrimary: { label: "Lihat Menu", target: "menu" },
    ctaSecondary: { label: "Reservasi Meja", target: "reservation" },
  },

  stats: [
    { value: "50.000+", label: "Pelanggan Puas" },
    { value: "100+", label: "Item Menu" },
    { value: "15", label: "Penghargaan" },
    { value: "4", label: "Cabang Kota" },
  ],

  about: {
    title: "Cerita Kami",
    paragraphs: [
      "Steak Kenangan berawal dari sebuah dapur sederhana di Belitung, tempat rasa, kebersamaan, dan kenangan pertama kali disatukan. Kami menghadirkan steak rumahan yang lezat, terjangkau, dan menemani momen kecil bersama keluarga.",
      "Langkah kami kemudian meluas ke Pulau Jawa — Depok, Cibitung Bekasi, hingga Yogyakarta — mempertemukan kami dengan mahasiswa, keluarga, dan pelanggan baru yang kini menjadi bagian dari cerita kami.",
      "Bagi kami, bertumbuh berarti berani menata ulang langkah: memilih lokasi yang lebih tepat dan kembali hadir lebih dekat dengan pelanggan setia.",
    ],
    highlight:
      "Hari ini, Steak Kenangan bukan sekadar steak di atas piring — melainkan cerita di setiap meja, tawa yang dibagi, dan kenangan yang terus hidup. Karena makanan terbaik adalah yang mengingatkan kita untuk pulang.",
    image: "/about/chiken_katsu.jpg",
    imageAlt: "Suasana Steak Kenangan",
    cta: { label: "Lihat Perjalanan Kami", target: "perjalanan" },
  },

  perjalanan: {
    title: "Dari Belitung untuk Indonesia",
    entries: [
      {
        year: "2021",
        title: "Lahir Pertama Kali di Belitung",
        text: "Steak Kenangan resmi berdiri di Belitung. Cabang pertama menjadi fondasi berkembangnya brand dengan konsep steak rumahan yang lezat, terjangkau, dan ramah keluarga.",
      },
      {
        year: "2022",
        title: "Ekspansi ke Pulau Jawa — Depok, Kukusan",
        text: "Ekspansi pertama ke Pulau Jawa. Kehadiran cabang Depok memperkuat brand dan mulai dikenal di kalangan mahasiswa serta keluarga di luar Belitung.",
      },
      {
        year: "2023",
        title: "Membuka Cabang di Cibitung, Bekasi",
        text: "Cabang Cibitung menjadi pusat pertumbuhan pelanggan di area Bekasi dan sekitarnya, memperluas jangkauan di Jabodetabek.",
      },

      {
        year: "2025",
        title: "Reopening Depok Tanah Baru",
        text: "Cabang Depok Tanah Baru resmi dibuka kembali sebagai bentuk komitmen menghadirkan pengalaman kuliner yang lebih dekat dengan pelanggan setia.",
      },
      {
        year: "2026",
        title: "Ekspansi memperkuat - Depok, Kukusan",
        text: "Cabang Depok Kukusan resmi dibuka sebagai pemenuh kebutuhan para mahasiswa dalam memberikan pengalaman terbaik dalam mencicipi hidangan steak dengan kualitas terbaik",
      },

    ],
  },

  nilai: {
    title: "Apa yang Kami Yakini",
    values: [
      {
        title: "Kualitas Utama",
        text: "Kami hanya menggunakan bahan terbaik — daging sapi premium yang dimatangkan sempurna dan sayuran segar pilihan. Kualitas tidak bisa ditawar.",
      },
      {
        title: "Keahlian",
        text: "Setiap hidangan disiapkan dengan ketelitian tinggi terhadap detail. Chef kami adalah pengrajin yang bangga akan keahliannya.",
      },
      {
        title: "Keramahan",
        text: "Makan adalah pengalaman, bukan sekadar makanan. Setiap tamu harus merasa disambut, dihargai, dan pulang dengan kenangan manis.",
      },
    ],
    advantages: [
      {
        title: "Chef Berpengalaman",
        text: "Tim dapur berkeahlian internasional, konsistensi rasa di setiap cabang.",
      },
      {
        title: "Bahan Premium",
        text: "Hanya potongan terbaik dan bahan segar yang dipilih setiap hari.",
      },
      {
        title: "Reservasi Mudah",
        text: "Pesan meja secara online untuk pengalaman makan tanpa menunggu.",
      },
      {
        title: "Acara Privat",
        text: "Ruang makan privat untuk jamuan bisnis dan momen spesial.",
      },
    ],
  },

  menu: {
    title: "Menu Andalan",
    note: "Harga dapat berubah sewaktu-waktu • Menu lengkap 100+ item tersedia di outlet",
    items: [
      { name: "Iga Bakar", price: "Rp 55.000", category: "steak", img: "/menu/banner-iga-bakar.jpg" },
      { name: "Chicken Steak Crispy Black Paper", price: "Rp 20.000", category: "steak", img: "/menu/banner-chicken-steak.jpg" },
      { name: "Mix Plater", price: "Rp 30.000", category: "pembuka", img: "/menu/banner-mix-plater.jpg" },
      { name: "Beef Burger Hotplate Mushroom", price: "Rp 35.000", category: "pembuka", img: "/menu/banner-beef-burger.jpg" },
      { name: "Sop Iga", price: "Rp 35.000", category: "pendamping" },
      { name: "Spageti Carbonara", price: "Rp 25.000", category: "pendamping", img: "/menu/banner-spageti-carbonara.jpg" },
      { name: "Spageti Bolognese", price: "Rp 25.000", category: "pendamping" },
      { name: "Matcha Green Tea", price: "Rp 15.000", category: "minuman", img: "/menu/banner-matcha.jpg" },
      { name: "Milk Regal Vanila", price: "Rp 18.000", category: "minuman" },
      { name: "Ice Tea", price: "Rp 10.000", category: "minuman" },
    ] as MenuItem[],
  },

  reservasi: {
    subtitle:
      "Isi formulir di bawah — konfirmasi ketersediaan meja langsung via WhatsApp.",
    /** Raw international-format number for wa.me deep links (no "+", no dashes). */
    waNumber: "6287899277000",
    submitLabel: "Kirim via WhatsApp",
    /** Hourly slots; last seating one hour before the 22.00 WIB closing time. */
    timeSlots: [
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
    ],
  },

  testimoni: {
    title: "Kata Pelanggan Kami",
    items: [
      {
        quote:
          "Steak Kenangan memiliki cita rasa yang luar biasa. Dagingnya empuk, bumbunya pas, dan pelayanannya sangat ramah. Tempat wajib untuk pecinta steak!",
        name: "Budi Santoso",
        role: "Food Blogger",
      },
      {
        quote:
          "Perfect place for business dinners. The ambiance is sophisticated, the service is impeccable, and the steaks are consistently excellent.",
        name: "Sarah Chen",
        role: "Business Executive",
      },
      {
        quote:
          "Sudah jadi langganan sejak 2 tahun lalu. Kualitasnya tidak pernah mengecewakan. Saya selalu merekomendasikan kepada teman dan keluarga.",
        name: "Rizky Pratama",
        role: "Pelanggan Setia",
      },
      {
        quote:
          "One of the best steakhouses. The Wagyu is exceptional, and every dish pairs beautifully with the atmosphere.",
        name: "Amanda Williams",
        role: "Travel Writer",
      },
      {
        quote:
          "Sebagai sesama chef, saya mengapresiasi dedikasi dan keahlian yang ditunjukkan di setiap hidangan. Truly world-class quality!",
        name: "Dewi Anggraini",
        role: "Chef",
      },
    ],
  },

  kontak: {
    title: "Mari Berkumpul di Meja Kami",
    cabang: [
      // coords are map pins, not street addresses: Belitung is pinned at city level
      // (Tanjung Pandan), Depok at street level (Jl. Tanah Baru). Cibitung and
      // Jogjakarta get coords when their full addresses land — list-only until then.
      {
        name: "Belitung",
        detail: "Cabang pertama — sejak 2021",
        coords: { lat: -2.7331, lng: 107.6379 },
      },
      {
        name: "Depok — Tanah Baru",
        detail: "Jl. Tanah Baru No.32, Beji, Depok (sejak 2025)",
        coords: { lat: -6.3859, lng: 106.8334 },
      },
      {
        name: "Depok — Kukusan",
        detail: "Jl. Palakali No.49b, Kukusan, Kecamatan Beji, Kota Depok, Jawa Barat 16425",
        coords:{lat : -6.36905458100729, lng: 106.81721264734635}
      },
    ] as CabangEntry[],
    reach: [
      {
        label: "Telepon / WhatsApp",
        text: "+62 878-9927-7000",
        href: "https://wa.me/6287899277000",
      },
      {
        label: "Email",
        text: "info@steakkenangan.com",
        href: "mailto:info@steakkenangan.com",
      },
      { label: "Jam Buka", text: "Setiap hari, 10.00 – 22.00 WIB" },
    ] as ContactInfo[],
    sosial: [
      {
        label: "Instagram",
        text: "@steakkenangan.depok",
        href: "https://instagram.com/steakkenangan.depok",
      },
      {
        label: "Facebook",
        text: "steakkenangan",
        href: "https://facebook.com/steakkenangan",
      },
      {
        label: "Website",
        text: "steakkenangan.com",
        href: "https://steakkenangan.com",
      },
    ] as ContactInfo[],
  },
} as const;

/** Menu categories, mirroring the paket's grouping. */
export type MenuCategory = "steak" | "pembuka" | "pendamping" | "minuman";
