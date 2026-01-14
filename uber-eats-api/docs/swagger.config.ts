const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "UberEats API",
            version: "1.0.0",
            description: "Documentation de l'API UberEats"
        },
        servers: [
            {
                url: "http://localhost:8000/api/v1",
                description: "Version 1"
            },
            {
                url: "http://localhost:8000/api/v2",
                description: "Version 2"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: [
        "./src/docs/**/*.ts",


    ]
}

export default swaggerOptions;