import { Router } from "express";
import { login,getProfile } from "../controllers/index";
import { authenticationMiddleware } from "../middlewares/index";

const router = Router();

router.post("/login", login)

// router.use(authenticationMiddleware)
router.get("/profile", authenticationMiddleware, getProfile); // route protégée

export {router as RestaurantRoute};