import Head from "next/head";
import { setCookie } from "cookies-next";
import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import SitePresentation from "@/components/molecules/SitePresentation";
import axios from "axios";
import { ConnectedUserContext } from "@/components/Context";
import Publication from "@/components/molecules/publicationsList";
import { PublicationType } from "@/components/dataTypes";
import PublicationsList from "@/components/molecules/publicationsList";
import { CreatePublicationForm } from "@/components/molecules/createPublicationForm";

export default function Home() {
  const { authToken } = useContext(ConnectedUserContext);

  const [publications, setPublications] = useState<PublicationType[]>([]);

  async function fetchPublications(authToken: string) {
    try {
      const response = await axios.get("http://localhost:3001/publications/", {
        headers: { Authorization: "Bearer " + authToken },
      });
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
