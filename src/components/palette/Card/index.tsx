import CustomButton from "../CustomButton";
import {
  Checkbox,
  ImageContainer,
  ImageCard,
  ItemCard,
  TitleText,
} from "./CardCss";

type CardProps = {
  data: {
    id: number;
    title: string;
    image: string;
    color?: string;
  };
  onClick?: (id: number) => void;
  withCheckbox?: boolean;
  withButtonRemove?: boolean;
  buttonRemoveText?: string;
  onRemove?: (id: number) => void;
  withButtonEdit?: boolean;
  buttonEditText?: string;
  onEdit?: (id: number) => void;
  setSelectedItems?: React.Dispatch<React.SetStateAction<number[]>>;
};
const Card = ({
  data,
  onClick,
  withCheckbox = false,
  withButtonRemove = false,
  buttonRemoveText = "Remove",
  onRemove,
  withButtonEdit = false,
  buttonEditText = "Edit",
  onEdit,
  setSelectedItems,
}: CardProps) => {
  const handleOnClick = () => {
    if (onClick) onClick(data.id);
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const { checked } = e.target;
    if (setSelectedItems) {
      checked
        ? setSelectedItems((prev) => [...prev, data.id])
        : setSelectedItems((prev) => prev.filter((item) => item !== data.id));
    }
  };

  const handleRemove = () => {
    if (onRemove) onRemove(data.id);
  };

  return (
    <ItemCard>
      {withCheckbox && (
        <Checkbox type="checkbox" onChange={handleChangeCheckbox} />
      )}
      <ImageContainer>
        <ImageCard
          src={data.image || "/images/default-image.jpg"}
          alt={`cover-image-${data.title}`}
          onClick={handleOnClick}
          style={{ height: !data.image ? "300px" : "" }}
        />
      </ImageContainer>

      <TitleText color={data.color ? data.color : ""} onClick={handleOnClick}>
        {data.title}
      </TitleText>

      {withButtonEdit && (
        <CustomButton
          type="secondary"
          onClick={onEdit ? () => onEdit(data.id) : undefined}
        >
          {buttonEditText}
        </CustomButton>
      )}
      {withButtonRemove && (
        <CustomButton color="error" onClick={handleRemove}>
          {buttonRemoveText}
        </CustomButton>
      )}
    </ItemCard>
  );
};

export default Card;
