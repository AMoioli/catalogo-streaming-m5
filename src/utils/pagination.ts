// Paginazione di una collezione. Usata nei test property-based del Lab 2.
// Invariante: items.length <= limit e offset + items.length <= total.
export interface Page<T> {
  items: T[];
  offset: number;
  limit: number;
  total: number;
}

export function paginate<T>(
  items: T[],
  offset: number,
  limit: number,
): Page<T> {
  const safeOffset = Math.max(0, Math.floor(offset));
  const safeLimit = Math.max(0, Math.floor(limit));
  return {
    items: items.slice(safeOffset, safeOffset + safeLimit),
    offset: safeOffset,
    limit: safeLimit,
    total: items.length,
  };
}
