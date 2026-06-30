import express from "express";
import { createContentsRouter } from "./routes/contents";

// Factory dell'app: usala nei test di integrazione per avere stato isolato.
export function createApp() {
  const app = express();
  app.use(express.json());
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });
  app.use("/api/v1/contents", createContentsRouter());
  return app;
}

export const app = createApp();
