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

const audience = "https://gymspacebackend-production-421c.up.railway.app/"
const scope = "read:current_user update:current_user_metadata"

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Auth0Provider
        domain="dev-y4mdv7lm3spxjtu2.us.auth0.com"
        clientId="lWHtJzbfJeiBfe0nXxmw5uqZkoJwkIkp"
        redirectUri={window.location.origin}
        audience={audience}
        scope={scope}
      >
        <App/>
      </Auth0Provider>
    </BrowserRouter>
  </ThemeProvider>
);
