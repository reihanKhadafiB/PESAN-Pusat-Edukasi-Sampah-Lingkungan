const fs = require('fs');
const path = require('path');

const sourceDir = '/home/reihankhadafi/.gemini/antigravity/brain/0d0a3347-43c4-4470-be08-b14ae418435c';
const destDir = path.join(__dirname, 'public/images/waste');

const files = [
  { prefix: 'paku_kawat_bekas_', newName: 'paku-kawat-new.png' },
  { prefix: 'pecahan_kaca_', newName: 'pecahan-kaca-new.png' },
  { prefix: 'sachet_kemasan_', newName: 'sachet-kemasan-new.png' },
  { prefix: 'sedotan_plastik_', newName: 'sedotan-plastik-new.png' },
  { prefix: 'styrofoam_eps_', newName: 'styrofoam-new.png' },
  { prefix: 'toples_kaca_', newName: 'toples-kaca-new.png' },
  { prefix: 'tutup_botol_', newName: 'tutup-botol-new.png' },
  { prefix: 'pestisida_bekas_', newName: 'pestisida-bekas-new.png' },
  { prefix: 'sedotan_residu_', newName: 'sedotan-residu-new.png' },
  { prefix: 'tissue_kotor_', newName: 'tissue-terkontaminasi-new.png' }
];

files.forEach(f => {
  const filesFound = fs.readdirSync(sourceDir).filter(name => name.startsWith(f.prefix) && name.endsWith('.png'));
  if (filesFound.length > 0) {
    const sourcePath = path.join(sourceDir, filesFound[0]);
    const destPath = path.join(destDir, f.newName);
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${filesFound[0]} to ${f.newName}`);
  }
});
