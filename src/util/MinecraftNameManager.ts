import Collection from "@discordjs/collection";
import { getNameHistoryFromUUID } from "./mojang";

export default class MinecraftNameManager {
  private data: Collection<string, string> = new Collection();

  getName(uuid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.data.get(uuid)) resolve(this.data.get(uuid)!);
      getNameHistoryFromUUID(uuid)
        .then((names) => {
          const name = names[names.length - 1]?.name;
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
