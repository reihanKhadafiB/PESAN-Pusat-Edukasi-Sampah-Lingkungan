'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

export default function WasteCard({ item, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="block group h-full"
    >
      <Link href={`/jenis-sampah/${item.id}`} className="block h-full">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
          <div className="relative h-56 w-full bg-gray-50 flex-shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image 
              src={item.gambar} 
              alt={item.nama} 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow relative">
            <div className="absolute -top-6 right-6 z-20">
              <CategoryBadge kategori={item.kategoriUtama} />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2 mt-2 group-hover:text-green-600 transition-colors">{item.nama}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
              {item.deskripsiSingkat}
            </p>
            <div className="flex items-center text-xs font-semibold text-gray-400 bg-gray-50 p-2 rounded-lg mt-auto">
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              Waktu urai: {item.lamaTerurai.min} {item.lamaTerurai.min !== item.lamaTerurai.max ? `- ${item.lamaTerurai.max}` : ''} {item.lamaTerurai.satuan}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
