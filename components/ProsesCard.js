'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

export default function ProsesCard({ proses, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="block group h-full"
    >
      <Link href={`/cara-olah/${proses.id}`} className="block h-full">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transition-all duration-300 h-full flex flex-col relative">
          <div className="relative h-52 w-full bg-gray-50 flex-shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/10 z-10 group-hover:bg-transparent transition-colors duration-300" />
            <Image 
              src={proses.gambar} 
              alt={proses.judul} 
              fill
              className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-8 flex flex-col flex-grow">
            <div className="mb-4">
              <CategoryBadge kategori={proses.kategori} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{proses.judul}</h3>
            <p className="text-sm text-gray-600 mb-6 line-clamp-3 flex-grow leading-relaxed">
              {proses.deskripsi}
            </p>
            <div className="text-blue-600 font-bold text-sm inline-flex items-center mt-auto uppercase tracking-wide">
              Pelajari Langkahnya
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
