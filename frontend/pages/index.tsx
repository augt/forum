import Head from "next/head";
import { setCookie } from "cookies-next";
import { useContext, useEffect, useState } from "react";
import SitePresentation from "@/components/molecules/SitePresentation";
import axios from "axios";
import { ConnectedUserContext } from "@/components/Context";
import { PublicationType } from "@/components/dataTypes";
import PublicationsList from "@/components/molecules/PublicationsList";
import { CreatePublicationForm } from "@/components/molecules/CreatePublicationForm";

export default function Home() {
  const { authToken } = useContext(ConnectedUserContext);

  const [publications, setPublications] = useState<PublicationType[]>([]);

  async function fetchPublications(authToken: string) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_SCHEME || "http"}://${
          process.env.NEXT_PUBLIC_API_HOST || "localhost:3001"
        }/publications/`,
        {
          headers: { Authorization: "Bearer " + authToken },
        }
      );
      if (response) setPublications(response.data);
    } catch (error: any) {
      if (error.response.status === 401) {
        setCookie("ForumAuthToken", "");
      }
    }
  }

  useEffect(() => {
    if (authToken) fetchPublications(authToken);
  }, [authToken]);

  return (
    <>
      <Head>
        <title>Forum</title>
        <meta name="description" content="Plateforme de discussions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {authToken === "" ? (
          <SitePresentation />
        ) : (
          <>
            <CreatePublicationForm
              publications={publications}
              setPublications={setPublications}
            />
            <PublicationsList
              publications={publications}
              setPublications={setPublications}
            />
          </>
        )}
      </main>
    </>
  );
}
