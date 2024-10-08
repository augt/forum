import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 8px 10px;
  color: white;
  border-radius: 5px;
  border: none;
  width: fit-content;
  height: fit-content;
  transition: all 300ms;
  font-size: ${({ theme }) => theme.fontSizes.normal};
  white-space: nowrap;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;

  &:hover {
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
