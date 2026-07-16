import { getAllProses, getProsesById } from '../../../lib/getData';
import { notFound } from 'next/navigation';
import CaraOlahDetailClient from '../../../components/CaraOlahDetailClient';

export async function generateStaticParams() {
  const prosesList = getAllProses();
  return prosesList.map((proses) => ({
    slug: proses.id,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const proses = getProsesById(slug);
  
  if (!proses) return { title: 'Not Found' };
  
  return {
    title: `${proses.judul} | PESAN`,
    description: proses.deskripsi,
  };
}

export default async function CaraOlahDetail({ params }) {
  const { slug } = await params;
  const proses = getProsesById(slug);

  if (!proses) {
    notFound();
  }

  return <CaraOlahDetailClient proses={proses} />;
}
