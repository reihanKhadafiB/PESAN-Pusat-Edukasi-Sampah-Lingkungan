import { getAllWasteItems, getWasteItemById } from '../../../lib/getData';
import { notFound } from 'next/navigation';
import JenisSampahDetailClient from '../../../components/JenisSampahDetailClient';

export async function generateStaticParams() {
  const items = getAllWasteItems();
  return items.map((item) => ({
    slug: item.id,
  }));
}

export async function generateMetadata({ params }) {
  // await params is required in next 15+ but next 16 also usually requires async params
  const { slug } = await params;
  const item = getWasteItemById(slug);
  
  if (!item) return { title: 'Not Found' };
  
  return {
    title: `${item.nama} | PESAN`,
    description: item.deskripsiSingkat,
  };
}

export default async function JenisSampahDetail({ params }) {
  const { slug } = await params;
  const item = getWasteItemById(slug);

  if (!item) {
    notFound();
  }

  return <JenisSampahDetailClient item={item} />;
}
