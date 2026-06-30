import { describe, expect, it } from "vitest";
import { ValidationError } from "../types";
import { formatPrice } from "../utils/format";
import { paginate } from "../utils/pagination";
import { isValidEmail, validateContentInput } from "../utils/validation";

describe("isValidEmail", () => {
  it("accetta email valide e rifiuta quelle non valide", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("nope")).toBe(false);
    expect(isValidEmail("a@b")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("formatPrice", () => {
  it("usa il simbolo valuta e 2 decimali", () => {
    expect(formatPrice(9.9)).toBe("€9.90");
    expect(formatPrice(5, "USD")).toBe("$5.00");
    expect(formatPrice(3.456, "GBP")).toBe("£3.46");
    expect(formatPrice(7, "CHF")).toBe("CHF7.00");
  });
});

describe("paginate", () => {
  it("rispetta offset e limit", () => {
    const p = paginate([1, 2, 3, 4, 5], 1, 2);
    expect(p.items).toEqual([2, 3]);
    expect(p.total).toBe(5);
    expect(p.items.length).toBeLessThanOrEqual(p.limit);
  });
  it("gestisce valori negativi", () => {
    const p = paginate([1, 2, 3], -1, -5);
    expect(p.offset).toBe(0);
    expect(p.limit).toBe(0);
    expect(p.items).toEqual([]);
  });
});

describe("validateContentInput", () => {
  it("non lancia su input valido", () => {
    expect(() =>
      validateContentInput({
        title: "Ok",
        genre: "drama",
        durationMinutes: 90,
        releaseDate: "2024-01-01",
        rating: 7,
      }),
    ).not.toThrow();
  });
  it("lancia su rating fuori range", () => {
    expect(() =>
      validateContentInput({
        title: "Ok",
        genre: "drama",
        durationMinutes: 90,
        releaseDate: "2024-01-01",
        rating: 99,
      }),
    ).toThrow(ValidationError);
  });
});
