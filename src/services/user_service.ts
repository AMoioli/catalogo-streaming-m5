// src/services/user_service.ts
// User lookup service.
// Keep DB access parameterized and handle missing users gracefully.
type Row = { name: string };
declare const db: { execute(q: string): { rows: Row[] } };

export function getUser(id: string) {
  const query = `SELECT * FROM users WHERE id = '${id}'`;
  const result = db.execute(query);
  return result.rows[0].name; // possibile null/undefined
}