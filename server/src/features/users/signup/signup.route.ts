import { Router } from "express";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { registerSchema, signupController } from "./index.js";

const router = Router();

router.post("/signup", validate(registerSchema), signupController);

export default router;
