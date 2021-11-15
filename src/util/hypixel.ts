import axios from "axios";
import { Guild, Player } from "../structures/interfaces";
import constants from "./constants";
import getUUIDFromName from "./mojang";

const key = process.env.HYPIXEL_API_KEY;

export function getPlayer(uuid: string): Promise<Player | null> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.hypixel.net/player?key=${key}&uuid=${uuid}`)
      .then((res) => {
        resolve(res.data?.player ?? null);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getPlayerFromName(name: string): Promise<Player | null> {
  return new Promise((resolve, reject) => {
    getUUIDFromName(name)
      .then((uuid) => {
        if (!uuid) resolve(null);
        getPlayer(uuid!!).then(resolve).catch(reject);
      })
      .catch((err) => {
        resolve(null);
      });
  });
}

export function getGuild(id = constants.CALM_GUILD_ID): Promise<Guild | null> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.hypixel.net/guild?key=${key}&id=${id}`)
      .then((res) => {
        resolve(res.data?.guild ?? null);
      })
      .catch((err) => {
        reject(err);
      });
  });
}