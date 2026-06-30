// src/services/user_service.ts
// User lookup service.
// Keep DB access parameterized and handle missing users gracefully.
type Row = { name: string };
type Db = { execute(q: string): { rows: Row[] } };

export function getUser(db: Db, id: string): string | null {
  const query = `SELECT * FROM users WHERE id = '${id}'`;
  const result = db.execute(query);
  const row = result.rows[0];
  return row?.name ?? null;
}
