import { useState } from "react";
import { InputContainer, StyledForm } from "./index.style";
import { StyledButton } from "@/components/atoms/button/index.style";
import { StyledInput } from "@/components/atoms/input/index.style";

type PropsTypes = {
  handleSubmit: (username: string, email: string, password: string) => void;
  errorMessage: string;
  isUserNamefieldActivated?: boolean;
};

export default function SignInSignUpForm({
  handleSubmit,
  errorMessage,
  isUserNamefieldActivated,
}: PropsTypes) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <StyledForm>
      {isUserNamefieldActivated && (
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
          handleSubmit(username, email, password);
        }}
      >
        {isUserNamefieldActivated ? "Inscription" : "Connexion"}
      </StyledButton>

      <div className="error-message">{errorMessage}</div>
    </StyledForm>
  );
}
