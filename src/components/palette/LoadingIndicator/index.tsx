import styled from "@emotion/styled";

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #668bad;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  margin: auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

type LoadingIndicatorProps = {
  marginTop?: string;
};

const LoadingIndicator = ({ marginTop }: LoadingIndicatorProps) => {
  return <Loader style={{ marginTop: marginTop }} />;
};

export default LoadingIndicator;
