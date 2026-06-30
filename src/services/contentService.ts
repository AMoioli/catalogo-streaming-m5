import { randomUUID } from "node:crypto";
import { ContentRepository } from "../repository/contentRepository";
import type {
  Content,
  CreateContentInput,
  Genre,
  UpdateContentInput,
} from "../types";
import { validateContentInput } from "../utils/validation";

/**
 * ContentService — logica di business del catalogo.
 * Dipende da ContentRepository (iniettabile): nei test puoi passare un mock
 * oppure usare vi.mock("../repository/contentRepository").
 */
export class ContentService {
  constructor(
    private readonly repo: ContentRepository = new ContentRepository(),
  ) {}

  getAll(genre?: string): Content[] {
    const all = this.repo.findAll();
    return genre ? all.filter((c) => c.genre === genre) : all;
  }

  getById(id: string): Content | null {
    return this.repo.findById(id);
  }

  create(input: CreateContentInput): Content {
    validateContentInput(input);
    const content: Content = {
      id: randomUUID(),
      title: input.title.trim(),
      genre: input.genre,
      durationMinutes: input.durationMinutes,
      releaseDate: input.releaseDate,
      rating: input.rating,
    };
    return this.repo.save(content);
  }

  update(id: string, patch: UpdateContentInput): Content | null {
    const existing = this.repo.findById(id);
    if (!existing) return null;
    const merged: CreateContentInput = {
      title: patch.title ?? existing.title,
      genre: (patch.genre ?? existing.genre) as Genre,
      durationMinutes: patch.durationMinutes ?? existing.durationMinutes,
      releaseDate: patch.releaseDate ?? existing.releaseDate,
      rating: patch.rating ?? existing.rating,
    };
    validateContentInput(merged);
    return this.repo.save({ ...existing, ...merged });
  }

  delete(id: string): boolean {
    return this.repo.delete(id);
  }
}
