import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { sentry } from "@sentry/hono/bun";
import * as Sentry from "@sentry/hono/bun";

import sessions from "./routes/sessions";
import chat from "./routes/chat";

const app = new Hono();

app.use(
  "*",
  sentry(app, {
    dsn: process.env.SENTRY_DNS,
    tracesSampleRate: 1.0,
    enableLogs: true,
    integrations: [
      Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
    ],
  }),
);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    Sentry.logger.warn("Handled HTTP error", {
      status: err.status,
      message: err.message || "Request failed",
      path: c.req.path,
      method: c.req.method,
    });

    return c.json(
      {
        status: err.status,
        message: err.message || "Request failed",
        path: c.req.path,
        method: c.req.method,
      },
      err.status,
    );
  }

  Sentry.logger.error("Unhandled server error", {
    path: c.req.path,
    method: c.req.method,
    message: err instanceof Error ? err.message : "Unknow error",
  });

  return c.json(
    {
      error: "Internal server error",
    },
    500,
  );
});

const routes = app.route("/sessions", sessions).route("/chat", chat);
export type AppType = typeof routes;

// If llm response keeps timing out, increase the idleTimeout value in the exported config below
export default {
  port: 3000,
  fetch: app.fetch,
  idleTimeout: 255,
};
