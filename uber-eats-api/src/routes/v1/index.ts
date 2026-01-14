import { Router } from "express";
import { AdminRoute } from "./admin.routes";
import { RestaurantRoute } from "./restaurants.routes";
import { ShoppingRoute } from "./shopping.routes.js";

const router = Router();

router.use("/admin", AdminRoute);
router.use("/restaurant", RestaurantRoute);
router.use("/shopping", ShoppingRoute);

export {router as v1Router};