import styled from "styled-components";

export const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const WelcomeMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.big};
  text-align: center;
`;
export const StyledEm = styled.em`
  color: ${({ theme }) => theme.colors.secondary};
  font-style: normal;
  font-weight: 700;
`;
export const InstructionsText = styled.div`
  text-align: center;
`;
