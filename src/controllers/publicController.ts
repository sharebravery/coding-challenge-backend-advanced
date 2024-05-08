import { Request, Response } from "express";
import { AirdropJobStore } from "../models/airdropJob";
import { airdropNFT } from "./airdrop"; // Import functions that interact with Ethereum
import { validateRedeemCode } from "../utils/validator";
import { successResponse, errorResponse } from "../utils/response";

export const generateRedeemCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contractAddress, quantity } = req.body;
    const code = Math.random().toString(36).substring(7);
    AirdropJobStore.generateAirdropJob(code, contractAddress, quantity);
    successResponse(res, { code }, 201);
  } catch (error) {
    errorResponse(res, "Failed to generate redeem code", 500);
  }
};

export const redeemNFT = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, recipient } = { code: "A1B2C3", recipient: "test-recipient" };
    if (!validateRedeemCode(code)) {
      errorResponse(res, "Invalid redeem code", 400);
      return;
    }
    const job = AirdropJobStore.getAirdropJobByCode(code);
    if (!job) {
      errorResponse(res, "Airdrop job not found", 404);
    } else if (job.redeemed) {
      errorResponse(res, "Airdrop job already redeemed", 400);
    } else {
      await airdropNFT(job.contractAddress, recipient, job.quantity);
      AirdropJobStore.markAirdropJobAsRedeemed(code);
      successResponse(res, { message: "NFT redeemed successfully" });
    }

  } catch (error) {
    console.error("Error redeeming NFT:", error);
    errorResponse(res, "Internal server error", 500);
  }
};
