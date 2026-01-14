import express from "express";
import { jsonApiResponseMiddleware, errorHandlerMiddleware } from "./middlewares/index";
import { ApiRoute } from "./routes/index";



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded
app.use(jsonApiResponseMiddleware);


app.use("/api", ApiRoute); // http://localhost:8000/api/v1

app.use(errorHandlerMiddleware);

app.listen(8000, () => {
    console.log("Server is running at http://localhost:8000");
    
})

