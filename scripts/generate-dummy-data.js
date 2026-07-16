const fs = require('fs');
const path = require('path');

const wasteDir = path.join(__dirname, '../data/waste-items');
const prosesDir = path.join(__dirname, '../data/proses');

// --- PROSES DATA ---
const prosesData = [
  {
    id: "pengomposan",
    judul: "Pengomposan",
    kategori: "organik",
    gambar: "/images/proses/pengomposan.webp",
    deskripsi: "Proses mengurai sisa-sisa organik secara alami menjadi pupuk kompos.",
    langkah: ["Pisahkan sampah organik", "Cacah kecil-kecil", "Campur dengan tanah/EM4 (1:100)", "Diamkan 2-4 minggu", "Aduk berkala"],
    hasilAkhir: "Kompos padat untuk pupuk tanaman, atau kompos cair.",
    sumberReferensi: []
  },
  {
    id: "daur-ulang-kertas",
    judul: "Daur Ulang Kertas",
    kategori: "anorganik",
    gambar: "/images/proses/daur-ulang-kertas.webp",
    deskripsi: "Proses mendaur ulang kertas bekas menjadi kertas baru.",
    langkah: ["Pilah jenis kertas", "Rendam dalam air", "Blender jadi bubur kertas", "Cetak di screen", "Tekan dan keringkan"],
    hasilAkhir: "Kertas daur ulang, kardus telur.",
    sumberReferensi: []
  },
  {
    id: "daur-ulang-kaca",
    judul: "Daur Ulang Kaca",
    kategori: "anorganik",
    gambar: "/images/proses/daur-ulang-kaca.webp",
    deskripsi: "Proses melebur pecahan kaca untuk dibentuk menjadi wadah kaca baru.",
    langkah: ["Pilah berdasarkan warna", "Hancurkan jadi cullet", "Cuci bersih", "Lebur di tungku", "Cetak produk baru"],
    hasilAkhir: "Botol kaca baru, bahan bangunan.",
    sumberReferensi: []
  },
  {
    id: "penanganan-b3",
    judul: "Penanganan Limbah B3",
    kategori: "b3",
    gambar: "/images/proses/penanganan-b3.webp",
    deskripsi: "Proses khusus untuk menangani limbah berbahaya dan beracun.",
    langkah: ["Pisahkan dari sampah biasa", "Simpan di wadah tertutup", "Serahkan ke fasilitas pengelola B3"],
    hasilAkhir: "Recovery logam berharga, pemusnahan aman.",
    sumberReferensi: []
  },
  {
    id: "pirolisis-plastik-ke-bbm",
    judul: "Pirolisis Plastik ke BBM",
    kategori: "anorganik",
    gambar: "/images/proses/pirolisis-bbm.webp",
    deskripsi: "Mengubah sampah plastik bernilai rendah menjadi BBM.",
    langkah: ["Cacah plastik", "Panaskan di reaktor tanpa oksigen", "Alirkan gas ke kondensor", "Kumpulkan BBM"],
    hasilAkhir: "Bensin, solar, minyak tanah sintetik.",
    sumberReferensi: []
  }
];

prosesData.forEach(p => {
  const file = path.join(prosesDir, `${p.id}.json`);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(p, null, 2));
  }
});

// --- WASTE ITEMS DATA ---
const wasteItems = [
  { id: 'sisa-makanan', nama: 'Sisa Makanan', kat: 'organik', sub: 'dapur', waktu: '1-2 minggu', proses: 'pengomposan', harga: 'Tidak dijual' },
  { id: 'kulit-pisang', nama: 'Kulit Pisang', kat: 'organik', sub: 'dapur', waktu: '2-6 bulan', proses: 'pengomposan', harga: 'Tidak dijual' },
  { id: 'kardus', nama: 'Kardus/Dus Bekas', kat: 'anorganik', sub: 'kertas', waktu: '2-5 bulan', proses: 'daur-ulang-kertas', harga: '1.000-1.500' },
  { id: 'kertas-hvs', nama: 'Kertas HVS', kat: 'anorganik', sub: 'kertas', waktu: '2-6 minggu', proses: 'daur-ulang-kertas', harga: '1.700' },
  { id: 'kaleng-aluminium', nama: 'Kaleng Aluminium', kat: 'anorganik', sub: 'logam', waktu: '80-200 tahun', proses: 'daur-ulang-plastik', harga: '8.000-15.000' },
  { id: 'botol-kaca', nama: 'Botol Kaca', kat: 'anorganik', sub: 'kaca', waktu: '1 juta tahun', proses: 'daur-ulang-kaca', harga: '200-500' },
  { id: 'baterai-bekas', nama: 'Baterai Bekas', kat: 'b3', sub: 'elektronik', waktu: '100 tahun', proses: 'penanganan-b3', harga: 'Tidak dijual' },
  { id: 'lampu-neon', nama: 'Lampu Neon', kat: 'b3', sub: 'elektronik', waktu: 'Tidak terurai', proses: 'penanganan-b3', harga: 'Tidak dijual' },
  { id: 'popok-bayi', nama: 'Popok Bayi', kat: 'residu', sub: 'residu', waktu: '500 tahun', proses: null, harga: 'Tidak diterima' },
  { id: 'kantong-plastik', nama: 'Kantong Plastik', kat: 'anorganik', sub: 'plastik', waktu: '10-1000 tahun', proses: 'pirolisis-plastik-ke-bbm', harga: '300-500' },
];

wasteItems.forEach(w => {
  const file = path.join(wasteDir, `${w.id}.json`);
  
  // Extract number for min/max
  const match = w.waktu.match(/(\d+)/);
  let min = match ? parseInt(match[0]) : 0;
  let max = min;
  let satuan = 'tahun';
  if (w.waktu.includes('minggu')) satuan = 'minggu';
  else if (w.waktu.includes('bulan')) satuan = 'bulan';

  if (!fs.existsSync(file)) {
    const data = {
      id: w.id,
      nama: w.nama,
      kategoriUtama: w.kat,
      subKategori: w.sub,
      gambar: `/images/waste/${w.id}.webp`,
      deskripsiSingkat: `Ini adalah ${w.nama}, contoh umum dari sampah ${w.kat}.`,
      lamaTerurai: {
        min: min,
        max: max,
        satuan: satuan,
        catatan: w.waktu
      },
      bisaDiDaurUlang: w.proses !== null,
      prosesId: w.proses,
      hasilOlahan: ["Sesuai dengan proses daur ulang yang tersedia."],
      potensiCuan: {
        hargaPerKg: w.harga,
        satuan: "IDR",
        catatan: "Estimasi rata-rata."
      },
      sumberReferensi: []
    };
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }
});

console.log("Dummy data generated!");
