import { type Response, Router } from "express";
import { ContentService } from "../services/contentService";
import { ValidationError } from "../types";

// Risposta d'errore in formato Problem Details (RFC 9457).
function problem(
  res: Response,
  status: number,
  title: string,
  detail: string,
): void {
  res
    .status(status)
    .type("application/problem+json")
    .json({ type: "about:blank", title, status, detail });
}

// Factory: crea un router con un ContentService fresco (stato isolato per i test).
export function createContentsRouter(
  service: ContentService = new ContentService(),
): Router {
  const router = Router();

  router.get("/", (req, res) => {
    const genre =
      typeof req.query.genre === "string" ? req.query.genre : undefined;
    res.json(service.getAll(genre));
  });

  router.get("/:id", (req, res) => {
    const content = service.getById(req.params.id);
    if (!content) {
      problem(res, 404, "Not Found", `Contenuto ${req.params.id} non trovato`);
      return;
    }
    res.json(content);
  });

  router.post("/", (req, res) => {
    try {
      res.status(201).json(service.create(req.body));
    } catch (err) {
      if (err instanceof ValidationError) {
        problem(res, 400, "Bad Request", err.message);
        return;
      }
      throw err;
    }
  });

  router.put("/:id", (req, res) => {
    try {
      const updated = service.update(req.params.id, req.body);
      if (!updated) {
        problem(
          res,
          404,
          "Not Found",
          `Contenuto ${req.params.id} non trovato`,
        );
        return;
      }
      res.json(updated);
    } catch (err) {
      if (err instanceof ValidationError) {
        problem(res, 400, "Bad Request", err.message);
        return;
      }
      throw err;
    }
  });

  router.delete("/:id", (req, res) => {
    const deleted = service.delete(req.params.id);
    if (!deleted) {
      problem(res, 404, "Not Found", `Contenuto ${req.params.id} non trovato`);
      return;
    }
    res.status(204).end();
  });

  return router;
}
