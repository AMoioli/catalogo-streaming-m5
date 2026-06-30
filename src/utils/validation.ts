import { type CreateContentInput, GENRES, ValidationError } from "../types";

// Validazione email (sintattica). Usata nei test property-based del Lab 2.
export function isValidEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  // un solo "@", parte locale non vuota, dominio con almeno un punto
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validazione dell'input di creazione contenuto. Lancia ValidationError.
export function validateContentInput(input: CreateContentInput): void {
  if (!input || typeof input !== "object") {
    throw new ValidationError("Body mancante o non valido");
  }
  if (typeof input.title !== "string" || input.title.trim().length === 0) {
    throw new ValidationError("title obbligatorio e non vuoto");
  }
  if (!GENRES.includes(input.genre)) {
    throw new ValidationError(
      `genre non valido: atteso uno tra ${GENRES.join(", ")}`,
    );
  }
  if (typeof input.durationMinutes !== "number" || input.durationMinutes <= 0) {
    throw new ValidationError("durationMinutes deve essere un numero > 0");
  }
  if (
    typeof input.releaseDate !== "string" ||
    Number.isNaN(Date.parse(input.releaseDate))
  ) {
    throw new ValidationError("releaseDate deve essere una data ISO valida");
  }
  if (input.rating !== undefined && (input.rating < 0 || input.rating > 10)) {
    throw new ValidationError("rating deve essere compreso tra 0 e 10");
  }
}
