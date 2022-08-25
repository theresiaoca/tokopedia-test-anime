import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CardContainer, Title } from "../../animes/list/AnimeListCss";
import Card from "../../palette/Card";
import CustomButton from "../../palette/CustomButton";
import LoadingIndicator from "../../palette/LoadingIndicator";
import { AddContainer, Container } from "../list/CollectionListCss";
import Dialog from "../../palette/Dialog";
import Input from "../../palette/Input";
import { ErrorLabel } from "../../palette/Input/InputCss";

import { CollectionContext, CollectionType } from "../CollectionContext";
import { checkCollectionExists } from "../../helpers/checkCollectionExists";
import { checkDuplicateCollectionByName } from "../../helpers/checkDuplicateCollection";

import { MediaType } from "../../animes/types";
import { SPECIAL_CHAR_FORMAT } from "../../animes/constants";

const CollectionDetail = () => {
  const { collections, removeAnimeFromCollection, editCollection } =
    useContext(CollectionContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [tmpAnimes, setTmpAnimes] = useState<
    Pick<MediaType, "id" | "title" | "coverImage">[]
  >([]);
  const [selectedAnime, setSelectedAnime] =
    useState<Pick<MediaType, "id" | "title" | "coverImage">>();
  const [errMessage, setErrMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const selectedCollection = useMemo(() => {
    return checkCollectionExists<CollectionType>(
      collections,
      parseInt(id || "0"),
      "find"
    );
  }, [collections, id]);

  const handleRedirect = (id: number) => {
    navigate(`/animes/${id}`);
  };

  const handleClickRemoveAnime = (id: number) => {
    const selected = tmpAnimes.find((anime) => anime.id === id);
    if (selected) {
      setSelectedAnime(selected);
    }
    setOpenConfirmDialog(true);
  };

  const handleRemoveAnime = (isSubmit: boolean) => {
    if (isSubmit) {
      removeAnimeFromCollection(selectedCollection.id, selectedAnime?.id || 0);
    }
    setOpenConfirmDialog(false);
  };

  const handleEditCollection = (isSubmit: boolean) => {
    if (isSubmit) {
      const duplicate = checkDuplicateCollectionByName(
        collections,
        collectionName
      );

      if (collectionName === "") {
        setErrMessage("Collection name cannot be empty!");
        setIsError(true);
        return;
      }

      if (duplicate) {
        setErrMessage(`${collectionName} already exists in colections!`);
        setIsError(true);
        return;
      }

      if (SPECIAL_CHAR_FORMAT.test(collectionName)) {
        setErrMessage("Collection name cannot contain special characters!");
        setIsError(true);
        return;
      }

      editCollection(selectedCollection.name, collectionName);
    }
    setErrMessage("");
    setCollectionName("");
    setOpenEditDialog(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCollectionName(value);
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      if (selectedCollection) {
        setCollectionName(selectedCollection.name);
        setTmpAnimes(selectedCollection.animes);
      }
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedCollection]);

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
      <Title>{selectedCollection?.name}</Title>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <AddContainer>
            <CustomButton onClick={() => setOpenEditDialog(true)}>
              Edit Collection Name
            </CustomButton>
          </AddContainer>

          {!tmpAnimes.length ? (
            <div>You haven't add anything to this collection!</div>
          ) : (
            <CardContainer>
              {tmpAnimes.map((collection, idx) => (
                <Card
                  key={idx}
                  data={{
                    title: collection.title.romaji,
                    image: collection.coverImage.large,
                    id: collection.id,
                  }}
                  onClick={() => handleRedirect(collection.id)}
                  withButtonRemove
                  buttonRemoveText="Remove From Collection"
                  onRemove={handleClickRemoveAnime}
                />
              ))}
            </CardContainer>
          )}
        </>
      )}

      <Dialog
        isOpen={openEditDialog}
        title={`Edit collections`}
        message={dialogContent}
        withCancel
        buttonActionTitle="Save"
        onButtonClick={handleEditCollection}
      />

      <Dialog
        isOpen={openConfirmDialog}
        title={`Remove ${selectedAnime?.title.romaji} collection?`}
        message={`Are you sure you want to remove ${selectedAnime?.title.romaji} from your collections?`}
        withCancel
        buttonActionTitle="Remove"
        onButtonClick={handleRemoveAnime}
      />
    </Container>
  );
};

export default CollectionDetail;
