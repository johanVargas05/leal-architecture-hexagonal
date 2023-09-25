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
  apis: ["./src/infrastructure/shop/*.routes.ts"],
};
