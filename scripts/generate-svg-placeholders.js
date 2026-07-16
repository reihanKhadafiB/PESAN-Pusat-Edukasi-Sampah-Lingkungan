const fs = require('fs');
const path = require('path');

const wasteDir = path.join(__dirname, '../data/waste-items');
const publicWasteDir = path.join(__dirname, '../public/images/waste');

const generatedImages = [
  'botol-pet', 'kardus', 'sisa-makanan', 'kulit-pisang', 
  'kaleng-aluminium', 'botol-kaca', 'baterai-bekas', 
  'kantong-plastik', 'popok-bayi', 'kertas-hvs',
  'aluminium-foil', 'ampas-kopi', 'besi-baja', 'buku-bekas'
];

const categoryColors = {
  'organik': { start: '#22c55e', end: '#16a34a' }, // Green
  'anorganik': { start: '#3b82f6', end: '#2563eb' }, // Blue
  'b3': { start: '#ef4444', end: '#dc2626' }, // Red
  'residu': { start: '#6b7280', end: '#4b5563' } // Gray
};

function generateSVG(name, category) {
  const colors = categoryColors[category] || categoryColors['residu'];
  
  return `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" rx="16" />
  
  <!-- Subtle pattern -->
  <circle cx="50" cy="50" r="100" fill="#ffffff" opacity="0.05" />
  <circle cx="350" cy="250" r="150" fill="#ffffff" opacity="0.05" />
  <circle cx="200" cy="150" r="200" fill="#000000" opacity="0.05" />
  
  <text x="50%" y="45%" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="1">
    ${name.toUpperCase()}
  </text>
  
  <rect x="150" y="170" width="100" height="4" rx="2" fill="#ffffff" opacity="0.5" />
  
  <text x="50%" y="200" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="500" fill="#ffffff" opacity="0.8" text-anchor="middle" dominant-baseline="middle" letter-spacing="2">
    FOTO ILUSTRASI
  </text>
</svg>`;
}

function processFiles() {
  const files = fs.readdirSync(wasteDir);
  let processedCount = 0;

  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(wasteDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // If we didn't generate a real image for it
      if (!generatedImages.includes(data.id)) {
        // Create SVG
        const svgContent = generateSVG(data.nama, data.kategoriUtama);
        const svgPath = path.join(publicWasteDir, `${data.id}.svg`);
        fs.writeFileSync(svgPath, svgContent);
        
        // Update JSON to point to .svg
        data.gambar = `/images/waste/${data.id}.svg`;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        processedCount++;
      }
    }
  });
  
  console.log(`Successfully generated and applied ${processedCount} SVG placeholders!`);
}

processFiles();
