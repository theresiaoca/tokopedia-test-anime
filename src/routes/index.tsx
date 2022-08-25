import { lazy } from "react";

const AnimeList = lazy(() => import("../components/animes/list"));
const AnimeDetail = lazy(() => import("../components/animes/anime_detail"));
const CollectionList = lazy(() => import("../components/collections/list"));
const CollectionDetail = lazy(
  () => import("../components/collections/collection_detail")
);

export type RouteType = {
  url: string;
  component: any;
  text?: string;
};

export const routes: Array<RouteType> = [
  {
    url: "/",
    component: <AnimeList />,
    text: "Anime List",
  },
  {
    url: "/animes/:id",
    component: <AnimeDetail />,
    text: "Anime Detail",
  },
  {
    url: "/collections",
    component: <CollectionList />,
    text: "My Collections",
  },
  {
    url: "/collections/:name",
    component: <CollectionDetail />,
    text: "Collection Detail",
  },
];
