import { CSSProperties } from "react";
import { PrimaryButton, SecondaryButton, TextButton } from "./ButtonCss";

export type CustomButtonProps = {
  type?: "primary" | "secondary" | "text";
  color?: "primary" | "error";
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fullWdith?: boolean;
  style?: CSSProperties | any;
};

const CustomButton = ({
  type = "primary",
  color = "primary",
  children,
  onClick,
  fullWdith,
  style,
}: CustomButtonProps) => {
  return type === "primary" ? (
    <PrimaryButton
      color={color}
      onClick={onClick}
      style={{ ...style, width: fullWdith ? "100%" : "" }}
    >
      {children}
    </PrimaryButton>
  ) : type === "secondary" ? (
    <SecondaryButton
      color={color}
      onClick={onClick}
      style={{ ...style, width: fullWdith ? "100%" : "" }}
    >
      {children}
    </SecondaryButton>
  ) : (
    <TextButton
      color={color}
      onClick={onClick}
      style={{ ...style, width: fullWdith ? "100%" : "" }}
    >
      {children}
    </TextButton>
  );
};

export default CustomButton;
