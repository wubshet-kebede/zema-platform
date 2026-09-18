import { Router } from "express";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { loginSchema, loginController } from "./index.js";

const router = Router();

router.post("/login", validate(loginSchema), loginController);

export default router;
