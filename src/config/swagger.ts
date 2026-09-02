import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "A clean CRUD API for managing notes",
    },
    servers: [{ url: "/api/v1" }],
    components: {
      schemas: {
        Note: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            title: { type: "string" },
            content: { type: "string" },
            createdAt: { type: "number" },
            updatedAt: { type: "number" },
          },
        },
        Error: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "error",
            },
            message: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/api/v1/modules/**/*.route.ts"],
});

export default swaggerSpec;
