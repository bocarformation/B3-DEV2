import express from "express";
import {AdminRoute} from "./routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use("/admin", AdminRoute)

app.listen(8000, () => {
    console.log("Server is running at http://localhost:8000");
    
})