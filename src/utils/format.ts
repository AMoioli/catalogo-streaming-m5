// Formattazione prezzo abbonamento. Usata nei test property-based del Lab 2.
// Invariante: il risultato contiene il simbolo valuta e ha al massimo 2 decimali.
const SYMBOLS: Record<string, string> = { EUR: "€", USD: "$", GBP: "£" };

export function formatPrice(amount: number, currency = "EUR"): string {
  const symbol = SYMBOLS[currency] ?? currency;
  return `${symbol}${amount.toFixed(2)}`;
}
