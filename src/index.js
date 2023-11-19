import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Auth0Provider
        domain="dev-y4mdv7lm3spxjtu2.us.auth0.com"
        clientId="lWHtJzbfJeiBfe0nXxmw5uqZkoJwkIkp"
        redirectUrl={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </ThemeProvider>
);
