import { Auth0Provider } from "@auth0/auth0-react";

import { getProviderConfig } from "../../config";

export const Auth0ProviderWithNavigate = ({ children }) => {
  const config = getProviderConfig();

  return <Auth0Provider {...config}>{children}</Auth0Provider>;
};
