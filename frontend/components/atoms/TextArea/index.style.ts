import { TextareaAutosize } from "@mui/material";
import styled from "styled-components";

export const StyledTextArea = styled(TextareaAutosize)`
  border-radius: 5px;
  border: solid ${({ theme }) => theme.colors.primary} 1px;
  font-size: ${({ theme }) => theme.fontSizes.normal};
  font-family: inherit;
  margin-bottom: 10px;
  resize: none;
  width: 100%;
  min-height: 70px;
  padding: 5px;
`;
