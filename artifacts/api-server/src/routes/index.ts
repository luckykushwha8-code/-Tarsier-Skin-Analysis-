import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import scansRouter from "./scans";
import reportsRouter from "./reports";
import productsRouter from "./products";
import routinesRouter from "./routines";
import progressRouter from "./progress";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/scans", scansRouter);
router.use("/reports", reportsRouter);
router.use("/products", productsRouter);
router.use("/routines", routinesRouter);
router.use("/progress", progressRouter);

export default router;
