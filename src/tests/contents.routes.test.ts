import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app";

describe("API /api/v1/contents", () => {
  it("GET /health risponde ok", async () => {
    const res = await request(createApp()).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("GET lista tutti i contenuti", async () => {
    const res = await request(createApp()).get("/api/v1/contents");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(4);
  });

  it("GET con filtro ?genre=", async () => {
    const res = await request(createApp()).get("/api/v1/contents?genre=drama");
    expect(res.status).toBe(200);
    expect(res.body.every((c: { genre: string }) => c.genre === "drama")).toBe(
      true,
    );
  });

  it("GET /:id ritorna 200 o 404", async () => {
    const app = createApp();
    expect((await request(app).get("/api/v1/contents/c1")).status).toBe(200);
    const notFound = await request(app).get("/api/v1/contents/zzz");
    expect(notFound.status).toBe(404);
    expect(notFound.headers["content-type"]).toContain(
      "application/problem+json",
    );
  });

  it("POST crea (201) e valida (400)", async () => {
    const app = createApp();
    const ok = await request(app).post("/api/v1/contents").send({
      title: "Nuovo",
      genre: "comedy",
      durationMinutes: 100,
      releaseDate: "2025-02-02",
    });
    expect(ok.status).toBe(201);
    expect(ok.body.id).toBeTruthy();
    const bad = await request(app).post("/api/v1/contents").send({ title: "" });
    expect(bad.status).toBe(400);
  });

  it("PUT aggiorna (200/404/400)", async () => {
    const app = createApp();
    expect(
      (await request(app).put("/api/v1/contents/c1").send({ rating: 8 }))
        .status,
    ).toBe(200);
    expect(
      (await request(app).put("/api/v1/contents/zzz").send({ rating: 8 }))
        .status,
    ).toBe(404);
    expect(
      (
        await request(app)
          .put("/api/v1/contents/c1")
          .send({ durationMinutes: -1 })
      ).status,
    ).toBe(400);
  });

  it("DELETE rimuove (204/404)", async () => {
    const app = createApp();
    expect((await request(app).delete("/api/v1/contents/c3")).status).toBe(204);
    expect((await request(app).delete("/api/v1/contents/c3")).status).toBe(404);
  });

  it("POST accetta payload JSON superiore a 100kb", async () => {
    const app = createApp();
    // Genera un titolo di oltre 100 KB per superare il limite di default di express.json()
    const bigTitle = "A".repeat(110 * 1024);
    const res = await request(app).post("/api/v1/contents").send({
      title: bigTitle,
      genre: "action",
      durationMinutes: 90,
      releaseDate: "2025-01-01",
    });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeTruthy();
    expect(res.body.title).toBe(bigTitle.trim());
  });

  it("POST rifiuta payload JSON superiore a 10mb", async () => {
    const app = createApp();
    // Genera un titolo che supera il limite di 10mb
    const oversizedTitle = "B".repeat(11 * 1024 * 1024);
    const res = await request(app).post("/api/v1/contents").send({
      title: oversizedTitle,
      genre: "action",
      durationMinutes: 90,
      releaseDate: "2025-01-01",
    });
    expect(res.status).toBe(413);
  });
});
