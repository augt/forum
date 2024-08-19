import Link from "next/link";
import {
  StyledH1,
  StyledHeader,
  StyledNav,
  StyledUl,
  StyledLink,
} from "./index.style";

export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>Forum</StyledH1>
      <StyledNav>
        <StyledUl>
          <li>
            <StyledLink href="login">Connexion</StyledLink>
          </li>
          <li>
            <StyledLink href="signup">Inscription</StyledLink>
          </li>
          <li>
            <StyledLink href="profile">Profil</StyledLink>
          </li>
        </StyledUl>
      </StyledNav>
    </StyledHeader>
  );
}
