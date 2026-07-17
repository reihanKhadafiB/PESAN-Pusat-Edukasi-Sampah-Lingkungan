'use client';

import { useState } from 'react';
import WasteCard from './WasteCard';
import FilterBar from './FilterBar';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_INFO = {
  organik: {
    title: "Sampah Organik",
    description: "Sampah organik adalah limbah yang berasal dari sisa-sisa makhluk hidup, baik tumbuhan maupun hewan, yang memiliki sifat mudah membusuk. Secara alami, sampah ini akan dihancurkan oleh mikroorganisme di tanah, mengembalikan nutrisi berharga ke bumi. Jika diolah dengan benar, sampah ini dapat diubah menjadi pupuk kompos atau pakan ternak (seperti maggot) yang memiliki nilai ekonomi tinggi.",
    bg: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-800",
    descText: "text-emerald-700"
  },
  anorganik: {
    title: "Sampah Anorganik",
    description: "Sampah anorganik sebagian besar berasal dari bahan sintetis atau olahan manusia, seperti plastik, kertas, kaca, dan logam. Sampah jenis ini sangat bandel dan membutuhkan waktu puluhan hingga ribuan tahun untuk bisa hancur di alam liar. Namun, sebagian besar sampah anorganik justru memiliki daya jual tinggi di bank sampah atau pengepul karena dapat dilebur dan didaur ulang menjadi produk baru.",
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-800",
    descText: "text-blue-700"
  },
  b3: {
    title: "Sampah B3",
    description: "Limbah B3 adalah kategori sampah yang sangat mengancam kesehatan manusia dan kelestarian ekosistem. Sampah ini mengandung bahan kimia beracun, mudah meledak, mudah terbakar, atau menularkan penyakit. Pantang hukumnya untuk membuang atau mengubur sampah ini sembarangan karena zatnya dapat meresap ke dalam air tanah yang kita minum.",
    bg: "bg-red-50 border-red-200",
    text: "text-red-800",
    descText: "text-red-700"
  },
  residu: {
    title: "Sampah Residu",
    description: "Sampah residu adalah sisa-sisa akhir dari aktivitas manusia yang sangat sulit, kotor, atau secara teknologi sudah tidak bernilai lagi untuk didaur ulang maupun dikomposkan. Karena sudah menemui jalan buntu dalam proses pengolahan, sampah ini adalah kandidat utama yang pada akhirnya akan dikirim dan ditumpuk di Tempat Pemrosesan Akhir (TPA).",
    bg: "bg-slate-100 border-slate-300",
    text: "text-slate-800",
    descText: "text-slate-700"
  }
};

export default function WasteListClient({ initialItems }) {
  const [activeCategory, setActiveCategory] = useState('organik');

  const filteredItems = initialItems.filter(item => item.kategoriUtama === activeCategory);

  return (
    <div>
      <FilterBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <AnimatePresence mode="wait">
        {CATEGORY_INFO[activeCategory] && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-8 p-5 sm:p-6 rounded-2xl border shadow-sm ${CATEGORY_INFO[activeCategory].bg}`}
          >
            <h3 className={`text-xl sm:text-2xl font-black mb-2 ${CATEGORY_INFO[activeCategory].text}`}>
              {CATEGORY_INFO[activeCategory].title}
            </h3>
            <p className={`font-medium leading-relaxed ${CATEGORY_INFO[activeCategory].descText}`}>
              {CATEGORY_INFO[activeCategory].description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500 text-lg">Belum ada data untuk kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <WasteCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
