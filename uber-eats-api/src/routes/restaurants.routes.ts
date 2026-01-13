import { Router } from "express";
import { login,getProfile, updateProfile, updateServiceAvailability, updateCoverImages, addFood} from "../controllers/index";
import { authenticationMiddleware } from "../middlewares/index";




const router = Router();

router.post("/login", login)

// router.use(authenticationMiddleware)
router.get("/profile", authenticationMiddleware, getProfile); // route protégée
router.patch("/profile", authenticationMiddleware, updateProfile); // route protégée
router.patch("/profile/service-available", authenticationMiddleware, updateServiceAvailability); // route protégée
router.patch("/profile/cover-images",authenticationMiddleware,updateCoverImages );
router.post("/foods", authenticationMiddleware, addFood)

export {router as RestaurantRoute};

