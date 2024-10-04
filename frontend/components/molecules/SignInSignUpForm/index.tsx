import { useState } from "react";
import {
  InputContainer,
  StyledApiResponseMessage,
  StyledForm,
  StyledInfoMessage,
} from "./index.style";
import { StyledButton } from "@/components/atoms/Button/index.style";
import { StyledInput } from "@/components/atoms/Input/index.style";

type PropsTypes = {
  handleSubmit: (
    email: string,
    password: string,
    username?: string,
    group?: string
  ) => void;
  responseMessage: string;
  isLogInMode?: boolean;
};

export default function SignInSignUpForm({
  handleSubmit,
  responseMessage,
  isLogInMode,
}: PropsTypes) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");

  return (
    <>
      <StyledForm>
        {!isLogInMode && (
          <InputContainer>
            <label htmlFor="username">Pseudo</label>
            <StyledInput
              type="text"
              id="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </InputContainer>
        )}
        {!isLogInMode && (
          <InputContainer>
            <label htmlFor="group">Groupe à rejoindre</label>
            <StyledInput
              type="text"
              id="group"
              onChange={(event) => {
                setGroup(event.target.value);
              }}
            />
          </InputContainer>
        )}
        <InputContainer>
          <label htmlFor="email">Email</label>
          <StyledInput
            type="email"
            id="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Mot de passe</label>
          <StyledInput
            type="password"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </InputContainer>

        <StyledButton
          onClick={(e) => {
            e.preventDefault();
            isLogInMode
              ? handleSubmit(email, password)
              : handleSubmit(email, password, username, group);
          }}
        >
          {isLogInMode ? "Connexion" : "Inscription"}
        </StyledButton>
      </StyledForm>
      <StyledApiResponseMessage>{responseMessage}</StyledApiResponseMessage>
      {!isLogInMode && (
        <>
          <StyledInfoMessage>Informations utiles :</StyledInfoMessage>
          <StyledInfoMessage>
            Vous pouvez choisir le groupe que vous souhaitez, si celui-ci
            n&apos;existe pas encore, il sera créé automatiquement lors de votre
            inscription.
          </StyledInfoMessage>
          <StyledInfoMessage>
            Vous ne recevrez pas d&apos;email de cette application, il
            n&apos;est donc pas nécessaire de renseigner une véritable adresse
            email.
          </StyledInfoMessage>
        </>
      )}
    </>
  );
}
