import { Router } from "express";

import { authMiddleware } from "../../../shared/middleware/auth.middleware.js";
import { meController } from "./me.controller.js";

const router = Router();

router.get("/me", authMiddleware, meController);

export default router;
