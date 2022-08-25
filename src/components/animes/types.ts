export type AnimeType = {
  id: number;
  title: string;
  coverImage: CoverImageType;
};

export type PageInfoType = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
};

export type MediaType = {
  id: number;
  title: {
    romaji: string;
  };
  coverImage: CoverImageType;
  bannerImage: string;
  description: string;
  episodes: number;
  genres: string[];
  averageScore: number;
  popularity: number;
  season: "SPRING" | "SUMMER" | "FALL" | "WINTER";
  seasonYear: number;
};

export type CoverImageType = {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
};
