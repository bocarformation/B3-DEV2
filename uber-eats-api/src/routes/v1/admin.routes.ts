import { Router } from "express";
// import { registerRestaurant } from "../controllers/admin.controller.js";
import { registerRestaurant, getRestaurants, getRestaurantById } from "../../controllers/v1/index";

const router = Router();

router.post("/restaurants", registerRestaurant);
router.get("/restaurants", getRestaurants);
router.get("/restaurants/:id", getRestaurantById);

export { router as AdminRoute};