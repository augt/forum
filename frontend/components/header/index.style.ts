import Link from "next/link";
import styled from "styled-components";

export const StyledHeader = styled.header`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 500px) {
    padding: 0 50px;
  }
`;

export const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.colors.secondary};
`;

export const StyledNav = styled.nav``;

export const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StyledLink = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
