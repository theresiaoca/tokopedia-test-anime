import { gql } from "@apollo/client";

import { MediaType, PageInfoType } from "./types";

export type GetAnimeListParamType = {
  page: number;
  perPage: number;
};

export type GetAnimeListResponseType = {
  Page: PageType;
};

export type PageType = {
  pageInfo: PageInfoType;
  media: Pick<MediaType, "id" | "title" | "coverImage">[];
};

export const GET_ANIME_LIST = gql`
  query getAnimeList($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
    }
  }
`;

export type GetAnimeDetailParamType = {
  id: number;
};

export type GetAnimeDetailResponseType = {
  Media: MediaType;
};

export const GET_ANIME_DETAIL = gql`
  query getAnimeDetail($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      description
      episodes
      genres
      averageScore
      popularity
      season
      seasonYear
    }
  }
`;
