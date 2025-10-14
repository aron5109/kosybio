
export enum Genre {
  All = "Allt",
  SciFi = "Vísindaskáldskapur",
  Festive = "Hátíðlegt",
  Action = "Spenna",
  Thriller = "Spennutryllir",
}

export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  trailerUrl: string;
  synopsis: string;
  year: number;
  duration: string;
  director: string;
  cast: string[];
  language: string;
  subtitles: string;
  genres: Genre[];
}

export interface Screening {
  time: string;
  subtitles: string;
}