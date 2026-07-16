import fs from 'fs';
import path from 'path';

const wasteItemsDirectory = path.join(process.cwd(), 'data/waste-items');
const prosesDirectory = path.join(process.cwd(), 'data/proses');

export function getAllWasteItems() {
  if (!fs.existsSync(wasteItemsDirectory)) return [];
  const fileNames = fs.readdirSync(wasteItemsDirectory);
  const allData = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      const fullPath = path.join(wasteItemsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(fileContents);
    });
  return allData;
}

export function getWasteItemById(id) {
  const fullPath = path.join(wasteItemsDirectory, `${id}.json`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}

export function getAllProses() {
  if (!fs.existsSync(prosesDirectory)) return [];
  const fileNames = fs.readdirSync(prosesDirectory);
  const allData = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      const fullPath = path.join(prosesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(fileContents);
    });
  return allData;
}

export function getProsesById(id) {
  if (!id) return null;
  const fullPath = path.join(prosesDirectory, `${id}.json`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}

export function getTigaRData() {
  const fullPath = path.join(process.cwd(), 'data/tiga-r.json');
  if (!fs.existsSync(fullPath)) return [];
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}

export function getQuizData() {
  const fullPath = path.join(process.cwd(), 'data/quiz.json');
  if (!fs.existsSync(fullPath)) return [];
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}
