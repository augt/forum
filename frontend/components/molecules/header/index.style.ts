import Link from "next/link";
import styled from "styled-components";

export const StyledHeader = styled.header`
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 20px;
  }
`;

export const StyledH1 = styled.h1`
  margin: 26px 0;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.big};
`;

export const StyledNav = styled.nav``;

export const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StyledLink = styled(Link)`
  transition: all 300ms;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
