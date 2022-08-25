import {
  AnimeInfoContainer,
  AnimeInfoRowContainer,
  CollectionChip,
  CollectionChipContainer,
  InfoText,
  InfoTitle,
} from "../AnimeDetailCss";

import { CollectionType } from "../../../collections/CollectionContext";

import { MediaType } from "../../types";

type AnimeInfoProps = {
  animeDetail: MediaType;
  animeCollections: CollectionType[];
  onRedirect: (id: number) => void;
};
const AnimeInfo = ({
  animeDetail,
  animeCollections,
  onRedirect,
}: AnimeInfoProps) => {
  return (
    <AnimeInfoContainer>
      <AnimeInfoRowContainer>
        <div>
          <InfoTitle>Episodes</InfoTitle>
          <InfoText>{animeDetail.episodes || "-"}</InfoText>
        </div>
        <div>
          <InfoTitle>Season</InfoTitle>
          <InfoText>
            {animeDetail.season} {animeDetail.seasonYear}
          </InfoText>
        </div>
        <div>
          <InfoTitle>Average Score</InfoTitle>
          <InfoText>{animeDetail.averageScore || 0}</InfoText>
        </div>
        <div>
          <InfoTitle>Popularity</InfoTitle>
          <InfoText>{animeDetail.popularity || 0}</InfoText>
        </div>
        <div>
          <InfoTitle>Genres</InfoTitle>
          <InfoText>{animeDetail.genres.join(", ")}</InfoText>
        </div>
      </AnimeInfoRowContainer>
      {!!animeCollections.length && (
        <>
          <InfoTitle>Added to Collections:</InfoTitle>
          <CollectionChipContainer>
            {animeCollections.map((animeCollection) => (
              <CollectionChip onClick={() => onRedirect(animeCollection.id)}>
                {animeCollection.name}
              </CollectionChip>
            ))}
          </CollectionChipContainer>
        </>
      )}
    </AnimeInfoContainer>
  );
};

export default AnimeInfo;
