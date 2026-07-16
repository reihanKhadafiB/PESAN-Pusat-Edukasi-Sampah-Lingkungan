const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const { image_search } = require('duckduckgo-images-api');

const wasteDir = path.join(__dirname, '../data/waste-items');
const publicWasteDir = path.join(__dirname, '../public/images/waste');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    
    // Some basic headers to mimic browser
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      timeout: 5000
    };

    const req = client.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 308) {
        req.destroy();
        if (response.headers.location) {
           return download(response.headers.location, dest).then(resolve).catch(reject);
        } else {
           return reject(new Error('Redirect with no location'));
        }
      }
      if (response.statusCode !== 200) {
         req.destroy();
         return reject(new Error(`Status Code: ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
};

async function fetchImageForKeyword(keyword, destPath) {
  try {
    const results = await image_search({ query: keyword, moderate: true });
    if (results && results.length > 0) {
       for(let i = 0; i < Math.min(5, results.length); i++) {
         try {
           const imageUrl = results[i].image;
           await download(imageUrl, destPath);
           return true; // Success
         } catch(e) {
           // try next image
         }
       }
    }
  } catch(e) {
     console.error(e);
  }
  return false;
}

async function main() {
  const files = fs.readdirSync(wasteDir);
  let successCount = 0;

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(wasteDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // If it still points to .svg, we need to replace it
      if (data.gambar && data.gambar.endsWith('.svg')) {
         console.log(`Fetching DDG image for ${data.id}...`);
         
         const destPath = path.join(publicWasteDir, `${data.id}.webp`);
         // Clean search term
         const searchTerm = data.nama + " trash";
         
         const success = await fetchImageForKeyword(searchTerm, destPath);
         if (success) {
            data.gambar = `/images/waste/${data.id}.webp`;
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`✅ Downloaded ${data.id}`);
            successCount++;
         } else {
            console.log(`❌ Failed to get image for ${data.id}`);
         }
         
         // Add artificial delay to avoid rate limiting from DuckDuckGo
         await new Promise(r => setTimeout(r, 500));
      }
    }
  }
  
  console.log(`Successfully fetched and applied ${successCount} missing images via DuckDuckGo!`);
}

main();
