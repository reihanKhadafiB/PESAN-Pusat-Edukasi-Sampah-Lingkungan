'use client';

import { KATEGORI_SAMPAH } from '../lib/constants';

export default function FilterBar({ activeCategory, onCategoryChange }) {
  const categories = Object.keys(KATEGORI_SAMPAH).map(key => ({
    id: key,
    label: KATEGORI_SAMPAH[key].label
  }));

  return (
    <div className="flex flex-wrap gap-2 mb-12">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id
            ? 'bg-green-600 text-white shadow-sm'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
