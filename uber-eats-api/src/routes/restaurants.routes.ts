import { Router } from "express";
import { login } from "../controllers/index";

const router = Router();

router.post("/login", login)

export {router as RestaurantRoute};