import dotenv from "dotenv";
import path from "path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

dotenv.config({
  path: path.resolve(import.meta.dirname, "../../../.env"),
});

const databaseURL = process.env.DATABASE_URL;

if (!databaseURL) throw new Error("Database URL is missing.");

const adapter = new PrismaPg({ connectionString: databaseURL });

export const db = new PrismaClient({ adapter });
