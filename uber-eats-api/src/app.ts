import express from "express";
import {AdminRoute, RestaurantRoute} from "./routes/index";
import { jsonApiResponseMiddleware } from "./middlewares/index";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded
app.use(jsonApiResponseMiddleware);


app.use("/admin", AdminRoute)
app.use("/restaurant", RestaurantRoute)

app.listen(8000, () => {
    console.log("Server is running at http://localhost:8000");
    
})