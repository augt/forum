import styled from "styled-components";

export const PopinBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  opacity: 0.8;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PopinContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 20px;
`;

export const PopinHeader = styled.div`
  display: flex;
  justify-content: end;
`;
