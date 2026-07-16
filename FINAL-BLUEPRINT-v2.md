# Website Edukasi Sampah — Final Blueprint v2

> Dibangun sebagai bagian dari program KKN. Fokus: konten edukatif mendalam + elemen interaktif (kuis & game).
> Versi final, mengintegrasi seluruh hasil riset data, referensi gambar, dan perbaikan dari analisis.

---

## 1. Tech Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 16 (App Router), JavaScript | Static export (`output: 'export'`), Server Components cocok untuk baca data lokal tanpa API layer |
| Bahasa | JavaScript (bukan TypeScript) | Tanpa overhead type system untuk project skala ini |
| Styling | Tailwind CSS | Cepat untuk taksonomi visual berulang (badge kategori, warna konsisten) |
| Data | JSON lokal di `/data`, tanpa CMS/database eksternal | Requirement "statis, frontend doang"; 50+ item ditangani file-based |
| Gambar | Foto dari Unsplash/Pexels (via image-search), disimpan lokal di `/public/images` sebagai `.webp` | Free-license, compressed, ~400px wide |
| Deploy | Netlify (static export, `publish = "out"`) | Next.js static export tidak butuh fitur server-side Vercel |
| Node.js | v20+ (wajib untuk Next.js 16) | Requirement dari Next.js 16 |

**Catatan implementasi penting:**
- `next.config.js` → `output: 'export'`, `images: { unoptimized: true }` (Image Optimization API server-side tidak jalan di static export/Netlify — gambar harus sudah dikompres manual sebelum masuk `/public`)
- Tidak ada API routes, middleware, atau server actions — semua data dibaca saat build time

---

## 2. Perbaikan dari Analisis v1

| # | Isu | Solusi di v2 |
|---|---|---|
| 1 | Tidak ada strategi SEO | Tambah `metadata` export di setiap `page.js` (title, description, Open Graph). Generate `sitemap.xml` dari `generateStaticParams` |
| 2 | Tidak ada strategi responsive | Terapkan **mobile-first** approach. Breakpoint: sm(640), md(768), lg(1024), xl(1280) |
| 3 | Validasi data tidak cross-reference | `scripts/validate-data.js` cek bahwa setiap `prosesId` yang dirujuk waste-item benar-benar ada di `proses/` |
| 4 | Tidak ada halaman 404 kustom | Buat `app/not-found.js`, konfigurasi Netlify redirect ke `/404.html` |
| 5 | Tidak ada error boundary | Tambah `error.js` di setiap folder route |
| 6 | Skor kuis tidak persisten | Simpan skor tertinggi & riwayat sesi di **localStorage** (tetap frontend-only) |
| 7 | Tidak ada strategi loading | Semua gambar pakai `loading="lazy"`. Pertimbangkan pagination untuk list 50+ item (12 item/halaman) |
| 8 | Aksesibilitas game kurang detail | Definisikan mekanik fallback non-gesture: tombol pilih kategori sampah, lalu tekan tombol "Lempar" |

---

## 3. Struktur Data

Prinsip: **hindari duplikasi konten** dengan pola referensi (mirip foreign key), bukan copy-paste teks antar file.

```
data/
├── waste-items/           # 1 file per jenis sampah (50+ file)
│   ├── sisa-makanan.json
│   ├── kulit-pisang.json
│   ├── botol-pet.json
│   ├── kantong-plastik.json
│   ├── styrofoam.json
│   ├── kaleng-aluminium.json
│   ├── botol-kaca.json
│   ├── kertas-hvs.json
│   ├── kardus.json
│   ├── baterai.json
│   ├── lampu-neon.json
│   ├── popok-bayi.json
│   └── ... (50+ file)
├── proses/                 # 1 file per proses pengolahan
│   ├── pengomposan.json
│   ├── daur-ulang-plastik.json
│   ├── daur-ulang-kertas.json
│   ├── daur-ulang-kaca.json
│   ├── pembuatan-ecobrick.json
│   ├── pembuatan-paving-block.json
│   ├── pirolisis-plastik-ke-bbm.json
│   └── penanganan-b3.json
├── lima-r.json             # Konsep 5R
└── quiz.json                # Bank soal kuis (15-20 soal)
```

### Schema `waste-items/*.json`
```json
{
  "id": "botol-pet",
  "nama": "Botol Plastik PET",
  "kategoriUtama": "anorganik",
  "subKategori": "plastik",
  "gambar": "/images/waste/botol-pet.webp",
  "deskripsiSingkat": "Botol minuman berbahan Polyethylene Terephthalate, kode daur ulang #1.",
  "lamaTerurai": {
    "min": 450,
    "max": 450,
    "satuan": "tahun",
    "catatan": "Estimasi berdasarkan kondisi tanah dan lingkungan. Sumber: IndonesiaBaik.id, DLH Lampung"
  },
  "bisaDiDaurUlang": true,
  "prosesId": "daur-ulang-plastik",
  "hasilOlahan": ["Serat poliester", "Ecobrick", "Paving block", "BBM melalui pirolisis"],
  "potensiCuan": {
    "hargaPerKg": "1500-4600",
    "satuan": "IDR",
    "catatan": "PET putih Rp3.500-4.600/kg, PET warna Rp2.500/kg. Harga per biji Rp1.500. Fluktuatif per daerah."
  },
  "sumberReferensi": ["https://indonesiabaik.id/infografis/berapa-lama-sampah-plastik-bisa-terurai", "https://dlh.lampungprov.go.id/detail-post/berapa-lama-sampah-terurai"]
}
```

### Schema `proses/*.json`
```json
{
  "id": "daur-ulang-plastik",
  "judul": "Daur Ulang Sampah Plastik",
  "kategori": "anorganik",
  "gambar": "/images/proses/daur-ulang-plastik.webp",
  "deskripsi": "Proses mengubah sampah plastik bekas menjadi produk baru melalui tahapan pencucian, cacah, pelelehan, dan pembentukan.",
  "langkah": [
    "Kumpulkan dan pilah sampah plastik berdasarkan jenis (PET, HDPE, PP, LDPE)",
    "Cuci bersih plastik dari kotoran dan label",
    "Cacah/plastik menjadi serpihan kecil (flake)",
    "Leburkan serpihan plastik pada suhu tinggi (160-280°C tergantung jenis)",
    "Cetak atau bentuk menjadi produk baru (bijih plastik/pellet, serat, dll)"
  ],
  "hasilAkhir": "Biji plastik/pellet yang bisa dibentuk menjadi berbagai produk baru seperti botol, serat polyester, dll.",
  "sumberReferensi": ["https://waste4change.com/blog/daur-ulang-sampah", "https://www.sucofindo.co.id/artikel-1/5-cara-kreatif-mengolah-sampah-yang-bisa-mendatangkan-cuan"]
}
```

### Schema `lima-r.json`
```json
[
  { "id": "reduce", "judul": "Reduce (Mengurangi)", "deskripsi": "Mengurangi penggunaan barang yang menghasilkan sampah.", "contoh": ["Membawa tas belanja sendiri", "Membeli produk dengan kemasan minimal", "Menghindari penggunaan sedotan plastik"] },
  { "id": "reuse", "judul": "Reuse (Menggunakan Kembali)", "deskripsi": "Menggunakan kembali barang yang masih layak pakai.", "contoh": ["Menggunakan botol minum isi ulang", "Memanfaatkan kardus bekas sebagai wadah penyimpanan", "Menggunakan kain lap dari pakaian bekas"] },
  { "id": "recycle", "judul": "Recycle (Mendaur Ulang)", "deskripsi": "Mengolah sampah menjadi barang baru yang bermanfaat.", "contoh": ["Mendaur ulang kertas bekas jadi kertas baru", "Menyetorkan botol plastik ke bank sampah", "Membuat kompos dari sampah dapur"] },
  { "id": "replace", "judul": "Replace (Mengganti)", "deskripsi": "Mengganti barang sekali pakai dengan alternatif ramah lingkungan.", "contoh": ["Mengganti sedotan plastik dengan sedotan bambu/stainless", "Mengganti kantong plastik dengan tote bag kain", "Mengganti sabun batangan dalam kemasan plastik dengan sabun padat tanpa kemasan"] },
  { "id": "replant", "judul": "Replant (Menanam Kembali)", "deskripsi": "Menanam kembali pohon dan tanaman untuk menjaga keseimbangan ekosistem.", "contoh": ["Menanam pohon di halaman rumah", "Membuat taman dari barang bekas (ecobrick garden)", "Mengkompos sampah organik lalu menggunakannya sebagai pupuk tanaman"] }
]
```

### Schema `quiz.json`
```json
[
  {
    "id": "q1",
    "pertanyaan": "Berapa lama waktu yang dibutuhkan botol plastik PET untuk terurai di alam?",
    "opsi": ["10-20 tahun", "80-100 tahun", "450 tahun", "1.000 tahun"],
    "jawabanBenar": 2,
    "penjelasan": "Botol plastik PET membutuhkan sekitar 450 tahun untuk terurai secara alami di lingkungan. Sumber: IndonesiaBaik.id"
  },
  "..."
]
```

**Validasi data**: sebelum build, jalankan `scripts/validate-data.js` yang cek:
- Semua file JSON punya field wajib terisi dan tipe data benar
- **Cross-reference**: setiap `prosesId` di waste-items punya file yang sesuai di `proses/`
- **Lama terurai**: `min` <= `max`, satuan valid (hari/bulan/tahun)
- Tidak ada id duplikat

---

## 4. Master Data: 50+ Jenis Sampah

### A. Kategori Organik (13 item)

| # | ID | Nama | Lama Terurai | Proses | Harga/Kg | Hasil Olahan |
|---|---|---|---|---|---|---|
| 1 | sisa-makanan | Sisa Makanan | 1-2 minggu | pengomposan | Tidak dijual | Kompos, pupuk cair |
| 2 | kulit-pisang | Kulit Pisang | 2-6 bulan | pengomposan | Tidak dijual | Kompos, pupuk organik cair |
| 3 | kulit-jeruk | Kulit Jeruk | 6 bulan | pengomposan | Tidak dijual | Kompos, minyak jeruk peel |
| 4 | daun-kering | Daun Kering/Rumput | 1-3 bulan | pengomposan | Tidak dijual | Kompos, mulsa tanaman |
| 5 | sayuran-busuk | Sayuran Busuk | 1-2 minggu | pengomposan | Tidak dijual | Kompos |
| 6 | cangkang-telur | Cangkang Telur | Tidak terurai (kalsium) | pengomposan | Tidak dijual | Pupuk kalsium, campuran kompos |
| 7 | tulang-ayam | Tulang Ayam | 10-30 tahun | pengomposan | Tidak dijual | Kompos (lambat), pupuk fosfor |
| 8 | nasi-basi | Nasi Basi | 1-2 minggu | pengomposan | Tidak dijual | Kompos, pakan ternak fermentasi |
| 9 | sisa-ikan | Sisa Ikan/Seafood | 1-2 minggu | pengomposan | Tidak dijual | Kompos, pupuk cair (kaya nitrogen) |
| 10 | ampas-kopi | Ampas Kopi/Sisa Teh | 2-3 bulan | pengomposan | Tidak dijual | Kompos, body scrub, pengusir serangga |
| 11 | ranting-kayu | Ranting Kayu/Batang | 10-15 tahun | pengomposan | Tidak dijual | Kompos (lambat), arang kayu, wood chip |
| 12 | kain-katun | Kain Katun/Baju Bekas | 1-5 bulan | pengomposan | Tidak dijual | Kompos, lap, kerajinan quilting |
| 13 | kertas-tisu | Tisu/Bungkus Makanan Berlapis | 2-3 bulan | pengomposan | Tidak dijual | Kompos (jika tidak terkontaminasi plastik) |

### B. Kategori Anorganik — Plastik (10 item)

| # | ID | Nama | Lama Terurai | Proses | Harga/Kg | Hasil Olahan |
|---|---|---|---|---|---|---|
| 14 | botol-pet | Botol Plastik PET | 450 tahun | daur-ulang-plastik | 1.500-4.600 | Serat poliester, ecobrick, paving block, BBM pirolisis |
| 15 | kantong-plastik | Kantong Plastik/Kresek | 10-1000 tahun | pirolisis-plastik-ke-bbm | 300-500 | BBM melalui pirolisis |
| 16 | styrofoam | Styrofoam (EPS) | Tidak terurai alami | pirolisis-plastik-ke-bbm | Tidak diterima | BBM melalui pirolisis (kadar rendah) |
| 17 | tutup-botol | Tutup Botol Plastik (PP) | 10-500 tahun | daur-ulang-plastik | 900-1.000 | Biji plastik, paving block |
| 18 | gelas-plastik | Gelas Plastik (PP/PS) | 50-80 tahun | daur-ulang-plastik | 1.700-1.800 | Biji plastik, paving block |
| 19 | ember-jerigen | Ember/Jerigen (HDPE/PP) | 50-80 tahun | daur-ulang-plastik | 900-1.000 | Biji plastik, ecobrick, paving block |
| 20 | sedotan-plastik | Sedotan Plastik | 200 tahun | null (residu) | Tidak diterima | — (residu, sangat sulit didaur ulang) |
| 21 | sachet-kemasan | Sachet/Kemasan Multilayer | 50-100 tahun | pirolisis-plastik-ke-bbm | 300-500 (campuran) | BBM melalui pirolisis |
| 22 | plastik-keras | Plastik Kerasan/Mika | 20-30 tahun | daur-ulang-plastik | 300-700 | Biji plastik campuran |
| 23 | mainan-plastik | Mainan Plastik Bekas | 50-100 tahun | daur-ulang-plastik | 300-700 | Biji plastik, paving block |

### C. Kategori Anorganik — Kertas (5 item)

| # | ID | Nama | Lama Terurai | Proses | Harga/Kg | Hasil Olahan |
|---|---|---|---|---|---|---|
| 24 | kertas-hvs | Kertas HVS/Kertas Cetakan | 2-6 minggu | daur-ulang-kertas | 1.700 | Kertas daur ulang, kartu nama, kraft |
| 25 | koran | Koran/Majalah Bekas | 2-6 minggu | daur-ulang-kertas | 1.000-1.500 | Kertas daur ulang, kardus telur |
| 26 | kardus | Kardus/Dus Bekas | 2-5 bulan | daur-ulang-kertas | 1.000-1.500 | Kardus baru, kertas kraft |
| 27 | buku-bekas | Buku Bekas | 2-6 minggu | daur-ulang-kertas | 700-1.000 | Kertas daur ulang |
| 28 | kertas-krep | Kertas Krep/Kertas Berwarna | 2-6 minggu | daur-ulang-kertas | 500-700 | Kertas daur ulang campuran |

### D. Kategori Anorganik — Logam (6 item)

| # | ID | Nama | Lama Terurai | Proses | Harga/Kg | Hasil Olahan |
|---|---|---|---|---|---|---|
| 29 | kaleng-aluminium | Kaleng Aluminium (Minuman) | 80-200 tahun | daur-ulang-plastik | 8.000-15.000 | Ingot aluminium, produk logam baru |
| 30 | kaleng-besi | Kaleng Besi/Bekas Makanan | 50-100 tahun | daur-ulang-plastik | 2.000-3.000 | Baja baru, produk logam |
| 31 | besi-baja | Besi/Baja Bekas | 50-100 tahun | daur-ulang-plastik | 5.000-9.000 | Baja baru, konstruksi |
| 32 | kabel-tembaga | Kabel/Tembaga Bekas | 50-100 tahun | daur-ulang-plastik | 30.000-60.000 | Kabel baru, komponen elektronik |
| 33 | aluminium-foil | Aluminium Foil/Kaleng Susu | 80-200 tahun | daur-ulang-plastik | 3.000-5.000 | Ingot aluminium |
| 34 | paku-kawat | Paku/Kawat Bekas | 50-100 tahun | daur-ulang-plastik | 2.000-4.000 | Baja baru |

### E. Kategori Anorganik — Kaca (4 item)

| # | ID | Nama | Lama Terurai | Proses | Harga/Kg | Hasil Olahan |
|---|---|---|---|---|---|---|
| 35 | botol-kaca | Botol Kaca | 1 juta tahun | daur-ulang-kaca | 200-500 | Botol kaca baru, pecahan kaca (cullet) |
| 36 | pecahan-kaca | Pecahan Kaca | 1 juta tahun | daur-ulang-kaca | 200-500 | Cullet, paving block campuran |
| 37 | toples-kaca | Toples/Kaleng Kaca | 1 juta tahun | daur-ulang-kaca | 200-500 | Produk kaca baru, pot bunga |
| 38 | cermin-kaca | Cermin/Kaca Patri | 1 juta tahun | null (sulit) | Tidak diterima | — (kandungan merkuri/ Coating sulit dipisahkan) |

### F. Kategori B3 — Bahan Berbahaya & Beracun (8 item)

| # | ID | Nama | Lama Terurai | Proses | Harga/Kg | Hasil Olahan |
|---|---|---|---|---|---|---|
| 39 | baterai-bekas | Baterai/Batre Bekas | 100 tahun | penanganan-b3 | Tidak dijual (harus diserahkan) | Recovery logam (timah, seng, nikel), elektrolit |
| 40 | lampu-neon | Lampu Neon/LED Bekas | Tidak terurai | penanganan-b3 | Tidak dijual | Recovery merkuri, kaca, aluminium |
| 41 | obat-kadaluarsa | Obat-Obatan Kadaluarsa | Bervariasi | penanganan-b3 | Tidak dijual | Dimusnahkan di fasilitas B3 terlisensi |
| 42 | cat-thinner | Cat dan Thinner Bekas | 50+ tahun | penanganan-b3 | Tidak dijual | Dimusnahkan/diolah di fasilitas B3 |
| 43 | oli-bekas | Oli Mesin Bekas | Tidak terurai | penanganan-b3 | 500-1.500 (oleh pengepul khusus) | Didaur ulang jadi BBM industri, pelumas再生 |
| 44 | pestisida-bekas | Pestisida/Herbisida Bekas | Bervariasi | penanganan-b3 | Tidak dijual | Dimusnahkan di fasilitas B3 |
| 45 | kaleng-aerosol | Kaleng Aerosol Bekas | 50+ tahun | penanganan-b3 | Tidak dijual | Dikosongkan, logam didaur ulang |
| 46 | elektronik-rusak | Elektronik Bekas (E-waste) | 100+ tahun | penanganan-b3 | 1.000-5.000 (tergantung jenis) | Recovery emas, tembaga, logam langka |

### G. Kategori Residu (5 item)

| # | ID | Nama | Lama Terurai | Proses | Harga/Kg | Hasil Olahan |
|---|---|---|---|---|---|---|
| 47 | popok-bayi | Popok Bayi/Pembalut | 500 tahun | null (residu) | Tidak diterima | — (residu, menuju TPA) |
| 48 | pembalut | Pembalut Wanita Bekas | 500+ tahun | null (residu) | Tidak diterima | — (residu, menuju TPA) |
| 49 | sedotan-residu | Sedotan Plastik (campuran) | 200 tahun | null (residu) | Tidak diterima | — (residu) |
| 50 | tissue-terkontaminasi | Tissue Terkontaminasi/Minyak | 2-3 bulan (tapi tercampur plastik) | null (residu) | Tidak diterima | — (residu, terkontaminasi) |
| 51 | rokok-filter | Filter Rokok/Sampoing | 10-12 tahun | null (residu) | Tidak diterima | — (residu, mengandung racun) |

**Total: 51 item**

---

## 5. Master Data: 8 Proses Pengolahan

### 5.1 Pengomposan (organik)
- **Langkah**: Pisahkan sampah organik → Cacah/agunkan kecil-kecil → Campur dengan tanah/EM4 (1:100) → Masukkan ke komposter/lingkungan → Diamkan 2-4 minggu → Aduk berkala (setiap 2-3 hari) → Kompos matang, siap pakai
- **Hasil**: Kompos padat untuk pupuk tanaman, atau kompos cair (larutkan 1kg kompos + 10L air + 100ml molase, fermentasi 1 minggu)
- **Sumber**: EM4 Indonesia (emindonesia.com), DLH Buleleng, ejournal.akprind.ac.id

### 5.2 Daur Ulang Plastik (anorganik - plastik)
- **Langkah**: Kumpulkan → Pilah jenis (PET/HDPE/PP/LDPE) → Cuci bersih → Cacah jadi serpihan (flake) → Keringkan → Lebur di extruder (160-280°C) → Cetak jadi pellet/bijih plastik → Dapat dibentuk jadi produk baru
- **Hasil**: Biji plastik/pellet, serat poliester, botol baru
- **Sumber**: Waste4Change, Sucofindo, Detik News

### 5.3 Daur Ulang Kertas (anorganik - kertas)
- **Langkah**: Kumpulkan kertas bekas → Pilah jenis (HVS/koran/kardus) → Rendam dalam air 12-24 jam → Blender/haluskan jadi bubur kertas (pulp) → Tambahkan bahan kimia (H₂O₂, NaOH) untuk de-inking → Saring dan cetak di screen → Tekan dan keringkan → Kertas baru siap
- **Hasil**: Kertas daur ulang, kartu nama, kardus telur, kertas kraft
- **Sumber**: wikiHow Indonesia, ARAH Environmental, Universal Eco

### 5.4 Daur Ulang Kaca (anorganik - kaca)
- **Langkah**: Kumpulkan botol/kaca bekas → Pilah berdasarkan warna (hijau, cokelat, bening) → Hancurkan jadi pecahan kecil (cullet) → Cuci bersih → Lebur di tungku suhu tinggi (~1.500°C) → Cetak/jadikan produk baru
- **Hasil**: Botol kaca baru, wadah kaca, pecahan kaca untuk bahan bangunan
- **Sumber**: Wikipedia Daur Ulang Kaca, Scribd, ruishengglassco.com

### 5.5 Pembuatan Ecobrick (anorganik - plastik)
- **Langkah**: Siapkan botol plastik bersih dan kering → Kumpulkan sampah plastik bersih (kantong, sachet, wrapper) → Potong kecil-kecil → Masukkan ke dalam botol, padatkan dengan tongkat → Isi hingga penuh dan keras → Ecobrick siap digunakan sebagai bahan bangunan
- **Hasil**: Bahan bangunan modular (dinding, kursi, taman), solusi untuk plastik non-daftar
- **Sumber**: agriculture.unib.ac.id, ecobrick.org

### 5.6 Pembuatan Paving Block dari Plastik (anorganik - plastik)
- **Langkah**: Kumpulkan dan cacah sampah plastik → Panaskan/dilelehkan → Campurkan dengan pasir (rasio 1:3 plastik:pasir) → Tuang ke cetakan paving block → Tekan dan keringkan → Paving block siap
- **Hasil**: Paving block ramah lingkungan untuk jalan setapak, halaman, drainase
- **Sumber**: ITB, ejournal.utp.ac.id, journal.nurscienceinstitute.id

### 5.7 Pirolisis Plastik → BBM (anorganik - plastik)
- **Langkah**: Kumpulkan dan cacah sampah plastik (PP/PE/PS paling ideal) → Masukkan ke reaktor pirolisis → Panaskan tanpa oksigen pada suhu 300-500°C → Plastik menguap menjadi gas hidrokarbon → Gas dialirkan ke kondensor → Didinginkan → Mengembun jadi cairan (BBM) → Saring → BBM siap (setara bensin RON 92 atau solar non-subsidi)
- **Rasio**: ~10 kg plastik → ~8-12 liter BBM
- **Hasil**: Bensin (fraksi ringan), solar (fraksi menengah), lilin/residu (fraksi berat)
- **Sumber**: Identif.id, BBC Indonesia, USU, Beston Group, jurnal Unimal

### 5.8 Penanganan B3 (B3)
- **Langkah**: Identifikasi dan pisahkan limbah B3 dari sampah rumah tangga biasa → Simpan di wadah tertutup dan diberi label → Jangan campur dengan sampah lain → Simpan di tempat khusus yang terlindung dari anak-anak → Serahkan ke TPS B3 terdekat atau fasilitas pengelola B3 berlisensi (P3, bank sampah B3, DLH setempat) → Fasilitas akan melakukan pengujian karakteristik (TCLP) sebelum pengolahan akhir
- **Regulasi**: Permen LHK No. 6/2021, PP No. 22/2021
- **Hasil**: Recovery logam berharga, pemanfaatan energi, treatment & disposal aman
- **Sumber**: Greenlab Indonesia, Halodoc, DLH Jawa Tengah, DLH DKI Jakarta

---

## 6. Sistem Warna (Design Token — Tailwind)

Color-coding konsisten per kategori sampah, dipakai di badge, header detail, ikon:

| Kategori | Tailwind Class | Hex | Contoh Penggunaan |
|---|---|---|---|
| Organik | `bg-green-500`, `text-green-700` | `#22c55e` | Badge, header detail, ikon daun |
| Anorganik | `bg-blue-500`, `text-blue-700` | `#3b82f6` | Badge, header detail, ikon daur ulang |
| B3 | `bg-red-500`, `text-red-700` | `#ef4444` | Badge, header detail, ikon peringatan |
| Residu | `bg-gray-400`, `text-gray-600` | `#9ca3af` | Badge, header detail, ikon tempat sampah |

Didefinisikan sekali di `tailwind.config.js`, di-reuse lewat class — bukan hex hardcode di tiap komponen.

---

## 7. Struktur Routing (App Router)

```
app/
├── page.js                     → Beranda (hero, statistik cepat, navigasi ke fitur utama)
├── layout.js                   → Root layout (nav, footer)
├── not-found.js                → Halaman 404 kustom (→ 404.html di Netlify)
├── error.js                    → Error boundary root
├── jenis-sampah/
│   ├── page.js                 → List semua item (filter kategori, client component, pagination 12/halaman)
│   ├── [slug]/page.js          → Detail 1 item (generateStaticParams dari semua id)
│   ├── layout.js               → Layout khusus section jenis sampah
│   └── error.js                → Error boundary section
├── cara-olah/
│   ├── page.js                 → List proses pengolahan
│   ├── [slug]/page.js          → Detail 1 proses
│   └── error.js
├── konsep-5r/page.js           → Penjelasan 5R (5 kartu prinsip + detail)
├── kuis/page.js                 → Kuis interaktif (client component, localStorage)
├── game/page.js                 → Game lempar sampah (client component, physics-based)
├── tentang/page.js              → Statis, profil KKN (dummy)
└── sitemap.js                   → Generate sitemap.xml

lib/
├── getData.js                   → Fungsi baca & validasi semua JSON + lookup helper
├── constants.js                 → Design tokens, kategori, helper
└── metadata.js                  → SEO metadata generator

components/
├── WasteCard.js                 → Server, kartu ringkas di list
├── WasteDetail.js               → Server, layout detail item
├── ProsesCard.js                → Server, kartu proses
├── ProsesDetail.js              → Server, layout detail proses
├── CategoryBadge.js             → Server, badge warna reusable
├── FilterBar.js                 → Client ("use client"), filter kategori
├── PrinsipCard.js               → Server, kartu 5R
├── Pagination.js                → Client, navigasi halaman
├── QuizContainer.js             → Client, state kuis (index, skor, localStorage)
├── QuizQuestion.js              → Client, sub-komponen soal
├── QuizResult.js                → Client, sub-komponen hasil
├── GameCanvas.js                → Client, game lempar sampah
├── Navbar.js                    → Server/Client, navigasi
└── Footer.js                    → Server, footer

scripts/
├── validate-data.js             → Validasi semua JSON + cross-reference
└── download-images.js           → Script download & kompres gambar dari URL

public/
├── images/
│   ├── waste/                   → Gambar per jenis sampah (51 file)
│   ├── proses/                  → Gambar per proses (8 file)
│   └── general/                 → Gambar umum (hero, 5R, kuis, game)
```

---

## 8. Komponen Inti

| Komponen | Tipe | Fungsi |
|---|---|---|
| `WasteCard` | Server | Kartu ringkas di list (foto, nama, badge kategori, lama terurai) |
| `WasteDetail` | Server | Layout detail item (deskripsi, lama terurai, hasil olahan, cuan, link ke proses) |
| `ProsesCard` | Server | Kartu proses (judul, kategori, preview langkah) |
| `ProsesDetail` | Server | Layout detail proses (langkah lengkap, hasil akhir, referensi) |
| `CategoryBadge` | Server | Badge warna reusable, terima prop kategori |
| `FilterBar` | Client (`"use client"`) | Filter kategori di halaman list + URL search params |
| `Pagination` | Client (`"use client"`) | Navigasi halaman untuk list 50+ item (12/halaman) |
| `PrinsipCard` | Server | Kartu untuk tiap prinsip 5R (judul, deskripsi, contoh) |
| `QuizContainer` | Client | State: index soal aktif, skor, jawaban user, localStorage |
| `QuizQuestion` | Client | Sub-komponen kuis (opsi A/B/C/D, feedback benar/salah) |
| `QuizResult` | Client | Sub-komponen kuis (skor akhir, skor tertinggi dari localStorage, ulangi) |
| `GameCanvas` | Client | Game lempar sampah — physics-based drag & release + fallback non-gesture |

---

## 9. Fitur Interaktif — Detail Teknis

### Kuis (15-20 soal)
- Client-side state (`useState`), skor dihitung real-time
- **Skor disimpan di localStorage**: skor tertinggi per sesi, riwayat 5 skor terakhir
- Soal di-randomize urutannya setiap sesi
- Topik: klasifikasi sampah, waktu terurai, konsep 5R, proses daur ulang, harga sampah

### Game — Lempar Sampah ke Tempat Sampah (Basketball-style)
Mekanik: drag objek sampah, lepas dengan velocity dari gesture → objek bergerak dengan trajectory parabola (physics), bukan drag-drop linear biasa.

**Pendekatan**: custom lightweight physics (bukan library seperti Matter.js) — dihitung manual pakai `requestAnimationFrame` dengan rumus gerak proyektil:
```
posisi(t) = posisi_awal + kecepatan_awal * t + 0.5 * gravitasi * t²
```

**Hal yang perlu ditangani saat implementasi:**
1. **Input terpadu**: pakai Pointer Events API (`pointerdown/pointermove/pointerup`) — unifikasi mouse & touch
2. **Velocity calculation**: sampling 3-5 titik terakhir (~100ms sebelum release) dan dirata-ratakan
3. **Collision detection**: deteksi objek "masuk" ke tempat sampah; waspada tunneling di device frame rate rendah
4. **Aksesibilitas fallback**: tombol pilih kategori sampah + tombol "Lempar" dengan arah preset. Pengguna yang tidak bisa drag tetap bisa bermain.

**Prioritas build**: dikerjakan PALING TERAKHIR, setelah semua konten edukasi + 5R + kuis selesai.

---

## 10. SEO & Metadata

Setiap `page.js` wajib export `metadata`:
```javascript
export const metadata = {
  title: 'Jenis Sampah: Botol Plastik PET | Edukasi Sampah',
  description: 'Botol plastik PET membutuhkan 450 tahun untuk terurai. Pelajari cara daur ulang, hasil olahan, dan harga jualnya.',
  openGraph: {
    title: '...',
    description: '...',
    images: ['/images/waste/botol-pet.webp'],
  }
};
```

`app/sitemap.js` generate sitemap otomatis dari semua waste items dan proses.

---

## 11. Responsive Design (Mobile-First)

- **Mobile (< 640px)**: 1 kolom card, hamburger menu, game fallback non-gesture
- **Tablet (640-1024px)**: 2 kolom card, filter bar sticky
- **Desktop (> 1024px)**: 3 kolom card, sidebar filter, game full gesture

Semua komponen dibangun mobile-first, lalu di-enhance untuk breakpoint lebih besar.

---

## 12. Katalog Gambar (Hasil Riset Image Search)

> **Catatan**: URL di bawah ini adalah OSS-hosted URL yang stabil. Saat implementasi, download gambar, konversi ke `.webp`, resize ke ~400px wide, simpan di `/public/images/`.

### Gambar Kategori (untuk halaman list/hero)

| Kegunaan | URL Sumber | Format Target |
|---|---|---|
| Ilustrasi sampah plastik | `https://sfile.chatglm.cn/images-ppt/0b87d31b7e5d.jpg` | `plastic-bottle.webp` |
| Ilustrasi sampah organik | `https://sfile.chatglm.cn/images-ppt/7c3c094963fa.jpg` | `organic-waste.webp` |
| Ilustrasi sampah logam | `https://sfile.chatglm.cn/images-ppt/b24a7bc57c0c.jpg` | `metal-waste.webp` |
| Ilustrasi sampah kaca | `https://sfile.chatglm.cn/images-ppt/18000eb272d5.jpg` | `glass-waste.webp` |
| Ilustrasi sampah B3 | `https://sfile.chatglm.cn/images-ppt/7e14bab3dfd1.jpg` | `b3-waste.webp` |
| Ilustrasi sampah residu | `https://sfile.chatglm.cn/images-ppt/2cbcbb1cfd44.jpg` | `residu-waste.webp` |
| Ilustrasi konsep 5R | `https://sfile.chatglm.cn/images-ppt/1d31ab0f7900.png` | `konsep-5r.webp` |
| Ilustrasi kertas | `https://sfile.chatglm.cn/images-ppt/411d991c6382.jpg` | `paper-waste.webp` |

### Gambar Proses Pengolahan

| Kegunaan | URL Sumber | Format Target |
|---|---|---|
| Proses pengomposan | `https://sfile.chatglm.cn/images-ppt/480070e1d237.jpg` | `pengomposan.webp` |
| Daur ulang plastik | `https://sfile.chatglm.cn/images-ppt/994ca691d315.jpg` | `daur-ulang-plastik.webp` |
| Daur ulang kertas | `https://sfile.chatglm.cn/images-ppt/ddd0f1051bd9.jpg` | `daur-ulang-kertas.webp` |
| Daur ulang kaca | `https://sfile.chatglm.cn/images-ppt/6f86477a97b5.jpg` | `daur-ulang-kaca.webp` |
| Ecobrick | `https://sfile.chatglm.cn/images-ppt/e862b9b51f6c.jpg` | `ecobrick.webp` |
| Paving block | `https://sfile.chatglm.cn/images-ppt/f1cc4136283a.jpg` | `paving-block.webp` |
| Pirolisis → BBM | `https://sfile.chatglm.cn/images-ppt/325776d6996d.jpg` | `pirolisis-bbm.webp` |
| Penanganan B3 | `https://sfile.chatglm.cn/images-ppt/b661e81dd48c.jpg` | `penanganan-b3.webp` |

### Gambar Fitur Interaktif

| Kegunaan | URL Sumber | Format Target |
|---|---|---|
| Ilustrasi kuis/edukasi | `https://sfile.chatglm.cn/images-ppt/89bf59dc1813.png` | `quiz-illustration.webp` |
| Ilustrasi game | `https://sfile.chatglm.cn/images-ppt/86a79514e264.jpg` | `game-illustration.webp` |

> **Untuk gambar per-item (51 file)**: perlu dicari individual saat implementasi dengan keyword spesifik (contoh: "kulit pisang isolated", "kaleng aluminium crushed", dll). Gambar kategori di atas bisa sebagai fallback.

---

## 13. Referensi Data (Sumber)

### Waktu Terurai
1. IndonesiaBaik.id — "Berapa Lama Sampah Plastik Bisa Terurai?"
2. DLH Provinsi Lampung — "Berapa Lama Sampah Terurai"
3. Waste4Change — "Mengapa Sampah Organik dan Anorganik Dibedakan Berdasarkan Waktu Terurai"
4. Human Initiative — "Berapa Lama Sampah di Rumah Kita Dapat Terurai?"
5. DLH DKI Jakarta (Facebook) — Infografis Waktu Terurai
6. Jurnal UII — "Pemanfaatan Limbah Plastik PS (Polystyrene) Jenis Styrofoam"

### Harga Sampah
1. Bank Sampah Induk Kota Mojokerto — Daftar Harga Januari 2025
2. Bank Sampah Induk Kota Bandung — Daftar Harga Mei 2025
3. Bank Sampah Bantul — Daftar Harga
4. Bank Sampah Indonesia (banksampahindonesia.com)
5. Bank Sampah Horas Bah — Daftar Harga Sampah
6. Bank Sampah Darling — Daftar Harga
7. Gerakan Asri — "Daftar Harga Sampah Plastik per Kg Terkini di Indonesia" (Maret 2026)
8. ANTARA News — "Bank Sampah: Harga Sampah Plastik Turun"

### Proses Pengolahan
1. EM4 Indonesia — "Membuat Sampah Menjadi Kompos Dengan EM4"
2. Waste4Change — "Daur Ulang Sampah: Pengertian, Tujuan, Contoh"
3. Sucofindo — "5 Cara Kreatif Mengolah Sampah yang Bisa Mendatangkan Cuan"
4. ARAH Environmental — "Bagaimana Proses Daur Ulang Kertas?"
5. Universal Eco — "Proses Daur Ulang Sampah Kertas"
6. Wikipedia ID — "Daur Ulang Kaca"
7. Identif.id — "Olah 10 Kg Plastik Jadi 12 Liter BBM via Pirolisis"
8. BBC Indonesia — "Membuat BBM dari Sampah Plastik di Cimahi"
9. USU — "Mengubah Limbah Plastik Menjadi Energi: Inovasi Pirolisis"
10. Greenlab Indonesia — "Baterai Bekas, Lampu Neon, dan Kaleng Cat Termasuk Limbah B3"
11. DLH Jawa Tengah — "Penanganan Sampah B3 Rumah Tangga"

### Klasifikasi Sampah
1. Waste4Change — "Pengertian Sampah & Jenis-Jenisnya"
2. Gramedia — "Mengenal Contoh Sampah Residu"
3. SMAN 15 Tanjung Jabung Barat — "Yuk, Mengenal 5 Jenis Sampah"

---

## 14. Urutan Pengerjaan (Build Order)

1. Setup project (Next.js 16, Tailwind, struktur folder, `next.config.js`, `netlify.toml`, `tailwind.config.js`)
2. `lib/getData.js` + skema data + `scripts/validate-data.js`
3. Data dummy (3 item) untuk validasi struktur
4. Komponen inti: `CategoryBadge`, `WasteCard`, `FilterBar`, `Pagination`
5. Halaman konten: Beranda, Jenis Sampah (list + detail), Cara Olah (list + detail)
6. Halaman Konsep 5R
7. Isi data lengkap (51 item + 8 proses) — batch berdasarkan kategori
8. Kuis interaktif (15-20 soal) + localStorage
9. Halaman Tentang (dummy KKN)
10. SEO: metadata di setiap halaman + sitemap.xml
11. Responsive polish + testing mobile
12. Halaman 404 + error boundaries
13. **Game lempar sampah (physics-based) — terakhir**

---

## 15. Konten Dummy Halaman "Tentang"

```
Tentang Kami — Edukasi Sampah KKN

Website ini merupakan bagian dari program Kuliah Kerja Nyata (KKN)
yang bertujuan untuk meningkatkan kesadaran masyarakat tentang
pentingnya pengelolaan sampah yang benar.

Tim Kami:
- [Nama Mahasiswa 1] — Teknik Informatika
- [Nama Mahasiswa 2] — Teknik Lingkungan
- [Nama Mahasiswa 3] — Desain Komunikasi Visual
- [Nama Mahasiswa 4] — Kesehatan Masyarakat

Dosen Pembimbing: [Nama Dosen Pembimbing]

Universitas: [Nama Universitas]
Tahun Pelaksanaan: 2025

Kontak: [email/telepon]
Lokasi KKN: [Nama Desa/Kelurahan, Kecamatan, Kabupaten/Kota]
```

> **Catatan**: Konten di atas adalah dummy. Tim KKN perlu mengisi data asli sebelum deploy.

---

## 16. Konfigurasi Deploy (Netlify)

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

Pastikan `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

---

## 17. Performa & Optimasi

- Semua gambar: format `.webp`, resolusi maks 400px wide, lazy loading
- Font: gunakan `next/font` dengan subset yang diperlukan saja
- Pagination: 12 item per halaman untuk list
- Total estimasi ukuran gambar: 51 item × 30KB + 8 proses × 30KB + 10 gambar umum × 40KB ≈ **2.3MB**
- Target Lighthouse Performance: > 90