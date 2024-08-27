import Link from "next/link";
import {
  StyledH1,
  StyledHeader,
  StyledNav,
  StyledUl,
  StyledLink,
  StyledLi,
} from "./index.style";
import { useContext } from "react";
import { ConnectedUserContext } from "@/components/Context";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const { authToken, setConnectedUser, setAuthToken, setIsUserConnected } =
    useContext(ConnectedUserContext);

  function logout() {
    setCookie("ForumAuthToken", "");
    setConnectedUser({});
    setAuthToken("");
    setIsUserConnected(false);
    router.push("/");
  }
  return (
    <StyledHeader>
      <StyledH1>
        <Link href="/">Forum</Link>
      </StyledH1>
      <StyledNav>
        <StyledUl>
          {authToken ? (
            <>
              <li>
                <StyledLink href="/">Fil d&apos;actualités</StyledLink>
              </li>
              <li>
                <StyledLink href="profile">Profil</StyledLink>
              </li>
              <StyledLi onClick={logout}>Déconnexion</StyledLi>
            </>
          ) : (
            <>
              <li>
                <StyledLink href="login">Connexion</StyledLink>
              </li>
              <li>
                <StyledLink href="signup">Inscription</StyledLink>
              </li>
            </>
          )}
        </StyledUl>
      </StyledNav>
    </StyledHeader>
  );
}
