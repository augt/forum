import SignInSignUpForm from "@/components/molecules/SignInSignUpForm";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";

export default function SignUp() {
  const [responseMessage, setResponseMessage] = useState("");
  async function handleSignUpClick(
    email: string,
    password: string,
    username?: string,
    group?: string
  ) {
    try {
      const response = await axios.post(
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
      if (response.status === 201)
        setResponseMessage(
          "Utilisateur créé, rendez-vous sur la page de connexion !"
        );
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
