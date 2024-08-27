import { StyledTextArea } from "@/components/atoms/TextArea/index.style";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { StyledForm } from "./index.style";
import { StyledButton } from "@/components/atoms/Button/index.style";
import PublishIcon from "@mui/icons-material/Publish";
import axios from "axios";
import { ConnectedUserContext } from "@/components/Context";
import { PublicationType } from "@/components/dataTypes";

export type CommentFormProps = {
  publications: PublicationType[];
  setPublications: Dispatch<SetStateAction<PublicationType[]>>;
  publicationId: string;
};

export default function CreateCommentForm({
  publications,
  setPublications,
  publicationId,
}: CommentFormProps) {
  const [commentText, setCommentText] = useState("");
  const { connectedUser, authToken } = useContext(ConnectedUserContext);

  async function createComment(commentText: string, publicationId: string) {
    try {
      const response = await axios.post(
        "http://localhost:3001/comments",
        {
          publication: publicationId,
          text: commentText,
        },
        {
          headers: { Authorization: "Bearer " + authToken },
        }
      );

      const createdComment = response.data;

      createdComment.user.username = connectedUser.username;
      createdComment.user.id = connectedUser.id;

      publications
        .find((pub) => pub.id === publicationId)
        ?.comments.push(createdComment);

      setPublications([...publications]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <StyledForm>
      <label htmlFor="commentText">Votre commentaire</label>
      <StyledTextArea
        id="commentText"
        onChange={(event) => {
          setCommentText(event.target.value);
        }}
      />
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          createComment(commentText, publicationId);
        }}
      >
        <PublishIcon />
        <div>Publier</div>
      </StyledButton>
    </StyledForm>
  );
}
function setPublications(arg0: any[]) {
  throw new Error("Function not implemented.");
}
