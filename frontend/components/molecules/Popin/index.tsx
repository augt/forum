import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  PopinBackground,
  PopinContainer,
  PopinHeader,
  PopinMainContentContainer,
  StyledForm,
} from "./index.style";
import { CommentType, PublicationType } from "@/components/dataTypes";
import CloseIcon from "@mui/icons-material/Close";
import PublishIcon from "@mui/icons-material/Publish";
import { StyledButton } from "@/components/atoms/Button/index.style";
import { TitleTextInput } from "../CreatePublicationForm/index.style";
import { StyledTextArea } from "@/components/atoms/TextArea/index.style";
import axios from "axios";
import { ConnectedUserContext } from "@/components/Context";

export type PopinProps = {
  publicationToEdit?: PublicationType;
  commentToEdit?: CommentType;
  onClose: () => void;
  setPublications: Dispatch<SetStateAction<PublicationType[]>>;
  publications: PublicationType[];
};
export default function Popin({
  publicationToEdit,
  commentToEdit,
  onClose,
  setPublications,
  publications,
}: PopinProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const { connectedUser, authToken } = useContext(ConnectedUserContext);

  async function saveModifiedPublication(
    publicationId: string,
    newTitle: string,
    newText: string
  ) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_SCHEME || "http"}://${
          process.env.NEXT_PUBLIC_API_HOST || "localhost:3001"
        }/publications/${publicationId}`,
        {
          title: newTitle ? newTitle : undefined,
          text: newText ? newText : undefined,
        },
        {
          headers: { Authorization: "Bearer " + authToken },
        }
      );

      if (response.status === 200) {
        const updatedPublication = response.data;

        publications.splice(
          publications.findIndex(
            (publication) => publication.id === publicationId
          ),
          1,
          updatedPublication
        );
        setPublications([...publications]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function saveModifiedComment(commentId: string, newText: string) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_SCHEME || "http"}://${
          process.env.NEXT_PUBLIC_API_HOST || "localhost:3001"
        }/comments/${commentId}`,
        {
          title: newTitle ? newTitle : undefined,
          text: newText ? newText : undefined,
        },
        {
          headers: { Authorization: "Bearer " + authToken },
        }
      );

      if (response.status === 200) {
        const updatedComment = response.data;

        updatedComment.user.username = connectedUser.username;
        updatedComment.user.id = connectedUser.id;

        const commentsList = publications.find((publication) =>
          publication.comments.find((comment) => comment.id === commentId)
        )?.comments;

        commentsList?.splice(
          commentsList.findIndex((comment) => comment.id === commentId),
          1,
          updatedComment
        );
        setPublications([...publications]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <PopinBackground>
      <PopinContainer>
        <PopinHeader>
          <StyledButton onClick={onClose}>
            <CloseIcon />
          </StyledButton>
        </PopinHeader>

        <StyledForm>
          {publicationToEdit && (
            <>
              <label htmlFor="title">Titre</label>
              <TitleTextInput
                id="title"
                defaultValue={publicationToEdit?.title}
                onChange={(event) => {
                  setNewTitle(event.target.value);
                }}
              />
            </>
          )}

          <label htmlFor="text">
            Votre {publicationToEdit ? "message" : "commentaire"}
          </label>
          <StyledTextArea
            id="text"
            defaultValue={
              publicationToEdit ? publicationToEdit.text : commentToEdit?.text
            }
            onChange={(event) => {
              setNewText(event.target.value);
            }}
          />
          <StyledButton
            onClick={(e) => {
              e.preventDefault();
              if (publicationToEdit)
                saveModifiedPublication(
                  publicationToEdit.id,
                  newTitle,
                  newText
                );
              if (commentToEdit) saveModifiedComment(commentToEdit.id, newText);
              onClose();
            }}
          >
            <PublishIcon />
            <div>Publier</div>
          </StyledButton>
        </StyledForm>
      </PopinContainer>
    </PopinBackground>
  );
}
