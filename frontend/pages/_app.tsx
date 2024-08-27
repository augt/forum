import type { AppProps } from "next/app";
import { ThemeProvider, type DefaultTheme } from "styled-components";
import GlobalStyle from "@/components/globalstyles";
import { Roboto } from "next/font/google";
import Header from "@/components/molecules/Header";
import { ConnectedUserContext } from "@/components/Context";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import axios from "axios";

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
    tertiary: "#f2f2f2",
    white: "#FFFFFF",
  },
  breakpoints: {
    mobile: "501px",
  },
  fontSizes: {
    normal: "18px",
    big: "40px",
    small: "13px",
  },
};
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const token = getCookie("ForumAuthToken");
  const [authToken, setAuthToken] = useState<string | undefined>();
  const [connectedUser, setConnectedUser] = useState({});
  const [isUserConnected, setIsUserConnected] = useState(false);

  async function getUserInfo() {
    try {
      const response = await axios.get("http://localhost:3001/users", {
        headers: { Authorization: "Bearer " + token },
      });
      if (response) {
        setConnectedUser(response.data);
        setIsUserConnected(true);
        if (typeof token === "string") setAuthToken(token);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        setCookie("ForumAuthToken", "");
        setAuthToken("");
      }
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ConnectedUserContext.Provider
      value={{
        connectedUser,
        setConnectedUser,
        isUserConnected,
        setIsUserConnected,
        authToken,
        setAuthToken,
      }}
    >
      <div className={roboto.className}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </div>
    </ConnectedUserContext.Provider>
  );
}
