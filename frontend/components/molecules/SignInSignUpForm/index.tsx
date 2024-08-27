import { useState } from "react";
import { InputContainer, StyledForm } from "./index.style";
import { StyledButton } from "@/components/atoms/Button/index.style";
import { StyledInput } from "@/components/atoms/Input/index.style";

type PropsTypes = {
  handleSubmit: (email: string, password: string, username?: string) => void;
  errorMessage: string;
  isUsernamefieldActivated?: boolean;
};

export default function SignInSignUpForm({
  handleSubmit,
  errorMessage,
  isUsernamefieldActivated,
}: PropsTypes) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <StyledForm>
        {isUsernamefieldActivated && (
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
            isUsernamefieldActivated
              ? handleSubmit(email, password, username)
              : handleSubmit(email, password);
          }}
        >
          {isUsernamefieldActivated ? "Inscription" : "Connexion"}
        </StyledButton>
      </StyledForm>
      <div>{errorMessage}</div>
    </>
  );
}
