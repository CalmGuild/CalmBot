import fs from "fs";
import path from "path";

import { Collection } from "discord.js";
import Client from "../structures/Client";
import Job from "../schemas/Job";

export default class JobManager {
  private client: Client;
  private jobs = new Collection<string, (data: Map<string, string>, client: Client) => void>();

  constructor(client: Client, jobsDirectory: string) {
    this.client = client;
    fs.readdirSync(jobsDirectory).forEach((file) => {
      const name = file.split(".")[0]!!.toLowerCase();
      const job: (data: Map<string, string>, client: Client) => void = require(path.join(jobsDirectory, file)).default;
      this.jobs.set(name, job);
    });

    Job.find().then((jobs) =>
      jobs.forEach(async (job) => {
        if (job.expirationTimestamp > Date.now()) { // job has not passed yet
          setTimeout(() => {
            const callback = this.jobs.get(job.name);
            if (callback) callback(job.data, this.client);
            job.delete();
          }, job.expirationTimestamp - Date.now());
        } else { // job has passed 
          const callback = this.jobs.get(job.name);
          if (callback) callback(job.data, this.client);
          job.delete();
        }
      })
    );
  }

  async schedule(name: string, expirationTime: number, data: Iterable<readonly [string, string]>) {
    if (!this.jobs.get(name)) {
      this.client.logger.warn(`Tried to schedule job: ${name} but it didn't exist in the jobs collection!`);
      if (this.client.webhook) this.client.webhook.sendWarning(`Tried to schedule job: ${name} but it didn't exist in the jobs collection!`);
      return;
    }

    const job = new Job({ name: name, expirationTimestamp: expirationTime, data: data });
    await job.save();
    setTimeout(() => {
      this.jobs.get(name)!!(new Map(data), this.client);
      job.delete();
    }, expirationTime - Date.now());
  }
}
