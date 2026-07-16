import { KATEGORI_SAMPAH } from '../lib/constants';

export default function CategoryBadge({ kategori, className = '' }) {
  const badgeInfo = KATEGORI_SAMPAH[kategori];

  if (!badgeInfo) return null;

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${badgeInfo.color} ${className}`}>
      {badgeInfo.label}
    </span>
  );
}
