import dotenv from "dotenv"
import axios from 'axios';
dotenv.config()
export async function sendDataToUbidots(data) {
  const ubidotsToken = process.env.UBIDOTS_TOKEN;
  const deviceLabel = process.env.DEVICE_LABEL;

  for (const row of data) {
    const [datetime, temperature, pressure, vehicles, battery, current] = row;
  
    const payload = {
      temperature: {
        value: parseFloat(temperature),
        timestamp: new Date(datetime).getTime(),
      },
      pressure: {
        value: parseFloat(pressure),
        timestamp: new Date(datetime).getTime(),
      },
      vehicles: {
        value: parseInt(vehicles, 10),
        timestamp: new Date(datetime).getTime(),
      },
      battery: {
        value: parseInt(battery),
        timestamp: new Date(datetime).getTime(),
      },
      current: {
        value: parseInt(current),
        timestamp: new Date(datetime).getTime(),
      }
    };

    try {
      const response = await axios.post(
        `https://industrial.api.ubidots.com/api/v1.6/devices/${deviceLabel}`,
        payload,
        {
          headers: {
            'X-Auth-Token': ubidotsToken,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Data sent to Ubidots:', response.data);
    } catch (error) {
      console.error('Error sending data to Ubidots:', error);
    }
  }
}
