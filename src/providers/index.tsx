import { ThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";
import theme from "../config/theme";

export default function Provider({ children }: Readonly<PropsWithChildren>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
