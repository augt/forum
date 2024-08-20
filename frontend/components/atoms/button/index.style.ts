import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 8px 10px;
  color: white;
  border-radius: 5px;
  border: none;
  margin: 5px;
  width: 100%;
  transition: all 300ms;
  font-size: ${({ theme }) => theme.fontSizes.normal};

  &:hover {
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
