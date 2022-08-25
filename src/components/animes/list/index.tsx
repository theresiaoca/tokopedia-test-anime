import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import {
  CardContainer,
  Container,
  Title,
  BulkAddContainer,
} from "./AnimeListCss";
import Card from "../../palette/Card";
import CustomButton from "../../palette/CustomButton";
import LoadingIndicator from "../../palette/LoadingIndicator";
import Pagination from "../../palette/Pagination";

import { AnimeType, PageInfoType } from "../types";
import {
  GetAnimeListParamType,
  GetAnimeListResponseType,
  GET_ANIME_LIST,
} from "../queries";

const AnimeList = () => {
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState<AnimeType[]>([]);
  const [isBulkAddActive, setIsBulkAddActive] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    currentPage: 1,
    perPage: 10,
    hasNextPage: false,
    lastPage: 1,
    total: 0,
  });
  const [selectedAnimeIds, setSelectedAnimeIds] = useState<number[]>([]);

  const [getAnimeList, { loading }] = useLazyQuery<
    GetAnimeListResponseType,
    GetAnimeListParamType
  >(GET_ANIME_LIST, {
    fetchPolicy: "network-only",
    onCompleted: (res) => {
      const page = res.Page.pageInfo;
      const medias = res.Page.media;
      setPageInfo({
        currentPage: page.currentPage,
        perPage: page.perPage,
        hasNextPage: page.hasNextPage,
        lastPage: page.lastPage,
        total: page.total,
      });

      const tmpData: AnimeType[] = medias.map((media) => ({
        id: media.id,
        title: media.title.romaji,
        coverImage: media.coverImage,
      }));
      setAnimeList(tmpData);
    },
  });

  const handleRedirect = (id: number) => {
    navigate(`/animes/${id}`);
  };

  const handleBulkAddCollection = () => {
    console.log(selectedAnimeIds);
  };

  const handleCancelBulkAddCollection = () => {
    setSelectedAnimeIds([]);
    setIsBulkAddActive(false);
  };

  const handleNext = () => {
    setPageInfo((prev) => ({
      ...prev,
      perPage: 10,
      currentPage: prev.currentPage + 1,
    }));
  };

  const handlePrev = () => {
    setPageInfo((prev) => ({
      ...prev,
      perPage: 10,
      currentPage: prev.currentPage - 1,
    }));
  };

  useEffect(() => {
    getAnimeList({
      variables: {
        page: pageInfo.currentPage,
        perPage: pageInfo.perPage,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo.currentPage, pageInfo.perPage]);

  return (
    <Container>
      <Title>Anime list</Title>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <BulkAddContainer>
            {isBulkAddActive ? (
              <>
                <div>{selectedAnimeIds.length} terpilih</div>
                <CustomButton
                  color="error"
                  type="text"
                  onClick={handleCancelBulkAddCollection}
                >
                  Cancel
                </CustomButton>
                <CustomButton onClick={handleBulkAddCollection}>
                  Add to Collections
                </CustomButton>
              </>
            ) : (
              <CustomButton onClick={() => setIsBulkAddActive(true)}>
                Bulk Add to Collections
              </CustomButton>
            )}
          </BulkAddContainer>
          <CardContainer>
            {animeList.map((anime) => (
              <Card
                key={anime.id}
                data={{
                  id: anime.id,
                  title: anime.title,
                  image: anime.coverImage.large,
                  color: anime.coverImage.color,
                }}
                onClick={handleRedirect}
                withCheckbox={isBulkAddActive}
                setSelectedItems={setSelectedAnimeIds}
              />
            ))}
            <Pagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              disabledPrev={pageInfo.currentPage === 1}
              disabledNext={!pageInfo.hasNextPage}
              text={`Page ${pageInfo.currentPage}/${pageInfo.lastPage}`}
            />
          </CardContainer>
        </>
      )}
    </Container>
  );
};

export default AnimeList;
