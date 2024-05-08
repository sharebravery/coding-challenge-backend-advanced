import { Router } from "express";
import { generateRedeemCode, redeemNFT } from "../controllers/publicController";
import { authenticateAPIKey } from "../utils/auth";

function publicRoutes(router: Router) {
    router.post("/public/generate-redeem-code", authenticateAPIKey, generateRedeemCode);
    router.post("/public/redeem-nft", authenticateAPIKey, redeemNFT);
}

export default publicRoutes;
