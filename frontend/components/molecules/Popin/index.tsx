import { Dispatch, SetStateAction } from "react";
import { PopinBackground, PopinContainer } from "./index.style";
import { CommentType, PublicationType } from "@/components/dataTypes";
import CloseIcon from "@mui/icons-material/Close";

export type PopinProps = {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  publicationToEdit?: PublicationType;
  commentToEdit?: CommentType;
  onClose: () => void;
};
export default function Popin({ setIsEditing }: PopinProps) {
  return (
    <PopinBackground>
      <PopinContainer>TEST</PopinContainer>
    </PopinBackground>
  );
}
