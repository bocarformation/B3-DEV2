export * from "./json-api-response.middleware";
export * from "./authentication.middleware";
export * from "./upload.middleware";

import fs from "fs";

fs.unlink("./images/"+restaurant.coverImages[index])