import styled from "@emotion/styled";

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
`;

export const Arrow = styled.div`
  border: 1px solid #668bad;
  background-color: #668bad;
  padding: 10px;
  border-radius: 4px;
  color: white;

  &:hover {
    background-color: #4e6a82;
    border-color: #4e6a82;
    cursor: pointer;
  }
`;
