import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    breakpoints: {
      mobile: string;
    };
    fontSizes: {
      normal: string;
      big: string;
      small: string;
    };
  }
}
