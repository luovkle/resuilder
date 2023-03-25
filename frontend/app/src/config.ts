import { useNavigate } from "react-router-dom";

export const getProviderConfig = () => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = window.location.origin;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const scope = "openid profile email";

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return {
    domain,
    clientId,
    authorizationParams: {
      redirect_uri: redirectUri,
      audience,
      scope,
    },
    onRedirectCallback,
  };
};
