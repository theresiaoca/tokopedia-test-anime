import { Arrow, PaginationContainer } from "./PaginationCss";

type PaginationProps = {
  handleNext: () => void;
  handlePrev: () => void;
  disabledPrev: boolean;
  disabledNext: boolean;
  text: string;
};
const Pagination = ({
  handleNext,
  handlePrev,
  disabledPrev,
  disabledNext,
  text,
}: PaginationProps) => {
  return (
    <PaginationContainer>
      <Arrow
        onClick={!disabledPrev ? handlePrev : undefined}
        style={{ cursor: disabledPrev ? "auto" : "pointer" }}
      >
        &lt;
      </Arrow>
      {text}
      <Arrow
        onClick={!disabledNext ? handleNext : undefined}
        style={{ cursor: disabledNext ? "auto" : "pointer" }}
      >
        &gt;
      </Arrow>
    </PaginationContainer>
  );
};

export default Pagination;
