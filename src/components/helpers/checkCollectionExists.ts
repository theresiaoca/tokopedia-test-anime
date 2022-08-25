import { CollectionType } from "../collections/CollectionContext";

export const checkCollectionExists = <V extends unknown>(
  collections: CollectionType[],
  value: number,
  method: "some" | "find"
): V => {
  return collections[method]((collection) => collection.id === value) as V;
};
