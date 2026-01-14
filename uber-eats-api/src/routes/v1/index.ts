import { Router } from "express";
import { AdminRoute } from "./admin.routes";
import { RestaurantRoute } from "./restaurants.routes";

const router = Router();

router.use("/admin", AdminRoute);
router.use("/restaurant", RestaurantRoute)

export {router as v1Router};