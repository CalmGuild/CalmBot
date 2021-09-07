import axios from "axios";

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
