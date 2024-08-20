import Head from "next/head";
import {
  Container,
  Main,
  Title,
  Description,
  CodeTag,
} from "@/components/sharedstyles";
import Cards from "@/components/cards";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Forum</title>
        <meta name="description" content="Plateforme de discussions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Title>
          Bienvenue sur <em>Forum</em>
        </Title>

        <Description>
          Get started by editing
          <CodeTag>pages/index.tsx</CodeTag>
        </Description>

        <Cards />
      </Main>
    </Container>
  );
}
