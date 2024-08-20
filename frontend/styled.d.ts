import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
    };
    breakpoints: {
      mobile: number;
    };
    fontSizes: {
      normal: string;
      big: string;
      small: string;
    };
  }
}
