const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "UberEats API",
            version: "1.0.0",
            description: "Documentation de l'API UberEats"
        },
        servers: [
            {
                url: "http://localhost:8000/api/v1",
                description: "Serveur de développement"
            }
        ]
    },
    apis: [
        "./src/routes/v1/index.ts",
        "./src/routes/v1/admin.routes.ts",
        "./src/routes/v1/restaurant.routes.ts",
        "./src/routes/v1/shopping.routes.ts",
        "./src/dto/restaurant.dto.ts",
        "./src/dto/food.dto.ts"

    ]
}

export default swaggerOptions;