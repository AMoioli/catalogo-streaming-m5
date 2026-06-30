import type { Content } from "../types";

// Dati di partenza del catalogo (semanticamente plausibili).
export const seedContents: Content[] = [
  {
    id: "c1",
    title: "Codebreakers",
    genre: "documentary",
    durationMinutes: 52,
    releaseDate: "2023-03-12",
    rating: 8.1,
  },
  {
    id: "c2",
    title: "Neon Horizon",
    genre: "sci-fi",
    durationMinutes: 128,
    releaseDate: "2024-09-01",
    rating: 7.4,
  },
  {
    id: "c3",
    title: "Last Laugh",
    genre: "comedy",
    durationMinutes: 96,
    releaseDate: "2022-11-20",
    rating: 6.9,
  },
  {
    id: "c4",
    title: "Silent Tide",
    genre: "drama",
    durationMinutes: 141,
    releaseDate: "2021-06-30",
    rating: 8.6,
  },
];
