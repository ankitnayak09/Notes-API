// import dotenv from "dotenv";

// dotenv.config();

// function required(key: string): string {
//   const value = process.env[key];
//   if (!value) throw new Error(`Missing required env var: ${key}`);
//   return value;
// }

// const config = {
//   PORT: Number(process.env.PORT ?? 8080),
//   // databaseUrl: required("DATABASE_URL"),
//   // jwtSecret: required("JWT_SECRET"),
//   nodeEnv: process.env.NODE_ENV ?? "Development",
// };

// export default config;

import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  // DATABASE_URL: z.url(),
  // JWT_SECRET: z.string().min(1),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

const config = parsed.data;
export default config;
