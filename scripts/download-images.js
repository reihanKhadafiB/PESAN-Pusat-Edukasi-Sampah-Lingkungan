const fs = require('fs');
const https = require('https');
const path = require('path');

const publicDir = path.join(__dirname, '../public/images');

const imageMap = {
  // Kategori Fallbacks
  'plastic-bottle.webp': 'https://sfile.chatglm.cn/images-ppt/0b87d31b7e5d.jpg',
  'organic-waste.webp': 'https://sfile.chatglm.cn/images-ppt/7c3c094963fa.jpg',
  'metal-waste.webp': 'https://sfile.chatglm.cn/images-ppt/b24a7bc57c0c.jpg',
  'glass-waste.webp': 'https://sfile.chatglm.cn/images-ppt/18000eb272d5.jpg',
  'b3-waste.webp': 'https://sfile.chatglm.cn/images-ppt/7e14bab3dfd1.jpg',
  'residu-waste.webp': 'https://sfile.chatglm.cn/images-ppt/2cbcbb1cfd44.jpg',
  'paper-waste.webp': 'https://sfile.chatglm.cn/images-ppt/411d991c6382.jpg',
  // Umum
  'general/konsep-5r.webp': 'https://sfile.chatglm.cn/images-ppt/1d31ab0f7900.png',
  'general/quiz-illustration.webp': 'https://sfile.chatglm.cn/images-ppt/89bf59dc1813.png',
  'general/game-illustration.webp': 'https://sfile.chatglm.cn/images-ppt/86a79514e264.jpg',
  // Proses
  'proses/pengomposan.webp': 'https://sfile.chatglm.cn/images-ppt/480070e1d237.jpg',
  'proses/daur-ulang-plastik.webp': 'https://sfile.chatglm.cn/images-ppt/994ca691d315.jpg',
  'proses/daur-ulang-kertas.webp': 'https://sfile.chatglm.cn/images-ppt/ddd0f1051bd9.jpg',
  'proses/daur-ulang-kaca.webp': 'https://sfile.chatglm.cn/images-ppt/6f86477a97b5.jpg',
  'proses/ecobrick.webp': 'https://sfile.chatglm.cn/images-ppt/e862b9b51f6c.jpg',
  'proses/paving-block.webp': 'https://sfile.chatglm.cn/images-ppt/f1cc4136283a.jpg',
  'proses/pirolisis-bbm.webp': 'https://sfile.chatglm.cn/images-ppt/325776d6996d.jpg',
  'proses/penanganan-b3.webp': 'https://sfile.chatglm.cn/images-ppt/b661e81dd48c.jpg',
};

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
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

async function main() {
  console.log('Downloading base images...');
  for (const [filename, url] of Object.entries(imageMap)) {
    let dest;
    if (filename.includes('/')) {
      dest = path.join(publicDir, filename);
    } else {
      dest = path.join(publicDir, 'waste', filename);
    }
    
    if (!fs.existsSync(dest)) {
      try {
        await download(url, dest);
        console.log(`Downloaded ${filename}`);
      } catch (e) {
        console.error(`Failed to download ${filename}`);
      }
    }
  }

  console.log('Copying fallbacks to 51 waste items...');
  const wasteDir = path.join(__dirname, '../data/waste-items');
  const files = fs.readdirSync(wasteDir);
  
  files.forEach(f => {
    if (f.endsWith('.json')) {
      const data = JSON.parse(fs.readFileSync(path.join(wasteDir, f)));
      let sourceImage = 'residu-waste.webp';
      
      if (data.kategoriUtama === 'organik') sourceImage = 'organic-waste.webp';
      else if (data.kategoriUtama === 'b3') sourceImage = 'b3-waste.webp';
      else if (data.kategoriUtama === 'anorganik') {
        if (data.subKategori === 'plastik') sourceImage = 'plastic-bottle.webp';
        else if (data.subKategori === 'logam') sourceImage = 'metal-waste.webp';
        else if (data.subKategori === 'kaca') sourceImage = 'glass-waste.webp';
        else if (data.subKategori === 'kertas') sourceImage = 'paper-waste.webp';
      }

      const destPath = path.join(publicDir, 'waste', `${data.id}.webp`);
      const sourcePath = path.join(publicDir, 'waste', sourceImage);
      
      if (!fs.existsSync(destPath) && fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
      }
    }
  });
  
  console.log('All images are set up!');
}

main();
