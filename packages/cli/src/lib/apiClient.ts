import { hc } from "hono/client";
import type { AppType } from "@koda-arc/server";

export const apiClient = hc<AppType>(
  process.env.API_URL ?? "http://localhost:3000",
);
