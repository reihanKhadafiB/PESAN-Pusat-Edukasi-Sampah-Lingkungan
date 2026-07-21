const fs = require('fs');
const path = require('path');

const sourceDir = '/home/reihankhadafi/.gemini/antigravity/brain/0d0a3347-43c4-4470-be08-b14ae418435c';
const destDir = path.join(__dirname, 'public/images/proses');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = [
  { prefix: 'proses_gantungan_kunci_', newName: 'gantungan-kunci.png' },
  { prefix: 'proses_sabun_jelantah_', newName: 'sabun-jelantah.png' },
  { prefix: 'proses_komposter_galon_', newName: 'komposter-galon.png' },
  { prefix: 'proses_ecobrick_', newName: 'ecobrick.png' }
];

let copied = 0;
files.forEach(f => {
  const filesFound = fs.readdirSync(sourceDir).filter(name => name.startsWith(f.prefix) && name.endsWith('.png'));
  if (filesFound.length > 0) {
    const sourcePath = path.join(sourceDir, filesFound[0]);
    const destPath = path.join(destDir, f.newName);
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Berhasil mengkopi: ${f.newName}`);
    copied++;
  }
});

if(copied === 0) {
  console.log('Tidak ada gambar baru yang ditemukan untuk dicopy.');
} else {
  console.log(`Sukses memindahkan ${copied} gambar ke folder public/images/proses/!`);
}
