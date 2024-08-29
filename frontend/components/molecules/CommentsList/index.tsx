import { CommentType, PublicationType } from "@/components/dataTypes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  ButtonsGroup,
  CommentContainer,
  CommentInfos,
  CommentLowerBlock,
  CommentsListContainer,
  CommentText,
} from "./index.style";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { StyledButton } from "@/components/atoms/Button/index.style";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { ConnectedUserContext } from "@/components/Context";
import axios from "axios";
import Popin from "../Popin";

export type CommentsListProps = {
  comments: CommentType[];
  publications: PublicationType[];
  setPublications: Dispatch<SetStateAction<PublicationType[]>>;
  publicationId: string;
};

export default function CommentsList({
  comments,
  publications,
  setPublications,
  publicationId,
}: CommentsListProps) {
  const { connectedUser, authToken } = useContext(ConnectedUserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState<CommentType>();

  async function deleteComment(commentId: string, publicationId: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3001/comments/${commentId}`,

        {
          headers: { Authorization: "Bearer " + authToken },
        }
      );

      if (response.status === 200) {
        publications
          .find((publication) => publication.id === publicationId)
          ?.comments.splice(
            comments.findIndex((comment) => comment.id === commentId),
            1
          );
        setPublications([...publications]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <CommentsListContainer>
        {comments.map((comment, index) => (
          <CommentContainer key={index}>
            <CommentText>{comment.text}</CommentText>

            <CommentLowerBlock>
              <CommentInfos>
                <div>{comment.user.username}</div>
                <div>
                  {dayjs(comment.createdAt)
                    .locale("fr")
                    .format("DD MMMM YYYY à HH:mm")}
                </div>
                {comment.updatedAt && (
                  <div>
                    Modifié le{" "}
                    {dayjs(comment.updatedAt)
                      .locale("fr")
                      .format("DD MMMM YYYY à HH:mm")}
                  </div>
                )}
              </CommentInfos>
              {comment.user.id === connectedUser.id && (
                <ButtonsGroup>
                  <StyledButton
                    onClick={() => {
                      setCommentToEdit(comment);
                      setIsEditing(!isEditing);
                    }}
                  >
                    <EditIcon />
                  </StyledButton>
                  <StyledButton
                    onClick={() => {
                      deleteComment(comment.id, publicationId);
                    }}
                  >
                    <DeleteForeverIcon />
                  </StyledButton>
                </ButtonsGroup>
              )}
            </CommentLowerBlock>
          </CommentContainer>
        ))}
      </CommentsListContainer>
      {isEditing && (
        <Popin
          onClose={() => {
            setIsEditing(false);
            setCommentToEdit(undefined);
          }}
          commentToEdit={commentToEdit}
          setPublications={setPublications}
          publications={publications}
        ></Popin>
      )}
    </>
  );
}
