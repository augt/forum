import { StyledInput } from "@/components/atoms/Input/index.style";
import styled from "styled-components";

export const StyledForm = styled.form`
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 5px;
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 30px;
`;

export const GreetingMessage = styled.div`
  font-weight: 700;
  align-self: center;
  margin-bottom: 20px;
`;

export const TitleTextInput = styled(StyledInput)`
  min-width: 50%;
  margin-bottom: 20px;
`;
