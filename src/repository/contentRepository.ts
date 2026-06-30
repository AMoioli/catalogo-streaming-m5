import { seedContents } from "../data/seed";
import type { Content } from "../types";

/**
 * Repository in-memory del catalogo. Il ContentService dipende da questa classe:
 * nei test la puoi sostituire con un mock (vi.mock) o iniettarne una fake.
 */
export class ContentRepository {
  private store: Map<string, Content>;

  constructor(seed: Content[] = seedContents) {
    this.store = new Map(seed.map((c) => [c.id, { ...c }]));
  }

  findAll(): Content[] {
    return [...this.store.values()];
  }

  findById(id: string): Content | null {
    return this.store.get(id) ?? null;
  }

  save(content: Content): Content {
    this.store.set(content.id, content);
    return content;
  }

  delete(id: string): boolean {
    return this.store.delete(id);
  }
}
