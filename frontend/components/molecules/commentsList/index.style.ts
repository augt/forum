import styled from "styled-components";

export const CommentsListContainer = styled.div`
  margin-top: 20px;
  padding-top: 10px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
`;

export const CommentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  border-radius: 5px;
  padding: 10px;
`;

export const CommentInfos = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CommentAuthor = styled.em``;

export const CommentText = styled.div`
  margin-bottom: 10px;
`;

export const CommentLowerBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonsGroup = styled.div`
  display: flex;
  gap: 10px;
`;
