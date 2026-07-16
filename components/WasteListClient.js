'use client';

import { useState } from 'react';
import WasteCard from './WasteCard';
import FilterBar from './FilterBar';

export default function WasteListClient({ initialItems }) {
  const [activeCategory, setActiveCategory] = useState('semua');
  
  const filteredItems = activeCategory === 'semua' 
    ? initialItems 
    : initialItems.filter(item => item.kategoriUtama === activeCategory);

  return (
    <div>
      <FilterBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      
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
