import { StyledInput } from "@/components/atoms/Input/index.style";
import { InputContainer, StyledForm } from "./index.style";
import { useContext, useState } from "react";
import { ConnectedUserContext } from "@/components/Context";
import SaveIcon from "@mui/icons-material/Save";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import axios from "axios";
import { StyledButton } from "@/components/atoms/Button/index.style";

export default function EditProfileForm() {
  const { connectedUser, authToken, setConnectedUser } =
    useContext(ConnectedUserContext);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function saveModifiedProfile(
    newUsername: string,
    newEmail: string,
    newPassword: string
  ) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_SCHEME || "http"}://${
          process.env.NEXT_PUBLIC_API_HOST || "localhost:3001"
        }/users`,
        {
          username: newUsername ? newUsername : undefined,
          email: newEmail ? newEmail : undefined,
          password: newPassword ? newPassword : undefined,
        },
        {
          headers: { Authorization: "Bearer " + authToken },
        }
      );

      setConnectedUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <StyledForm>
      <InputContainer>
        <label htmlFor="username">Pseudo</label>
        <StyledInput
          type="text"
          id="username"
          defaultValue={connectedUser.username}
          onChange={(event) => {
            setNewUsername(event.target.value);
          }}
        />
      </InputContainer>

      <InputContainer>
        <label htmlFor="email">Email</label>
        <StyledInput
          type="email"
          id="email"
          defaultValue={connectedUser.email}
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="password">Mot de passe</label>
        <StyledInput
          type="password"
          id="password"
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
      </InputContainer>
      <div>
        Créé le{" "}
        {dayjs(connectedUser.createdAt)
          .locale("fr")
          .format("DD MMMM YYYY à HH:mm")}
      </div>
      {connectedUser.updatedAt && (
        <div>
          modifié le{" "}
          {dayjs(connectedUser.updatedAt)
            .locale("fr")
            .format("DD MMMM YYYY à HH:mm")}
        </div>
      )}

      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          saveModifiedProfile(newUsername, newEmail, newPassword);
        }}
      >
        <SaveIcon /> <div>Enregistrer</div>
      </StyledButton>
    </StyledForm>
  );
}
