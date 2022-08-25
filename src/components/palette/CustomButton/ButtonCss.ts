import styled from "@emotion/styled";
import { CustomButtonProps } from ".";

export const PrimaryButton = styled.button<Pick<CustomButtonProps, "color">>`
  background-color: ${(props) =>
    props.color === "primary" ? "#668bad" : "red"};
  color: white;
  padding: 5px 10px;
  border: 1px solid
    ${(props) => (props.color === "primary" ? "#668bad" : "red")};
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.color === "primary" ? "#54738f" : "#880808"};
    border: 1px solid
      ${(props) => (props.color === "primary" ? "#54738f" : "#880808")};
  }
`;

export const SecondaryButton = styled.button<Pick<CustomButtonProps, "color">>`
  background-color: white;
  border: 1px solid
    ${(props) => (props.color === "primary" ? "#668bad" : "red")};
  color: ${(props) => (props.color === "primary" ? "#668bad" : "red")};
  padding: 5px 10px;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    border: 1px solid
      ${(props) => (props.color === "primary" ? "#54738f" : "#880808")};
    color: ${(props) => (props.color === "primary" ? "#54738f" : "#880808")};
  }
`;

export const TextButton = styled.button<Pick<CustomButtonProps, "color">>`
  background-color: white;
  border: none;
  color: ${(props) => (props.color === "primary" ? "#668bad" : "red")};
  padding: 5px 10px;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    border: none;
    color: ${(props) => (props.color === "primary" ? "#54738f" : "#880808")};
  }
`;
