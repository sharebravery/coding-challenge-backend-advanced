import { Request, Response } from "express";
import { AirdropJobStore, AirdropJob } from "../models/airdropJob";
import { successResponse, errorResponse } from "../utils/response";

export const listAirdropJobs = async (req: Request, res: Response): Promise<void> => {
    try {
        const jobs = AirdropJobStore.listAirdropJobs();
        successResponse(res, { jobs });
    } catch (error) {
        errorResponse(res, "Failed to list airdrop jobs", 500);
    }
};

export const retrieveAirdropJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const code = req.params.code;
        const job = AirdropJobStore.getAirdropJobByCode(code);
        if (job) {
            successResponse(res, { job });
        } else {
            errorResponse(res, "Airdrop job not found", 404);
        }
    } catch (error) {
        errorResponse(res, "Failed to retrieve airdrop job", 500);
    }
};

export const updateAirdropJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const code = req.params.code;
        const newData: Partial<AirdropJob> = req.body;
        AirdropJobStore.updateAirdropJob(code, newData);
        successResponse(res, { message: "Airdrop job updated successfully" });
    } catch (error) {
        errorResponse(res, "Failed to update airdrop job", 500);
    }
};

export const deleteAirdropJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const code = req.params.code;
        AirdropJobStore.deleteAirdropJob(code);
        successResponse(res, { message: "Airdrop job deleted successfully" });
    } catch (error) {
        errorResponse(res, "Failed to delete airdrop job", 500);
    }
};
