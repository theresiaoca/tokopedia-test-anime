import { createContext, useEffect, useState } from "react";

import { MediaType } from "../animes/types";

export type CollectionType = {
  id: number;
  name: string;
  animes: Pick<MediaType, "id" | "title" | "coverImage">[];
};

export type CollectionContextType = {
  collections: CollectionType[];
  addCollection: (newCollection: CollectionType[]) => void;
  addAnimeToCollection: (
    collectionIds: number[],
    animes: Pick<MediaType, "id" | "title" | "coverImage">[]
  ) => void;
  removeAnimeFromCollection: (collectionId: number, animeId: number) => void;
  editCollection: (oldName: string, name: string) => void;
  removeCollection: (id: number) => void;
};

export const CollectionContext = createContext<CollectionContextType>({
  collections: [],
  addCollection: () => {},
  addAnimeToCollection: () => {},
  removeAnimeFromCollection: () => {},
  editCollection: () => {},
  removeCollection: () => {},
});

export const CollectionProvider = (props: any) => {
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const addCollection = (newCollections: CollectionType[]) => {
    const tmpCollections = [...collections];
    newCollections.forEach((newCollection) => {
      tmpCollections.push(newCollection);
    });

    localStorage.setItem("collections", JSON.stringify(tmpCollections));
    setCollections(tmpCollections);
  };

  const addAnimeToCollection = (
    collectionIds: number[],
    animes: Pick<MediaType, "id" | "title" | "coverImage">[]
  ) => {
    let tmpCollections = [...collections].reduce(
      (tmpNew: CollectionType[], collection) => {
        if (collectionIds.includes(collection.id)) {
          tmpNew.push({
            ...collection,
            animes: [...collection.animes, ...animes],
          });
        } else {
          tmpNew.push(collection);
        }
        return tmpNew;
      },
      []
    );

    localStorage.setItem("collections", JSON.stringify(tmpCollections));
    setCollections(tmpCollections);
  };

  const removeAnimeFromCollection = (collectionId: number, animeId: number) => {
    let tmpCollections = [...collections].reduce(
      (tmpNew: CollectionType[], collection) => {
        if (collection.id === collectionId) {
          tmpNew.push({
            ...collection,
            animes: collection.animes.filter((anime) => anime.id !== animeId),
          });
        } else {
          tmpNew.push(collection);
        }
        return tmpNew;
      },
      []
    );

    localStorage.setItem("collections", JSON.stringify(tmpCollections));
    setCollections(tmpCollections);
  };

  const editCollection = (oldName: string, name: string) => {
    const tmpCollections = collections.map((collection) => {
      if (collection.name.toLowerCase() === oldName.toLowerCase()) {
        return {
          ...collection,
          name: name,
        };
      }
      return collection;
    });

    localStorage.setItem("collections", JSON.stringify(tmpCollections));
    setCollections(tmpCollections);
  };

  const removeCollection = (id: number) => {
    const tmpCollections = collections.filter(
      (collection) => collection.id !== id
    );

    localStorage.setItem("collections", JSON.stringify(tmpCollections));
    setCollections(tmpCollections);
  };

  useEffect(() => {
    if (localStorage.getItem("collections")) {
      const data: CollectionType[] = JSON.parse(
        `${localStorage.getItem("collections")}`
      );
      setCollections(data);
    }
  }, [setCollections]);

  return (
    <CollectionContext.Provider
      value={{
        collections,
        addCollection,
        addAnimeToCollection,
        removeAnimeFromCollection,
        removeCollection,
        editCollection,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
};
