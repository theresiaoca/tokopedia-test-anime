import { CollectionType } from "../collections/CollectionContext";
import { MediaType } from "./types";

export const INITIAL_ANIME_DETAIL: MediaType = {
  id: 0,
  title: {
    romaji: "",
  },
  coverImage: {
    color: "",
    extraLarge: "",
    large: "",
    medium: "",
  },
  bannerImage: "",
  description: "",
  episodes: 0,
  genres: [],
  averageScore: 0,
  popularity: 0,
  season: "SPRING",
  seasonYear: 0,
};

export const INITIAL_COLLECTION: CollectionType = {
  id: 0,
  name: "",
  animes: [],
};

// eslint-disable-next-line
export const SPECIAL_CHAR_FORMAT = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
