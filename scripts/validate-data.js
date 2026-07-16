const fs = require('fs');
const path = require('path');

const wasteDir = path.join(__dirname, '../data/waste-items');
const prosesDir = path.join(__dirname, '../data/proses');

function validate() {
  console.log('Validating data...');
  let errors = 0;

  // 1. Check if directories exist
  if (!fs.existsSync(wasteDir) || !fs.existsSync(prosesDir)) {
    console.error('Data directories missing.');
    return;
  }

  const wasteFiles = fs.readdirSync(wasteDir).filter(f => f.endsWith('.json'));
  const prosesFiles = fs.readdirSync(prosesDir).filter(f => f.endsWith('.json'));

  // Get all valid proses IDs
  const validProsesIds = new Set(prosesFiles.map(f => f.replace('.json', '')));

  // 2. Validate waste items
  wasteFiles.forEach(file => {
    const filePath = path.join(wasteDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Check required fields
      const required = ['id', 'nama', 'kategoriUtama', 'lamaTerurai'];
      required.forEach(field => {
        if (!data[field]) {
          console.error(`[${file}] Missing required field: ${field}`);
          errors++;
        }
      });

      // Check cross-reference
      if (data.prosesId && !validProsesIds.has(data.prosesId)) {
        console.error(`[${file}] Invalid prosesId reference: ${data.prosesId}`);
        errors++;
      }

      // Check min <= max for lamaTerurai
      if (data.lamaTerurai && data.lamaTerurai.min > data.lamaTerurai.max) {
         console.error(`[${file}] lamaTerurai min is greater than max`);
         errors++;
      }

    } catch (e) {
      console.error(`[${file}] Invalid JSON format`);
      errors++;
    }
  });

  if (errors > 0) {
    console.error(`Validation failed with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log('Validation passed successfully!');
  }
}

validate();
