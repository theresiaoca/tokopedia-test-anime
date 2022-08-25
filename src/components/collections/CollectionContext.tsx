import { createContext, useEffect, useState } from "react";

import { checkCollectionExists } from "../helpers/checkCollectionExists";

import { MediaType } from "../animes/types";

export type CollectionType = {
  name: string;
  animes: Pick<MediaType, "id" | "title" | "coverImage">[];
};

export type CollectionContextType = {
  collections: CollectionType[];
  addCollection: (newCollection: CollectionType[]) => void;
  editCollection: (oldName: string, name: string) => void;
  removeCollection: (name: string) => void;
};

export const CollectionContext = createContext<CollectionContextType>({
  collections: [],
  addCollection: () => {},
  editCollection: () => {},
  removeCollection: () => {},
});

export const CollectionProvider = (props: any) => {
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const addCollection = (newCollections: CollectionType[]) => {
    const tmpCollections = [...collections];
    let tmpNewCollections = tmpCollections;

    if (!!tmpCollections.length) {
      tmpNewCollections = tmpCollections.reduce(
        (tmpNew: CollectionType[], collection) => {
          const selected = checkCollectionExists<CollectionType | undefined>(
            newCollections,
            collection.name,
            "find"
          );

          if (selected) {
            // add to existing collection
            tmpNew.push({
              ...collection,
              animes: [...collection.animes, ...selected.animes],
            });
          } else {
            // make new collection
            tmpNew.push(collection);
          }
          return tmpNew;
        },
        []
      );

      if (
        !checkCollectionExists(
          tmpNewCollections,
          newCollections[0].name,
          "some"
        )
      ) {
        tmpNewCollections.push(newCollections[0]);
      }
    } else {
      tmpNewCollections.push(newCollections[0]);
    }

    localStorage.setItem("collections", JSON.stringify(tmpNewCollections));
    setCollections(tmpNewCollections);
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

  const removeCollection = (name: string) => {
    const tmpCollections = collections.filter(
      (collection) => !(collection.name.toLowerCase() === name.toLowerCase())
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
      value={{ collections, addCollection, removeCollection, editCollection }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
};
