import { Router } from "express";
import { getFoodsIn30mins, getTopRestaurants, searchFoods,getAvailableFoods, getRestaurantById } from "../../controllers/v1/index";



const router = Router();


router.get("/available-foods/:postalcode", getAvailableFoods);
router.get("/top-restaurants/:postalcode", getTopRestaurants);
router.get("/foods-in-mins/:postalcode", getFoodsIn30mins);
router.get("/search-foods/:postalcode", searchFoods);
router.get("/restaurant/:id", getRestaurantById)



export { router as ShoppingRoute };