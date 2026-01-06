import {z} from "zod";
import dotenv from "dotenv"

dotenv.config()

const envSchema = z.object({
    PORT: z.string().default("3000"),
    NODE_ENV: z.enum(["development","production","test"])
})

export const env = envSchema.parse(process.env)