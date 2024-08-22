import {
  Container,
  InstructionsText,
  StyledEm,
  WelcomeMessage,
} from "./index.style";

export default function SitePresentation() {
  return (
    <Container>
      <WelcomeMessage>
        Bienvenue sur <StyledEm>Forum</StyledEm>
      </WelcomeMessage>
      <InstructionsText>
        Ici vous pourrez rédiger des publications, aimer et commenter les
        publications des autres utilisateurs.
      </InstructionsText>
      <InstructionsText>
        Veuillez vous inscrire si ce n&apos;est pas déjà fait, et vous connecter
        pour accéder au contenu du site !
      </InstructionsText>
    </Container>
  );
}
