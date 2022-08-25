import { checkCollectionExists } from "./checkCollectionExists";

import { CollectionType } from "../collections/CollectionContext";

export const checkDuplicateCollection = (
  collections: CollectionType[],
  value: string
) => {
  return checkCollectionExists<boolean>(collections, value, "some");
};
