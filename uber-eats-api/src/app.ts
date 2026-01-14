import express from "express";
import { jsonApiResponseMiddleware, errorHandlerMiddleware } from "./middlewares/index";
import { ApiRoute } from "./routes/index";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "../docs/swagger.config";

const app = express();
const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use(express.json());
app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded
app.use(jsonApiResponseMiddleware);

app.use("/api", ApiRoute); // http://localhost:8000/api/v1
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(errorHandlerMiddleware);

app.listen(8000, () => {
    console.log("Server is running at http://localhost:8000");
    
})

