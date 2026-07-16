import { getAllWasteItems, getAllProses } from '../lib/getData';

export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://edukasisampah-kkn.netlify.app'; // Ganti dengan URL asli jika sudah ada

  const wasteItems = getAllWasteItems();
  const prosesList = getAllProses();

  const wasteUrls = wasteItems.map((item) => ({
    url: `${baseUrl}/jenis-sampah/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const prosesUrls = prosesList.map((proses) => ({
    url: `${baseUrl}/cara-olah/${proses.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/jenis-sampah`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cara-olah`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/konsep-3r`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kuis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/game`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...wasteUrls,
    ...prosesUrls,
  ];
}
