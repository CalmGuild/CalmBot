import fs from "fs";
import path from "path";

import { Collection } from "discord.js";
import Client from "../structures/Client";
import Job, { IJob } from "../schemas/Job";

export default class JobManager {
  private client: Client;
  private jobs = new Collection<string, (data: Map<string, string>, client: Client) => void>();

  constructor(client: Client, jobsDirectory: string) {
    this.client = client;
    fs.readdirSync(jobsDirectory).forEach((file) => {
      const name = file.split(".")[0]!.toLowerCase();
      const job: (data: Map<string, string>, client: Client) => void = require(path.join(jobsDirectory, file)).default;
      this.jobs.set(name, job);
    });

    Job.find().then((jobs) =>
      jobs.forEach(async (job) => {
        if (job.expirationTimestamp > Date.now()) {
          this.createTimeout(job);
        } else {
          // job has passed
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
    this.createTimeout(job);
  }

  private createTimeout(job: IJob) {
    const callback = this.jobs.get(job.name);
    if (!callback) return;

    const diff = job.expirationTimestamp - Date.now();

    if (diff > 0x7fffffff) {
      setTimeout(() => this.createTimeout(job), 0x7fffffff);
    } else {     
      setTimeout(() => {       
        callback(job.data, this.client);
        job.delete();
      }, diff);
    }
  }
}
