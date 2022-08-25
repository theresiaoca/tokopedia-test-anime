import { CollectionType } from "../collections/CollectionContext";

export const checkCollectionExists = <V extends unknown>(
  collections: CollectionType[],
  value: string,
  method: "some" | "find"
): V => {
  return collections[method](
    (collection) => collection.name.toLowerCase() === value.toLowerCase()
  ) as V;
};
