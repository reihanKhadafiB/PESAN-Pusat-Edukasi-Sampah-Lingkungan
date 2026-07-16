const fs = require('fs');
const path = require('path');

const blueprintPath = path.join(__dirname, '../FINAL-BLUEPRINT-v2.md');
const wasteDir = path.join(__dirname, '../data/waste-items');
const prosesDir = path.join(__dirname, '../data/proses');

if (!fs.existsSync(wasteDir)) fs.mkdirSync(wasteDir, { recursive: true });
if (!fs.existsSync(prosesDir)) fs.mkdirSync(prosesDir, { recursive: true });

const content = fs.readFileSync(blueprintPath, 'utf8');

// HARDCODE PROSES (Karena format teksnya bervariasi di markdown)
const prosesList = [
  {
    id: "pengomposan",
    judul: "Pengomposan",
    kategori: "organik",
    gambar: "/images/proses/pengomposan.webp",
    deskripsi: "Proses mengubah sampah organik menjadi kompos melalui dekomposisi alami.",
    langkah: ["Pisahkan sampah organik", "Cacah kecil-kecil", "Campur dengan tanah/EM4 (1:100)", "Diamkan 2-4 minggu", "Aduk berkala"],
    hasilAkhir: "Kompos padat untuk pupuk tanaman, atau kompos cair",
    sumberReferensi: ["EM4 Indonesia", "DLH Buleleng"]
  },
  {
    id: "daur-ulang-plastik",
    judul: "Daur Ulang Plastik",
    kategori: "anorganik",
    gambar: "/images/proses/daur-ulang-plastik.webp",
    deskripsi: "Proses mengubah sampah plastik bekas menjadi produk baru.",
    langkah: ["Kumpulkan dan pilah jenis plastik", "Cuci bersih", "Cacah jadi serpihan (flake)", "Lebur di extruder", "Cetak jadi pellet/bijih plastik"],
    hasilAkhir: "Biji plastik/pellet, serat poliester",
    sumberReferensi: ["Waste4Change", "Sucofindo"]
  },
  {
    id: "daur-ulang-kertas",
    judul: "Daur Ulang Kertas",
    kategori: "anorganik",
    gambar: "/images/proses/daur-ulang-kertas.webp",
    deskripsi: "Proses daur ulang kertas bekas menjadi kertas baru.",
    langkah: ["Kumpulkan kertas bekas", "Rendam dalam air 12-24 jam", "Blender jadi bubur kertas", "Saring dan cetak", "Tekan dan keringkan"],
    hasilAkhir: "Kertas daur ulang, kardus telur",
    sumberReferensi: ["wikiHow Indonesia", "ARAH Environmental"]
  },
  {
    id: "daur-ulang-kaca",
    judul: "Daur Ulang Kaca",
    kategori: "anorganik",
    gambar: "/images/proses/daur-ulang-kaca.webp",
    deskripsi: "Proses daur ulang botol dan pecahan kaca.",
    langkah: ["Kumpulkan dan pilah berdasarkan warna", "Hancurkan jadi pecahan kecil (cullet)", "Cuci bersih", "Lebur di tungku suhu tinggi", "Cetak produk baru"],
    hasilAkhir: "Botol kaca baru, pecahan kaca (cullet)",
    sumberReferensi: ["Wikipedia Daur Ulang Kaca"]
  },
  {
    id: "pembuatan-ecobrick",
    judul: "Pembuatan Ecobrick",
    kategori: "anorganik",
    gambar: "/images/proses/ecobrick.webp",
    deskripsi: "Mengubah sampah plastik sachet/bungkus menjadi material bangunan modular.",
    langkah: ["Siapkan botol plastik bersih", "Kumpulkan sampah plastik bersih", "Potong kecil-kecil", "Masukkan ke botol dan padatkan", "Isi hingga penuh dan keras"],
    hasilAkhir: "Bahan bangunan modular (ecobrick)",
    sumberReferensi: ["ecobrick.org"]
  },
  {
    id: "pembuatan-paving-block",
    judul: "Pembuatan Paving Block dari Plastik",
    kategori: "anorganik",
    gambar: "/images/proses/paving-block.webp",
    deskripsi: "Memanfaatkan sampah plastik keras menjadi paving block.",
    langkah: ["Kumpulkan dan cacah sampah plastik", "Lelehkan plastik", "Campurkan dengan pasir (1:3)", "Tuang ke cetakan", "Keringkan"],
    hasilAkhir: "Paving block ramah lingkungan",
    sumberReferensi: ["ITB", "ejournal.utp.ac.id"]
  },
  {
    id: "pirolisis-plastik-ke-bbm",
    judul: "Pirolisis Plastik ke BBM",
    kategori: "anorganik",
    gambar: "/images/proses/pirolisis-bbm.webp",
    deskripsi: "Mengubah plastik menjadi bahan bakar minyak melalui proses tanpa oksigen.",
    langkah: ["Cacah sampah plastik", "Masukkan ke reaktor pirolisis", "Panaskan 300-500°C tanpa oksigen", "Alirkan gas ke kondensor", "Saring BBM"],
    hasilAkhir: "Bensin, solar, lilin/residu",
    sumberReferensi: ["Identif.id", "BBC Indonesia"]
  },
  {
    id: "penanganan-b3",
    judul: "Penanganan B3",
    kategori: "b3",
    gambar: "/images/proses/penanganan-b3.webp",
    deskripsi: "Menangani limbah berbahaya dan beracun rumah tangga.",
    langkah: ["Identifikasi dan pisahkan limbah B3", "Simpan di wadah tertutup", "Serahkan ke TPS B3 atau bank sampah khusus", "Pengujian karakteristik (TCLP) di fasilitas", "Pengolahan akhir"],
    hasilAkhir: "Recovery logam berharga, disposal aman",
    sumberReferensi: ["Greenlab Indonesia", "DLH Jawa Tengah"]
  }
];

prosesList.forEach(p => {
  fs.writeFileSync(path.join(prosesDir, `${p.id}.json`), JSON.stringify(p, null, 2));
});


// EKSTRAK WASTE ITEMS DARI MARKDOWN
// Regex untuk menemukan baris tabel
const lines = content.split('\n');
let parsingTable = false;
let currentKategoriUtama = "";
let currentSubKategori = "";

let itemCount = 0;

lines.forEach(line => {
  if (line.startsWith('### ')) {
    const title = line.replace('### ', '').toLowerCase();
    if (title.includes('kategori organik')) {
      currentKategoriUtama = 'organik';
      currentSubKategori = 'umum';
    } else if (title.includes('anorganik — plastik')) {
      currentKategoriUtama = 'anorganik';
      currentSubKategori = 'plastik';
    } else if (title.includes('anorganik — kertas')) {
      currentKategoriUtama = 'anorganik';
      currentSubKategori = 'kertas';
    } else if (title.includes('anorganik — logam')) {
      currentKategoriUtama = 'anorganik';
      currentSubKategori = 'logam';
    } else if (title.includes('anorganik — kaca')) {
      currentKategoriUtama = 'anorganik';
      currentSubKategori = 'kaca';
    } else if (title.includes('kategori b3')) {
      currentKategoriUtama = 'b3';
      currentSubKategori = 'berbahaya';
    } else if (title.includes('kategori residu')) {
      currentKategoriUtama = 'residu';
      currentSubKategori = 'sulit diolah';
    }
  }

  // Check if it's a table row containing data (starts with | and has numbers at the beginning)
  if (line.trim().startsWith('|') && !line.includes('---') && !line.includes('| # |')) {
    const cols = line.split('|').map(c => c.trim()).filter(c => c);
    
    // Asumsikan kolom: [Nomor, ID, Nama, Lama Terurai, Proses, Harga/Kg, Hasil Olahan]
    if (cols.length >= 7 && !isNaN(parseInt(cols[0]))) {
      const id = cols[1];
      const nama = cols[2];
      const lamaTeruraiRaw = cols[3];
      const prosesIdRaw = cols[4];
      const hargaRaw = cols[5];
      const hasilOlahanRaw = cols[6];

      // Parse lama terurai
      const numMatch = lamaTeruraiRaw.match(/(\d+)/);
      let min = 0;
      let max = 0;
      let satuan = 'tahun';

      if (numMatch) {
        min = parseInt(numMatch[0]);
        max = min; // Default
        
        // Coba cari range
        const rangeMatch = lamaTeruraiRaw.match(/(\d+)\s*-\s*(\d+)/);
        if (rangeMatch) {
          min = parseInt(rangeMatch[1]);
          max = parseInt(rangeMatch[2]);
        } else if (lamaTeruraiRaw.includes('+')) {
          max = min + 50; // just a guess for e.g. 50+
        }

        if (lamaTeruraiRaw.toLowerCase().includes('minggu')) satuan = 'minggu';
        else if (lamaTeruraiRaw.toLowerCase().includes('bulan')) satuan = 'bulan';
        else if (lamaTeruraiRaw.toLowerCase().includes('hari')) satuan = 'hari';
      } else {
        if (lamaTeruraiRaw.toLowerCase().includes('tidak terurai')) {
           satuan = 'permanen';
        } else if (lamaTeruraiRaw.toLowerCase().includes('bervariasi')) {
           satuan = 'bervariasi';
        }
      }

      // Parse prosesId
      let prosesId = prosesIdRaw === 'null' || prosesIdRaw.includes('null') ? null : prosesIdRaw;

      // Hasil olahan array
      const hasilOlahan = hasilOlahanRaw !== '—' && !hasilOlahanRaw.includes('residu') ? hasilOlahanRaw.split(',').map(s => s.trim()) : [];

      const itemData = {
        id,
        nama,
        kategoriUtama: currentKategoriUtama,
        subKategori: currentSubKategori,
        gambar: `/images/waste/${id}.webp`,
        deskripsiSingkat: `Informasi mengenai sampah ${nama} yang termasuk dalam kategori ${currentKategoriUtama}.`,
        lamaTerurai: {
          min,
          max,
          satuan,
          catatan: lamaTeruraiRaw
        },
        bisaDiDaurUlang: prosesId !== null,
        prosesId: prosesId,
        hasilOlahan: hasilOlahan,
        potensiCuan: {
          hargaPerKg: hargaRaw,
          satuan: "IDR",
          catatan: "Harga dapat bervariasi."
        },
        sumberReferensi: []
      };

      fs.writeFileSync(path.join(wasteDir, `${id}.json`), JSON.stringify(itemData, null, 2));
      itemCount++;
    }
  }
});

console.log(`Berhasil membuat 8 file proses dan ${itemCount} file jenis sampah!`);
