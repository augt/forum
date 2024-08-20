import SignInSignUpForm from "@/components/molecules/SignInSignUpForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { setCookie } from "cookies-next";
import Head from "next/head";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  async function handleLoginClick(email: string, password: string) {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        setCookie("ForumAuthToken", response.data.access_token);
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
