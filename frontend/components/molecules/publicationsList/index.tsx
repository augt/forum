import { PublicationType } from "@/components/dataTypes";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import {
  AuthorAndCreationDate,
  ButtonsBlock,
  EndingBlockLeftSide,
  PublicationContainer,
  PublicationEndingBlock,
  PublicationsListContainer,
  TextContent,
  Title,
} from "./index.style";
import { StyledButton } from "@/components/atoms/button/index.style";

export type PublicationsListProps = {
  publications: PublicationType[];
};

export default function PublicationsList({
  publications,
}: PublicationsListProps) {
  return (
    <PublicationsListContainer>
      {publications.map((publication, index) => (
        <PublicationContainer key={index}>
          <Title>{publication.title}</Title>
          <TextContent>{publication.text}</TextContent>
          <PublicationEndingBlock>
            <ButtonsBlock>
              <StyledButton>{publication.likes.length} J'aime</StyledButton>
              <StyledButton>
                {publication.comments.length} Commenter
              </StyledButton>
            </ButtonsBlock>
            <EndingBlockLeftSide>
              <AuthorAndCreationDate>
                <div>{publication.user.username}</div>
                <div>
                  {dayjs(publication.createdAt)
                    .locale("fr")
                    .format("DD MMMM YYYY à HH:mm")}
                </div>
              </AuthorAndCreationDate>

              {publication.updatedAt && (
                <div>
                  modifié le{" "}
                  {dayjs(publication.updatedAt)
                    .locale("fr")
                    .format("DD MMMM YYYY à HH:mm")}
                </div>
              )}
            </EndingBlockLeftSide>
          </PublicationEndingBlock>
        </PublicationContainer>
      ))}
    </PublicationsListContainer>
  );
}
