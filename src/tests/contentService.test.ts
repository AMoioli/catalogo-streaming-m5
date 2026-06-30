import { beforeEach, describe, expect, it } from "vitest";
import { ContentRepository } from "../repository/contentRepository";
import { ContentService } from "../services/contentService";
import { ValidationError } from "../types";

describe("ContentService", () => {
  let svc: ContentService;
  beforeEach(() => {
    svc = new ContentService(new ContentRepository());
  });

  it("getAll ritorna il catalogo seed", () => {
    expect(svc.getAll().length).toBe(4);
  });

  it("getAll filtra per genere", () => {
    expect(svc.getAll("sci-fi").length).toBe(1);
    expect(svc.getAll("comedy").every((c) => c.genre === "comedy")).toBe(true);
  });

  it("getById ritorna il contenuto o null", () => {
    expect(svc.getById("c1")?.title).toBe("Codebreakers");
    expect(svc.getById("inesistente")).toBeNull();
  });

  it("create aggiunge un contenuto valido", () => {
    const created = svc.create({
      title: "Nuovo",
      genre: "drama",
      durationMinutes: 90,
      releaseDate: "2025-01-01",
    });
    expect(created.id).toBeTruthy();
    expect(svc.getById(created.id)).not.toBeNull();
    expect(svc.getAll().length).toBe(5);
  });

  it("create rifiuta input non validi", () => {
    expect(() =>
      svc.create({
        title: "",
        genre: "drama",
        durationMinutes: 90,
        releaseDate: "2025-01-01",
      }),
    ).toThrow(ValidationError);
    expect(() =>
      svc.create({
        title: "X",
        genre: "xxx" as never,
        durationMinutes: 90,
        releaseDate: "2025-01-01",
      }),
    ).toThrow(ValidationError);
    expect(() =>
      svc.create({
        title: "X",
        genre: "drama",
        durationMinutes: 0,
        releaseDate: "2025-01-01",
      }),
    ).toThrow(ValidationError);
    expect(() =>
      svc.create({
        title: "X",
        genre: "drama",
        durationMinutes: 90,
        releaseDate: "non-una-data",
      }),
    ).toThrow(ValidationError);
  });

  it("update modifica un contenuto esistente e ritorna null se assente", () => {
    const updated = svc.update("c1", { rating: 9.9 });
    expect(updated?.rating).toBe(9.9);
    expect(updated?.title).toBe("Codebreakers");
    expect(svc.update("inesistente", { title: "X" })).toBeNull();
  });

  it("update valida il risultato del merge", () => {
    expect(() => svc.update("c1", { durationMinutes: -5 })).toThrow(
      ValidationError,
    );
  });

  it("delete rimuove e ritorna l'esito", () => {
    expect(svc.delete("c2")).toBe(true);
    expect(svc.getById("c2")).toBeNull();
    expect(svc.delete("c2")).toBe(false);
  });
});
