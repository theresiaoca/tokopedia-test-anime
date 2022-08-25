import { checkCollectionExists } from "./checkCollectionExists";

import { CollectionType } from "../collections/CollectionContext";

export const checkDuplicateCollection = (
  collections: CollectionType[],
  value: number
) => {
  return checkCollectionExists<boolean>(collections, value, "some");
};

export const checkDuplicateCollectionByName = (
  collections: CollectionType[],
  value: string
) => {
  return collections.some(
    (collection) => collection.name.toLowerCase() === value.toLowerCase()
  );
};
