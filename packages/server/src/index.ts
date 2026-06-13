import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import sessions from "./routes/sessions";
import { sentry } from "@sentry/hono/bun";
import * as Sentry from "@sentry/hono/bun";

const app = new Hono();

app.use(
  sentry(app, {
    dsn: "https://5ec2df9bb675441856d73429c94092f3@o4511556841897984.ingest.us.sentry.io/4511556848320512",
    tracesSampleRate: 1.0,
    enableLogs: true,
    integrations: [
      Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
    ],
    // To disable sending user data, uncomment the line below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/hono/configuration/options/#dataCollection
    // dataCollection: { userInfo: false },
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

const routes = app.route("/sessions", sessions);
export type AppType = typeof routes;

// If llm response keeps timing out, increase the idleTimeout value in the exported config below
export default {
  port: 3000,
  fetch: app.fetch,
  idleTimeout: 255,
};
