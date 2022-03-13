import axios, { AxiosResponse } from "axios";
import logger from "../logger";

const URL = process.env.MINECRAFT_BOT_SERVER_URL;
const KEY = process.env.MINECRAFT_BOT_SERVER_KEY;

export function sendCommand(message: string): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    if (!KEY || !URL) {
      logger.warn("Required envioremental variables for minecraftBot not set");
      reject("Required envioremental variables not set");
      return;
    }
    
    axios
      .post(URL, { key: KEY, message: message })
      .then((res) => {
        if (res.status === 200) resolve(res);
        reject(res);
      })
      .catch(reject);
  });
}
