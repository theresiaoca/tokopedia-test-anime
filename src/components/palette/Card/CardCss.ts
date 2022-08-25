import styled from "@emotion/styled";

type TitleTextProps = {
  color: string;
};

export const ItemCard = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  position: relative;
  width: 185px;
  cursor: pointer;
  text-align: center;
  grid-gap: 10px;

  @media screen and (max-width: 1040px) {
    width: 100%;
  }
`;

export const ImageContainer = styled.div`
  position: relative;

  @media screen and (max-width: 1040px) {
    content: "";
    display: block;
    height: auto;
  }
`;

export const ImageCard = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
  max-height: 250px;

  @media screen and (max-width: 960px) {
    max-height: 200px;
  }

  @media screen and (max-width: 960px) {
    max-height: 220px;
  }
`;

export const TitleText = styled.div<TitleTextProps>`
  color: #668bad;

  &:hover {
    color: ${(props) => props.color};
  }
`;

export const Checkbox = styled.input`
  position: absolute;
  z-index: 999;
`;
