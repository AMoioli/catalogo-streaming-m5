import { expect, test } from "@playwright/test";

test("GET /health risponde ok", async ({ request }) => {
  const res = await request.get("/health");
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ status: "ok" });
});

test("GET /api/v1/contents ritorna la lista", async ({ request }) => {
  const res = await request.get("/api/v1/contents");
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});

test("POST + GET del nuovo contenuto", async ({ request }) => {
  const created = await request.post("/api/v1/contents", {
    data: {
      title: "E2E Movie",
      genre: "action",
      durationMinutes: 110,
      releaseDate: "2025-05-05",
    },
  });
  expect(created.status()).toBe(201);
  const { id } = await created.json();
  const fetched = await request.get(`/api/v1/contents/${id}`);
  expect(fetched.status()).toBe(200);
});
