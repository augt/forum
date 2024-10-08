import { ConnectedUserContext } from "@/components/Context";
import SignInSignUpForm from "@/components/molecules/SignInSignUpForm";
import axios from "axios";
import { setCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const { setAuthToken, setConnectedUser, setIsUserConnected } =
    useContext(ConnectedUserContext);
  const [responseMessage, setResponseMessage] = useState("");
  async function handleSignUpClick(
    email: string,
    password: string,
    username?: string,
    group?: string
  ) {
    try {
      const signUpResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_SCHEME || "http"}://${
          process.env.NEXT_PUBLIC_API_HOST || "localhost:3001"
        }/users/signup`,
        {
          username,
          email,
          group,
          password,
        }
      );
      if (signUpResponse.status === 201)
        setResponseMessage(
          "Utilisateur créé avec succès, vous allez être connecté !"
        );

      const loginResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_SCHEME || "http"}://${
          process.env.NEXT_PUBLIC_API_HOST || "localhost:3001"
        }/auth/login`,
        {
          email,
          password,
        }
      );

      setCookie("ForumAuthToken", loginResponse.data.access_token);
      setAuthToken(loginResponse.data.access_token);
      setConnectedUser(loginResponse.data.user);
      setIsUserConnected(true);
      router.push("/");
    } catch (error: any) {
      setResponseMessage(error.response.data.message);
    }
  }
  return (
    <>
      <Head>
        <title>Forum - Inscription</title>
      </Head>
      <main>
        <SignInSignUpForm
          handleSubmit={handleSignUpClick}
          responseMessage={responseMessage}
        />
      </main>
    </>
  );
}
