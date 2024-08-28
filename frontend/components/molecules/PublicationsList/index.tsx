import { LikeType, PublicationType, UserType } from "@/components/dataTypes";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import {
  AuthorAndCreationDate,
  ButtonsBlock,
  EndingBlockLeftSide,
  InteractionIconsContainer,
  PublicationContainer,
  PublicationEndingBlock,
  PublicationsListContainer,
  TextContent,
  Title,
} from "./index.style";
import { StyledButton } from "@/components/atoms/Button/index.style";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ConnectedUserContext } from "@/components/Context";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useTheme } from "styled-components";
import axios from "axios";
import CommentsList from "../CommentsList";
import CreateCommentForm from "../CreateCommentForm";
import Popin from "../Popin";

export type PublicationsListProps = {
  publications: PublicationType[];
  setPublications: Dispatch<SetStateAction<PublicationType[]>>;
};

export default function PublicationsList({
  publications,
  setPublications,
}: PublicationsListProps) {
  const theme = useTheme();
  const { connectedUser, authToken } = useContext(ConnectedUserContext);
  const [arrayIsCommentsListOpen, setArrayIsCommentsListOpen] = useState(
    publications.map(() => false)
  );
  const [isEditing, setIsEditing] = useState(false);

  function isLikedByConnectedUser(
    publication: PublicationType,
    connectedUser: UserType
  ) {
    return publication.likes.some((like) => like.user.id === connectedUser.id);
  }

  async function createLike(publicationId: string) {
    try {
      const response = await axios.post(
        "http://localhost:3001/likes",
        {
          publication: publicationId,
        },
        {
          headers: { Authorization: "Bearer " + authToken },
        }
      );

      const createdLike = response.data;
      publications
        .find((publication) => publication.id === publicationId)
        ?.likes.push(createdLike);
      setPublications([...publications]);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteLike(likes: LikeType[], publicationId: string) {
    const likeId = likes.find((like) => like.user.id === connectedUser.id)?.id;
    try {
      const response = await axios.delete(
        `http://localhost:3001/likes/${likeId}`,

        {
          headers: { Authorization: "Bearer " + authToken },
        }
      );

      if (response.status === 200) {
        publications
          .find((publication) => publication.id === publicationId)
          ?.likes.splice(
            likes.findIndex((like) => like.id === likeId),
            1
          );
        setPublications([...publications]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePublication(publicationId: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3001/publications/${publicationId}`,

        {
          headers: { Authorization: "Bearer " + authToken },
        }
      );

      if (response.status === 200) {
        publications.splice(
          publications.findIndex(
            (publication) => publication.id === publicationId
          ),
          1
        );
        setPublications([...publications]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <PublicationsListContainer>
        {publications.map((publication, index) => (
          <PublicationContainer key={index}>
            <Title>{publication.title}</Title>
            <TextContent>{publication.text}</TextContent>
            <PublicationEndingBlock>
              <ButtonsBlock>
                <StyledButton
                  onClick={() => {
                    isLikedByConnectedUser(publication, connectedUser)
                      ? deleteLike(publication.likes, publication.id)
                      : createLike(publication.id);
                  }}
                >
                  <InteractionIconsContainer>
                    <ThumbUpIcon
                      htmlColor={
                        isLikedByConnectedUser(publication, connectedUser)
                          ? theme.colors.primary
                          : undefined
                      }
                    />
                    <div>{publication.likes.length}</div>
                  </InteractionIconsContainer>
                </StyledButton>
                <StyledButton
                  onClick={() => {
                    arrayIsCommentsListOpen[index] =
                      !arrayIsCommentsListOpen[index];
                    setArrayIsCommentsListOpen([...arrayIsCommentsListOpen]);
                  }}
                >
                  <InteractionIconsContainer>
                    <ChatBubbleIcon />
                    <div>{publication.comments.length}</div>
                  </InteractionIconsContainer>
                </StyledButton>
                {connectedUser.id === publication.user.id && (
                  <>
                    <StyledButton
                      onClick={() => {
                        setIsEditing(!isEditing);
                      }}
                    >
                      <EditIcon />
                    </StyledButton>
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        deletePublication(publication.id);
                      }}
                    >
                      <DeleteForeverIcon />
                    </StyledButton>
                  </>
                )}
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

            {arrayIsCommentsListOpen[index] && (
              <>
                <CreateCommentForm
                  publications={publications}
                  setPublications={setPublications}
                  publicationId={publication.id}
                />
                <CommentsList
                  comments={publication.comments}
                  publications={publications}
                  setPublications={setPublications}
                  publicationId={publication.id}
                ></CommentsList>
              </>
            )}
          </PublicationContainer>
        ))}
      </PublicationsListContainer>
      {isEditing && (
        <Popin setIsEditing={setIsEditing} onClose={() => {}}></Popin>
      )}
    </>
  );
}
