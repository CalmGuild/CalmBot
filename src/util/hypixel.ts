import axios from "axios";
import { Player } from "../structures/interfaces";
import getUUIDFromName from "./mojang";

const key = process.env.HYPIXEL_API_KEY;

export function getPlayer(name: string): Promise<Player | null> {
  return new Promise((resolve, reject) => {
    getUUIDFromName(name)
      .then((uuid) => {       
        if (!uuid) resolve(null);
        
        axios
          .get(`https://api.hypixel.net/player?key=${key}&uuid=${uuid}`)
          .then((res) => {           
            resolve(res.data?.player ?? null)
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        resolve(null)
      });
  });
}
