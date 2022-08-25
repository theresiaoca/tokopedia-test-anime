import styled from "@emotion/styled";

export const AnimeDetailContainer = styled.div`
  margin: 20px auto 60px auto;
  min-width: 320px;
  width: 100%;
  max-width: 1520px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media screen and (max-width: 1200px) {
    margin: 20px 0 60px 0;
  }
`;

type BannerImageProps = {
  imageLink: string;
};

export const BannerImageContainer = styled.div`
  height: 350px;

  @media screen and (max-width: 760px) {
    height: 250px;
  }
  @media screen and (max-width: 500px) {
    height: 200px;
  }
`;

export const BannerImage = styled.div<BannerImageProps>`
  background-image: url(${(props) => props.imageLink});
  background-position: 50% 35%;
  width: 100%;
  height: 100%;
  background-size: cover;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 0 10px;
  color: #7f8487;
`;

export const AnimeImage = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
  max-height: 300px;
  max-width: 250px;

  @media screen and (max-width: 1040px) {
    max-height: 250px;
    max-width: 200px;
  }
`;

export const AnimeDescription = styled.div`
  text-align: justify;
  padding: 10px;
  color: #7f8487;
`;

export const AnimeInfoRowContainer = styled.div`
  padding: 15px;
  display: grid;
  grid-gap: 28px 15px;
  border-radius: 4px;
  background-color: #ebf4fa;
  grid-template-columns: repeat(auto-fill, 18%);
  justify-content: space-between;

  @media screen and (max-width: 660px) {
    width: auto;
    grid-template-columns: none;
  }
`;

export const AnimeHeaderContainer = styled.div`
  display: flex;
  gap: 30px;
  border-bottom: 1px dashed #54738f;
  padding: 15px;

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const InfoTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #668bad;
`;

export const InfoText = styled.div`
  font-weight: bold;
  color: #7f8487;
  font-size: 13px;
`;

export const ImageContainer = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const AnimeInfoContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px;
  flex-direction: column;
`;

export const InputFieldContainer = styled.div`
  margin-top: 20px;
`;

export const CollectionCheckboxContainer = styled.div`
  display: block;
`;

export const CollectionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 100px;
`;

export const CollectionChipContainer = styled.div`
  display: flex;
  gap: 15px;
`;
export const CollectionChip = styled.div`
  padding: 10px;
  background-color: #ebf4fa;
  color: #668bad;

  &:hover {
    cursor: pointer;
    color: #4e6a82;
    text-decoration: underline;
  }
`;
