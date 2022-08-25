import CustomButton from "../CustomButton";
import {
  ButtonActionContainer,
  Modal,
  ModalContent,
  ModalTitle,
} from "./DialogCss";

export type DialogProps = {
  isOpen: boolean;
  title: string | JSX.Element;
  message: string | JSX.Element;
  withCancel?: boolean;
  buttonActionTitle: string;
  buttonCancelTitle?: string;
  onButtonClick: (isSubmit: boolean) => void;
};
const Dialog = ({
  isOpen,
  title,
  message,
  withCancel = false,
  buttonActionTitle,
  buttonCancelTitle = "Cancel",
  onButtonClick,
}: DialogProps) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        {message}
        <ButtonActionContainer>
          {withCancel && (
            <CustomButton
              onClick={() => onButtonClick(false)}
              type="text"
              color="error"
            >
              {buttonCancelTitle}
            </CustomButton>
          )}
          <CustomButton
            onClick={() => onButtonClick(withCancel ? true : false)}
          >
            {buttonActionTitle}
          </CustomButton>
        </ButtonActionContainer>
      </ModalContent>
    </Modal>
  );
};

export default Dialog;
