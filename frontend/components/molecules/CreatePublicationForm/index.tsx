import { PublicationType } from "@/components/dataTypes";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { GreetingMessage, StyledForm, TitleTextInput } from "./index.style";
import { ConnectedUserContext } from "@/components/Context";
import { StyledButton } from "@/components/atoms/Button/index.style";
import PublishIcon from "@mui/icons-material/Publish";
import axios from "axios";
import { StyledTextArea } from "@/components/atoms/TextArea/index.style";

export type CreatePublicationFormProps = {
  publications: PublicationType[];
  setPublications: Dispatch<SetStateAction<PublicationType[]>>;
};

export function CreatePublicationForm({
  publications,
  setPublications,
}: CreatePublicationFormProps) {
  const { connectedUser, authToken } = useContext(ConnectedUserContext);
  const [publicationTitle, setPublicationTitle] = useState("");
  const [publicationText, setPublicationText] = useState("");

  async function createPublication(
    publicationTitle: string,
    publicationText: string
  ) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_SCHEME || "http"}://${
          process.env.NEXT_PUBLIC_API_HOST || "localhost:3001"
        }/publications`,
        {
          title: publicationTitle,
          text: publicationText,
        },
        {
          headers: { Authorization: "Bearer " + authToken },
        }
      );

      const createdPublication = response.data;

      createdPublication.likes = [];
      createdPublication.comments = [];
      createdPublication.user.username = connectedUser.username;

      setPublications([createdPublication, ...publications]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StyledForm>
      <GreetingMessage>
        Bonjour {connectedUser.username}, que pensez-vous de la situation en
        général ?
      </GreetingMessage>
      <label htmlFor="publicationTitle">Titre</label>
      <TitleTextInput
        id="publicationTitle"
        onChange={(event) => {
          setPublicationTitle(event.target.value);
        }}
      />
      <label htmlFor="publicationText">Votre message</label>
      <StyledTextArea
        id="publicationText"
        onChange={(event) => {
          setPublicationText(event.target.value);
        }}
      />
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          createPublication(publicationTitle, publicationText);
        }}
      >
        <PublishIcon />
        <div>Publier</div>
      </StyledButton>
    </StyledForm>
  );
}
