
import { getSheetData } from "./utils/get-sheet-data.js";
import { sendDataToUbidots } from "./utils/send-data-to-ubidots.js";
async function main() {
  try {
    const range= "Sheet1!A2:F2"
    const data = await getSheetData(range);
    console.log(data)
    await sendDataToUbidots(data);
    console.log('Data fetched and sent to Ubidots successfully');
  } catch (error) {
    console.error(error);
  }
}

main();
