const fs = require('fs');
const https = require('https');
const path = require('path');

const wasteDir = path.join(__dirname, '../data/waste-items');
const publicWasteDir = path.join(__dirname, '../public/images/waste');

const generatedImages = [
  'botol-pet', 'kardus', 'sisa-makanan', 'kulit-pisang', 
  'kaleng-aluminium', 'botol-kaca', 'baterai-bekas', 
  'kantong-plastik', 'popok-bayi', 'kertas-hvs',
  'aluminium-foil', 'ampas-kopi', 'besi-baja', 'buku-bekas'
];

// Mapping of remaining waste items to English Wikipedia search terms
const keywordMap = {
  'cangkang-telur': 'Eggshell',
  'cat-thinner': 'Paint thinner',
  'cermin-kaca': 'Broken mirror',
  'daun-kering': 'Dead leaves',
  'elektronik-rusak': 'Electronic waste',
  'ember-jerigen': 'Jerrycan',
  'gelas-plastik': 'Plastic cup',
  'kabel-tembaga': 'Copper wire',
  'kain-katun': 'Rag (textile)',
  'kaleng-aerosol': 'Aerosol spray',
  'kaleng-besi': 'Tin can',
  'kertas-krep': 'Crepe paper',
  'kertas-tisu': 'Facial tissue',
  'koran': 'Newspaper',
  'kulit-jeruk': 'Orange peel',
  'lampu-neon': 'Fluorescent lamp',
  'mainan-plastik': 'Plastic toy',
  'nasi-basi': 'Cooked rice',
  'obat-kadaluarsa': 'Expired medication',
  'oli-bekas': 'Waste oil',
  'paku-kawat': 'Nail (fastener)',
  'pecahan-kaca': 'Broken glass',
  'pembalut': 'Sanitary napkin',
  'pestisida-bekas': 'Pesticide',
  'plastik-keras': 'Hard plastic',
  'ranting-kayu': 'Twig',
  'rokok-filter': 'Cigarette filter',
  'sachet-kemasan': 'Sachet',
  'sayuran-busuk': 'Vegetable waste',
  'sedotan-plastik': 'Drinking straw',
  'sedotan-residu': 'Plastic straw',
  'sisa-ikan': 'Fish bone',
  'styrofoam': 'Polystyrene',
  'tissue-terkontaminasi': 'Paper towel',
  'toples-kaca': 'Glass jar',
  'tulang-ayam': 'Chicken bone',
  'tutup-botol': 'Bottle cap'
};

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'EdukasiSampahApp/1.0' } }, (response) => {
      // Follow redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, { headers: { 'User-Agent': 'EdukasiSampahApp/1.0' } }, (res) => {
          res.pipe(file);
          file.on('finish', () => file.close(resolve));
        }).on('error', reject);
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const fetchWikiImage = (keyword) => {
  return new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(keyword)}&prop=pageimages&piprop=original&format=json&gsrlimit=1`;
    
    https.get(url, { headers: { 'User-Agent': 'EdukasiSampahApp/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = Object.values(json.query.pages);
            if (pages.length > 0 && pages[0].original) {
              resolve(pages[0].original.source);
              return;
            }
          }
          resolve(null); // No image found
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
};

async function main() {
  const files = fs.readdirSync(wasteDir);
  let successCount = 0;

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(wasteDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      if (!generatedImages.includes(data.id) && keywordMap[data.id]) {
        console.log(`Fetching image for ${data.id}...`);
        try {
          const imageUrl = await fetchWikiImage(keywordMap[data.id]);
          if (imageUrl) {
            // Save as webp extension for consistency, although mime type will be whatever wikipedia returns (jpg/png)
            // Browsers don't care about extension as long as content is valid image
            const destPath = path.join(publicWasteDir, `${data.id}.webp`);
            await download(imageUrl, destPath);
            
            // Revert JSON to webp just in case it was svg
            data.gambar = `/images/waste/${data.id}.webp`;
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            
            console.log(`✅ Downloaded ${data.id}`);
            successCount++;
          } else {
            console.log(`❌ No image found for ${data.id}`);
          }
        } catch (e) {
          console.error(`Error processing ${data.id}:`, e.message);
        }
      }
    }
  }
  
  console.log(`Successfully fetched and applied ${successCount} images from Wikipedia!`);
}

main();
