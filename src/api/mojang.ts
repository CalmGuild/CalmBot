import axios from "axios";

interface NameHistoryEntry {
  name: string;
  changedToAt?: number;
}

export default function getUUIDFromName(name: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.mojang.com/users/profiles/minecraft/${name}`)
      .then((res) => {
        resolve(res.data?.id ?? null);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getNameHistoryFromUUID(uuid: string): Promise<NameHistoryEntry[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.mojang.com/user/profiles/${uuid}/names`)
      .then((res) => {
        if (res.data === "") reject(null);
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}