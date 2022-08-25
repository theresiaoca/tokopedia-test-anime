import { useState, lazy, useContext, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import {
  AnimeDescription,
  AnimeDetailContainer,
  AnimeImage,
  Title,
  BannerImage,
  BannerImageContainer,
  AnimeHeaderContainer,
  ImageContainer,
  InputFieldContainer,
  CollectionCheckboxContainer,
  CollectionListContainer,
} from "./AnimeDetailCss";
import LoadingIndicator from "../../palette/LoadingIndicator";
import CustomButton from "../../palette/CustomButton";
import Input from "../../palette/Input";
import { ErrorLabel } from "../../palette/Input/InputCss";

import {
  CollectionContext,
  CollectionType,
} from "../../collections/CollectionContext";
import { checkCollectionExists } from "../../helpers/checkCollectionExists";
import { checkDuplicateCollectionByName } from "../../helpers/checkDuplicateCollection";

import {
  GetAnimeDetailParamType,
  GetAnimeDetailResponseType,
  GET_ANIME_DETAIL,
} from "../queries";
import { MediaType } from "../types";
import { INITIAL_ANIME_DETAIL, SPECIAL_CHAR_FORMAT } from "../constants";
import AnimeInfo from "./components/AnimeInfo";

const Dialog = lazy(() => import("../../palette/Dialog"));

const AnimeDetail = () => {
  const { collections, addCollection, addAnimeToCollection } =
    useContext(CollectionContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [animeDetail, setAnimeDetail] =
    useState<MediaType>(INITIAL_ANIME_DETAIL);
  const [openDialog, setOpenDialog] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState<
    CollectionType[]
  >([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [showInputField, setShowInputField] = useState(false);

  const animeCollections = useMemo(() => {
    return collections.filter((collection) =>
      collection.animes.some((anime) => anime.id === animeDetail.id)
    );
  }, [collections, animeDetail.id]);

  const { loading } = useQuery<
    GetAnimeDetailResponseType,
    GetAnimeDetailParamType
  >(GET_ANIME_DETAIL, {
    fetchPolicy: "network-only",
    variables: {
      id: parseInt(id || "0"),
    },
    onCompleted: (res) => {
      const media = res.Media;
      setAnimeDetail(media);
    },
  });

  const handleAddAnimeToCollection = (isSubmit: boolean) => {
    if (isSubmit) {
      const selectedCollectionIds = selectedCollections.map(
        (selected) => selected.id
      );
      addAnimeToCollection(selectedCollectionIds, [animeDetail]);
    }
    setOpenDialog(false);
    setShowInputField(false);
  };

  const handleAddCollection = () => {
    const duplicate = checkDuplicateCollectionByName(
      collections,
      newCollectionName
    );

    if (newCollectionName === "") {
      setErrMessage("Collection name cannot be empty!");
      setIsError(true);
      return;
    }

    if (duplicate) {
      setErrMessage(`${newCollectionName} already exists in colections!`);
      setIsError(true);
      return;
    }

    if (SPECIAL_CHAR_FORMAT.test(newCollectionName)) {
      setErrMessage("Collection name cannot contain special characters!");
      setIsError(true);
      return;
    }

    const newCollection: CollectionType = {
      id: (collections.slice(-1)?.[0]?.id || 0) + 1,
      name: newCollectionName,
      animes: [],
    };
    addCollection([newCollection]);
    handleReset();
  };

  const handleReset = () => {
    setIsError(false);
    setErrMessage("");
    setShowInputField(false);
    setNewCollectionName("");
    setSelectedCollections([]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewCollectionName(value);
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    const selected = collections.filter(
      (collection) => collection.id === parseInt(value)
    );
    setSelectedCollections((prev) => {
      return checked
        ? [...(prev ? prev : []), ...selected]
        : prev?.filter((item) => item.id !== parseInt(value));
    });
  };

  const redirectToCollection = (id: number) => {
    navigate(`/collections/${id}`);
  };

  const dialogContent = (
    <div>
      <div>
        <div
          style={{
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          Choose Collections:
        </div>
        {!collections.length ? (
          <div>You don't have collection yet!</div>
        ) : (
          <CollectionListContainer>
            {collections.map(
              (collection) =>
                !checkCollectionExists<boolean>(
                  animeCollections,
                  collection.id,
                  "some"
                ) && (
                  <CollectionCheckboxContainer>
                    <input
                      key={collection.id}
                      id={`${collection.id}`}
                      name={`${collection.id}`}
                      value={collection.id}
                      type="checkbox"
                      onChange={handleChangeCheckbox}
                    />
                    <label htmlFor={`${collection.id}`}>
                      {collection.name}
                    </label>
                  </CollectionCheckboxContainer>
                )
            )}
          </CollectionListContainer>
        )}
        <InputFieldContainer>
          {!showInputField && (
            <CustomButton
              type="text"
              onClick={() => setShowInputField(true)}
              style={{ padding: 0 }}
            >
              Add new collection
            </CustomButton>
          )}
          {showInputField && (
            <>
              <Input
                label="Input new collection name"
                type="text"
                onChange={handleChange}
                value={newCollectionName}
                isError={isError}
              />
              <ErrorLabel>{errMessage}</ErrorLabel>
              <div style={{ marginTop: "5px" }}>
                <CustomButton
                  type="text"
                  color="error"
                  onClick={handleReset}
                  style={{ padding: "3px 5px" }}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  onClick={handleAddCollection}
                  style={{ padding: "3px 5px" }}
                >
                  Add
                </CustomButton>
              </div>
            </>
          )}
        </InputFieldContainer>
      </div>
    </div>
  );

  return loading ? (
    <LoadingIndicator marginTop="15px" />
  ) : (
    <>
      {animeDetail.bannerImage && (
        <BannerImageContainer>
          <BannerImage imageLink={animeDetail.bannerImage}></BannerImage>
        </BannerImageContainer>
      )}
      <AnimeDetailContainer>
        <AnimeHeaderContainer>
          <ImageContainer>
            <AnimeImage src={animeDetail.coverImage.large} />
            <CustomButton fullWdith onClick={() => setOpenDialog(true)}>
              Add to Collections
            </CustomButton>
          </ImageContainer>
          <div>
            <Title>{animeDetail.title.romaji}</Title>
            <AnimeDescription>
              <div
                dangerouslySetInnerHTML={{ __html: animeDetail.description }}
              />
            </AnimeDescription>
          </div>
        </AnimeHeaderContainer>
        <AnimeInfo
          animeDetail={animeDetail}
          animeCollections={animeCollections}
          onRedirect={redirectToCollection}
        />
      </AnimeDetailContainer>

      <Dialog
        isOpen={openDialog}
        title={`Add ${animeDetail.title.romaji} to collections`}
        message={dialogContent}
        withCancel
        buttonActionTitle="Save"
        onButtonClick={handleAddAnimeToCollection}
      />
    </>
  );
};

export default AnimeDetail;
