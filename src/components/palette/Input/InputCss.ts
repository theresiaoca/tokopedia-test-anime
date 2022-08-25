import styled from "@emotion/styled";

export const InputLabel = styled.div`
  margin-bottom: 5px;
`;

export type InputValueProps = {
  isError?: boolean;
};
export const InputValue = styled.input`
  border-color: ${(props: InputValueProps) => props.isError && "red"};
  width: 100%;
  height: 25px;
`;

export const ErrorLabel = styled.div`
  font-size: 14px;
  color: red;
`;
