import styled from "styled-components";

export const PublicationsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const PublicationContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.tertiary};
  width: 100%;
  border-radius: 5px;
  padding: 20px 30px;
`;

export const Title = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
`;

export const TextContent = styled.div`
  margin-bottom: 20px;
  white-space: pre-line;
`;

export const PublicationEndingBlock = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
    gap: 5px;
  }
`;

export const ButtonsBlock = styled.div`
  display: flex;
`;

export const EndingBlockLeftSide = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 5px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: fit-content;
    align-self: flex-end;
  }
`;

export const InteractionIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AuthorAndCreationDate = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  gap: 5px;

  & > div {
    width: fit-content;
  }
`;
