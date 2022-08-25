import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 20px auto;
  min-width: 320px;
  width: 100%;
  max-width: 1520px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  padding: 0 10px;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-gap: 28px 15px;
  grid-template-columns: repeat(5, 200px);
  justify-content: space-between;
  padding: 0 10px;

  @media screen and (max-width: 1040px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 25px 20px;
  }

  @media screen and (max-width: 760px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-gap: 20px 12px;
  }
`;

export const BulkAddContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
  align-items: center;
  padding: 0 10px;
`;
