import type { AppProps } from "next/app";
import { ThemeProvider, type DefaultTheme } from "styled-components";
import GlobalStyle from "@/components/globalstyles";
import { Roboto } from "next/font/google";
import Header from "@/components/molecules/header";

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
  breakpoints: {
    mobile: 501,
  },
  fontSizes: {
    normal: "18px",
    big: "40px",
    small: "12px",
  },
};
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}
