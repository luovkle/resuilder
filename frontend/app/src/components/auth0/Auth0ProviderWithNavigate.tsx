import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

import { getProviderConfig } from "../../config";

interface Props {
  children: ReactNode;
}

export const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const config = getProviderConfig();

  return <Auth0Provider {...config}>{children}</Auth0Provider>;
};
