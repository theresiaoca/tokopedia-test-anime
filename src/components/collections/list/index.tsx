import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CardContainer, Title } from "../../animes/list/AnimeListCss";
import { AddContainer, Container } from "./CollectionListCss";
import LoadingIndicator from "../../palette/LoadingIndicator";
import Card from "../../palette/Card";
import CustomButton from "../../palette/CustomButton";
import Dialog from "../../palette/Dialog";
import Input from "../../palette/Input";
import { ErrorLabel } from "../../palette/Input/InputCss";

import { CollectionContext, CollectionType } from "../CollectionContext";
import { checkDuplicateCollection } from "../../helpers/checkDuplicateCollection";
import { checkCollectionExists } from "../../helpers/checkCollectionExists";

import { INITIAL_COLLECTION } from "../../animes/constants";

const CollectionList = () => {
  const { collections, addCollection, removeCollection, editCollection } =
    useContext(CollectionContext);
  const navigate = useNavigate();
  const [tmpCollections, setTmpCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionType>(INITIAL_COLLECTION);

  const handleRedirect = (name: string) => {
    navigate(`/collections/${name}`);
  };

  const handleAddCollection = (isSubmit: boolean) => {
    if (isSubmit) {
      const duplicate = checkDuplicateCollection(collections, collectionName);

      if (duplicate) {
        setErrMessage(`${collectionName} already exists in colections!`);
        setIsError(true);
        return;
      }

      const newCollection: CollectionType = {
        name: collectionName,
        animes: [],
      };
      addCollection([newCollection]);
    }
    handleReset();
  };

  const handleEditCollection = (isSubmit: boolean) => {
    if (isSubmit) {
      const duplicate = checkDuplicateCollection(
        tmpCollections,
        collectionName
      );

      if (duplicate) {
        setErrMessage(`${collectionName} already exists in colections!`);
        setIsError(true);
        return;
      }
      editCollection(selectedCollection.name, collectionName);
    }
    handleReset();
  };

  const handleReset = () => {
    setIsError(false);
    setErrMessage("");
    setCollectionName("");
    setOpenAddDialog(false);
    setOpenConfirmDialog(false);
    setIsEdit(false);
  };

  const handleRemoveCollection = (isSubmit: boolean) => {
    if (isSubmit) {
      removeCollection(collectionName);
    }
    handleReset();
  };

  const handleClickRemoveCollection = (name: string) => {
    setOpenConfirmDialog(true);
    setCollectionName(name);
  };

  const handleClickEditCollection = (name: string) => {
    setIsEdit(true);
    setOpenAddDialog(true);

    const existingCollection: CollectionType = checkCollectionExists(
      tmpCollections,
      name,
      "find"
    );
    setSelectedCollection(existingCollection);
    setCollectionName(name);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCollectionName(value);
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setTmpCollections(collections);
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [collections]);

  const dialogContent = (
    <div>
      <Input
        label="Collection Name"
        type="text"
        onChange={handleChange}
        value={collectionName}
        isError={isError}
      />
      <ErrorLabel>{errMessage}</ErrorLabel>
    </div>
  );

  return (
    <Container>
      <Title>Collection list</Title>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <AddContainer>
            <CustomButton onClick={() => setOpenAddDialog(true)}>
              Add New Collection
            </CustomButton>
          </AddContainer>

          {!tmpCollections.length ? (
            <div>You don't have collection yet!</div>
          ) : (
            <CardContainer>
              {tmpCollections.map((collection, idx) => (
                <Card
                  key={idx}
                  data={{
                    title: collection.name,
                    image: collection.animes?.[0]?.coverImage.large,
                  }}
                  onClick={() => handleRedirect(collection.name)}
                  withButtonRemove
                  buttonRemoveText="Delete Collection"
                  onRemove={handleClickRemoveCollection}
                  withButtonEdit
                  onEdit={handleClickEditCollection}
                />
              ))}
            </CardContainer>
          )}
        </>
      )}

      <Dialog
        isOpen={openAddDialog}
        title={`${isEdit ? "Edit" : "Add new"} collections`}
        message={dialogContent}
        withCancel
        buttonActionTitle="Save"
        onButtonClick={isEdit ? handleEditCollection : handleAddCollection}
      />

      <Dialog
        isOpen={openConfirmDialog}
        title={`Remove collection?`}
        message={`Are you sure you want to remove ${collectionName} from your collections?`}
        withCancel
        buttonActionTitle="Remove"
        onButtonClick={handleRemoveCollection}
      />
    </Container>
  );
};

export default CollectionList;
