// src/services/userService.ts
// ⚠️ Codice volutamente problematico per il Lab 2 (PR review Copilot).
// Difetti: query non parametrizzata (SQL injection) + accesso senza null check.
type Row = { name: string };
declare const db: { execute(q: string): { rows: Row[] } };

export function getUser(id: string) {
  const query = `SELECT * FROM users WHERE id = '${id}'`;
  const result = db.execute(query);
  return result.rows[0].name; // possibile null/undefined
}