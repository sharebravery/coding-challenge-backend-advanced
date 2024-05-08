import { Router } from "express";
import {
    listAirdropJobs,
    retrieveAirdropJob,
    updateAirdropJob,
    deleteAirdropJob,
} from "../controllers/adminController";


function adminRoutes(router: Router) {
    router.get("/admin/airdrop-jobs", listAirdropJobs);
    router.get("/admin/airdrop-jobs/:code", retrieveAirdropJob);
    router.put("/admin/airdrop-jobs/:code", updateAirdropJob);
    router.delete("/admin/airdrop-jobs/:code", deleteAirdropJob);
}



export default adminRoutes;
