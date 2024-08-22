import SignInSignUpForm from "@/components/molecules/SignInSignUpForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { setCookie } from "cookies-next";
import Head from "next/head";
import { ConnectedUserContext } from "@/components/Context";

export default function Login() {
  const router = useRouter();
  const { setAuthToken, setConnectedUser, setIsUserConnected } =
    useContext(ConnectedUserContext);
  const [errorMessage, setErrorMessage] = useState("");
  async function handleLoginClick(email: string, password: string) {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        setCookie("ForumAuthToken", response.data.access_token);
        setAuthToken(response.data.access_token);
        setConnectedUser(response.data.user);
        setIsUserConnected(true);
        setErrorMessage(
          "Connexion réussie, redirection vers le fil d'actualités !"
        );
        router.push("/");
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  }
  return (
    <>
      <Head>
        <title>Forum - Connexion</title>
      </Head>
      <main>
        <SignInSignUpForm
          handleSubmit={handleLoginClick}
          errorMessage={errorMessage}
        />
      </main>
    </>
  );
}
