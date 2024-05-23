import type { AppState, Auth0ProviderOptions } from "@auth0/auth0-react";
import type { PropsWithChildren } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import settings from "../../config";

const Auth0ProviderWithRedirectCallback = ({
  children,
  ...props
}: PropsWithChildren) => {
  const navigate = useNavigate();

  const providerConfig: Auth0ProviderOptions = {
    ...props,
    domain: settings.VITE_AUTH0_DOMAIN,
    clientId: settings.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: settings.VITE_AUTH0_AUDIENCE,
      scope: "openid profile email",
    },
  };

  const onRedirectCallback = (appState?: AppState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <Auth0Provider {...providerConfig} onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithRedirectCallback;
