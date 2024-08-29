import styled from "styled-components";

export const PopinBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopinContainer = styled.div`
  position: relative;
  max-height: 80%;
  width: 80%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 20px;
  overflow-y: auto;
`;

export const PopinHeader = styled.div`
  display: flex;
  justify-content: end;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const PopinMainContentContainer = styled.div``;
