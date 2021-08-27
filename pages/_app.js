import '../styles/globals.css'
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";

const theme = createTheme();
function MyApp({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>

}

export default MyApp
