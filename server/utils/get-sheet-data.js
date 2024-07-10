import dotenv from 'dotenv';
import sheets from '../config/google.js';
dotenv.config();

export async function getSheetData(range) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range
  });
  return response.data.values;
}
