import express from "express";
import { authenticateAPIKey, checkAdminRole } from "../utils/auth";
import adminRoutes from "./adminRoutes";
import publicRoutes from "./publicRoutes";


export default function initRoute() {
    const router = express.Router();

    router.use(authenticateAPIKey);
    router.use(checkAdminRole);

    adminRoutes(router)
    publicRoutes(router)

    return router
}


