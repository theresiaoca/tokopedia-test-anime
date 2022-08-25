import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardContainer, Title } from "../../animes/list/AnimeListCss";
import { MediaType } from "../../animes/types";
import { checkCollectionExists } from "../../helpers/checkCollectionExists";
import Card from "../../palette/Card";
import CustomButton from "../../palette/CustomButton";
import LoadingIndicator from "../../palette/LoadingIndicator";
import { CollectionContext, CollectionType } from "../CollectionContext";
import { AddContainer, Container } from "../list/CollectionListCss";

const CollectionDetail = () => {
  const { collections } = useContext(CollectionContext);
  const { name } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [tmpCollections, setTmpCollections] = useState<
    Pick<MediaType, "id" | "title" | "coverImage">[]
  >([]);

  const handleRedirect = (id: number) => {
    navigate(`/animes/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const selectedCollection = checkCollectionExists<CollectionType>(
        collections,
        name || "",
        "find"
      );
      if (selectedCollection) {
        setTmpCollections(selectedCollection.animes);
      }
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [collections]);

  return (
    <Container>
      <Title>{name}</Title>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <AddContainer>
            <CustomButton onClick={() => setOpenEditDialog(true)}>
              Edit Collection Name
            </CustomButton>
          </AddContainer>

          {!tmpCollections.length ? (
            <div>You haven't add anything to this collection!</div>
          ) : (
            <CardContainer>
              {tmpCollections.map((collection, idx) => (
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
                  // onRemove={handleClickRemoveCollection}
                />
              ))}
            </CardContainer>
          )}
        </>
      )}

      {/* <Dialog
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
      /> */}
    </Container>
  );
};

export default CollectionDetail;
