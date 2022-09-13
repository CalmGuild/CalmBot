import Collection from "@discordjs/collection";
import { getProfileFromUUID } from "../api/mojang";

export default class MinecraftNameManager {
  private data: Collection<string, string> = new Collection();

  getName(uuid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.data.get(uuid)) resolve(this.data.get(uuid)!);
      getProfileFromUUID(uuid)
        .then((profile) => {
          const name = profile?.name;
          if (!name) reject(null);
          this.data.set(uuid, name!);
          setTimeout(() => this.removeUUIDFromCache(uuid), 12 * 60 * 60 * 1000);
          resolve(name!);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  removeUUIDFromCache(uuid: string) {
    this.data.delete(uuid);
  }

  clear() {
    this.data.clear();
  }
}
