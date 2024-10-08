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
  const [responseMessage, setResponseMessage] = useState("");

  async function handleLoginClick(email: string, password: string) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_SCHEME || "http"}://${
          process.env.NEXT_PUBLIC_API_HOST || "localhost:3001"
        }/auth/login`,
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        setCookie("ForumAuthToken", response.data.access_token);
        setAuthToken(response.data.access_token);
        setConnectedUser(response.data.user);
        setIsUserConnected(true);
        setResponseMessage(
          "Connexion réussie, redirection vers le fil d'actualités !"
        );
        router.push("/");
      }
    } catch (error: any) {
      setResponseMessage(error.response.data.message);
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
          responseMessage={responseMessage}
          isLogInMode={true}
        />
      </main>
    </>
  );
}
