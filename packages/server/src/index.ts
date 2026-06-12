import { Hono } from "hono";

const app = new Hono();
app.get("/", (c) => c.text("Koda Arc"));

export default app;
