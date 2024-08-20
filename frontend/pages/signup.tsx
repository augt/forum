import SignInSignUpForm from "@/components/molecules/SignInSignUpForm";
import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  async function handleSignUpClick(
    username: string,
    email: string,
    password: string
  ) {
    try {
      const response = await axios.post("http://localhost:3000/users/signup", {
        username,
        email,
        password,
      });
      console.log(response);
      if (response.status === 201)
        setErrorMessage(
          "Utilisateur créé, rendez-vous sur la page de connexion !"
        );
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  }
  return (
    <main>
      <SignInSignUpForm
        handleSubmit={handleSignUpClick}
        errorMessage={errorMessage}
        isUserNamefieldActivated={true}
      />
    </main>
  );
}
