import { Router } from "express";

import loginRouter from "../features/users/login/login.route.js";
import meRouter from "../features/users/me/me.route.js";
import refreshRouter from "../features/users/refresh-token/refresh.route.js";
// import signupRouter from "../features/users/signup/signup.route.js";
// import refreshRouter from "../features/users/refresh/refresh.route.js";

const router = Router();

router.use("/auth", loginRouter);
router.use("/auth", refreshRouter);
router.use("/user", meRouter);
// router.use("/auth", signupRouter);
// router.use("/auth", refreshRouter);

export default router;
