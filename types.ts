// Fix: Replaced placeholder content with actual type definitions.
export enum Genre {
    All = 'Allar myndir',
    Christmas = 'Jólamyndir',
    Family = 'Fjölskyldumyndir',
    Comedy = 'Gamanmyndir',
    Adventure = 'Ævintýramyndir',
    Action = 'Spennumyndir',
    Drama = 'Dramamyndir',
    Fantasy = 'Fantasíumyndir',
}
  
export interface Movie {
    id: string;
    title: string;
    posterUrl: string;
    heroImageUrl?: string;
    trailerUrl: string;
    genres: Genre[];
    synopsis: string;
    year: number;
    director: string;
    cast: string[];
    duration: string;
    language: string;
    subtitles: string;
}

export interface Screening {
    time: string;
    subtitles: string;
}