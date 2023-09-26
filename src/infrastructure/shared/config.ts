export const config = {
  server: {
    port: process.env.PORT || 3000,
  },
};

export const optionsSwagger = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Leal API",
      version: "1.0.0",
      description: "REST API built with hexagonal architecture",
    },
    servers: [
      {
        url: `http://localhost:${config.server.port}/api`,
      },
    ],
  },
  apis: [
    "./src/infrastructure/shop/*.routes.ts",
    "./src/infrastructure/subsidiary/*.routes.ts",
    "./src/infrastructure/campaign/*.routes.ts",
    "./src/infrastructure/reward/*.routes.ts",
    "./src/infrastructure/user/*.routes.ts",
    "./src/infrastructure/point/*.routes.ts",
    "./src/infrastructure/transaction/*.routes.ts",
  ],
};
