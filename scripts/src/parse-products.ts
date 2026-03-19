import { readFile, utils } from "xlsx";
import path from "path";

const files = [
  "../attached_assets/export_site_name-priceline_category-skincare_has_price-false__1773902459346.xlsx",
  "../attached_assets/export_site_name-amazon-co-uk_category-face_has_price-false_h_1773902459346.xlsx",
  "../attached_assets/export_site_name-priceline_category-skincare_has_price-false__1773902459347.xlsx",
];

for (const file of files) {
  try {
    const wb = readFile(path.resolve(__dirname, "..", file));
    const sheetName = wb.SheetNames[0];
    const ws = wb.Sheets[sheetName];
    const data = utils.sheet_to_json(ws, { header: 1 }) as any[][];
    console.log(`\n=== FILE: ${path.basename(file)} ===`);
    console.log("Columns:", JSON.stringify(data[0]));
    console.log("Row count:", data.length);
    for (let i = 1; i <= 5 && i < data.length; i++) {
      console.log(`Row ${i}:`, JSON.stringify(data[i]));
    }
  } catch (e: any) {
    console.log(`Error reading ${file}:`, e.message);
  }
}
