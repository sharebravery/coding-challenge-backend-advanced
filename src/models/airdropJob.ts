// TODO: Implement the in-memory store logic
export interface AirdropJob {
  code: string;
  contractAddress: string;
  quantity: number;
  redeemed: boolean;
}

export class AirdropJobStore {
  private static jobs: AirdropJob[] = [];

  static generateAirdropJob(code: string, contractAddress: string, quantity: number): void {
    this.jobs.push({ code, contractAddress, quantity, redeemed: false });
  }

  static getAirdropJobByCode(code: string): AirdropJob | undefined {
    return this.jobs.find(job => job.code === code);
  }

  static markAirdropJobAsRedeemed(code: string): void {
    const job = this.getAirdropJobByCode(code);
    if (job) {
      job.redeemed = true;
    }
  }

  static listAirdropJobs(): AirdropJob[] {
    return this.jobs;
  }

  static updateAirdropJob(code: string, newData: Partial<AirdropJob>): void {
    const job = this.getAirdropJobByCode(code);
    if (job) {
      Object.assign(job, newData);
    }
  }

  static deleteAirdropJob(code: string): void {
    this.jobs = this.jobs.filter(job => job.code !== code);
  }
}
