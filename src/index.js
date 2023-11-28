import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import store from "./REDUX/store";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const providerConfig = {
  domain: "dev-y4mdv7lm3spxjtu2.us.auth0.com",
  clientId: "lWHtJzbfJeiBfe0nXxmw5uqZkoJwkIkp",
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: "https://gymspacebackend-production-421c.up.railway.app/",
    scope: "read:current_user update:current_user_metadata"
  },
};

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider
          {...providerConfig}
      >
        <App/>
      </Auth0Provider>
    </BrowserRouter>
    </Provider>
  </ThemeProvider>
);
