import styled from "@emotion/styled";

export type ModalProps = {
  isOpen: boolean;
};
export const Modal = styled.div`
  display: ${(props: ModalProps) => (props.isOpen ? "block" : "none")};
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: auto;
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 600px) {
    width: 60%;
  }
`;

export const ModalTitle = styled.div`
  font-size: 18px;
`;
export const ButtonActionContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;

export type ButtonActionProps = {
  width?: number | string;
}
