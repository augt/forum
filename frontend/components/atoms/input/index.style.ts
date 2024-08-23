import styled from "styled-components";

export const StyledInput = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  padding: 5px 10px;
  border: solid ${({ theme }) => theme.colors.primary} 1px;
  border-radius: 5px;
`;
